export type ConsumerRoleId =
  | 'design_side'
  | 'code_side';

export type ConsumerSystemId =
  | 'figma_design_agent'
  | 'component_library_mcp'
  | 'component_library_docs'
  | 'code_tooling';

export interface ConsumerSystemDefinition {
  id: ConsumerSystemId;
  display_name: string;
}

export interface ConsumerRoleDefinition {
  id: ConsumerRoleId;
  display_name: string;
  systems: ConsumerSystemDefinition[];
}

export interface ParsedDocumentBase {
  filePath: string;
  rawMarkdown: string;
}

export interface RuleSetMetadata {
  id: string;
  version: string;
  status: string;
  owners: string[];
  source_of_truth: boolean;
  consumer_role_ids: ConsumerRoleId[];
}

export interface ConsumerContractEntry {
  display_name: string;
  system_ids: ConsumerSystemId[];
  read_from: string[];
  write_back: boolean;
}

export interface RulesDocument extends ParsedDocumentBase {
  kind: 'rules';
  metadata?: RuleSetMetadata;
  consumerRegistry?: ConsumerRoleDefinition[];
  consumerContract?: Partial<Record<ConsumerRoleId, ConsumerContractEntry>>;
  sections: Record<string, unknown>;
}

export interface TokenCategorySource {
  runtime: string;
  figma: string;
}

export interface TokenRuntimeSource {
  kind: string;
  name: string;
  path: string;
}

export interface TokenFigmaSource {
  kind: string;
  key: string;
  name: string;
}

export interface TokenFallback {
  allowed: boolean;
  value: unknown;
}

export interface TokenEntry {
  token_id: string;
  semantic_name: string;
  category: string;
  runtime_source: TokenRuntimeSource;
  figma_source: TokenFigmaSource;
  notes: string[];
  fallback: TokenFallback;
}

export interface TokenMappingRules {
  prefer_semantic_tokens: boolean;
  prefer_runtime_truth_when_documented: boolean;
  allow_hardcoded_fallback_by_default: boolean;
  require_figma_and_runtime_link: boolean;
}

export interface TokenConsumerNote {
  display_name: string;
  uses: string[];
  system_ids: ConsumerSystemId[];
}

export interface TokensDocument extends ParsedDocumentBase {
  kind: 'tokens';
  sources: Record<string, TokenCategorySource>;
  entryTemplate?: TokenEntry;
  mappingRules?: TokenMappingRules;
  consumerNotes?: Partial<Record<ConsumerRoleId, TokenConsumerNote>>;
  entries: TokenEntry[];
  sections: Record<string, unknown>;
}

export interface ComponentMetadata {
  component_id: string;
  semantic_name: string;
  status: string;
  owners?: string[];
  consumer_role_ids?: ConsumerRoleId[];
}

export interface ComponentCodeSnippet {
  snippet_id: string;
  title: string;
  intent: string;
  language: string;
  description?: string;
  code: string;
}

export interface ComponentConsumerHintEntry {
  display_name: string;
  preferred_variant?: string;
  key_fields?: string[];
  system_ids: ConsumerSystemId[];
  preferred_import?: string;
  preferred_props?: string[];
  expose_examples?: boolean;
  expose_variants?: boolean;
  render_sections?: string[];
}

export interface ComponentSections {
  figma_binding?: Record<string, unknown>;
  code_binding?: Record<string, unknown>;
  usage_scenarios?: string[];
  usage_way?: Record<string, unknown>;
  variants?: Array<Record<string, unknown>>;
  properties?: Record<string, unknown>;
  code_snippets?: ComponentCodeSnippet[];
  consumer_hints?: Partial<Record<ConsumerRoleId, ComponentConsumerHintEntry>>;
  [key: string]: unknown;
}

export interface ComponentDocument extends ParsedDocumentBase {
  kind: 'component';
  metadata?: ComponentMetadata;
  sections: ComponentSections;
}

export interface DesignSystemSnapshot {
  rootDir: string;
  rules: RulesDocument | null;
  tokens: TokensDocument | null;
  components: ComponentDocument[];
}

export interface ParserOptions {
  rootDir: string;
}

export interface ExtractedYamlBlock {
  heading: string;
  yamlText: string;
}
