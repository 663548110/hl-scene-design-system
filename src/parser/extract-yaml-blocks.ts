import type { ExtractedYamlBlock } from '../types.js';

export function extractYamlBlocks(markdown: string): ExtractedYamlBlock[] {
  void markdown;
  // TODO: Parse markdown headings and collect adjacent ```yaml blocks.
  return [];
}
