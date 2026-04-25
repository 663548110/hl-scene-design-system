import {
  ALL_COLLECTIONS,
  type SerializedCollection,
  type SerializedMode,
  type SerializedVariable,
  type SerializedVariableValue,
  type StoredSettings,
  type TokenSnapshot,
} from "./types";

export interface ResolvedTokenValue {
  value: SerializedVariableValue;
  aliasTrail: string[];
}

export interface FormattedTokenValue {
  value: unknown;
  cssValue: string;
  rawValue: unknown;
  flutter?: string;
}

export interface NormalizedModeValue {
  modeId: string;
  modeName: string;
  modeRole: "light" | "dark" | "other";
  resolved: SerializedVariableValue;
  aliasTrail: string[];
  formatted: FormattedTokenValue;
}

export interface NormalizedToken {
  tokenId: string;
  semanticName: string;
  category: string;
  tokenSegments: string[];
  cssVarName: string;
  runtimeName: string;
  flutterName: string;
  tdesignThemeKey: string | null;
  variable: SerializedVariable;
  collection: SerializedCollection;
  isComponentLevel: boolean;
  valuesByMode: NormalizedModeValue[];
  lightValue: NormalizedModeValue | null;
  darkValue: NormalizedModeValue | null;
  defaultValue: NormalizedModeValue | null;
}

export interface ModeMapping {
  collectionId: string;
  collectionName: string;
  lightModeName: string;
  darkModeName: string;
  lightModeId: string;
  darkModeId: string;
  usedAutoLight: boolean;
  usedAutoDark: boolean;
}

export interface TokenModel {
  snapshot: TokenSnapshot;
  settings: StoredSettings;
  collectionMap: Map<string, SerializedCollection>;
  variableMap: Map<string, SerializedVariable>;
  componentPrefixes: Set<string>;
  selectedCollections: SerializedCollection[];
  selectedCollectionIds: Set<string>;
  modeMappings: ModeMapping[];
  tokens: NormalizedToken[];
  globalTokens: NormalizedToken[];
  componentTokens: NormalizedToken[];
  warnings: string[];
}

export const REQUIRED_TDESIGN_COLOR_KEYS = [
  "brandColor1",
  "brandColor2",
  "brandColor3",
  "brandColor4",
  "brandColor5",
  "brandColor6",
  "brandColor7",
  "brandColor8",
  "brandColor9",
  "brandColor10",
  "warningColor1",
  "warningColor2",
  "warningColor3",
  "warningColor4",
  "warningColor5",
  "warningColor6",
  "warningColor7",
  "warningColor8",
  "warningColor9",
  "warningColor10",
  "errorColor1",
  "errorColor2",
  "errorColor3",
  "errorColor4",
  "errorColor5",
  "errorColor6",
  "errorColor7",
  "errorColor8",
  "errorColor9",
  "errorColor10",
  "successColor1",
  "successColor2",
  "successColor3",
  "successColor4",
  "successColor5",
  "successColor6",
  "successColor7",
  "successColor8",
  "successColor9",
  "successColor10",
  "grayColor1",
  "grayColor2",
  "grayColor3",
  "grayColor4",
  "grayColor5",
  "grayColor6",
  "grayColor7",
  "grayColor8",
  "grayColor9",
  "grayColor10",
  "grayColor11",
  "grayColor12",
  "grayColor13",
  "grayColor14",
  "fontWhColor1",
  "fontWhColor2",
  "fontWhColor3",
  "fontWhColor4",
  "fontGyColor1",
  "fontGyColor2",
  "fontGyColor3",
  "fontGyColor4",
];

export function buildTokenModel(snapshot: TokenSnapshot, settings: StoredSettings): TokenModel {
  const warnings: string[] = [];
  const collectionMap = new Map(snapshot.collections.map((collection) => [collection.id, collection]));
  const variableMap = new Map(snapshot.variables.map((variable) => [variable.id, variable]));
  const componentPrefixes = parseComponentPrefixes(settings.componentTokenPrefixes);
  const selectedCollections = snapshot.collections
    .filter((collection) => settings.collectionId === ALL_COLLECTIONS || collection.id === settings.collectionId)
    .sort((left, right) => left.name.localeCompare(right.name, "en"));
  const selectedCollectionIds = new Set(selectedCollections.map((collection) => collection.id));
  const modeMappings = selectedCollections.map((collection) => buildModeMapping(collection, settings, warnings));
  const modeMappingByCollection = new Map(modeMappings.map((mapping) => [mapping.collectionId, mapping]));
  const tokens: NormalizedToken[] = [];

  for (const variable of snapshot.variables) {
    if (!selectedCollectionIds.has(variable.collectionId)) {
      continue;
    }

    const collection = collectionMap.get(variable.collectionId);
    const modeMapping = modeMappingByCollection.get(variable.collectionId);

    if (!collection || !modeMapping) {
      warnings.push(`无法找到 ${variable.name} 所属的 variable collection。`);
      continue;
    }

    const token = normalizeToken(variable, collection, collectionMap, variableMap, modeMapping, settings, componentPrefixes, warnings);

    if (token) {
      tokens.push(token);
    }
  }

  const globalTokens = tokens.filter((token) => !token.isComponentLevel);
  const componentTokens = tokens.filter((token) => token.isComponentLevel);

  return {
    snapshot,
    settings,
    collectionMap,
    variableMap,
    componentPrefixes,
    selectedCollections,
    selectedCollectionIds,
    modeMappings,
    tokens,
    globalTokens,
    componentTokens,
    warnings,
  };
}

export function inferTokenCategory(variable: SerializedVariable): string {
  const scopes = new Set(variable.scopes);
  const normalizedName = normalizeName(variable.name);

  if (variable.resolvedType === "COLOR") {
    return "color";
  }

  if (scopes.has("CORNER_RADIUS") || normalizedName.indexOf("radius") !== -1 || normalizedName.indexOf("round") !== -1) {
    return "radius";
  }

  if (normalizedName.indexOf("shadow") !== -1 || normalizedName.indexOf("elevation") !== -1) {
    return "shadow";
  }

  if (
    scopes.has("GAP") ||
    normalizedName.indexOf("spacing") !== -1 ||
    normalizedName.indexOf("space") !== -1 ||
    normalizedName.indexOf("margin") !== -1 ||
    normalizedName.indexOf("padding") !== -1
  ) {
    return "spacing";
  }

  if (
    scopes.has("WIDTH_HEIGHT") ||
    normalizedName.indexOf("size") !== -1 ||
    normalizedName.indexOf("width") !== -1 ||
    normalizedName.indexOf("height") !== -1
  ) {
    return "size";
  }

  if (
    scopes.has("FONT_SIZE") ||
    scopes.has("FONT_FAMILY") ||
    scopes.has("FONT_STYLE") ||
    scopes.has("FONT_WEIGHT") ||
    scopes.has("LINE_HEIGHT") ||
    scopes.has("LETTER_SPACING") ||
    normalizedName.indexOf("font") !== -1 ||
    normalizedName.indexOf("typography") !== -1 ||
    normalizedName.indexOf("line_height") !== -1
  ) {
    return "typography";
  }

  if (variable.resolvedType === "FLOAT") {
    return "number";
  }

  return variable.resolvedType.toLowerCase();
}

export function formatTokenValue(value: SerializedVariableValue, category: string): FormattedTokenValue {
  if (value.kind === "rgba") {
    const hex = rgbaToHex(value);
    return {
      value: hex,
      cssValue: hex,
      rawValue: {
        r: value.r,
        g: value.g,
        b: value.b,
        a: value.a,
      },
      flutter: rgbaToArgbHex(value),
    };
  }

  if (value.kind === "number") {
    const formatted = shouldUsePx(category) ? `${formatNumber(value.value)}px` : formatNumber(value.value);
    return {
      value: formatted,
      cssValue: formatted,
      rawValue: value.value,
    };
  }

  if (value.kind === "string") {
    return {
      value: value.value,
      cssValue: value.value,
      rawValue: value.value,
    };
  }

  if (value.kind === "boolean") {
    return {
      value: value.value,
      cssValue: String(value.value),
      rawValue: value.value,
    };
  }

  return {
    value: null,
    cssValue: "",
    rawValue: null,
  };
}

export function isComponentLevelToken(
  collection: SerializedCollection,
  variable: SerializedVariable,
  componentPrefixes: Set<string>,
): boolean {
  const collectionSegments = tokenize(collection.name);
  const variableSegments = tokenize(variable.name);
  const firstCollectionSegment = collectionSegments[0] ?? "";
  const firstVariableSegment = variableSegments[0] ?? "";

  if (firstCollectionSegment === "component" || firstCollectionSegment === "components") {
    return true;
  }

  if (componentPrefixes.has(firstCollectionSegment) || componentPrefixes.has(firstVariableSegment)) {
    return true;
  }

  const allSegments = [...collectionSegments, ...variableSegments];

  for (let index = 0; index < allSegments.length - 1; index += 1) {
    if ((allSegments[index] === "component" || allSegments[index] === "components") && componentPrefixes.has(allSegments[index + 1])) {
      return true;
    }
  }

  return false;
}

export function parseComponentPrefixes(value: string): Set<string> {
  const prefixes = new Set<string>();
  const parts = value.split(/[,\n]+/g);

  for (const part of parts) {
    const normalized = normalizeName(part);

    if (normalized) {
      prefixes.add(normalized);
    }
  }

  return prefixes;
}

export function createTokenSegments(prefix: string, collectionName: string, tokenName: string): string[] {
  return [...tokenize(prefix), ...tokenize(collectionName), ...tokenize(tokenName)];
}

export function tokenize(value: string): string[] {
  const splitParts = value.trim().split(/[\/\s._-]+/g);
  const parts: string[] = [];

  for (const part of splitParts) {
    const matches = part.match(/[A-Za-z0-9]+/g) ?? [];

    for (const match of matches) {
      parts.push(match.toLowerCase());
    }
  }

  return parts;
}

export function normalizeName(value: string): string {
  return tokenize(value).join("_");
}

export function toCamelCase(parts: string[]): string {
  const cleanParts: string[] = [];

  for (const part of parts) {
    for (const token of tokenize(part)) {
      cleanParts.push(token);
    }
  }

  if (cleanParts.length === 0) {
    return "token";
  }

  const first = cleanParts[0];
  const rest = cleanParts.slice(1);
  const normalizedFirst = /^[0-9]/.test(first) ? `token${capitalize(first)}` : first;
  return [normalizedFirst, ...rest.map(capitalize)].join("");
}

export function toPascalCase(parts: string[]): string {
  return toCamelCase(["token", ...parts]).replace(/^token/, "");
}

export function toKebabCase(parts: string[]): string {
  const tokens: string[] = [];

  for (const part of parts) {
    for (const token of tokenize(part)) {
      tokens.push(token);
    }
  }

  return tokens.length > 0 ? tokens.join("-") : "token";
}

export function toSnakeCase(parts: string[]): string {
  const tokens: string[] = [];

  for (const part of parts) {
    for (const token of tokenize(part)) {
      tokens.push(token);
    }
  }

  return tokens.length > 0 ? tokens.join("_") : "token";
}

export function rgbaToHex(color: Extract<SerializedVariableValue, { kind: "rgba" }>): string {
  const red = channelToHex(color.r);
  const green = channelToHex(color.g);
  const blue = channelToHex(color.b);
  const alpha = channelToHex(color.a);

  if (alpha === "FF") {
    return `#${red}${green}${blue}`;
  }

  return `#${red}${green}${blue}${alpha}`;
}

export function rgbaToArgbHex(color: Extract<SerializedVariableValue, { kind: "rgba" }>): string {
  const alpha = channelToHex(color.a);
  const red = channelToHex(color.r);
  const green = channelToHex(color.g);
  const blue = channelToHex(color.b);

  return `0x${alpha}${red}${green}${blue}`;
}

export function compareTokens(left: NormalizedToken, right: NormalizedToken): number {
  return left.category.localeCompare(right.category, "en") || left.tokenId.localeCompare(right.tokenId, "en");
}

function normalizeToken(
  variable: SerializedVariable,
  collection: SerializedCollection,
  collectionMap: Map<string, SerializedCollection>,
  variableMap: Map<string, SerializedVariable>,
  modeMapping: ModeMapping,
  settings: StoredSettings,
  componentPrefixes: Set<string>,
  warnings: string[],
): NormalizedToken | null {
  const category = inferTokenCategory(variable);
  const valuesByMode: NormalizedModeValue[] = [];
  const tokenSegments = createTokenSegments("", collection.name, variable.name);
  const safeTokenSegments = tokenSegments.length > 0 ? tokenSegments : ["token"];
  const cssVarName = `--${toKebabCase([settings.namePrefix, ...safeTokenSegments])}`;
  const runtimeName = toCamelCase([settings.namePrefix, ...safeTokenSegments]);
  const flutterName = runtimeName;
  let lightValue: NormalizedModeValue | null = null;
  let darkValue: NormalizedModeValue | null = null;
  let defaultValue: NormalizedModeValue | null = null;

  for (const mode of collection.modes) {
    const resolved = resolveTokenValue(variable, mode.modeId, collectionMap, variableMap, []);

    if (!resolved || resolved.value.kind === "unsupported") {
      continue;
    }

    const modeRole = mode.modeId === modeMapping.lightModeId ? "light" : mode.modeId === modeMapping.darkModeId ? "dark" : "other";
    const formatted = formatTokenValue(resolved.value, category);
    const modeValue: NormalizedModeValue = {
      modeId: mode.modeId,
      modeName: mode.name,
      modeRole,
      resolved: resolved.value,
      aliasTrail: resolved.aliasTrail,
      formatted,
    };

    valuesByMode.push(modeValue);

    if (modeRole === "light") {
      lightValue = modeValue;
    }

    if (modeRole === "dark") {
      darkValue = modeValue;
    }

    if (mode.isDefault) {
      defaultValue = modeValue;
    }
  }

  if (valuesByMode.length === 0) {
    warnings.push(`无法解析 ${collection.name} / ${variable.name} 的 token 值。`);
    return null;
  }

  if (!lightValue) {
    lightValue = defaultValue ?? valuesByMode[0];
  }

  const tokenId = [category, ...safeTokenSegments].filter(Boolean).join("_");

  return {
    tokenId,
    semanticName: `${collection.name} / ${variable.name}`,
    category,
    tokenSegments: safeTokenSegments,
    cssVarName,
    runtimeName,
    flutterName,
    tdesignThemeKey: inferTDesignThemeKey(collection, variable),
    variable,
    collection,
    isComponentLevel: isComponentLevelToken(collection, variable, componentPrefixes),
    valuesByMode,
    lightValue,
    darkValue,
    defaultValue,
  };
}

export function resolveTokenValue(
  variable: SerializedVariable,
  modeId: string,
  collectionMap: Map<string, SerializedCollection>,
  variableMap: Map<string, SerializedVariable>,
  trail: string[],
): ResolvedTokenValue | null {
  const collection = collectionMap.get(variable.collectionId);

  if (!collection) {
    return null;
  }

  const variableValue = variable.valuesByMode[modeId] ?? variable.valuesByMode[collection.defaultModeId];

  if (!variableValue || variableValue.kind === "unsupported") {
    return null;
  }

  if (variableValue.kind !== "alias") {
    return {
      value: variableValue,
      aliasTrail: trail,
    };
  }

  if (trail.indexOf(variable.id) !== -1) {
    return null;
  }

  const targetVariable = variableMap.get(variableValue.id);

  if (!targetVariable) {
    return null;
  }

  const sourceModeName =
    collection.modes.find((mode) => mode.modeId === modeId)?.name ??
    collection.modes.find((mode) => mode.modeId === collection.defaultModeId)?.name ??
    "default";
  const targetCollection = collectionMap.get(targetVariable.collectionId);
  const targetMode = pickTargetMode(targetCollection, sourceModeName);

  if (!targetMode) {
    return null;
  }

  return resolveTokenValue(targetVariable, targetMode.modeId, collectionMap, variableMap, [
    ...trail,
    targetVariable.name,
  ]);
}

function pickTargetMode(collection: SerializedCollection | undefined, sourceModeName: string): SerializedMode | null {
  if (!collection) {
    return null;
  }

  const normalizedSource = normalizeName(sourceModeName);

  return (
    collection.modes.find((mode) => normalizeName(mode.name) === normalizedSource) ??
    collection.modes.find((mode) => mode.isDefault) ??
    null
  );
}

function buildModeMapping(collection: SerializedCollection, settings: StoredSettings, warnings: string[]): ModeMapping {
  const preferredLight = settings.lightModeName.trim();
  const preferredDark = settings.darkModeName.trim();
  const lightMode = pickConfiguredMode(collection, preferredLight) ?? pickAutoLightMode(collection);
  const darkMode = pickConfiguredMode(collection, preferredDark) ?? pickAutoDarkMode(collection);

  if (preferredLight && !pickConfiguredMode(collection, preferredLight)) {
    warnings.push(`${collection.name}: 未找到指定 light mode "${preferredLight}"，已回退到自动识别。`);
  }

  if (preferredDark && !pickConfiguredMode(collection, preferredDark)) {
    warnings.push(`${collection.name}: 未找到指定 dark mode "${preferredDark}"，已回退到自动识别。`);
  }

  if (!darkMode && shouldWarnMissingDarkMode(collection)) {
    warnings.push(`${collection.name}: 未识别到 dark mode，将只导出 light/default 值。`);
  }

  return {
    collectionId: collection.id,
    collectionName: collection.name,
    lightModeName: lightMode?.name ?? "",
    darkModeName: darkMode?.name ?? "",
    lightModeId: lightMode?.modeId ?? collection.defaultModeId,
    darkModeId: darkMode?.modeId ?? "",
    usedAutoLight: !preferredLight,
    usedAutoDark: !preferredDark,
  };
}

function pickConfiguredMode(collection: SerializedCollection, modeName: string): SerializedMode | null {
  if (!modeName) {
    return null;
  }

  const normalized = normalizeModeLookup(modeName);

  return collection.modes.find((mode) => normalizeModeLookup(mode.name) === normalized) ?? null;
}

function pickAutoLightMode(collection: SerializedCollection): SerializedMode {
  return (
    collection.modes.find((mode) => isLightModeName(mode.name)) ??
    collection.modes.find((mode) => mode.isDefault) ??
    collection.modes[0]
  );
}

function pickAutoDarkMode(collection: SerializedCollection): SerializedMode | null {
  return collection.modes.find((mode) => isDarkModeName(mode.name)) ?? null;
}

function isLightModeName(value: string): boolean {
  const lower = value.toLowerCase();
  const normalized = normalizeModeLookup(value);

  return (
    normalized === "light" ||
    normalized === "default" ||
    normalized.indexOf("light") !== -1 ||
    normalized.indexOf("default") !== -1 ||
    lower.indexOf("亮") !== -1 ||
    lower.indexOf("浅") !== -1 ||
    lower.indexOf("默认") !== -1
  );
}

function isDarkModeName(value: string): boolean {
  const lower = value.toLowerCase();
  const normalized = normalizeModeLookup(value);

  return (
    normalized === "dark" ||
    normalized.indexOf("dark") !== -1 ||
    lower.indexOf("暗") !== -1 ||
    lower.indexOf("深") !== -1 ||
    lower.indexOf("黑") !== -1
  );
}

function shouldWarnMissingDarkMode(collection: SerializedCollection): boolean {
  const segments = tokenize(collection.name);
  return segments.indexOf("color") !== -1;
}

function normalizeModeLookup(value: string): string {
  const normalized = normalizeName(value);
  return normalized || value.trim().toLowerCase();
}

function inferTDesignThemeKey(collection: SerializedCollection, variable: SerializedVariable): string | null {
  if (variable.resolvedType !== "COLOR") {
    return null;
  }

  const segments = [...tokenize(collection.name), ...tokenize(variable.name)];
  const compact = segments.join("");
  const semanticKey = inferSemanticThemeKey(segments);

  if (semanticKey) {
    return semanticKey;
  }

  const paletteKey = inferPaletteThemeKey(segments, compact);

  if (paletteKey) {
    return paletteKey;
  }

  if (compact.indexOf("whitecolor1") !== -1 || containsSegments(segments, ["white", "1"])) {
    return "whiteColor1";
  }

  return null;
}

function inferSemanticThemeKey(segments: string[]): string | null {
  const colorTypes = ["brand", "warning", "error", "success"];
  const states = [
    { key: "normal", aliases: ["normal"] },
    { key: "hover", aliases: ["hover"] },
    { key: "focus", aliases: ["focus"] },
    { key: "click", aliases: ["click", "active", "pressed"] },
    { key: "disabled", aliases: ["disabled"] },
    { key: "light", aliases: ["light"] },
  ];

  for (const colorType of colorTypes) {
    for (const state of states) {
      if (hasSemanticState(segments, colorType, state.aliases)) {
        return `${colorType}${capitalize(state.key)}Color`;
      }
    }
  }

  return null;
}

function hasSemanticState(segments: string[], colorType: string, stateAliases: string[]): boolean {
  for (let index = 0; index < segments.length; index += 1) {
    if (segments[index] !== colorType) {
      continue;
    }

    const tail = segments.slice(index + 1);

    if (tail.length === 0) {
      continue;
    }

    if (matchesStatePattern(tail, stateAliases)) {
      return true;
    }
  }

  return false;
}

function matchesStatePattern(tail: string[], stateAliases: string[]): boolean {
  if (tail.length === 1) {
    return stateAliases.indexOf(tail[0]) !== -1;
  }

  if (tail.length === 2) {
    return (
      (tail[0] === "color" && stateAliases.indexOf(tail[1]) !== -1) ||
      (stateAliases.indexOf(tail[0]) !== -1 && tail[1] === "color")
    );
  }

  return false;
}

function inferPaletteThemeKey(segments: string[], compact: string): string | null {
  const colorTypes = ["brand", "warning", "error", "success"];

  for (const colorType of colorTypes) {
    const matchedNumber = matchPaletteNumber(compact, segments, colorType, 10);

    if (matchedNumber) {
      return `${colorType}Color${matchedNumber}`;
    }
  }

  const fontWhiteNumber =
    matchPaletteNumber(compact, segments, "fontwh", 4) ??
    matchPaletteNumber(compact, segments, "fontwhite", 4);

  if (fontWhiteNumber) {
    return `fontWhColor${fontWhiteNumber}`;
  }

  const fontGrayNumber =
    matchPaletteNumber(compact, segments, "fontgy", 4) ??
    matchPaletteNumber(compact, segments, "fontgray", 4);

  if (fontGrayNumber) {
    return `fontGyColor${fontGrayNumber}`;
  }

  const grayNumber = matchPaletteNumber(compact, segments, "gray", 14);

  if (grayNumber) {
    return `grayColor${grayNumber}`;
  }

  return null;
}

function matchPaletteNumber(compact: string, segments: string[], base: string, max: number): number | null {
  for (let index = max; index >= 1; index -= 1) {
    if (compact.indexOf(`${base}color${index}`) !== -1 || compact.indexOf(`${base}${index}`) !== -1) {
      return index;
    }

    if (containsSegments(segments, [base, String(index)]) || containsSegments(segments, [base, "color", String(index)])) {
      return index;
    }
  }

  return null;
}

function containsSegments(segments: string[], expected: string[]): boolean {
  for (let index = 0; index <= segments.length - expected.length; index += 1) {
    let matched = true;

    for (let expectedIndex = 0; expectedIndex < expected.length; expectedIndex += 1) {
      if (segments[index + expectedIndex] !== expected[expectedIndex]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return true;
    }
  }

  return false;
}

function shouldUsePx(category: string): boolean {
  return category === "spacing" || category === "radius" || category === "size";
}

function formatNumber(value: number): string {
  if (Math.round(value) === value) {
    return String(value);
  }

  return String(Number(value.toFixed(4)));
}

function channelToHex(channel: number): string {
  const normalized = Math.max(0, Math.min(255, Math.round(channel * 255)));
  const hex = normalized.toString(16).toUpperCase();
  return hex.length === 1 ? `0${hex}` : hex;
}

function capitalize(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}
