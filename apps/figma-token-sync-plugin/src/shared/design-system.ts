import {
  ALL_COLLECTIONS,
  type ExportArtifact,
  type SerializedCollection,
  type SerializedMode,
  type SerializedVariable,
  type SerializedVariableValue,
  type StoredSettings,
  type SyncFileRequest,
  type TokenSnapshot,
} from "./types";

interface ResolvedTokenValue {
  value: SerializedVariableValue;
  aliasTrail: string[];
}

interface DesignSystemTokenRow {
  tokenId: string;
  semanticName: string;
  category: string;
  runtimeName: string;
  variable: SerializedVariable;
  collection: SerializedCollection;
  valuesByMode: Record<string, Record<string, unknown>>;
  defaultValue: unknown;
  isComponentLevel: boolean;
}

export interface DesignSystemArtifactBundle extends ExportArtifact {
  files: SyncFileRequest[];
  previewContent: string;
  specTokenCount: number;
  fullTokenCount: number;
  componentTokenCount: number;
}

export function generateDesignSystemArtifacts(
  snapshot: TokenSnapshot,
  settings: StoredSettings,
): DesignSystemArtifactBundle {
  const warnings: string[] = [];
  const collectionMap = new Map(snapshot.collections.map((collection) => [collection.id, collection]));
  const variableMap = new Map(snapshot.variables.map((variable) => [variable.id, variable]));
  const componentPrefixes = parseComponentPrefixes(settings.componentTokenPrefixes);
  const selectedCollections = snapshot.collections
    .filter((collection) => settings.collectionId === ALL_COLLECTIONS || collection.id === settings.collectionId)
    .sort((left, right) => left.name.localeCompare(right.name, "en"));
  const selectedCollectionIds = new Set(selectedCollections.map((collection) => collection.id));
  const rows: DesignSystemTokenRow[] = [];
  let componentTokenCount = 0;

  for (const variable of snapshot.variables) {
    if (!selectedCollectionIds.has(variable.collectionId)) {
      continue;
    }

    const collection = collectionMap.get(variable.collectionId);

    if (!collection) {
      warnings.push(`无法找到 ${variable.name} 所属的 variable collection。`);
      continue;
    }

    const isComponentLevel = isComponentLevelToken(collection, variable, componentPrefixes);
    const row = createDesignSystemTokenRow(variable, collection, collectionMap, variableMap, settings, isComponentLevel);

    if (!row) {
      warnings.push(`无法解析 ${collection.name} / ${variable.name} 的 token 值。`);
      continue;
    }

    if (isComponentLevel) {
      componentTokenCount += 1;
      continue;
    }

    rows.push(row);
  }

  const fullDataSource = renderFullDataSource(snapshot, settings, collectionMap, variableMap, componentPrefixes);
  const previewContent = [
    "# Full Data Source Preview",
    "",
    "```json",
    trimRightCompat(fullDataSource.slice(0, 6000)),
    fullDataSource.length > 6000 ? "..." : "",
    "```",
  ]
    .filter((line) => line !== "")
    .join("\n");

  return {
    content: previewContent,
    previewContent,
    warnings,
    tokenCount: rows.length,
    specTokenCount: rows.length,
    fullTokenCount: snapshot.variables.length,
    componentTokenCount,
    collectionCount: selectedCollections.length,
    modeCount: countModes(selectedCollections),
    files: [
      {
        path: settings.fullDataFilePath,
        label: "全量 Figma token 数据源",
        content: fullDataSource,
        mergeStrategy: "overwrite",
      },
    ],
  };
}

function createDesignSystemTokenRow(
  variable: SerializedVariable,
  collection: SerializedCollection,
  collectionMap: Map<string, SerializedCollection>,
  variableMap: Map<string, SerializedVariable>,
  settings: StoredSettings,
  isComponentLevel: boolean,
): DesignSystemTokenRow | null {
  const valuesByMode: Record<string, Record<string, unknown>> = {};
  let defaultValue: unknown = null;

  for (const mode of collection.modes) {
    const resolved = resolveTokenValue(variable, mode.modeId, collectionMap, variableMap, []);

    if (!resolved || resolved.value.kind === "unsupported") {
      continue;
    }

    const formattedValue = formatTokenValue(resolved.value, variable.resolvedType);
    const modeValue: Record<string, unknown> = {
      value: formattedValue.value,
      source: resolved.aliasTrail.length > 0 ? resolved.aliasTrail.join(" -> ") : "direct",
    };

    if (formattedValue.flutter) {
      modeValue.flutter = formattedValue.flutter;
    }

    valuesByMode[mode.name] = modeValue;

    if (mode.isDefault) {
      defaultValue = formattedValue.value;
    }
  }

  if (Object.keys(valuesByMode).length === 0) {
    return null;
  }

  const tokenSegments = createTokenSegments("", collection.name, variable.name);
  const tokenId = [inferTokenCategory(variable), ...tokenSegments].filter(Boolean).join("_");

  return {
    tokenId,
    semanticName: `${collection.name} / ${variable.name}`,
    category: inferTokenCategory(variable),
    runtimeName: toCamelCase([settings.namePrefix, ...tokenSegments].filter(Boolean)),
    variable,
    collection,
    valuesByMode,
    defaultValue,
    isComponentLevel,
  };
}

function renderFullDataSource(
  snapshot: TokenSnapshot,
  settings: StoredSettings,
  collectionMap: Map<string, SerializedCollection>,
  variableMap: Map<string, SerializedVariable>,
  componentPrefixes: Set<string>,
): string {
  const variables = snapshot.variables.map((variable) => {
    const collection = collectionMap.get(variable.collectionId);
    const valuesByMode: Record<string, unknown> = {};

    if (collection) {
      for (const mode of collection.modes) {
        const rawValue = variable.valuesByMode[mode.modeId] ?? variable.valuesByMode[collection.defaultModeId];
        const resolved = resolveTokenValue(variable, mode.modeId, collectionMap, variableMap, []);
        valuesByMode[mode.name] = {
          mode_id: mode.modeId,
          raw: rawValue,
          resolved: resolved
            ? {
                value: formatTokenValue(resolved.value, variable.resolvedType),
                alias_trail: resolved.aliasTrail,
              }
            : null,
        };
      }
    }

    return {
      id: variable.id,
      key: variable.key,
      name: variable.name,
      description: variable.description,
      collection_id: variable.collectionId,
      collection_name: collection?.name ?? "",
      resolved_type: variable.resolvedType,
      category: inferTokenCategory(variable),
      scopes: variable.scopes,
      hidden_from_publishing: variable.hiddenFromPublishing,
      is_component_level: collection ? isComponentLevelToken(collection, variable, componentPrefixes) : false,
      values_by_mode: valuesByMode,
    };
  });

  return `${JSON.stringify(
    {
      schema_version: "figma-token-source/v1",
      generated_at: snapshot.generatedAt,
      source_file: snapshot.fileName,
      design_spec_path: settings.filePath,
      component_token_prefixes: sortedSetValues(componentPrefixes),
      stats: {
        collections: snapshot.collections.length,
        variables: snapshot.variables.length,
      },
      collections: snapshot.collections,
      variables,
    },
    null,
    2,
  )}\n`;
}

function sortedSetValues(values: Set<string>): string[] {
  const result: string[] = [];
  values.forEach((value) => {
    result.push(value);
  });
  return result.sort();
}

function resolveTokenValue(
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

function inferTokenCategory(variable: SerializedVariable): string {
  const scopes = new Set(variable.scopes);
  const normalizedName = normalizeName(variable.name);

  if (variable.resolvedType === "COLOR") {
    return "color";
  }

  if (scopes.has("CORNER_RADIUS") || normalizedName.indexOf("radius") !== -1) {
    return "radius";
  }

  if (
    scopes.has("GAP") ||
    scopes.has("WIDTH_HEIGHT") ||
    normalizedName.indexOf("spacing") !== -1 ||
    normalizedName.indexOf("space") !== -1
  ) {
    return "spacing";
  }

  if (
    scopes.has("FONT_SIZE") ||
    scopes.has("FONT_FAMILY") ||
    scopes.has("FONT_STYLE") ||
    scopes.has("FONT_WEIGHT") ||
    scopes.has("LINE_HEIGHT") ||
    scopes.has("LETTER_SPACING") ||
    normalizedName.indexOf("font") !== -1 ||
    normalizedName.indexOf("typography") !== -1
  ) {
    return "typography";
  }

  if (variable.resolvedType === "FLOAT") {
    return "number";
  }

  return variable.resolvedType.toLowerCase();
}

function formatTokenValue(value: SerializedVariableValue, resolvedType: string): { value: unknown; flutter?: string } {
  if (value.kind === "rgba") {
    return {
      value: rgbaToHex(value),
      flutter: rgbaToArgbHex(value),
    };
  }

  if (value.kind === "number" || value.kind === "string" || value.kind === "boolean") {
    return {
      value: value.value,
    };
  }

  return {
    value: resolvedType === "BOOLEAN" ? false : null,
  };
}

function isComponentLevelToken(
  collection: SerializedCollection,
  variable: SerializedVariable,
  componentPrefixes: Set<string>,
): boolean {
  const collectionSegments = tokenize(collection.name);
  const variableSegments = tokenize(variable.name);
  const firstCollectionSegment = collectionSegments[0] ?? "";
  const firstVariableSegment = variableSegments[0] ?? "";

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

function parseComponentPrefixes(value: string): Set<string> {
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

function createTokenSegments(prefix: string, collectionName: string, tokenName: string): string[] {
  return [...tokenize(prefix), ...tokenize(collectionName), ...tokenize(tokenName)];
}

function tokenize(value: string): string[] {
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

function normalizeName(value: string): string {
  return tokenize(value).join("_");
}

function toCamelCase(parts: string[]): string {
  const cleanParts: string[] = [];

  for (const part of parts) {
    for (const token of tokenize(part)) {
      cleanParts.push(token);
    }
  }

  if (cleanParts.length === 0) {
    return "token";
  }

  const [first, ...rest] = cleanParts;
  const normalizedFirst = /^[0-9]/.test(first) ? `token${capitalize(first)}` : first;
  return [normalizedFirst, ...rest.map(capitalize)].join("");
}

function countModes(collections: SerializedCollection[]): number {
  const modeNames = new Set<string>();

  for (const collection of collections) {
    for (const mode of collection.modes) {
      modeNames.add(mode.name);
    }
  }

  return modeNames.size;
}

function capitalize(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function rgbaToHex(color: Extract<SerializedVariableValue, { kind: "rgba" }>): string {
  const red = channelToHex(color.r);
  const green = channelToHex(color.g);
  const blue = channelToHex(color.b);
  const alpha = channelToHex(color.a);

  if (alpha === "FF") {
    return `#${red}${green}${blue}`;
  }

  return `#${red}${green}${blue}${alpha}`;
}

function rgbaToArgbHex(color: Extract<SerializedVariableValue, { kind: "rgba" }>): string {
  const alpha = channelToHex(color.a);
  const red = channelToHex(color.r);
  const green = channelToHex(color.g);
  const blue = channelToHex(color.b);

  return `0x${alpha}${red}${green}${blue}`;
}

function channelToHex(channel: number): string {
  const normalized = Math.max(0, Math.min(255, Math.round(channel * 255)));
  const hex = normalized.toString(16).toUpperCase();
  return hex.length === 1 ? `0${hex}` : hex;
}

function trimRightCompat(value: string): string {
  return value.replace(/\s+$/g, "");
}
