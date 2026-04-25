import {
  ALL_THEMES,
  defaultCssFilePath,
  defaultFlutterFilePath,
  type ExportArtifact,
  type StoredSettings,
  type SyncFileRequest,
  type TokenSnapshot,
} from "./types";
import {
  REQUIRED_TDESIGN_COLOR_KEYS,
  buildTokenModel,
  compareTokens,
  toPascalCase,
  type NormalizedModeValue,
  type NormalizedToken,
  type TokenModel,
} from "./token-model";

export interface ArtifactFileSummary {
  path: string;
  label: string;
  tokenCount: number;
  warnings: string[];
}

export interface FlutterThemeSummary {
  themeId: string;
  lightModeNames: string[];
  darkModeNames: string[];
  selected: boolean;
  previewColor: string | null;
}

export interface MultiArtifactBundle extends ExportArtifact {
  files: SyncFileRequest[];
  fileSummaries: ArtifactFileSummary[];
  flutterThemes: FlutterThemeSummary[];
  specTokenCount: number;
  fullTokenCount: number;
  componentTokenCount: number;
}

interface RenderedFile {
  request: SyncFileRequest;
  summary: ArtifactFileSummary;
}

interface RenderResult {
  content: string;
  tokenCount: number;
  warnings: string[];
}

interface RenderedThemeFile {
  path: string;
  label: string;
  content: string;
  tokenCount: number;
  warnings: string[];
}

interface ThemeFileResult {
  files: RenderedThemeFile[];
  warnings: string[];
}

interface FlutterThemeSpec {
  themeId: string;
  lightModeIds: string[];
  darkModeIds: string[];
  lightModeNames: string[];
  darkModeNames: string[];
}

interface FlutterShadowLayer {
  color: string;
  blurRadius: number;
  spreadRadius: number;
  offset: {
    x: number;
    y: number;
  };
}

interface FlutterThemeSections {
  color: Record<string, string>;
  radius: Record<string, number>;
  margin: Record<string, number>;
  shadow: Record<string, FlutterShadowLayer[]>;
}

const THEME_PREVIEW_COLOR_KEYS = [
  "brandNormalColor",
  "brandColor7",
  "brandColor6",
  "brandColor5",
  "brandColor1",
  "brandLightColor",
];

export function generateMultiArtifacts(snapshot: TokenSnapshot, settings: StoredSettings): MultiArtifactBundle {
  const model = buildTokenModel(snapshot, settings);
  const renderedFiles: RenderedFile[] = [];
  const warnings = [...model.warnings];
  const rows = [...model.globalTokens].sort(compareTokens);
  const themeSpecs = buildThemeSpecs(model, rows);
  const flutterThemes = themeSpecs.map((spec) => ({
    themeId: spec.themeId,
    lightModeNames: spec.lightModeNames,
    darkModeNames: spec.darkModeNames,
    selected: isFlutterThemeSelected(model.settings, spec.themeId),
    previewColor: getThemePreviewColor(rows, spec),
  }));

  if (settings.includeCssTheme) {
    const cssResult = renderCssThemeFiles(model, rows, themeSpecs);
    warnings.push(...cssResult.warnings);

    for (const cssFile of cssResult.files) {
      addRenderedFile(renderedFiles, {
        path: cssFile.path,
        label: cssFile.label,
        content: cssFile.content,
        mergeStrategy: "overwrite",
        tokenCount: cssFile.tokenCount,
        warnings: cssFile.warnings,
      });
    }
  }

  if (settings.includeFlutterTheme) {
    const flutterResult = renderFlutterThemeDartFiles(model, rows, themeSpecs);
    warnings.push(...flutterResult.warnings);

    for (const flutterFile of flutterResult.files) {
      addRenderedFile(renderedFiles, {
        path: flutterFile.path,
        label: flutterFile.label,
        content: flutterFile.content,
        mergeStrategy: "overwrite",
        tokenCount: flutterFile.tokenCount,
        warnings: flutterFile.warnings,
      });
    }
  }

  if (renderedFiles.length === 0) {
    warnings.push("未选择任何同步产物。");
  }

  const files = renderedFiles.map((file) => file.request);
  const fileSummaries = renderedFiles.map((file) => file.summary);
  const previewContent = renderPreview(model, files, fileSummaries, warnings);

  return {
    content: previewContent,
    warnings,
    tokenCount: model.globalTokens.length,
    specTokenCount: model.globalTokens.length,
    fullTokenCount: model.snapshot.variables.length,
    componentTokenCount: model.componentTokens.length,
    collectionCount: model.selectedCollections.length,
    modeCount: countModes(model),
    files,
    fileSummaries,
    flutterThemes,
  };
}

function addRenderedFile(
  files: RenderedFile[],
  file: SyncFileRequest & { tokenCount: number; warnings: string[] },
): void {
  files.push({
    request: {
      path: file.path,
      label: file.label,
      content: file.content,
      mergeStrategy: file.mergeStrategy,
    },
    summary: {
      path: file.path,
      label: file.label,
      tokenCount: file.tokenCount,
      warnings: file.warnings,
    },
  });
}

function renderCssThemeFiles(
  model: TokenModel,
  rows: NormalizedToken[],
  allThemeSpecs: FlutterThemeSpec[],
): ThemeFileResult {
  const warnings: string[] = [];
  const themeSpecs = allThemeSpecs.filter((spec) => isFlutterThemeSelected(model.settings, spec.themeId));
  const files: RenderedThemeFile[] = [];

  if (allThemeSpecs.length === 0) {
    warnings.push("CSS 主题未识别到可导出的 light/dark mode。");
  } else if (themeSpecs.length === 0) {
    warnings.push("CSS 主题未选择任何主题，将不会输出主题 CSS。");
  }

  for (let index = 0; index < themeSpecs.length; index += 1) {
    const themeWarnings: string[] = [];
    const themeSpec = themeSpecs[index];
    const themeResult = renderSingleCssTheme(model, rows, themeSpec, themeWarnings);

    warnings.push(...themeWarnings);
    files.push({
      path: cssThemeTokenFilePath(model.settings.cssFilePath, themeSpec.themeId),
      label: `CSS ${themeSpec.themeId} 主题文件`,
      content: themeResult.content,
      tokenCount: themeResult.tokenCount,
      warnings: themeWarnings,
    });
  }

  if (themeSpecs.length > 0) {
    files.push({
      path: cssThemeEntryFilePath(model.settings.cssFilePath),
      label: "CSS 主题入口文件",
      content: renderCssThemeEntry(model, themeSpecs),
      tokenCount: themeSpecs.length,
      warnings: [],
    });
  }

  return {
    files,
    warnings,
  };
}

function renderSingleCssTheme(
  model: TokenModel,
  rows: NormalizedToken[],
  themeSpec: FlutterThemeSpec,
  warnings: string[],
): RenderResult {
  const lightRows: Array<{ token: NormalizedToken; value: NormalizedModeValue }> = [];
  const darkRows: Array<{ token: NormalizedToken; value: NormalizedModeValue }> = [];

  for (const token of rows) {
    const lightValue = pickThemeModeValue(token, themeSpec.lightModeIds) ?? token.lightValue;
    const darkValue = pickThemeModeValue(token, themeSpec.darkModeIds) ?? token.darkValue ?? (token.category === "color" ? null : lightValue);

    if (lightValue?.formatted.cssValue) {
      lightRows.push({ token, value: lightValue });
    }

    if (darkValue?.formatted.cssValue) {
      darkRows.push({ token, value: darkValue });
    }
  }

  if (darkRows.length === 0) {
    warnings.push(`CSS ${themeSpec.themeId} 主题未找到 dark mode token，只生成 light/default CSS 变量。`);
  }

  return {
    content: renderCssThemeBlock(model, themeSpec.themeId, lightRows, darkRows),
    tokenCount: lightRows.length + darkRows.length,
    warnings,
  };
}

function renderCssThemeBlock(
  model: TokenModel,
  themeId: string,
  lightRows: Array<{ token: NormalizedToken; value: NormalizedModeValue }>,
  darkRows: Array<{ token: NormalizedToken; value: NormalizedModeValue }>,
): string {
  const isDefaultTheme = themeId === model.settings.themeId;
  const lines: string[] = [
    "/*",
    " * Generated by Figma Token Sync.",
    ` * Theme: ${themeId}`,
    ` * Source file: ${model.snapshot.fileName}`,
    ` * Generated at: ${model.snapshot.generatedAt}`,
    " */",
    "",
    `${buildCssThemeSelectors(themeId, "light", isDefaultTheme).join(",\n")} {`,
  ];

  for (const row of lightRows) {
    lines.push(`  ${row.token.cssVarName}: ${row.value.formatted.cssValue};`);
  }

  lines.push("}");

  if (darkRows.length > 0) {
    lines.push("", `${buildCssThemeSelectors(themeId, "dark", isDefaultTheme).join(",\n")} {`);
    for (const row of darkRows) {
      lines.push(`  ${row.token.cssVarName}: ${row.value.formatted.cssValue};`);
    }
    lines.push("}");
  }

  return `${lines.join("\n")}\n`;
}

function renderFlutterThemeDartFiles(
  model: TokenModel,
  rows: NormalizedToken[],
  allThemeSpecs: FlutterThemeSpec[],
): ThemeFileResult {
  const warnings: string[] = [];
  const themeSpecs = allThemeSpecs.filter((spec) => isFlutterThemeSelected(model.settings, spec.themeId));
  const files: RenderedThemeFile[] = [];

  if (allThemeSpecs.length === 0) {
    warnings.push("Flutter 主题未识别到可导出的 light/dark mode。");
  } else if (themeSpecs.length === 0) {
    warnings.push("Flutter 主题未选择任何主题，将不会输出主题 JSON。");
  }

  for (let index = 0; index < themeSpecs.length; index += 1) {
    const themeWarnings: string[] = [];
    const themeSpec = themeSpecs[index];
    const themeResult = renderSingleFlutterThemeDart(model, rows, themeSpec, themeWarnings);

    warnings.push(...themeWarnings);
    files.push({
      path: flutterThemeTokenFilePath(model.settings.flutterFilePath, themeSpec.themeId),
      label: `Flutter RDesign ${themeSpec.themeId} 主题 Dart`,
      content: `${themeResult.content}\n`,
      tokenCount: themeResult.tokenCount,
      warnings: themeWarnings,
    });
  }

  if (themeSpecs.length > 0) {
    files.push({
      path: flutterThemeEntryFilePath(model.settings.flutterFilePath),
      label: "Flutter RDesign 主题入口 Dart",
      content: renderFlutterThemeEntryDart(model, themeSpecs),
      tokenCount: themeSpecs.length,
      warnings: [],
    });
  }

  return {
    files,
    warnings,
  };
}

function renderPreview(
  model: TokenModel,
  files: SyncFileRequest[],
  summaries: ArtifactFileSummary[],
  warnings: string[],
): string {
  const lines: string[] = [
    "# Figma Token Sync Preview",
    "",
    `- Theme ID: ${model.settings.themeId}`,
    `- Source file: ${model.snapshot.fileName}`,
    `- Global tokens: ${model.globalTokens.length}`,
    `- Component-level tokens excluded from global outputs: ${model.componentTokens.length}`,
    `- Files: ${files.length}`,
  ];
  const selectedThemeIds = buildThemeSpecs(model, [...model.globalTokens].sort(compareTokens))
    .filter((spec) => isFlutterThemeSelected(model.settings, spec.themeId))
    .map((spec) => spec.themeId);

  if (selectedThemeIds.length > 0) {
    lines.push(`- Selected Flutter themes: ${selectedThemeIds.join(", ")}`);
  }

  if (warnings.length > 0) {
    lines.push("", "## Warnings", "");
    for (const warning of warnings) {
      lines.push(`- ${warning}`);
    }
  }

  lines.push("", "## Files", "");
  for (const summary of summaries) {
    lines.push(`- ${summary.path} (${summary.label}, ${summary.tokenCount} tokens)`);
  }

  for (const file of files) {
    lines.push("", `## ${file.path}`, "", "```", trimRightCompat(file.content.slice(0, 6000)));
    if (file.content.length > 6000) {
      lines.push("...");
    }
    lines.push("```");
  }

  return `${lines.join("\n")}\n`;
}

function buildThemeSpecs(model: TokenModel, rows: NormalizedToken[]): FlutterThemeSpec[] {
  const specs: FlutterThemeSpec[] = [];
  const specByThemeId = new Map<string, FlutterThemeSpec>();
  const seenModeIds = new Set<string>();

  for (const token of rows) {
    if (token.category !== "color") {
      continue;
    }

    for (const modeValue of token.valuesByMode) {
      if (seenModeIds.has(modeValue.modeId)) {
        continue;
      }

      seenModeIds.add(modeValue.modeId);

      const parsed = parseFlutterThemeModeName(modeValue, model.settings.themeId || "rdesign");

      if (!parsed) {
        continue;
      }

      let spec = specByThemeId.get(parsed.themeId);

      if (!spec) {
        spec = {
          themeId: parsed.themeId,
          lightModeIds: [],
          darkModeIds: [],
          lightModeNames: [],
          darkModeNames: [],
        };
        specByThemeId.set(parsed.themeId, spec);
        specs.push(spec);
      }

      const ids = parsed.role === "light" ? spec.lightModeIds : spec.darkModeIds;

      if (ids.indexOf(modeValue.modeId) === -1) {
        ids.push(modeValue.modeId);
      }

      const names = parsed.role === "light" ? spec.lightModeNames : spec.darkModeNames;

      if (names.indexOf(modeValue.modeName) === -1) {
        names.push(modeValue.modeName);
      }
    }
  }

  return specs.filter((spec) => spec.lightModeIds.length > 0 || spec.darkModeIds.length > 0);
}

function isFlutterThemeSelected(settings: StoredSettings, themeId: string): boolean {
  const selectedThemeIds = settings.selectedThemeIds;

  if (selectedThemeIds.indexOf(ALL_THEMES) !== -1) {
    return true;
  }

  return selectedThemeIds.indexOf(themeId) !== -1;
}

function getThemePreviewColor(rows: NormalizedToken[], themeSpec: FlutterThemeSpec): string | null {
  for (const colorKey of THEME_PREVIEW_COLOR_KEYS) {
    for (const token of rows) {
      if (token.category !== "color" || token.tdesignThemeKey !== colorKey) {
        continue;
      }

      const modeValue =
        pickThemeModeValue(token, themeSpec.lightModeIds) ||
        pickThemeModeValue(token, themeSpec.darkModeIds) ||
        token.lightValue ||
        token.defaultValue;
      const color = modeValue ? normalizePreviewColor(modeValue.formatted.cssValue || modeValue.formatted.value) : null;

      if (color) {
        return color;
      }
    }
  }

  return null;
}

function normalizePreviewColor(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (/^#[0-9a-f]{3,8}$/i.test(trimmed) || /^rgba?\(/i.test(trimmed)) {
    return trimmed;
  }

  return null;
}

function parseFlutterThemeModeName(
  modeValue: NormalizedModeValue,
  defaultThemeId: string,
): { themeId: string; role: "light" | "dark" } | null {
  const role = inferThemeModeRole(modeValue);

  if (!role) {
    return null;
  }

  const baseName = stripThemeModeRole(modeValue.modeName, role);
  const themeId = themeIdFromModeBase(baseName, defaultThemeId);

  return {
    themeId,
    role,
  };
}

function inferThemeModeRole(modeValue: NormalizedModeValue): "light" | "dark" | null {
  const lower = modeValue.modeName.toLowerCase();
  const words: string[] = lower.match(/[a-z0-9]+/g) || [];

  if (
    words.indexOf("dark") !== -1 ||
    lower.indexOf("暗色") !== -1 ||
    lower.indexOf("深色") !== -1 ||
    lower.indexOf("黑色") !== -1
  ) {
    return "dark";
  }

  if (
    words.indexOf("light") !== -1 ||
    words.indexOf("default") !== -1 ||
    lower.indexOf("亮色") !== -1 ||
    lower.indexOf("浅色") !== -1 ||
    lower.indexOf("默认") !== -1
  ) {
    return "light";
  }

  return modeValue.modeRole === "light" || modeValue.modeRole === "dark" ? modeValue.modeRole : null;
}

function stripThemeModeRole(modeName: string, role: "light" | "dark"): string {
  let value = modeName;

  if (role === "light") {
    value = value
      .replace(/\b(light|default)\b/gi, " ")
      .replace(/亮色|浅色|默认/g, " ");
  } else {
    value = value
      .replace(/\bdark\b/gi, " ")
      .replace(/暗色|深色|黑色/g, " ");
  }

  return value.replace(/[\/_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function themeIdFromModeBase(baseName: string, defaultThemeId: string): string {
  const normalizedBase = baseName.toLowerCase();

  if (!normalizedBase || normalizedBase === "default" || normalizedBase === "默认") {
    return defaultThemeId || "rdesign";
  }

  const matches = normalizedBase.match(/[a-z0-9]+/g) ?? [];
  return matches.join("_") || defaultThemeId || "rdesign";
}

function cssThemeEntryFilePath(pathValue: string): string {
  const value = pathValue || defaultCssFilePath();

  if (isCssFilePath(value)) {
    return value;
  }

  return `${trimSlashes(value)}/theme.css`;
}

function cssThemeTokenFilePath(pathValue: string, themeId: string): string {
  const entryPath = cssThemeEntryFilePath(pathValue);
  const slashIndex = entryPath.lastIndexOf("/");
  const directory = slashIndex >= 0 ? entryPath.slice(0, slashIndex) : "";
  const prefix = directory ? `${directory}/` : "";

  return `${prefix}themes/${themeIdToFileSlug(themeId)}.css`;
}

function renderCssThemeEntry(model: TokenModel, themeSpecs: FlutterThemeSpec[]): string {
  const entryPath = cssThemeEntryFilePath(model.settings.cssFilePath);
  const entryDirectory = entryPath.lastIndexOf("/") >= 0 ? entryPath.slice(0, entryPath.lastIndexOf("/")) : "";
  const lines = [
    "/*",
    " * Generated by Figma Token Sync.",
    ` * Source file: ${model.snapshot.fileName}`,
    ` * Generated at: ${model.snapshot.generatedAt}`,
    " */",
    "",
  ];

  for (const themeSpec of themeSpecs) {
    lines.push(`@import "${relativeCssImportPath(entryDirectory, cssThemeTokenFilePath(model.settings.cssFilePath, themeSpec.themeId))}";`);
  }

  return `${lines.join("\n")}\n`;
}

function buildCssThemeSelectors(themeId: string, mode: "light" | "dark", isDefaultTheme: boolean): string[] {
  const escapedThemeId = escapeCssAttributeValue(themeId);
  const themeAttributes = ["theme-id", "data-theme", "theme"];
  const selectors: string[] = [];

  if (mode === "light") {
    if (isDefaultTheme) {
      selectors.push(":root", ':root[theme-mode="light"]');
    }

    for (const attributeName of themeAttributes) {
      selectors.push(
        `:root[${attributeName}="${escapedThemeId}"]`,
        `:root[${attributeName}="${escapedThemeId}"][theme-mode="light"]`,
      );
    }
  } else {
    if (isDefaultTheme) {
      selectors.push(":root.dark", ':root[theme-mode="dark"]');
    }

    for (const attributeName of themeAttributes) {
      selectors.push(
        `:root[${attributeName}="${escapedThemeId}"].dark`,
        `:root[${attributeName}="${escapedThemeId}"][theme-mode="dark"]`,
      );
    }
  }

  return selectors;
}

function isCssFilePath(pathValue: string): boolean {
  return /\.css$/i.test(pathValue);
}

function relativeCssImportPath(fromDirectory: string, toPath: string): string {
  if (fromDirectory && toPath.indexOf(`${fromDirectory}/`) === 0) {
    return `./${toPath.slice(fromDirectory.length + 1)}`;
  }

  if (toPath.charAt(0) !== "." && toPath.charAt(0) !== "/") {
    return `./${toPath}`;
  }

  return toPath;
}

function escapeCssAttributeValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function flutterThemeEntryFilePath(pathValue: string): string {
  const value = pathValue || defaultFlutterFilePath("default");

  if (isDartFilePath(value)) {
    return value;
  }

  return `${trimSlashes(value)}/rdesign_theme_tokens.dart`;
}

function flutterThemeTokenFilePath(pathValue: string, themeId: string): string {
  const entryPath = flutterThemeEntryFilePath(pathValue);
  const slashIndex = entryPath.lastIndexOf("/");
  const directory = slashIndex >= 0 ? entryPath.slice(0, slashIndex) : "";
  const prefix = directory ? `${directory}/` : "";

  return `${prefix}${themeIdToFileSlug(themeId)}_tokens.dart`;
}

function isDartFilePath(pathValue: string): boolean {
  return /\.dart$/i.test(pathValue);
}

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

function themeIdToFileSlug(themeId: string): string {
  const matches = themeId.toLowerCase().match(/[a-z0-9]+/g) || [];
  return matches.join("_") || "default";
}

function renderFlutterThemeEntryDart(model: TokenModel, themeSpecs: FlutterThemeSpec[]): string {
  const entryPath = flutterThemeEntryFilePath(model.settings.flutterFilePath);
  const entryDirectory = entryPath.lastIndexOf("/") >= 0 ? entryPath.slice(0, entryPath.lastIndexOf("/")) : "";
  const imports = themeSpecs.map(
    (themeSpec) => relativeDartImportPath(entryDirectory, flutterThemeTokenFilePath(model.settings.flutterFilePath, themeSpec.themeId)),
  );
  const lines = [
    "// Generated by Figma Token Sync.",
    `// Source file: ${model.snapshot.fileName}`,
    `// Generated at: ${model.snapshot.generatedAt}`,
    "",
  ];

  for (const importPath of imports) {
    lines.push(`import '${importPath}';`);
  }

  lines.push("");

  for (const importPath of imports) {
    lines.push(`export '${importPath}';`);
  }

  lines.push(
    "",
    "class RDThemeTokenSpec {",
    "  const RDThemeTokenSpec({",
    "    required this.id,",
    "    required this.darkId,",
    "    required this.lightJson,",
    "    required this.darkJson,",
    "  });",
    "",
    "  final String id;",
    "  final String darkId;",
    "  final String lightJson;",
    "  final String darkJson;",
    "}",
    "",
    "const List<RDThemeTokenSpec> rdThemeTokenSpecs = [",
  );

  for (const themeSpec of themeSpecs) {
    const dartPrefix = `rd${toPascalCase([themeSpec.themeId])}`;
    lines.push(
      "  RDThemeTokenSpec(",
      `    id: '${escapeDartSingleQuotedString(themeSpec.themeId)}',`,
      `    darkId: '${escapeDartSingleQuotedString(`${themeSpec.themeId}Dark`)}',`,
      `    lightJson: ${dartPrefix}LightJson,`,
      `    darkJson: ${dartPrefix}DarkJson,`,
      "  ),",
    );
  }

  lines.push("];");

  return `${lines.join("\n")}\n`;
}

function relativeDartImportPath(fromDirectory: string, toPath: string): string {
  if (fromDirectory && toPath.indexOf(`${fromDirectory}/`) === 0) {
    return toPath.slice(fromDirectory.length + 1);
  }

  return toPath;
}

function renderSingleFlutterThemeDart(
  model: TokenModel,
  rows: NormalizedToken[],
  themeSpec: FlutterThemeSpec,
  warnings: string[],
): { content: string; tokenCount: number } {
  const lightSections = createEmptyFlutterThemeSections();
  const darkSections = createEmptyFlutterThemeSections();
  let mappedTokenCount = 0;

  for (const token of rows) {
    const lightValue = pickThemeModeValue(token, themeSpec.lightModeIds) ?? token.lightValue;
    const darkValue = pickThemeModeValue(token, themeSpec.darkModeIds) ?? token.darkValue ?? (token.category === "color" ? null : lightValue);

    mappedTokenCount += addFlutterThemeToken(
      token,
      lightValue,
      lightSections,
      warnings,
      `${themeSpec.themeId} light`,
    );
    mappedTokenCount += addFlutterThemeToken(
      token,
      darkValue,
      darkSections,
      warnings,
      `${themeSpec.themeId} dark`,
    );
  }

  appendMissingFlutterWarnings(`${themeSpec.themeId} light`, lightSections.color, warnings);
  appendMissingFlutterWarnings(`${themeSpec.themeId} dark`, darkSections.color, warnings);

  return {
    content: renderFlutterThemeDartBlock(model, themeSpec.themeId, lightSections, darkSections),
    tokenCount: mappedTokenCount,
  };
}

function pickThemeModeValue(token: NormalizedToken, modeIds: string[]): NormalizedModeValue | null {
  for (const modeId of modeIds) {
    const value = token.valuesByMode.find((modeValue) => modeValue.modeId === modeId);

    if (value) {
      return value;
    }
  }

  return null;
}

function createEmptyFlutterThemeSections(): FlutterThemeSections {
  return {
    color: {},
    radius: {},
    margin: {},
    shadow: {},
  };
}

function addFlutterThemeToken(
  token: NormalizedToken,
  modeValue: NormalizedModeValue | null,
  sections: FlutterThemeSections,
  warnings: string[],
  modeLabel: string,
): number {
  if (!modeValue) {
    return 0;
  }

  if (token.category === "color" && token.tdesignThemeKey) {
    if (typeof modeValue.formatted.value !== "string" || !modeValue.formatted.value) {
      return 0;
    }

    if (sections.color[token.tdesignThemeKey]) {
      warnings.push(`Flutter ${modeLabel} 主题 key ${token.tdesignThemeKey} 被多个 Figma token 命中，保留后命中的 ${token.semanticName}。`);
    }
    sections.color[token.tdesignThemeKey] = modeValue.formatted.value;
    return 1;
  }

  if (token.category === "radius") {
    const radiusKey = inferFlutterRadiusKey(token);
    const radiusValue = numberFromModeValue(modeValue);

    if (!radiusKey || radiusValue === null) {
      warnings.push(`Flutter ${modeLabel} 圆角 token ${token.semanticName} 无法映射到 TDesign radius key，已跳过。`);
      return 0;
    }

    if (typeof sections.radius[radiusKey] === "number") {
      warnings.push(`Flutter ${modeLabel} 主题 key ${radiusKey} 被多个 Figma token 命中，保留后命中的 ${token.semanticName}。`);
    }
    sections.radius[radiusKey] = radiusValue;
    return 1;
  }

  if (token.category === "spacing") {
    const spacerValue = numberFromModeValue(modeValue);
    const spacerKey = spacerValue === null ? null : inferFlutterSpacerKey(token, spacerValue);

    if (!spacerKey || spacerValue === null) {
      warnings.push(`Flutter ${modeLabel} 间距 token ${token.semanticName} 无法映射到 TDesign spacer key，已跳过。`);
      return 0;
    }

    if (typeof sections.margin[spacerKey] === "number") {
      warnings.push(`Flutter ${modeLabel} 主题 key ${spacerKey} 被多个 Figma token 命中，保留后命中的 ${token.semanticName}。`);
    }
    sections.margin[spacerKey] = spacerValue;
    return 1;
  }

  if (token.category === "shadow") {
    const shadowKey = inferFlutterShadowKey(token);
    const shadowValue = parseFlutterShadowValue(modeValue.formatted.value);

    if (!shadowKey || !shadowValue) {
      warnings.push(`Flutter ${modeLabel} 阴影 token ${token.semanticName} 无法解析为 TDesign shadow 结构，已跳过。`);
      return 0;
    }

    if (sections.shadow[shadowKey]) {
      warnings.push(`Flutter ${modeLabel} 主题 key ${shadowKey} 被多个 Figma token 命中，保留后命中的 ${token.semanticName}。`);
    }
    sections.shadow[shadowKey] = shadowValue;
    return 1;
  }

  return 0;
}

function renderFlutterThemeDartBlock(
  model: TokenModel,
  themeId: string,
  lightSections: FlutterThemeSections,
  darkSections: FlutterThemeSections,
): string {
  const darkThemeId = `${themeId}Dark`;
  const dartPrefix = `rd${toPascalCase([themeId])}`;
  const lightJson = renderFlutterThemeJson(themeId, lightSections);
  const darkJson = renderFlutterThemeJson(darkThemeId, darkSections);
  const generatedDate = model.snapshot.generatedAt.slice(0, 10);
  const brandNormalColor = normalizeFlutterColorValue(lightSections.color.brandNormalColor || lightSections.color.brandColor7 || "未提供");
  const brandColor7 = normalizeFlutterColorValue(lightSections.color.brandColor7 || "");
  const brandSourceKey = brandColor7 === brandNormalColor ? "brandColor7" : "brandNormalColor";
  const lines = [
    `// 品牌主色：${brandNormalColor}（${themeId}，对应 ${themeColorKeyToCssVar(model.settings.namePrefix, brandSourceKey)}）`,
    `// 色值来源：${model.snapshot.fileName}，由 Figma Token Sync 生成`,
    `// 最后更新：${generatedDate}`,
    "",
    `/// ${themeId} light 模式完整色值 JSON`,
    "///",
    '/// 包含品牌色、功能色、中性色、语义色，与 CSS 文件 :root[theme-mode="light"] 完全对应。',
    `const String ${dartPrefix}LightJson = r'''`,
    lightJson,
    "''';",
    "",
    `/// ${themeId} dark 模式完整色值 JSON`,
    "///",
    '/// 与 CSS 文件 :root[theme-mode="dark"] 完全对应。',
    `const String ${dartPrefix}DarkJson = r'''`,
    darkJson,
    "''';",
  ];

  return lines.join("\n");
}

function inferFlutterRadiusKey(token: NormalizedToken): string | null {
  const segments = token.tokenSegments;
  const compact = segments.join("");

  if (compact.indexOf("extralarge") !== -1 || containsAllParts(segments, ["extra", "large"])) {
    return "radiusExtraLarge";
  }

  if (segments.indexOf("small") !== -1 || segments.indexOf("s") !== -1) {
    return "radiusSmall";
  }

  if (segments.indexOf("default") !== -1 || segments.indexOf("medium") !== -1 || segments.indexOf("m") !== -1) {
    return "radiusDefault";
  }

  if (segments.indexOf("large") !== -1 || segments.indexOf("l") !== -1) {
    return "radiusLarge";
  }

  if (segments.indexOf("round") !== -1 || segments.indexOf("pill") !== -1) {
    return "radiusRound";
  }

  if (segments.indexOf("circle") !== -1) {
    return "radiusCircle";
  }

  return null;
}

function inferFlutterSpacerKey(token: NormalizedToken, value: number): string | null {
  if (!isFiniteNumber(value)) {
    return null;
  }

  return `spacer${numberToTokenKeyPart(value)}`;
}

function inferFlutterShadowKey(token: NormalizedToken): string | null {
  const segments = token.tokenSegments;

  if (segments.indexOf("base") !== -1 || segments.indexOf("basic") !== -1) {
    return "shadowsBase";
  }

  if (segments.indexOf("middle") !== -1 || segments.indexOf("medium") !== -1) {
    return "shadowsMiddle";
  }

  if (segments.indexOf("top") !== -1 || segments.indexOf("high") !== -1) {
    return "shadowsTop";
  }

  const meaningful = segments.filter((segment) => segment !== "rd" && segment !== "shadow" && segment !== "shadows");

  if (meaningful.length === 0) {
    return null;
  }

  return `shadows${toPascalCase([meaningful[meaningful.length - 1]])}`;
}

function numberFromModeValue(modeValue: NormalizedModeValue): number | null {
  if (typeof modeValue.formatted.rawValue === "number" && isFiniteNumber(modeValue.formatted.rawValue)) {
    return modeValue.formatted.rawValue;
  }

  if (typeof modeValue.formatted.value === "number" && isFiniteNumber(modeValue.formatted.value)) {
    return modeValue.formatted.value;
  }

  if (typeof modeValue.formatted.value === "string") {
    return parseCssNumber(modeValue.formatted.value);
  }

  return null;
}

function parseFlutterShadowValue(value: unknown): FlutterShadowLayer[] | null {
  if (Array.isArray(value)) {
    return normalizeShadowLayerArray(value);
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.charAt(0) === "[") {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) {
        return normalizeShadowLayerArray(parsed);
      }
    } catch {
      // Continue with CSS box-shadow parsing.
    }
  }

  const layers: FlutterShadowLayer[] = [];
  const parts = splitByTopLevelComma(trimmed);

  for (const part of parts) {
    const layer = parseCssShadowLayer(part);

    if (!layer) {
      return null;
    }

    layers.push(layer);
  }

  return layers.length > 0 ? layers : null;
}

function normalizeShadowLayerArray(value: unknown[]): FlutterShadowLayer[] | null {
  const layers: FlutterShadowLayer[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") {
      return null;
    }

    const record = item as Record<string, unknown>;
    const offset = record.offset && typeof record.offset === "object" ? record.offset as Record<string, unknown> : {};
    const color = normalizeShadowColor(typeof record.color === "string" ? record.color : "");
    const blurRadius = numberFromUnknown(record.blurRadius);
    const spreadRadius = numberFromUnknown(record.spreadRadius);
    const x = numberFromUnknown(offset.x);
    const y = numberFromUnknown(offset.y);

    if (!color || blurRadius === null || spreadRadius === null || x === null || y === null) {
      return null;
    }

    layers.push({
      color,
      blurRadius,
      spreadRadius,
      offset: { x, y },
    });
  }

  return layers;
}

function parseCssShadowLayer(value: string): FlutterShadowLayer | null {
  const tokens = splitCssTokens(value).filter((token) => token.toLowerCase() !== "inset");
  let color = "";
  const lengths: number[] = [];

  for (const token of tokens) {
    const normalizedColor = normalizeShadowColor(token);

    if (normalizedColor && !color) {
      color = normalizedColor;
      continue;
    }

    const numberValue = parseCssNumber(token);

    if (numberValue !== null) {
      lengths.push(numberValue);
    }
  }

  if (!color || lengths.length < 2) {
    return null;
  }

  return {
    color,
    blurRadius: lengths.length > 2 ? lengths[2] : 0,
    spreadRadius: lengths.length > 3 ? lengths[3] : 0,
    offset: {
      x: lengths[0],
      y: lengths[1],
    },
  };
}

function normalizeShadowColor(value: string): string | null {
  const trimmed = value.trim();
  const rgbaMatch = trimmed.match(/^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+%?))?\s*\)$/i);

  if (rgbaMatch) {
    const red = clampByte(Number(rgbaMatch[1]));
    const green = clampByte(Number(rgbaMatch[2]));
    const blue = clampByte(Number(rgbaMatch[3]));
    const alpha = rgbaMatch[4] ? parseAlphaChannel(rgbaMatch[4]) : 1;
    return `#${channelToHexFromByte(alphaToByte(alpha))}${channelToHexFromByte(red)}${channelToHexFromByte(green)}${channelToHexFromByte(blue)}`;
  }

  const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);

  if (!hexMatch) {
    return null;
  }

  const hex = hexMatch[1];

  if (hex.length === 3) {
    return `#${hex.charAt(0)}${hex.charAt(0)}${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}`.toUpperCase();
  }

  if (hex.length === 4) {
    return `#${hex.charAt(3)}${hex.charAt(3)}${hex.charAt(0)}${hex.charAt(0)}${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}`.toUpperCase();
  }

  if (hex.length === 8) {
    return `#${hex.slice(6, 8)}${hex.slice(0, 6)}`.toUpperCase();
  }

  return `#${hex}`.toUpperCase();
}

function splitByTopLevelComma(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value.charAt(index);

    if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth = Math.max(0, depth - 1);
    }

    if (character === "," && depth === 0) {
      if (current.trim()) {
        parts.push(current.trim());
      }
      current = "";
      continue;
    }

    current += character;
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

function splitCssTokens(value: string): string[] {
  const tokens: string[] = [];
  let depth = 0;
  let current = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value.charAt(index);

    if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth = Math.max(0, depth - 1);
    }

    if (/\s/.test(character) && depth === 0) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += character;
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;
}

function containsAllParts(segments: string[], parts: string[]): boolean {
  for (const part of parts) {
    if (segments.indexOf(part) === -1) {
      return false;
    }
  }

  return true;
}

function appendMissingFlutterWarnings(modeName: string, colors: Record<string, string>, warnings: string[]): void {
  const missing: string[] = [];

  for (const key of REQUIRED_TDESIGN_COLOR_KEYS) {
    if (!colors[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    warnings.push(
      `Flutter ${modeName} 主题缺少 ${missing.length} 个 TDesign/RDesign color key: ${missing.slice(0, 24).join(", ")}${missing.length > 24 ? "..." : ""}`,
    );
  }
}

function renderFlutterThemeJson(themeId: string, sections: FlutterThemeSections): string {
  const themeBody: Record<string, unknown> = {};
  const colorValues = buildFlutterColorValues(sections.color);

  if (hasObjectKeys(colorValues)) {
    themeBody.color = colorValues;
  }

  const radiusValues = buildFlutterNumberValues(sections.radius, [
    "radiusSmall",
    "radiusDefault",
    "radiusLarge",
    "radiusExtraLarge",
    "radiusRound",
    "radiusCircle",
  ]);

  if (hasObjectKeys(radiusValues)) {
    themeBody.radius = radiusValues;
  }

  const marginValues = buildFlutterNumberValues(sections.margin, sortFlutterSpacerKeys(Object.keys(sections.margin)));

  if (hasObjectKeys(marginValues)) {
    themeBody.margin = marginValues;
  }

  const shadowValues = buildFlutterShadowValues(sections.shadow);

  if (hasObjectKeys(shadowValues)) {
    themeBody.shadow = shadowValues;
  }

  const root: Record<string, Record<string, unknown>> = {};
  root[themeId] = themeBody;
  return JSON.stringify(root);
}

function buildFlutterColorValues(colors: Record<string, string>): Record<string, string> {
  const groups = [
    rangeThemeKeys("brandColor", 10),
    rangeThemeKeys("warningColor", 10),
    rangeThemeKeys("errorColor", 10),
    rangeThemeKeys("successColor", 10),
    rangeThemeKeys("grayColor", 14),
    [
      ...rangeThemeKeys("fontWhColor", 4),
      ...rangeThemeKeys("fontGyColor", 4),
    ],
    [
      "brandNormalColor",
      "brandHoverColor",
      "brandFocusColor",
      "brandClickColor",
      "brandDisabledColor",
      "brandLightColor",
    ],
    [
      "warningNormalColor",
      "warningHoverColor",
      "warningFocusColor",
      "warningClickColor",
      "warningDisabledColor",
      "warningLightColor",
    ],
    [
      "errorNormalColor",
      "errorHoverColor",
      "errorFocusColor",
      "errorClickColor",
      "errorDisabledColor",
      "errorLightColor",
    ],
    [
      "successNormalColor",
      "successHoverColor",
      "successFocusColor",
      "successClickColor",
      "successDisabledColor",
      "successLightColor",
    ],
    ["whiteColor1"],
  ];
  const used = new Set<string>();
  const values: Record<string, string> = {};

  for (const group of groups) {
    const keys = group.filter((key) => colors[key]);

    if (keys.length === 0) {
      continue;
    }

    pushOrderedColorValues(values, keys, colors, used);
  }

  const extraKeys = Object.keys(colors)
    .filter((key) => !used.has(key))
    .sort();

  if (extraKeys.length > 0) {
    pushOrderedColorValues(values, extraKeys, colors, used);
  }

  return values;
}

function buildFlutterNumberValues(
  values: Record<string, number>,
  preferredOrder: string[],
): Record<string, number> {
  const keys = sortKnownKeys(Object.keys(values), preferredOrder);
  const output: Record<string, number> = {};

  for (const key of keys) {
    output[key] = normalizeJsonNumber(values[key]);
  }

  return output;
}

function buildFlutterShadowValues(shadows: Record<string, FlutterShadowLayer[]>): Record<string, unknown> {
  const keys = sortKnownKeys(Object.keys(shadows), ["shadowsBase", "shadowsMiddle", "shadowsTop"]);
  const output: Record<string, unknown> = {};

  for (const key of keys) {
    output[key] = shadows[key].map((layer) => ({
      color: layer.color,
      blurRadius: normalizeJsonNumber(layer.blurRadius),
      spreadRadius: normalizeJsonNumber(layer.spreadRadius),
      offset: {
        x: normalizeJsonNumber(layer.offset.x),
        y: normalizeJsonNumber(layer.offset.y),
      },
    }));
  }

  return output;
}

function pushOrderedColorValues(
  output: Record<string, string>,
  keys: string[],
  colors: Record<string, string>,
  used: Set<string>,
): void {
  for (const key of keys) {
    output[key] = normalizeFlutterColorValue(colors[key]);
    used.add(key);
  }
}

function hasObjectKeys(value: Record<string, unknown>): boolean {
  return Object.keys(value).length > 0;
}

function sortKnownKeys(keys: string[], preferredOrder: string[]): string[] {
  return keys.sort((left, right) => {
    const leftIndex = preferredOrder.indexOf(left);
    const rightIndex = preferredOrder.indexOf(right);

    if (leftIndex !== -1 || rightIndex !== -1) {
      if (leftIndex === -1) {
        return 1;
      }

      if (rightIndex === -1) {
        return -1;
      }

      return leftIndex - rightIndex;
    }

    return left.localeCompare(right, "en");
  });
}

function sortFlutterSpacerKeys(keys: string[]): string[] {
  return keys.sort((left, right) => {
    const leftNumber = parseCssNumber(left.replace(/^spacer/i, ""));
    const rightNumber = parseCssNumber(right.replace(/^spacer/i, ""));

    if (leftNumber !== null && rightNumber !== null && leftNumber !== rightNumber) {
      return leftNumber - rightNumber;
    }

    return left.localeCompare(right, "en");
  });
}

function normalizeJsonNumber(value: number): number {
  return isIntegerCompat(value) ? value : Number(value.toFixed(4));
}

function parseCssNumber(value: string): number | null {
  const match = value.trim().match(/^-?\d+(?:\.\d+)?/);

  if (!match) {
    return null;
  }

  const parsed = Number(match[0]);
  return isFiniteNumber(parsed) ? parsed : null;
}

function numberFromUnknown(value: unknown): number | null {
  if (typeof value === "number" && isFiniteNumber(value)) {
    return value;
  }

  if (typeof value === "string") {
    return parseCssNumber(value);
  }

  return null;
}

function isFiniteNumber(value: number): boolean {
  return typeof value === "number" && isFinite(value);
}

function numberToTokenKeyPart(value: number): string {
  return isIntegerCompat(value) ? String(value) : String(Number(value.toFixed(4))).replace(/\./g, "_");
}

function isIntegerCompat(value: number): boolean {
  return isFiniteNumber(value) && Math.floor(value) === value;
}

function clampByte(value: number): number {
  if (!isFiniteNumber(value)) {
    return 0;
  }

  return Math.max(0, Math.min(255, Math.round(value)));
}

function parseAlphaChannel(value: string): number {
  if (value.indexOf("%") !== -1) {
    const percentage = Number(value.replace("%", ""));
    return isFiniteNumber(percentage) ? Math.max(0, Math.min(1, percentage / 100)) : 1;
  }

  const alpha = Number(value);
  return isFiniteNumber(alpha) ? Math.max(0, Math.min(1, alpha)) : 1;
}

function alphaToByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value * 255)));
}

function channelToHexFromByte(value: number): string {
  const hex = clampByte(value).toString(16).toUpperCase();
  return hex.length === 1 ? `0${hex}` : hex;
}

function normalizeFlutterColorValue(value: string): string {
  if (/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value)) {
    return value.toLowerCase();
  }

  return value;
}

function rangeThemeKeys(prefix: string, count: number): string[] {
  const keys: string[] = [];

  for (let index = 1; index <= count; index += 1) {
    keys.push(`${prefix}${index}`);
  }

  return keys;
}

function themeColorKeyToCssVar(prefix: string, key: string): string {
  const parts = key.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
  return `--${prefix}-${parts}`;
}

function escapeDartSingleQuotedString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function countModes(model: TokenModel): number {
  const modeNames = new Set<string>();

  for (const collection of model.selectedCollections) {
    for (const mode of collection.modes) {
      modeNames.add(mode.name);
    }
  }

  return modeNames.size;
}

function trimRightCompat(value: string): string {
  return value.replace(/\s+$/g, "");
}
