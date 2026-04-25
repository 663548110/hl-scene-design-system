import { readdir, readFile } from 'node:fs/promises';
import { isAbsolute, join, resolve } from 'node:path';

import type { ComponentDocument, DesignSystemSnapshot, ParserOptions } from '../types.js';
import { parseComponentDocument, isComponentEntryFile } from './parse-components.js';
import { parseRulesDocument } from './parse-rules.js';
import { parseTokensDocument } from './parse-tokens.js';

export async function loadDesignSystem(options: ParserOptions): Promise<DesignSystemSnapshot> {
  const docsDir = resolveDocsDir(options);
  const rulesPath = join(docsDir, 'rules.md');
  const tokensPath = join(docsDir, 'tokens.md');
  const componentsDir = join(docsDir, 'components');

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

function resolveDocsDir(options: ParserOptions): string {
  if (!options.docsDir) {
    return join(options.rootDir, 'docs', 'design-system');
  }

  return isAbsolute(options.docsDir) ? options.docsDir : resolve(options.rootDir, options.docsDir);
}
