export type ExportFormat = "css" | "md" | "design-system";
export type VariableResolvedType = "BOOLEAN" | "COLOR" | "FLOAT" | "STRING";

export interface SerializedMode {
  modeId: string;
  name: string;
  isDefault: boolean;
}

export interface SerializedCollection {
  id: string;
  name: string;
  defaultModeId: string;
  modes: SerializedMode[];
}

export type SerializedVariableValue =
  | {
      kind: "rgba";
      r: number;
      g: number;
      b: number;
      a: number;
    }
  | {
      kind: "number";
      value: number;
    }
  | {
      kind: "string";
      value: string;
    }
  | {
      kind: "boolean";
      value: boolean;
    }
  | {
      kind: "alias";
      id: string;
    }
  | {
      kind: "unsupported";
    };

export interface SerializedVariable {
  id: string;
  key: string;
  name: string;
  description: string;
  collectionId: string;
  resolvedType: VariableResolvedType;
  hiddenFromPublishing: boolean;
  scopes: string[];
  valuesByMode: Record<string, SerializedVariableValue>;
}

export interface TokenSnapshot {
  fileName: string;
  generatedAt: string;
  collections: SerializedCollection[];
  variables: SerializedVariable[];
}

export interface StoredSettings {
  repoOwner: string;
  repoName: string;
  branch: string;
  filePath: string;
  cssFilePath: string;
  flutterFilePath: string;
  format: ExportFormat;
  collectionId: string;
  namePrefix: string;
  themeId: string;
  selectedThemeIds: string[];
  lightModeName: string;
  darkModeName: string;
  includeTokenEntries: boolean;
  includeCssTheme: boolean;
  includeFlutterTheme: boolean;
  componentTokenPrefixes: string;
  commitMessage: string;
}

export type SyncMergeStrategy = "overwrite";

export interface SyncFileRequest {
  path: string;
  content: string;
  label: string;
  mergeStrategy: SyncMergeStrategy;
}

export interface SyncRequest {
  settings: StoredSettings;
  githubToken: string;
  files: SyncFileRequest[];
}

export type SyncLogLevel = "info" | "success" | "warning" | "error";

export interface SyncLogEntry {
  level: SyncLogLevel;
  message: string;
  filePath?: string;
  timestamp: string;
}

export interface SyncSuccess {
  ok: true;
  fileUrl: string;
  fileUrls: Array<{
    path: string;
    url: string;
  }>;
}

export interface SyncFailure {
  ok: false;
  error: string;
}

export type SyncResult = SyncSuccess | SyncFailure;

export interface ExportArtifact {
  content: string;
  warnings: string[];
  tokenCount: number;
  collectionCount: number;
  modeCount: number;
}

export const STORAGE_KEY = "figma-token-sync-settings-v1";
export const GITHUB_TOKEN_STORAGE_KEY = "figma-token-sync-github-token-v1";
export const ALL_COLLECTIONS = "__all__";
export const ALL_THEMES = "__all_themes__";
export const DEFAULT_COMPONENT_TOKEN_PREFIXES = [
  "action_sheet",
  "avatar",
  "backtop",
  "badge",
  "button",
  "calendar",
  "cascader",
  "cell",
  "checkbox",
  "collapse",
  "dialog",
  "divider",
  "drawer",
  "dropdown_menu",
  "empty",
  "fab",
  "footer",
  "form",
  "icon",
  "image",
  "image_viewer",
  "indexes",
  "input",
  "link",
  "loading",
  "message",
  "navbar",
  "notice_bar",
  "picker",
  "popover",
  "popup",
  "progress",
  "radio",
  "rate",
  "refresh",
  "result",
  "search",
  "sidebar",
  "skeleton",
  "slider",
  "stepper",
  "steps",
  "swipe_cell",
  "swiper",
  "switch",
  "tabbar",
  "table",
  "tabs",
  "tag",
  "text",
  "textarea",
  "time_counter",
  "toast",
  "tree",
  "upload",
].join(", ");

export function defaultFilePath(format: ExportFormat): string {
  if (format === "design-system") {
    return "docs/design-system/tokens.md";
  }

  return format === "md" ? "docs/design-system/tokens.md" : defaultCssFilePath();
}

export function defaultCssFilePath(): string {
  return "packages/theme-generator/src/common/themes/tokens/theme.css";
}

export function defaultFlutterFilePath(themeId: string): string {
  void themeId;
  return "packages/flutter/rdesign_component/lib/src/theme/tokens/rdesign_theme_tokens.dart";
}

export const DEFAULT_SETTINGS: StoredSettings = {
  repoOwner: "663548110",
  repoName: "hl-scene-design-system",
  branch: "main",
  filePath: defaultFilePath("design-system"),
  cssFilePath: defaultCssFilePath(),
  flutterFilePath: defaultFlutterFilePath("default"),
  format: "design-system",
  collectionId: ALL_COLLECTIONS,
  namePrefix: "rd",
  themeId: "default",
  selectedThemeIds: [ALL_THEMES],
  lightModeName: "",
  darkModeName: "",
  includeTokenEntries: false,
  includeCssTheme: true,
  includeFlutterTheme: true,
  componentTokenPrefixes: DEFAULT_COMPONENT_TOKEN_PREFIXES,
  commitMessage: "chore(tokens): sync figma design tokens",
};

export function normalizeSettings(
  maybeSettings?: Partial<StoredSettings> | null,
  sourceName?: string,
): StoredSettings {
  void sourceName;
  const format = DEFAULT_SETTINGS.format;
  const themeId = DEFAULT_SETTINGS.themeId;

  return {
    repoOwner: DEFAULT_SETTINGS.repoOwner,
    repoName: DEFAULT_SETTINGS.repoName,
    branch: DEFAULT_SETTINGS.branch,
    filePath: defaultFilePath(format),
    cssFilePath: DEFAULT_SETTINGS.cssFilePath,
    flutterFilePath: defaultFlutterFilePath(themeId),
    format,
    collectionId: DEFAULT_SETTINGS.collectionId,
    namePrefix: DEFAULT_SETTINGS.namePrefix,
    themeId,
    selectedThemeIds: normalizeStringArray(maybeSettings?.selectedThemeIds, DEFAULT_SETTINGS.selectedThemeIds),
    lightModeName: DEFAULT_SETTINGS.lightModeName,
    darkModeName: DEFAULT_SETTINGS.darkModeName,
    includeTokenEntries: false,
    includeCssTheme: true,
    includeFlutterTheme: true,
    componentTokenPrefixes: DEFAULT_SETTINGS.componentTokenPrefixes,
    commitMessage: DEFAULT_SETTINGS.commitMessage,
  };
}

function normalizeStringArray(value: string[] | undefined, fallback: string[]): string[] {
  if (!Array.isArray(value)) {
    return [...fallback];
  }

  const normalized: string[] = [];

  for (const item of value) {
    if (typeof item !== "string") {
      continue;
    }

    const trimmed = normalizeThemeId(item.trim());

    if (trimmed && normalized.indexOf(trimmed) === -1) {
      normalized.push(trimmed);
    }
  }

  return normalized;
}

function normalizeThemeId(value: string): string {
  return value === "2_0_flutter" ? "default" : value;
}
