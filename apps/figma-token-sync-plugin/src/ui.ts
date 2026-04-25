import { generateMultiArtifacts, type FlutterThemeSummary } from "./shared/multi-artifacts";
import {
  ALL_COLLECTIONS,
  ALL_THEMES,
  defaultFlutterFilePath,
  normalizeSettings,
  type SyncLogEntry,
  type SyncFileRequest,
  type StoredSettings,
  type SyncResult,
  type TokenSnapshot,
} from "./shared/types";

const elements = {
  collectionCount: getElement("collection-count"),
  tokenCount: getElement("token-count"),
  warningCount: getElement("warning-count"),
  collection: getInput<HTMLSelectElement>("collection"),
  themeId: getInput<HTMLInputElement>("theme-id"),
  namePrefix: getInput<HTMLInputElement>("name-prefix"),
  lightModeName: getInput<HTMLInputElement>("light-mode-name"),
  darkModeName: getInput<HTMLInputElement>("dark-mode-name"),
  themeList: getElement("theme-list"),
  selectAllThemesButton: getInput<HTMLButtonElement>("select-all-themes-button"),
  clearThemesButton: getInput<HTMLButtonElement>("clear-themes-button"),
  includeTokenEntries: getInput<HTMLInputElement>("include-token-entries"),
  includeCssTheme: getInput<HTMLInputElement>("include-css-theme"),
  includeFlutterTheme: getInput<HTMLInputElement>("include-flutter-theme"),
  filePath: getInput<HTMLInputElement>("file-path"),
  cssFilePath: getInput<HTMLInputElement>("css-file-path"),
  flutterFilePath: getInput<HTMLInputElement>("flutter-file-path"),
  componentTokenPrefixes: getInput<HTMLTextAreaElement>("component-token-prefixes"),
  repoOwner: getInput<HTMLInputElement>("repo-owner"),
  repoName: getInput<HTMLInputElement>("repo-name"),
  branch: getInput<HTMLInputElement>("branch"),
  githubToken: getInput<HTMLInputElement>("github-token"),
  commitMessage: getInput<HTMLInputElement>("commit-message"),
  saveTokenButton: getInput<HTMLButtonElement>("save-token-button"),
  clearTokenButton: getInput<HTMLButtonElement>("clear-token-button"),
  refreshButton: getInput<HTMLButtonElement>("refresh-button"),
  copyButton: getInput<HTMLButtonElement>("copy-button"),
  copyLogButton: getInput<HTMLButtonElement>("copy-log-button"),
  clearLogButton: getInput<HTMLButtonElement>("clear-log-button"),
  syncButton: getInput<HTMLButtonElement>("sync-button"),
  status: getElement("status"),
  syncLog: getElement("sync-log"),
  preview: getElement("preview"),
};

const MAX_SYNC_LOG_ROWS = 120;

let snapshot: TokenSnapshot | null = null;
let settings: StoredSettings = normalizeSettings();
let githubToken = "";
let previewContent = "";
let syncFiles: SyncFileRequest[] = [];
let artifactWarnings: string[] = [];
let syncInFlight = false;
let syncLogCount = 0;
let syncLogEntries: SyncLogEntry[] = [];
let syncLogClearedAt = 0;

window.onmessage = (event: MessageEvent<{ pluginMessage?: unknown }>) => {
  const pluginMessage = event.data.pluginMessage;

  if (!pluginMessage || typeof pluginMessage !== "object" || !("type" in pluginMessage)) {
    return;
  }

  const typedMessage = pluginMessage as { type: string };

  if (typedMessage.type === "init") {
    const payload = pluginMessage as {
      type: "init";
      snapshot: TokenSnapshot;
      settings: StoredSettings;
      githubToken?: string;
    };
    snapshot = payload.snapshot;
    settings = normalizeSettings(payload.settings, payload.snapshot.fileName);
    githubToken = payload.githubToken ?? "";
    renderCollectionOptions();
    hydrateForm();
    refreshPreview();
    setStatus(`已读取 ${snapshot.fileName} 的本地 Variables。`, "neutral");
    return;
  }

  if (typedMessage.type === "snapshot") {
    const payload = pluginMessage as { type: "snapshot"; snapshot: TokenSnapshot };
    snapshot = payload.snapshot;
    renderCollectionOptions();
    refreshPreview();
    setStatus("变量数据已刷新。", "success");
    return;
  }

  if (typedMessage.type === "sync-log") {
    const payload = pluginMessage as { type: "sync-log"; entry: SyncLogEntry };
    appendSyncLog(payload.entry);
    return;
  }

  if (typedMessage.type === "sync-result") {
    const payload = pluginMessage as { type: "sync-result"; result: SyncResult };
    syncInFlight = false;
    syncButtonState();

    if (payload.result.ok) {
      const syncedPaths = payload.result.fileUrls.map((file) => file.path).join(", ");
      setStatus(`同步成功：${syncedPaths}`, "success");
    } else {
      setStatus(payload.result.error, "error");
    }
  }

  if (typedMessage.type === "github-token-save-result") {
    const payload = pluginMessage as {
      type: "github-token-save-result";
      result: {
        ok: boolean;
        storage: "figma-client-storage" | "none";
        error?: string;
      };
    };

    if (payload.result.ok) {
      setStatus(
        githubToken ? "GitHub Token 已保存到本机插件存储。" : "GitHub Token 已清空。",
        "success",
      );
    } else {
      setStatus(payload.result.error ?? "GitHub Token 保存失败。", "error");
    }
  }
};

wireEvents();
syncButtonState();

function wireEvents(): void {
  elements.refreshButton.addEventListener("click", () => {
    postToPlugin({ type: "refresh" });
    setStatus("正在重新读取 Figma Variables...", "neutral");
  });

  elements.copyButton.addEventListener("click", async () => {
    if (!previewContent) {
      return;
    }

    if (await copyTextToClipboard(previewContent)) {
      setStatus("预览内容已复制。", "success");
    } else {
      setStatus("复制失败，请手动选中文本。", "error");
    }
  });

  elements.syncButton.addEventListener("click", () => {
    if (!snapshot) {
      setStatus("还没有拿到 Figma Variables。", "error");
      return;
    }

    if (!previewContent || syncFiles.length === 0) {
      setStatus("当前没有可同步的内容。", "error");
      return;
    }

    syncInFlight = true;
    syncButtonState();
    clearSyncLog();
    appendSyncLog({
      level: "info",
      message: "开始同步任务，等待插件主线程连接 GitHub。",
      timestamp: new Date().toISOString(),
    });
    for (const warning of artifactWarnings) {
      appendSyncLog({
        level: "warning",
        message: warning,
        timestamp: new Date().toISOString(),
      });
    }
    githubToken = elements.githubToken.value.trim();
    postToPlugin({
      type: "sync-to-github",
      payload: {
        settings,
        githubToken,
        files: syncFiles,
      },
    });
    setStatus("正在同步到 GitHub...", "neutral");
  });

  const watchedInputs = [
    elements.collection,
    elements.themeId,
    elements.namePrefix,
    elements.lightModeName,
    elements.darkModeName,
    elements.includeTokenEntries,
    elements.includeCssTheme,
    elements.includeFlutterTheme,
    elements.filePath,
    elements.cssFilePath,
    elements.flutterFilePath,
    elements.componentTokenPrefixes,
    elements.repoOwner,
    elements.repoName,
    elements.branch,
    elements.commitMessage,
  ];

  for (const input of watchedInputs) {
    input.addEventListener("input", handleSettingsChange);
    input.addEventListener("change", handleSettingsChange);
  }

  elements.githubToken.addEventListener("input", handleGithubTokenChange);

  elements.saveTokenButton.addEventListener("click", () => {
    githubToken = elements.githubToken.value.trim();
    persistGithubToken(githubToken);
    setStatus(githubToken ? "正在保存 GitHub Token..." : "正在清空 GitHub Token...", "neutral");
  });

  elements.clearTokenButton.addEventListener("click", () => {
    githubToken = "";
    elements.githubToken.value = "";
    persistGithubToken("");
    setStatus("正在清空 GitHub Token...", "neutral");
  });

  elements.selectAllThemesButton.addEventListener("click", () => {
    settings = normalizeSettings({
      ...collectSettingsFromForm(),
      selectedThemeIds: [ALL_THEMES],
    }, snapshot?.fileName);
    persistSettings();
    refreshPreview();
  });

  elements.clearThemesButton.addEventListener("click", () => {
    settings = normalizeSettings({
      ...collectSettingsFromForm(),
      selectedThemeIds: [],
    }, snapshot?.fileName);
    persistSettings();
    refreshPreview();
  });

  elements.copyLogButton.addEventListener("click", async () => {
    if (syncLogEntries.length === 0) {
      setStatus("当前没有可复制的同步日志。", "neutral");
      return;
    }

    if (await copyTextToClipboard(formatSyncLogEntries(syncLogEntries))) {
      setStatus("同步日志已复制。", "success");
    } else {
      setStatus("复制日志失败，请手动选中文本。", "error");
    }
  });

  elements.clearLogButton.addEventListener("click", () => {
    clearSyncLog();
    setStatus("同步日志已清空。", "success");
  });
}

function handleSettingsChange(event: Event): void {
  const previousThemeId = settings.themeId;
  const previousFlutterFilePath = settings.flutterFilePath;
  const nextSettings = collectSettingsFromForm();

  if (
    event.target === elements.themeId &&
    previousFlutterFilePath === defaultFlutterFilePath(previousThemeId) &&
    nextSettings.flutterFilePath === previousFlutterFilePath
  ) {
    nextSettings.flutterFilePath = defaultFlutterFilePath(nextSettings.themeId);
    elements.flutterFilePath.value = nextSettings.flutterFilePath;
  }

  settings = normalizeSettings(nextSettings, snapshot?.fileName);
  persistSettings();
  refreshPreview();
}

function refreshPreview(): void {
  if (!snapshot) {
    elements.preview.textContent = "等待 Figma Variables...";
    return;
  }

  const artifact = generateMultiArtifacts(snapshot, settings);
  previewContent = artifact.content;
  syncFiles = artifact.files;
  artifactWarnings = artifact.warnings;
  renderThemeList(artifact.flutterThemes);
  elements.preview.textContent = artifact.content;
  elements.collectionCount.textContent = String(artifact.collectionCount);
  elements.tokenCount.textContent = String(artifact.tokenCount);
  elements.warningCount.textContent = String(artifact.warnings.length);

  if (artifact.warnings.length > 0) {
    setStatus(`已生成预览，但有 ${artifact.warnings.length} 条解析警告。`, "error");
  }
}

function hydrateForm(): void {
  elements.collection.value = settings.collectionId;
  elements.themeId.value = settings.themeId;
  elements.namePrefix.value = settings.namePrefix;
  elements.lightModeName.value = settings.lightModeName;
  elements.darkModeName.value = settings.darkModeName;
  elements.includeTokenEntries.checked = settings.includeTokenEntries;
  elements.includeCssTheme.checked = settings.includeCssTheme;
  elements.includeFlutterTheme.checked = settings.includeFlutterTheme;
  elements.filePath.value = settings.filePath;
  elements.cssFilePath.value = settings.cssFilePath;
  elements.flutterFilePath.value = settings.flutterFilePath;
  elements.componentTokenPrefixes.value = settings.componentTokenPrefixes;
  elements.repoOwner.value = settings.repoOwner;
  elements.repoName.value = settings.repoName;
  elements.branch.value = settings.branch;
  elements.githubToken.value = githubToken;
  elements.commitMessage.value = settings.commitMessage;
}

function renderCollectionOptions(): void {
  const currentValue = settings.collectionId;
  elements.collection.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = ALL_COLLECTIONS;
  allOption.textContent = "全部变量集合";
  elements.collection.appendChild(allOption);

  for (const collection of snapshot?.collections ?? []) {
    const option = document.createElement("option");
    option.value = collection.id;
    option.textContent = `${collection.name} (${collection.modes.length} modes)`;
    elements.collection.appendChild(option);
  }

  elements.collection.value = snapshot?.collections.some((collection) => collection.id === currentValue)
    ? currentValue
    : ALL_COLLECTIONS;
}

function renderThemeList(themes: FlutterThemeSummary[]): void {
  elements.themeList.innerHTML = "";

  if (themes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "theme-list-empty";
    empty.textContent = "暂未识别到可同步主题。请确认 color collection 中存在 Light/Dark mode。";
    elements.themeList.appendChild(empty);
    return;
  }

  for (const theme of themes) {
    const label = document.createElement("label");
    label.className = "theme-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = theme.themeId;
    checkbox.checked = theme.selected;
    checkbox.addEventListener("change", handleThemeSelectionChange);

    const body = document.createElement("span");
    body.className = "theme-option-body";

    const name = document.createElement("span");
    name.className = "theme-option-name";
    name.textContent = theme.themeId;

    const modes = document.createElement("span");
    modes.className = "theme-option-modes";
    modes.textContent = `${formatModeNames(theme.lightModeNames)} / ${formatModeNames(theme.darkModeNames)}`;

    body.appendChild(name);
    body.appendChild(modes);
    label.appendChild(checkbox);
    label.appendChild(body);
    elements.themeList.appendChild(label);
  }
}

function handleThemeSelectionChange(): void {
  settings = normalizeSettings(collectSettingsFromForm(), snapshot?.fileName);
  persistSettings();
  refreshPreview();
}

function collectSelectedThemeIdsFromThemeList(): string[] {
  const inputs = Array.prototype.slice.call(
    elements.themeList.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
  ) as HTMLInputElement[];

  if (inputs.length === 0) {
    return settings.selectedThemeIds;
  }

  const selected = inputs.filter((input) => input.checked).map((input) => input.value);

  if (selected.length === inputs.length) {
    return [ALL_THEMES];
  }

  return selected;
}

function formatModeNames(names: string[]): string {
  return names.length > 0 ? names.join(", ") : "未识别";
}

function collectSettingsFromForm(): StoredSettings {
  return normalizeSettings({
    format: "design-system",
    collectionId: elements.collection.value || ALL_COLLECTIONS,
    themeId: elements.themeId.value,
    selectedThemeIds: collectSelectedThemeIdsFromThemeList(),
    namePrefix: elements.namePrefix.value,
    lightModeName: elements.lightModeName.value,
    darkModeName: elements.darkModeName.value,
    includeTokenEntries: elements.includeTokenEntries.checked,
    includeCssTheme: elements.includeCssTheme.checked,
    includeFlutterTheme: elements.includeFlutterTheme.checked,
    filePath: elements.filePath.value,
    cssFilePath: elements.cssFilePath.value,
    flutterFilePath: elements.flutterFilePath.value,
    componentTokenPrefixes: elements.componentTokenPrefixes.value,
    repoOwner: elements.repoOwner.value,
    repoName: elements.repoName.value,
    branch: elements.branch.value,
    commitMessage: elements.commitMessage.value,
  }, snapshot?.fileName);
}

function persistSettings(): void {
  postToPlugin({
    type: "save-settings",
    settings,
  });
}

function handleGithubTokenChange(): void {
  githubToken = elements.githubToken.value.trim();
}

function persistGithubToken(token: string): void {
  postToPlugin({
    type: "save-github-token",
    githubToken: token,
  });
}

function syncButtonState(): void {
  elements.syncButton.disabled = syncInFlight;
  elements.syncButton.textContent = syncInFlight ? "同步中..." : "同步到 GitHub";
}

function setStatus(message: string, variant: "neutral" | "success" | "error", allowMarkdownLink = false): void {
  elements.status.className = `status ${variant === "neutral" ? "" : variant}`.trim();
  elements.status.classList.remove("hidden");

  if (allowMarkdownLink) {
    const match = message.match(/\[(.+?)\]\((.+?)\)/);
    if (match) {
      const [, label, href] = match;
      const plainText = message.replace(match[0], "").trim();
      elements.status.textContent = plainText ? `${plainText} ` : "";

      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.style.color = "inherit";
      elements.status.appendChild(link);
      return;
    }
  }

  elements.status.textContent = message;
}

function clearSyncLog(): void {
  syncLogCount = 0;
  syncLogEntries = [];
  syncLogClearedAt = Date.now();
  elements.syncLog.innerHTML = "";
  renderEmptySyncLog();
}

function appendSyncLog(entry: SyncLogEntry): void {
  if (isStaleSyncLogEntry(entry)) {
    return;
  }

  if (syncLogCount === 0) {
    elements.syncLog.innerHTML = "";
  }

  syncLogEntries.push(entry);

  const row = document.createElement("div");
  row.className = `sync-log-row ${entry.level}`;

  const time = document.createElement("span");
  time.className = "sync-log-time";
  time.textContent = formatLogTime(entry.timestamp);

  const message = document.createElement("span");
  message.className = "sync-log-message";
  message.textContent = entry.filePath ? `${entry.filePath} · ${entry.message}` : entry.message;

  row.appendChild(time);
  row.appendChild(message);
  elements.syncLog.appendChild(row);
  syncLogCount += 1;

  while (elements.syncLog.children.length > MAX_SYNC_LOG_ROWS && elements.syncLog.firstChild) {
    elements.syncLog.removeChild(elements.syncLog.firstChild);
    syncLogEntries.shift();
    syncLogCount -= 1;
  }

  elements.syncLog.scrollTop = elements.syncLog.scrollHeight;
}

function isStaleSyncLogEntry(entry: SyncLogEntry): boolean {
  if (syncLogClearedAt === 0) {
    return false;
  }

  const entryTime = Date.parse(entry.timestamp);

  return Number.isFinite(entryTime) && entryTime < syncLogClearedAt;
}

function renderEmptySyncLog(): void {
  const empty = document.createElement("div");
  empty.className = "sync-log-empty";
  empty.textContent = "点击“同步到 GitHub”后，这里会显示读取、合并和上传日志。";
  elements.syncLog.appendChild(empty);
}

function formatSyncLogEntries(entries: SyncLogEntry[]): string {
  return entries
    .map((entry) => {
      const prefix = `[${formatLogTime(entry.timestamp)}] [${entry.level}]`;
      const filePrefix = entry.filePath ? `${entry.filePath} · ` : "";
      return `${prefix} ${filePrefix}${entry.message}`;
    })
    .join("\n");
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  return copyTextWithTextarea(text);
}

function copyTextWithTextarea(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.padding = "0";
  textarea.style.border = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

function formatLogTime(timestamp: string): string {
  if (timestamp.length >= 19) {
    return timestamp.slice(11, 19);
  }

  return "--:--:--";
}

function postToPlugin(message: unknown): void {
  parent.postMessage({ pluginMessage: message }, "*");
}

function getElement(id: string): HTMLElement {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing element: ${id}`);
  }

  return element;
}

function getInput<T extends HTMLElement>(id: string): T {
  return getElement(id) as T;
}
