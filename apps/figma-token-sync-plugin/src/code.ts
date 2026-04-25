import {
  DEFAULT_SETTINGS,
  GITHUB_TOKEN_STORAGE_KEY,
  STORAGE_KEY,
  normalizeSettings,
  type SerializedCollection,
  type SerializedVariable,
  type SerializedVariableValue,
  type StoredSettings,
  type SyncFileRequest,
  type SyncLogEntry,
  type SyncLogLevel,
  type SyncRequest,
  type SyncResult,
  type TokenSnapshot,
} from "./shared/types";

declare const __html__: string;

const GITHUB_READ_TIMEOUT_MS = 30000;
const GITHUB_WRITE_TIMEOUT_MS = 120000;
const GITHUB_BODY_TIMEOUT_MS = 60000;
const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

figma.showUI(__html__, {
  width: 420,
  height: 720,
  title: "Figma Token Sync",
  themeColors: true,
});

void bootstrap();

async function bootstrap(): Promise<void> {
  const [storedSettings, githubToken, snapshot] = await Promise.all([
    readStoredSettings(),
    readStoredGithubToken(),
    buildSnapshot(),
  ]);
  const settings = normalizeSettings(storedSettings, snapshot.fileName);

  figma.ui.postMessage({
    type: "init",
    snapshot,
    settings,
    githubToken,
  });
}

figma.ui.onmessage = async (message: unknown) => {
  if (!message || typeof message !== "object" || !("type" in message)) {
    return;
  }

  const typedMessage = message as { type: string };

  if (typedMessage.type === "refresh") {
    const snapshot = await buildSnapshot();
    figma.ui.postMessage({ type: "snapshot", snapshot });
    return;
  }

  if (typedMessage.type === "save-settings") {
    const settings = normalizeIncomingSettings(message);
    await writeStoredSettings(settings);
    return;
  }

  if (typedMessage.type === "save-github-token") {
    const result = await writeStoredGithubToken(normalizeIncomingGithubToken(message));
    figma.ui.postMessage({
      type: "github-token-save-result",
      result,
    });
    return;
  }

  if (typedMessage.type === "sync-to-github") {
    const payload = message as { payload?: SyncRequest };
    let result: SyncResult;

    try {
      result = await syncToGitHub(payload.payload, emitSyncLog);
    } catch (error) {
      const errorMessage = `同步过程中发生异常：${formatUnknownError(error)}`;
      emitSyncLog("error", errorMessage);
      result = {
        ok: false,
        error: errorMessage,
      };
    }

    figma.ui.postMessage({ type: "sync-result", result });

    if (result.ok) {
      figma.notify("Token 文件已同步到 GitHub。");
    }

    return;
  }

  if (typedMessage.type === "close") {
    figma.closePlugin();
  }
};

function emitSyncLog(level: SyncLogLevel, message: string, filePath?: string): void {
  const entry: SyncLogEntry = {
    level,
    message,
    filePath,
    timestamp: new Date().toISOString(),
  };

  figma.ui.postMessage({
    type: "sync-log",
    entry,
  });
}

async function buildSnapshot(): Promise<TokenSnapshot> {
  const [collections, variables] = await Promise.all([
    figma.variables.getLocalVariableCollectionsAsync(),
    figma.variables.getLocalVariablesAsync(),
  ]);

  return {
    fileName: figma.root.name,
    generatedAt: new Date().toISOString(),
    collections: collections.map(serializeCollection),
    variables: variables.map(serializeVariable),
  };
}

function serializeCollection(collection: VariableCollection): SerializedCollection {
  return {
    id: collection.id,
    name: collection.name,
    defaultModeId: collection.defaultModeId,
    modes: collection.modes.map((mode) => ({
      modeId: mode.modeId,
      name: mode.name,
      isDefault: mode.modeId === collection.defaultModeId,
    })),
  };
}

function serializeVariable(variable: Variable): SerializedVariable {
  const valuesByMode: Record<string, SerializedVariableValue> = {};

  for (const modeId in variable.valuesByMode) {
    valuesByMode[modeId] = serializeValue(variable.valuesByMode[modeId]);
  }

  return {
    id: variable.id,
    key: variable.key,
    name: variable.name,
    description: variable.description,
    collectionId: variable.variableCollectionId,
    resolvedType: variable.resolvedType,
    hiddenFromPublishing: variable.hiddenFromPublishing,
    scopes: [...variable.scopes],
    valuesByMode,
  };
}

function serializeValue(value: VariableValue): SerializedVariableValue {
  if (isVariableAlias(value)) {
    return {
      kind: "alias",
      id: value.id,
    };
  }

  if (isRgba(value)) {
    return {
      kind: "rgba",
      r: value.r,
      g: value.g,
      b: value.b,
      a: typeof value.a === "number" ? value.a : 1,
    };
  }

  if (typeof value === "number") {
    return {
      kind: "number",
      value,
    };
  }

  if (typeof value === "string") {
    return {
      kind: "string",
      value,
    };
  }

  if (typeof value === "boolean") {
    return {
      kind: "boolean",
      value,
    };
  }

  return {
    kind: "unsupported",
  };
}

function isVariableAlias(value: VariableValue): value is VariableAlias {
  return typeof value === "object" && value !== null && "type" in value && value.type === "VARIABLE_ALIAS";
}

function isRgba(value: VariableValue): value is RGBA {
  return (
    typeof value === "object" &&
    value !== null &&
    "r" in value &&
    "g" in value &&
    "b" in value &&
    typeof value.r === "number" &&
    typeof value.g === "number" &&
    typeof value.b === "number"
  );
}

function normalizeIncomingSettings(message: unknown): StoredSettings {
  if (
    !message ||
    typeof message !== "object" ||
    !("settings" in message) ||
    typeof message.settings !== "object" ||
    message.settings === null
  ) {
    return DEFAULT_SETTINGS;
  }

  return normalizeSettings(message.settings as Partial<StoredSettings>);
}

function normalizeIncomingGithubToken(message: unknown): string {
  if (
    !message ||
    typeof message !== "object" ||
    !("githubToken" in message) ||
    typeof message.githubToken !== "string"
  ) {
    return "";
  }

  return message.githubToken.trim();
}

type SyncLogger = (level: SyncLogLevel, message: string, filePath?: string) => void;

async function syncToGitHub(payload: SyncRequest | undefined, log: SyncLogger): Promise<SyncResult> {
  if (!payload) {
    log("error", "缺少同步参数。");
    return {
      ok: false,
      error: "缺少同步参数。",
    };
  }

  const settings = normalizeSettings(payload.settings);
  const token = payload.githubToken.trim();

  if (!token) {
    log("error", "缺少 GitHub Personal Access Token。");
    return {
      ok: false,
      error: "请输入 GitHub Personal Access Token。",
    };
  }

  if (!settings.repoOwner || !settings.repoName) {
    log("error", "GitHub 仓库信息不完整。");
    return {
      ok: false,
      error: "请先补全 GitHub 仓库。",
    };
  }

  if (payload.files.length === 0 || payload.files.some((file) => !file.path.trim())) {
    log("error", "同步文件路径为空。");
    return {
      ok: false,
      error: "请先补全同步文件路径。",
    };
  }

  log(
    "info",
    `准备同步到 ${settings.repoOwner}/${settings.repoName}#${settings.branch}，共 ${payload.files.length} 个文件。`,
  );
  await writeStoredSettings(settings);
  const tokenStorageResult = await writeStoredGithubToken(token);

  if (tokenStorageResult.ok) {
    log("success", "GitHub Token 已保存到本机插件存储。");
  } else if (tokenStorageResult.error) {
    log("warning", tokenStorageResult.error);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const fileUrls: Array<{ path: string; url: string }> = [];

  for (const file of payload.files) {
    try {
      const result = await syncGitHubFile(settings, file, headers, log);

      if (!result.ok) {
        log("error", result.error, file.path);
        return result;
      }

      fileUrls.push({
        path: file.path,
        url: result.fileUrl,
      });
    } catch (error) {
      const errorMessage = formatUnknownError(error);
      log("error", errorMessage, file.path);
      return {
        ok: false,
        error: errorMessage,
      };
    }
  }

  log("success", `同步完成，已写入 ${fileUrls.length} 个文件。`);

  return {
    ok: true,
    fileUrl: fileUrls[0]?.url ?? "",
    fileUrls,
  };
}

async function syncGitHubFile(
  settings: StoredSettings,
  file: SyncFileRequest,
  headers: Record<string, string>,
  log: SyncLogger,
): Promise<SyncResult> {
  const encodedPath = encodeGitHubPath(file.path);
  const contentUrl = `https://api.github.com/repos/${encodeURIComponent(settings.repoOwner)}/${encodeURIComponent(settings.repoName)}/contents/${encodedPath}`;
  let sha: string | undefined;

  log("info", `开始处理 ${file.label} 文件。`, file.path);
  log("info", "读取远程文件状态。", file.path);

  const readResponse = await fetchGitHubApi(
    `${contentUrl}?ref=${encodeURIComponent(settings.branch)}`,
    {
      method: "GET",
      headers,
    },
    "GET 远程文件",
    file.path,
    log,
    GITHUB_READ_TIMEOUT_MS,
  );

  if (readResponse.ok) {
    const existing = await readGitHubJson<{ sha?: string; content?: string; encoding?: string }>(
      readResponse,
      "读取远程文件 JSON",
      file.path,
      log,
    );
    sha = existing.sha;
    log("success", sha ? "已读取远程文件，将基于现有文件更新。" : "远程文件可访问，将继续更新。", file.path);
  } else if (readResponse.status !== 404) {
    const error = await extractGitHubError(readResponse);
    return {
      ok: false,
      error: `${file.path}: ${error}`,
    };
  } else {
    log("info", "远程文件不存在，将创建新文件。", file.path);
  }

  const content = file.content;

  log("info", "使用全量覆盖策略准备写入。", file.path);

  log("info", "上传文件内容到 GitHub。", file.path);
  log("info", `准备上传 ${content.length} 字符。`, file.path);

  const writeResponse = await fetchGitHubApi(
    contentUrl,
    {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: settings.commitMessage,
        branch: settings.branch,
        content: base64EncodeUtf8(content),
        ...(sha ? { sha } : {}),
      }),
    },
    "PUT 写入文件",
    file.path,
    log,
    GITHUB_WRITE_TIMEOUT_MS,
  );

  if (!writeResponse.ok) {
    const error = await extractGitHubError(writeResponse);
    return {
      ok: false,
      error: `${file.path}: ${error}`,
    };
  }

  const fileUrl = `https://github.com/${settings.repoOwner}/${settings.repoName}/blob/${settings.branch}/${file.path}`;
  log("success", `已写入 GitHub：${fileUrl}`, file.path);

  return {
    ok: true,
    fileUrl,
    fileUrls: [
      {
        path: file.path,
        url: fileUrl,
      },
    ],
  };
}

async function fetchGitHubApi(
  url: string,
  init: RequestInit,
  label: string,
  filePath: string,
  log: SyncLogger,
  timeoutMs: number,
): Promise<Response> {
  const startedAt = Date.now();

  log("info", `${label} 请求已发出，最多等待 ${timeoutMs / 1000} 秒。`, filePath);

  try {
    const response = await withTimeout(
      fetch(url, init),
      timeoutMs,
      `${label} 超过 ${timeoutMs / 1000} 秒没有响应。请检查 Figma 网络访问、代理或 GitHub API 连接。`,
    );
    log("info", `${label} 收到 HTTP ${response.status}，耗时 ${Date.now() - startedAt}ms。`, filePath);
    return response;
  } catch (error) {
    throw new Error(`${label} 失败：${formatUnknownError(error)}`);
  }
}

async function readGitHubJson<T>(
  response: Response,
  label: string,
  filePath: string,
  log: SyncLogger,
): Promise<T> {
  log("info", label, filePath);
  const rawText = await readResponseText(response, label, filePath, log);

  try {
    return JSON.parse(rawText) as T;
  } catch (error) {
    throw new Error(`${label} 解析失败：${formatUnknownError(error)}`);
  }
}

async function readResponseText(
  response: Response,
  label: string,
  filePath?: string,
  log?: SyncLogger,
): Promise<string> {
  const textReader = response.text;

  if (typeof textReader !== "function") {
    throw new Error(`${label} 失败：当前 Figma fetch Response 不支持 text()，无法读取响应体。`);
  }

  const rawText = await withTimeout(
    Promise.resolve(textReader.call(response)),
    GITHUB_BODY_TIMEOUT_MS,
    `${label} 超过 ${GITHUB_BODY_TIMEOUT_MS / 1000} 秒没有完成。`,
  );

  if (log) {
    log("info", `${label} 响应体 ${rawText.length} 字符。`, filePath);
  }

  return rawText;
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      reject(new Error(timeoutMessage));
    }, timeoutMs);

    promise.then(
      (value) => {
        if (settled) {
          return;
        }

        settled = true;
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        if (settled) {
          return;
        }

        settled = true;
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function encodeGitHubPath(filePath: string): string {
  return filePath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function extractGitHubError(response: Response): Promise<string> {
  let rawText = "";

  try {
    rawText = await readResponseText(response, "读取 GitHub 错误响应");
  } catch (error) {
    return formatUnknownError(error);
  }

  try {
    const parsed = JSON.parse(rawText) as { message?: string; errors?: unknown };
    const detail =
      Array.isArray(parsed.errors) && parsed.errors.length > 0 ? ` ${JSON.stringify(parsed.errors)}` : "";

    return `${parsed.message ?? "GitHub API 请求失败。"}${detail}`;
  } catch {
    return rawText || `GitHub API 请求失败，状态码 ${response.status}。`;
  }
}

function formatUnknownError(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error) || "未知错误。";
  } catch {
    return "未知错误。";
  }
}

function base64EncodeUtf8(value: string): string {
  return base64EncodeBinary(utf8ToBinary(value));
}

function utf8ToBinary(value: string): string {
  return encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_match: string, hex: string) =>
    String.fromCharCode(parseInt(hex, 16)),
  );
}

function base64EncodeBinary(binary: string): string {
  let output = "";

  for (let index = 0; index < binary.length; index += 3) {
    const byte1 = binary.charCodeAt(index) & 255;
    const hasByte2 = index + 1 < binary.length;
    const hasByte3 = index + 2 < binary.length;
    const byte2 = hasByte2 ? binary.charCodeAt(index + 1) & 255 : 0;
    const byte3 = hasByte3 ? binary.charCodeAt(index + 2) & 255 : 0;
    const triplet = (byte1 << 16) | (byte2 << 8) | byte3;

    output += BASE64_ALPHABET.charAt((triplet >> 18) & 63);
    output += BASE64_ALPHABET.charAt((triplet >> 12) & 63);
    output += hasByte2 ? BASE64_ALPHABET.charAt((triplet >> 6) & 63) : "=";
    output += hasByte3 ? BASE64_ALPHABET.charAt(triplet & 63) : "=";
  }

  return output;
}

async function readStoredSettings(): Promise<Partial<StoredSettings>> {
  if (!canUseClientStorage()) {
    return {};
  }

  try {
    const storedSettings = await figma.clientStorage.getAsync(STORAGE_KEY);
    return storedSettings && typeof storedSettings === "object" ? (storedSettings as Partial<StoredSettings>) : {};
  } catch (error) {
    console.warn("Client storage unavailable, falling back to defaults.", error);
    return {};
  }
}

async function readStoredGithubToken(): Promise<string> {
  if (!canUseClientStorage()) {
    return "";
  }

  try {
    const token = await figma.clientStorage.getAsync(GITHUB_TOKEN_STORAGE_KEY);
    return typeof token === "string" ? token : "";
  } catch (error) {
    console.warn("Client storage unavailable, falling back to empty GitHub token.", error);
    return "";
  }
}

async function writeStoredSettings(settings: StoredSettings): Promise<void> {
  if (!canUseClientStorage()) {
    return;
  }

  try {
    await figma.clientStorage.setAsync(STORAGE_KEY, settings);
  } catch (error) {
    console.warn("Client storage unavailable, skipping persistence.", error);
  }
}

interface TokenStorageResult {
  ok: boolean;
  storage: "figma-client-storage" | "none";
  error?: string;
}

async function writeStoredGithubToken(githubToken: string): Promise<TokenStorageResult> {
  if (!canUseClientStorage()) {
    return {
      ok: false,
      storage: "none",
      error:
        "当前开发插件没有 Figma plugin ID，Figma 不允许持久化保存。请用 Figma 的 Create new plugin 生成带 id 的 manifest 后再导入。",
    };
  }

  try {
    if (githubToken) {
      await figma.clientStorage.setAsync(GITHUB_TOKEN_STORAGE_KEY, githubToken);
    } else {
      await figma.clientStorage.deleteAsync(GITHUB_TOKEN_STORAGE_KEY);
    }
    return {
      ok: true,
      storage: "figma-client-storage",
    };
  } catch (error) {
    console.warn("Client storage unavailable, skipping GitHub token persistence.", error);
    return {
      ok: false,
      storage: "none",
      error: "GitHub Token 保存失败，Figma clientStorage 当前不可用。",
    };
  }
}

function canUseClientStorage(): boolean {
  return typeof figma.pluginId === "string" && figma.pluginId.length > 0;
}
