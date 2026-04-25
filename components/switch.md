# Switch

## Metadata

```yaml
component:
  component_id: switch
  semantic_name: Switch
  status: placeholder
  owners: []
  consumer_role_ids:
    - design_side
    - code_side
```

## Figma Binding

```yaml
figma_binding:
  source: 待补充
  file_url: REPLACE_ME
  node_name: Switch
  component_key: REPLACE_ME
  type: REPLACE_ME
  variants_source: REPLACE_ME
```

## Code Binding

```yaml
code_binding:
  package: rdesign_flutter
  import_path: package:rdesign_flutter/rdesign_flutter.dart
  export_name: REPLACE_ME
  source_path: lib/src/components/switch
  usage_entry: lib/src/components/switch/rd_switch.dart
```

## Usage Scenarios

```yaml
usage_scenarios:
  - 待补充
```

## Usage Way

```yaml
usage_way:
  placement_rules: []
  composition_rules: []
  do:
    - 待补充
  do_not:
    - 待补充
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
      // TODO: add minimal usage snippet for switch
  - snippet_id: composition
    title: Composition Example
    intent: composition
    language: dart
    description: 展示组件在典型页面结构中的组合方式
    code: |
      // TODO: add composition usage snippet for switch
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
    preferred_import: package:rdesign_flutter/rdesign_flutter.dart
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

- 当前占位文档依据组件库目录和公开导出文件自动创建。
- 公开导出文件：rd_switch.dart
- 后续需补充 Figma 绑定、使用场景、变体、属性映射和代码示例。
