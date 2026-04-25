# Component Template

## Metadata

```yaml
component:
  component_id: REPLACE_ME
  semantic_name: REPLACE_ME
  status: draft
  owners: []
  consumer_role_ids:
    - design_side
    - code_side
```

## Figma Binding

```yaml
figma_binding:
  source: REPLACE_ME
  file_url: REPLACE_ME
  node_name: REPLACE_ME
  component_key: REPLACE_ME
  type: REPLACE_ME
  variants_source: REPLACE_ME
```

## Code Binding

```yaml
code_binding:
  package: REPLACE_ME
  import_path: REPLACE_ME
  export_name: REPLACE_ME
  source_path: REPLACE_ME
  usage_entry: REPLACE_ME
```

## Usage Scenarios

```yaml
usage_scenarios:
  - REPLACE_ME
```

## Usage Way

```yaml
usage_way:
  placement_rules: []
  composition_rules: []
  do:
    - REPLACE_ME
  do_not:
    - REPLACE_ME
```

## Variants

```yaml
variants:
  - variant_id: REPLACE_ME
    figma_variant: REPLACE_ME
    code_props: {}
    notes: []
```

## Text / Property Mapping

```yaml
properties:
  text: {}
  boolean: {}
  variant: {}
```

## Code Snippets

```yaml
code_snippets:
  - snippet_id: minimal
    title: Minimal Usage
    intent: minimal
    language: dart
    description: 展示组件最小可用形态
    code: |
      // TODO: add minimal usage snippet
  - snippet_id: composition
    title: Composition Example
    intent: composition
    language: dart
    description: 展示组件在典型页面结构中的组合方式
    code: |
      // TODO: add composition usage snippet
```

## Consumer Hints

```yaml
consumer_hints:
  design_side:
    display_name: 设计侧
    preferred_variant: REPLACE_ME
    key_fields: []
    system_ids:
      - figma_design_agent
  code_side:
    display_name: 编码侧
    preferred_import: REPLACE_ME
    preferred_props: []
    expose_examples: true
    expose_variants: true
    system_ids:
      - component_library_mcp
      - component_library_docs
      - code_tooling
    render_sections:
      - usage_scenarios
      - usage_way
      - variants
      - code_snippets
```

## Notes

- [待补充]
