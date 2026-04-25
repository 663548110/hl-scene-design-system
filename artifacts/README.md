# Generated Artifacts

这里保存从 Figma Variables 和 `docs/design-system/tokens.md` 派生出的消费侧产物。

权威关系：

1. `docs/design-system/tokens.md` 是 token truth。
2. Figma Variables 是设计 token 的上游来源。
3. `artifacts/` 下的文件是面向具体消费方的生成产物，不作为事实源。

子目录：

- `css/`: CSS 主题变量。

Flutter/RDesign/TDesign 主题 token 不再放在 `artifacts/` 下；它们由 Figma 插件直接同步到 `packages/flutter/rdesign_component/lib/src/theme/tokens/`，随组件库源码一起提交和测试。

AI 设计侧不再维护独立 token 文件；AI 应通过 parser/MCP 读取 `docs/design-system/tokens.md` 和 `docs/design-system/components/*.md`。
