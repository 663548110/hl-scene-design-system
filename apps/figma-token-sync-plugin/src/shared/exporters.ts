import {
  ALL_COLLECTIONS,
  type ExportArtifact,
  type SerializedCollection,
  type SerializedMode,
  type SerializedVariable,
  type SerializedVariableValue,
  type StoredSettings,
  type TokenSnapshot,
} from "./types";

interface ResolvedColor {
  rgba: Extract<SerializedVariableValue, { kind: "rgba" }>;
  aliasTrail: string[];
}

interface ExportRow {
  collectionName: string;
  modeName: string;
  modeIsDefault: boolean;
  tokenName: string;
  cssVarName: string;
  flutterName: string;
  hexValue: string;
  argbValue: string;
  flutterCode: string;
  description: string;
  aliasTrail: string[];
}

export function generateArtifact(
  snapshot: TokenSnapshot,
  settings: StoredSettings,
): ExportArtifact {
  const rows: ExportRow[] = [];
  const warnings: string[] = [];

  const collectionMap = new Map(snapshot.collections.map((collection) => [collection.id, collection]));
  const variableMap = new Map(snapshot.variables.map((variable) => [variable.id, variable]));

  const selectedCollections = snapshot.collections
    .filter((collection) => settings.collectionId === ALL_COLLECTIONS || collection.id === settings.collectionId)
    .sort((left, right) => left.name.localeCompare(right.name, "en"));

  for (const collection of selectedCollections) {
    const collectionVariables = snapshot.variables
      .filter((variable) => variable.collectionId === collection.id && variable.resolvedType === "COLOR")
      .sort((left, right) => left.name.localeCompare(right.name, "en"));

    const orderedModes = [...collection.modes].sort((left, right) => Number(right.isDefault) - Number(left.isDefault));

    for (const mode of orderedModes) {
      for (const variable of collectionVariables) {
        const resolved = resolveColor(variable, mode.modeId, collectionMap, variableMap, []);

        if (!resolved) {
          warnings.push(`无法解析 ${collection.name} / ${mode.name} / ${variable.name} 的颜色值。`);
          continue;
        }

        const tokenSegments = createTokenSegments(settings.namePrefix, collection.name, variable.name);
        const cssVarName = `--${tokenSegments.join("-")}`;
        const flutterName = toCamelCase(tokenSegments);
        const hexValue = rgbaToHex(resolved.rgba);
        const argbValue = rgbaToArgbHex(resolved.rgba);

        rows.push({
          collectionName: collection.name,
          modeName: mode.name,
          modeIsDefault: mode.isDefault,
          tokenName: variable.name,
          cssVarName,
          flutterName,
          hexValue,
          argbValue,
          flutterCode: `const Color(${argbValue})`,
          description: variable.description,
          aliasTrail: resolved.aliasTrail,
        });
      }
    }
  }

  const content =
    settings.format === "md"
      ? renderMarkdown(snapshot, settings, rows, warnings)
      : renderCss(snapshot, settings, rows, warnings);

  return {
    content,
    warnings,
    tokenCount: rows.length,
    collectionCount: selectedCollections.length,
    modeCount: new Set(rows.map((row) => row.modeName)).size,
  };
}

function resolveColor(
  variable: SerializedVariable,
  modeId: string,
  collectionMap: Map<string, SerializedCollection>,
  variableMap: Map<string, SerializedVariable>,
  trail: string[],
): ResolvedColor | null {
  const collection = collectionMap.get(variable.collectionId);

  if (!collection) {
    return null;
  }

  const variableValue = variable.valuesByMode[modeId] ?? variable.valuesByMode[collection.defaultModeId];

  if (!variableValue || variableValue.kind === "unsupported") {
    return null;
  }

  if (variableValue.kind === "rgba") {
    return {
      rgba: variableValue,
      aliasTrail: trail,
    };
  }

  if (variableValue.kind !== "alias") {
    return null;
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

  return resolveColor(targetVariable, targetMode.modeId, collectionMap, variableMap, [...trail, targetVariable.name]);
}

function pickTargetMode(collection: SerializedCollection | undefined, sourceModeName: string): SerializedMode | null {
  if (!collection) {
    return null;
  }

  const normalizedSource = normalizeModeName(sourceModeName);

  return (
    collection.modes.find((mode) => normalizeModeName(mode.name) === normalizedSource) ??
    collection.modes.find((mode) => mode.isDefault) ??
    null
  );
}

function renderCss(
  snapshot: TokenSnapshot,
  settings: StoredSettings,
  rows: ExportRow[],
  warnings: string[],
): string {
  const lines: string[] = [
    "/*",
    " * Generated by Figma Token Sync.",
    ` * Source file: ${snapshot.fileName}`,
    ` * Generated at: ${snapshot.generatedAt}`,
    ` * Format: ${settings.format.toUpperCase()}`,
    " *",
    " * Each color exports two CSS custom properties:",
    " * - base color: usable in CSS",
    " * - -flutter suffix: Flutter-friendly ARGB literal",
    " */",
  ];

  if (warnings.length > 0) {
    lines.push("/*");
    lines.push(" * Warnings:");
    for (const warning of warnings) {
      lines.push(` * - ${warning}`);
    }
    lines.push(" */");
  }

  const rowsByMode = groupRowsByMode(rows);
  const orderedModes = [...rowsByMode.keys()].sort((left, right) => {
    const leftRows = rowsByMode.get(left) ?? [];
    const rightRows = rowsByMode.get(right) ?? [];
    return Number(rightRows.some((row) => row.modeIsDefault)) - Number(leftRows.some((row) => row.modeIsDefault));
  });

  for (const modeName of orderedModes) {
    const modeRows = [...(rowsByMode.get(modeName) ?? [])].sort(compareRows);
    const isDefaultMode = modeRows.some((row) => row.modeIsDefault);
    const selector = isDefaultMode ? ":root" : `[data-figma-mode="${escapeAttributeValue(modeName)}"]`;

    lines.push("");
    lines.push(`${selector} {`);

    for (const row of modeRows) {
      lines.push(`  ${row.cssVarName}: ${row.hexValue};`);
      lines.push(`  ${row.cssVarName}-flutter: ${row.argbValue};`);
    }

    lines.push("}");
  }

  return `${lines.join("\n")}\n`;
}

function renderMarkdown(
  snapshot: TokenSnapshot,
  settings: StoredSettings,
  rows: ExportRow[],
  warnings: string[],
): string {
  const lines: string[] = [
    "# Flutter Color Tokens",
    "",
    `- Source file: ${snapshot.fileName}`,
    `- Generated at: ${snapshot.generatedAt}`,
    `- Format: ${settings.format.toUpperCase()}`,
    "",
    "This document is generated from local Figma color variables.",
  ];

  if (warnings.length > 0) {
    lines.push("");
    lines.push("## Warnings");
    lines.push("");
    for (const warning of warnings) {
      lines.push(`- ${warning}`);
    }
  }

  const rowsByMode = groupRowsByMode(rows);
  const orderedModes = [...rowsByMode.keys()].sort((left, right) => {
    const leftRows = rowsByMode.get(left) ?? [];
    const rightRows = rowsByMode.get(right) ?? [];
    return Number(rightRows.some((row) => row.modeIsDefault)) - Number(leftRows.some((row) => row.modeIsDefault));
  });

  for (const modeName of orderedModes) {
    const modeRows = [...(rowsByMode.get(modeName) ?? [])].sort(compareRows);

    lines.push("");
    lines.push(`## ${modeName}`);
    lines.push("");
    lines.push("| Collection | Token | CSS var | Hex | ARGB | Flutter | Source |");
    lines.push("| --- | --- | --- | --- | --- | --- | --- |");

    for (const row of modeRows) {
      const source = row.aliasTrail.length > 0 ? row.aliasTrail.join(" -> ") : "direct";
      lines.push(
        `| ${escapeMarkdownCell(row.collectionName)} | ${escapeMarkdownCell(row.tokenName)} | \`${row.cssVarName}\` | \`${row.hexValue}\` | \`${row.argbValue}\` | \`${row.flutterCode}\` | ${escapeMarkdownCell(source)} |`,
      );

      if (row.description) {
        lines.push(`| _description_ | ${escapeMarkdownCell(row.description)} |  |  |  |  |  |`);
      }
    }
  }

  return `${lines.join("\n")}\n`;
}

function groupRowsByMode(rows: ExportRow[]): Map<string, ExportRow[]> {
  const rowsByMode = new Map<string, ExportRow[]>();

  for (const row of rows) {
    const existing = rowsByMode.get(row.modeName) ?? [];
    existing.push(row);
    rowsByMode.set(row.modeName, existing);
  }

  return rowsByMode;
}

function createTokenSegments(prefix: string, collectionName: string, tokenName: string): string[] {
  const segments = [...tokenize(prefix), ...tokenize(collectionName), ...tokenize(tokenName)];
  return segments.length > 0 ? segments : ["token"];
}

function tokenize(value: string): string[] {
  const splitParts = value.trim().split(/[\/\s._-]+/g);
  const parts: string[] = [];

  for (const part of splitParts) {
    const matches = part.match(/[A-Za-z0-9]+/g) ?? [];

    for (const match of matches) {
      parts.push(match);
    }
  }

  if (parts.length === 0) {
    return [];
  }

  return parts.map((part) => part.toLowerCase());
}

function toCamelCase(parts: string[]): string {
  if (parts.length === 0) {
    return "token";
  }

  const [first, ...rest] = parts;
  const normalizedFirst = /^[0-9]/.test(first) ? `token${capitalize(first)}` : first;
  return [normalizedFirst, ...rest.map(capitalize)].join("");
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

function normalizeModeName(value: string): string {
  return value.trim().toLowerCase();
}

function compareRows(left: ExportRow, right: ExportRow): number {
  return (
    left.collectionName.localeCompare(right.collectionName, "en") ||
    left.tokenName.localeCompare(right.tokenName, "en")
  );
}

function escapeMarkdownCell(value: string): string {
  return value.replace(/\|/g, "\\|");
}

function escapeAttributeValue(value: string): string {
  return value.replace(/"/g, '\\"');
}
