# HL Scene Design System

这个仓库是 HL Scene / RDesign 的设计系统 monorepo，用来统一维护 Figma token、设计规范文档、组件规则、解析服务、文档站、Figma 同步插件和 Flutter 组件库。

核心原则：事实源、生成产物、解析服务、应用工程分层管理，不把不同职责的文件都堆在根目录。

## 目录结构

```text
docs/
  design-system/                 # 文档事实源层
    rules.md                     # 全局设计系统规则
    tokens.md                    # token truth，保留 Token Entries
    components/                  # 一组件一文档

artifacts/                       # 面向消费端的生成产物

apps/
  docs/                          # RDesign Flutter 文档站
  figma-token-sync-plugin/        # Figma Variables 同步插件

packages/
  design-system-core/             # parser / exporter / MCP 核心层
  flutter/rdesign_component/      # Flutter 组件库
  theme-generator/                # 文档站依赖的主题生成器
```

## 分层定位

### 文档事实源层

- `docs/design-system/rules.md`：全局规则、权威顺序、下游消费契约。
- `docs/design-system/tokens.md`：设计 token 真相，供 parser、MCP 和必要的 token_entries 兼容流程读取。
- `docs/design-system/components/*.md`：组件级规则、Figma 绑定、代码绑定、变体、示例和使用建议。

### 解析与服务层

- `packages/design-system-core/src/parser/`：解析 rules、tokens、components 文档。
- `packages/design-system-core/src/exporters/`：后续导出 AI/CSS/Flutter/文档站等消费数据。
- `packages/design-system-core/src/mcp/`：后续承载 Design System MCP 查询服务。
- `packages/design-system-core/src/index.ts`：解析层源码入口。

### 应用层

- `apps/figma-token-sync-plugin/`：Figma 插件源码，负责从 Figma Variables 同步数据到本仓库。
- `apps/docs/`：组件库文档站源码。

### 组件与主题层

- `packages/flutter/rdesign_component/`：Flutter 组件库源码。
- `packages/flutter/rdesign_component/lib/src/theme/tokens/`：Figma 插件直接同步生成的 Flutter 主题 token。
- `packages/theme-generator/`：文档站使用的主题生成器 WebComponent。

### 产物层

- `artifacts/css/`：CSS 主题变量生成产物。

## 常用命令

```bash
npm run typecheck
npm run build
npm run docs:build
npm run figma:check
npm run figma:build
```

## Parser Usage

推荐通过 `packages/design-system-core` 统一读取事实源，而不是消费端各自解析 Markdown。

```ts
import { loadDesignSystem } from './packages/design-system-core/dist/index.js';

const snapshot = await loadDesignSystem({
  rootDir: '/path/to/hl-scene-design-system'
});
```

默认读取路径是 `docs/design-system`。如果需要读取其他文档目录，可以显式传入：

```ts
const snapshot = await loadDesignSystem({
  rootDir: '/path/to/hl-scene-design-system',
  docsDir: 'docs/design-system'
});
```

## 维护原则

1. 单一事实源：规则、token、组件事实只维护在 `docs/design-system/`。
2. 一组件一文件：组件事实来自 `docs/design-system/components/*.md`。
3. 生成产物不手写：`artifacts/` 和 Flutter token 文件由工具生成。
4. 应用不反写事实源：文档站、Figma 插件、AI agent、MCP 都是消费方或同步方。
5. 解析逻辑集中：Markdown/YAML 解析统一放在 `packages/design-system-core`。
