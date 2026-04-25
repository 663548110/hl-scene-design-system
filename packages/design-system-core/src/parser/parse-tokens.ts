import type { TokensDocument } from '../types.js';

export function parseTokensDocument(filePath: string, rawMarkdown: string): TokensDocument {
  void filePath;
  void rawMarkdown;
  // TODO: Extract token sources, token entry template, mapping rules, consumer notes,
  // and the real token entries from the `## Token Entries` section.
  throw new Error('TODO: implement parseTokensDocument');
}
