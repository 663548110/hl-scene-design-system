import type { ComponentDocument } from '../types.js';

export function parseComponentDocument(filePath: string, rawMarkdown: string): ComponentDocument {
  void filePath;
  void rawMarkdown;
  // TODO: Parse single-key YAML blocks into typed component sections, validate
  // `code_snippets` structure, and normalize consumer hints keyed by consumer role id.
  throw new Error('TODO: implement parseComponentDocument');
}

export function isComponentEntryFile(filePath: string): boolean {
  return filePath.endsWith('.md') && !filePath.endsWith('/README.md') && !filePath.endsWith('/_template.md');
}
