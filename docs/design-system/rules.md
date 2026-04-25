# Shared Rules

这份文件是设计系统的全局规则入口。

- 主要消费者：AI、工具、同步脚本
- 次要消费者：人类维护者
- 写法原则：**结构化 YAML 为准，简短说明为辅**

## How To Read

1. 先读 `authority_order`
2. 再读 `figma_rules` 或 `code_rules`
3. 需要看下游集成时，再读 `consumer_contract`
4. 组件和 token 的具体事实，不写在这里，分别去 `components/*.md` 和 `tokens.md`

## Rule Metadata

```yaml
rule_set:
  id: shared-design-system-rules
  version: 0.1.0
  status: draft
  owners: []
  source_of_truth: true
  consumer_role_ids:
    - design_side
    - code_side
```

字段说明：
- `source_of_truth`: 是否作为唯一人工维护规则源
- `consumer_role_ids`: 预期消费这份规则的角色 id

## Purpose

```yaml
purpose:
  primary_goal:
    - keep figma and code decisions aligned to one documented source
    - provide stable component and token semantics for downstream consumers
    - avoid duplicated documentation maintenance across codebase and docs systems
  non_goals:
    - do not store generated site output
    - do not store duplicated code API docs that can be derived elsewhere
```

理解方式：
- 这里定义“为什么存在”
- 不要把具体组件事实写进这一节

## Single Source Policy

```yaml
single_source_policy:
  design_system_docs_repo_is_authoritative: true
  downstream_systems_must_consume_from_this_repo: true
  duplicate_manual_sources_for_components: false
  duplicate_manual_sources_for_tokens: false
```

执行原则：
- 组件事实只维护在 `components/*.md`
- token 真相只维护在 `tokens.md`
- 下游系统只能消费，不应反向成为第二数据源

## Consumer Registry

```yaml
consumer_registry:
  roles:
    - role_id: design_side
      display_name: 设计侧
      systems:
        - system_id: figma_design_agent
          display_name: Figma设计智能体
    - role_id: code_side
      display_name: 编码侧
      systems:
        - system_id: component_library_mcp
          display_name: 组件库 MCP
        - system_id: component_library_docs
          display_name: 组件库文档站
        - system_id: code_tooling
          display_name: 相关代码工具
```

执行原则：
- `role_id` / `system_id` 是稳定机读主键
- `display_name` 只负责展示，不应作为 parser 主键
- 其他文件引用消费者时，应优先复用这里定义的 id

## Authority Order

```yaml
authority_order:
  - component_entry_in_components_directory
  - token_truth_in_tokens_md
  - shared_rules_in_rules_md
  - runtime_truth_when_documented_as_override
  - file_local_usage
  - visual_guesswork
```

优先级解释：
- 先看组件条目
- 再看 token 真相
- 再看本文件中的全局约束
- 只有明确记录过的 runtime override 才能覆盖文档默认值
- `visual_guesswork` 永远最后

## Figma Rules

```yaml
figma_rules:
  workflow:
    - prefer documented component mapping before drawing custom primitives
    - prefer documented figma component keys and variant mapping
    - use documented token truth instead of guessed values
  validation:
    - validate against documented usage scenarios and variants
    - treat component entry as the source for figma-side usage semantics
  composition_policy:
    - compose screens from documented components when available
    - create custom nodes only when no component entry exists
```

这部分回答：
- Figma 侧应该先看什么
- 什么时候允许画 primitives
- 组件条目如何约束 Figma 生成

## Code Rules

```yaml
code_rules:
  component_reuse:
    - prefer documented code binding before introducing new primitives
    - import from the documented package and export target
  token_usage:
    - prefer semantic tokens from tokens.md
    - do not hardcode values when documented token truth exists
  implementation_constraints:
    - keep usage examples and code snippets aligned with the documented binding
    - changes to component usage contract must update component docs first
```

这部分回答：
- 代码侧优先复用什么
- token 应该从哪里来
- 什么时候必须先改文档再改代码

## Consumer Contract

```yaml
consumer_contract:
  design_side:
    display_name: 设计侧
    system_ids:
      - figma_design_agent
    read_from:
      - rules.md
      - tokens.md
      - components/*.md
    write_back: false
  code_side:
    display_name: 编码侧
    system_ids:
      - component_library_mcp
      - component_library_docs
      - code_tooling
    read_from:
      - rules.md
      - tokens.md
      - components/*.md
    write_back: false
```

使用方式：
- 这节定义“哪类角色读什么”
- 不定义“怎么实现”，实现放在各自消费适配器里

## Tooling Rules

```yaml
tooling_rules:
  parse_targets:
    - rules.md
    - tokens.md
    - components/*.md
  parser_policy:
    - yaml_blocks_are_primary_machine_readable_source
    - markdown_text_is_explanatory_support
    - do_not_require_parsers_to_scrape_navigation_lists_for_truth
  output_requirements:
    - preserve stable identifiers
    - preserve stable consumer role ids and system ids
    - preserve display_name for human rendering
    - preserve source file references
    - allow future generation of mcp datasets and docs pages
```

面向工具的约束：
- YAML 是主数据
- prose 只是补充说明
- 工具不应依赖“人类阅读顺序”做解析

## Update Checklist

- 改全局优先级时，更新 `authority_order`
- 改消费关系时，更新 `consumer_contract`
- 改具体组件时，不要改这里，去改 `components/*.md`
- 改 token 真相时，不要改这里，去改 `tokens.md`
