# Figma Token Sync Plugin

这个目录是 HL Scene Design System 的 Figma 变量同步插件源码。

插件负责从当前 Figma 文件读取 Variables，并同步到 `663548110/hl-scene-design-system`：

- `packages/theme-generator/src/common/themes/tokens/theme.css` 与 `packages/theme-generator/src/common/themes/tokens/themes/*.css`：CSS 主题入口与分主题文件。
- `packages/flutter/rdesign_component/lib/src/theme/tokens/rdesign_theme_tokens.dart`：Flutter 组件库直接使用的主题 token 注册文件。

组件级 token 默认不会进入全局主题产物；组件规则继续由 `docs/design-system/components/*.md` 维护。

## 目录说明

- `src/`：插件主线程、UI 与 token/artifact 生成逻辑。
- `dist/`：根 `manifest.json` 使用的构建产物。
- `token/manifest.json`：兼容当前 Figma 开发插件加载路径。
- `token/dist/`：由根目录构建脚本同步生成，供 `token/manifest.json` 使用。

## 本地开发

```bash
npm install
npm run check
npm run build
```

也可以在仓库根目录运行：

```bash
npm run figma:check
npm run figma:build
```

在 Figma 里加载插件：

1. 打开 `Plugins -> Development -> Import plugin from manifest...`
2. 推荐选择 `apps/figma-token-sync-plugin/token/manifest.json`
3. 如果需要直接使用根入口，也可以选择 `apps/figma-token-sync-plugin/manifest.json`

## GitHub Token

插件使用 GitHub Contents API 写入文件。建议使用最小权限 Personal Access Token，只授予目标仓库内容写入权限。

Token 会保存到 Figma `clientStorage`，不会写入本仓库。清空插件里的 GitHub Token 输入框会删除本机已保存 token。

## 沙箱兼容

构建目标保持 ES5，避免使用 Figma 插件沙箱不稳定或不支持的现代 API。
