import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { ComponentDocument, DesignSystemSnapshot, ParserOptions } from '../types.js';
import { parseComponentDocument, isComponentEntryFile } from './parse-components.js';
import { parseRulesDocument } from './parse-rules.js';
import { parseTokensDocument } from './parse-tokens.js';

export async function loadDesignSystem(options: ParserOptions): Promise<DesignSystemSnapshot> {
  const rulesPath = join(options.rootDir, 'rules.md');
  const tokensPath = join(options.rootDir, 'tokens.md');
  const componentsDir = join(options.rootDir, 'components');

  const [rulesMarkdown, tokensMarkdown, componentFiles] = await Promise.all([
    readFile(rulesPath, 'utf8'),
    readFile(tokensPath, 'utf8'),
    readdir(componentsDir)
  ]);

  const componentDocs: ComponentDocument[] = [];

  for (const fileName of componentFiles) {
    const filePath = join(componentsDir, fileName);
    if (!isComponentEntryFile(filePath)) {
      continue;
    }
    const rawMarkdown = await readFile(filePath, 'utf8');
    componentDocs.push(parseComponentDocument(filePath, rawMarkdown));
  }

  return {
    rootDir: options.rootDir,
    rules: parseRulesDocument(rulesPath, rulesMarkdown),
    tokens: parseTokensDocument(tokensPath, tokensMarkdown),
    components: componentDocs
  };
}
