# TDesign Theme Generator 项目概述

## 项目简介

TDesign 主题配置生成器，以 Vue 2 Web Component 形式（`<td-theme-generator />`）嵌入组件库文档站点，提供实时主题定制和预览能力。通过 `vue-cli-service build --target wc` 打包为自定义元素。

## 技术栈

- Vue 2.7 + Options API
- Less 预处理器
- tvision-color（腾讯色彩算法库，用于色板生成）
- cssbeautify（CSS 格式化）
- tdesign-vue（UI 组件依赖）
- tdesign-icons-vue（图标）
- raw-loader（内联 CSS 文件为字符串）

## 目录结构

```
src/
├── Generator.vue                          # 入口组件，组装 FloatDock + PanelDrawer
├── main.js                                # 开发模式入口
├── styles/
│   ├── reset.min.css                      # 样式重置
│   └── tdesign.min.css                    # TDesign 基础样式（内联到 Web Component）
│
├── float-dock/                            # 底部浮动操作栏
│   ├── index.vue                          # 可拖拽 Dock，包含主题切换/自定义/导出/重置按钮
│   ├── components/
│   │   └── RecommendThemes/               # 推荐主题选择面板
│   └── svg/                               # Dock 图标（Palette/Adjust/Download/Recover/Setting）
│
├── panel-drawer/                          # 右侧抽屉面板
│   ├── index.vue                          # Drawer 容器，管理 5 个 Tab 面板的切换
│   └── components/
│       ├── StickyThemeDisplay/            # 顶部主题信息展示
│       └── SwitchTabs/                    # Tab 切换栏（颜色/字体/圆角/阴影/尺寸）
│
├── color-panel/                           # 🎨 颜色配置面板
│   ├── index.vue                          # 品牌色 + 功能色（success/error/warning）+ 中性色
│   ├── built-in/
│   │   ├── color-preset.js               # 预设颜色（腾讯蓝、微信绿等 15 种）
│   │   └── color-map.js                  # 功能色 Token 映射（gray/success/error/warning）
│   ├── components/
│   │   ├── ColorCollapse/                # 可折叠的颜色区块
│   │   └── ColorColumn/                  # 色阶展示列
│   └── svg/                              # 预设颜色缩略图（15 个 SVG）
│
├── font-panel/                            # 🔤 字体配置面板
│   ├── index.vue                          # 字号 + 行高 + 字体颜色
│   ├── built-in/
│   │   ├── font-map.js                   # 字号 Token 列表 + 5 级阶梯预设 + 字体颜色 Token
│   │   └── line-height-map.js            # 行高 Token 映射
│   └── components/
│       ├── FontSizeAdjust.vue            # 字号调节器
│       ├── LineHeightAdjust.vue          # 行高调节器
│       ├── FontColorAdjust.vue           # 字体颜色调节器
│       ├── FontColorSvg.vue             # 字体颜色图标
│       └── LineHeightSvg.vue            # 行高图标
│
├── radius-panel/                          # 📐 圆角配置面板
│   ├── index.vue                          # 6 个圆角 Token + 5 级预设 + 自定义
│   └── built-in/
│       └── radius-map.js                 # 圆角 Token 列表 + 5 级阶梯数组
│
├── shadow-panel/                          # 🌑 阴影配置面板
│   ├── index.vue                          # shadow-1/2/3 三级阴影 + 5 级深度预设
│   ├── built-in/
│   │   └── shadow-map.js                 # 阴影预设数据（超轻/轻/默认/深/超深）
│   └── components/
│       ├── ShadowCard.vue                # 阴影预览卡片
│       ├── ShadowEditor.vue              # 阴影编辑器
│       └── ShadowLayer.vue               # 阴影图层
│
├── size-panel/                            # 📏 尺寸配置面板
│   ├── index.vue                          # 基础尺寸 + 组件大小/边距/间距
│   ├── built-in/
│   │   └── size-map.js                   # 尺寸 Token 映射（16 级基础尺寸 + 5 类语义尺寸）
│   ├── components/
│   │   ├── SizeAdjust.vue                # 尺寸调节器
│   │   └── SizeDisplay.vue               # 尺寸展示
│   └── svg/                              # 尺寸相关图标（13 个 SVG）
│
└── common/                                # 公共模块
    ├── components/
    │   ├── index.js                       # 统一导出
    │   ├── Collapse/                     # 通用折叠面板
    │   ├── ColorPicker/                  # 颜色选择器
    │   ├── SegmentSelection/             # 分段选择器（用于预设档位切换）
    │   └── SizeSlider/                   # 尺寸滑块
    │
    ├── i18n/
    │   ├── index.js                       # 语言 mixin（根据 URL 自动切换中英文）
    │   ├── zh-CN.js                      # 中文语言包
    │   └── en-US.js                      # 英文语言包
    │
    ├── themes/
    │   ├── index.js                       # 统一导出
    │   ├── core.js                       # ⭐ 核心逻辑（详见下方）
    │   ├── store.js                      # Vue.observable 状态管理
    │   ├── iframe.js                     # 移动端 iframe 主题同步
    │   └── built-in/
    │       ├── index.js                  # 内置主题定义（TDesign/TCloud）
    │       ├── css/
    │       │   ├── vars.css              # 生成器自身使用的 CSS 变量
    │       │   ├── web/
    │       │   │   ├── TDesign/          # TDesign 默认主题（light.css / dark.css / extra.css）
    │       │   │   └── TCloud/           # 腾讯云主题（light.css / dark.css / extra.css）
    │       │   └── mobile/
    │       │       └── TDesign/          # 移动端 TDesign 主题
    │       └── svg/                      # 主题缩略图（11 个 SVG）
    │
    └── utils/
        ├── index.js                       # DOM 工具函数
        └── animation.js                  # Canvas 动画（颜色选择器彩虹效果）
```

## 核心机制

### 1. 颜色系统（core.js）

色板生成基于 `tvision-color` 库：

- `generateBrandPalette(hex, remainInput)` — 从一个主色生成 10 级品牌色阶
  - `remainInput=true`：保留用户输入的颜色作为主色（保留输入模式）
  - `remainInput=false`：由算法智能推荐最佳主色位置（智能推荐模式）
  - 返回 `{ lightPalette, lightBrandIdx, darkPalette, darkBrandIdx }`
- `generateFunctionalPalette(hex, step)` — 生成功能色色阶（success/error/warning）
- `generateNeutralPalette(hex, isRelated)` — 生成中性色色阶，可关联品牌色

品牌色 Token 映射规则（根据 brandIdx 动态计算）：
```
--td-brand-color-light    → idx 1
--td-brand-color-focus    → idx 2（移动端为 1）
--td-brand-color-disabled → idx 3
--td-brand-color-hover    → idx brandIdx - 1（仅 Web）
--td-brand-color          → idx brandIdx
--td-brand-color-active   → idx brandIdx + 1（最大不超过 brandIdx）
```

### 2. Token 修改机制

所有样式通过三个 `<style>` 标签管理：
- `#custom-theme` — 亮色模式 Token
- `#custom-theme-dark` — 暗色模式 Token
- `#custom-theme-extra` — 通用 Token（圆角、阴影、尺寸等）

修改方式：通过正则替换 `<style>` 标签的 `textContent`：
```js
modifyToken(tokenName, newVal)
// 内部：styleSheet.textContent.replace(`${tokenName}: ${currentVal}`, `${tokenName}: ${newVal}`)
```

### 3. 状态管理（store.js）

使用 `Vue.observable` 实现响应式状态：
```js
themeStore = {
  device: 'web' | 'mobile',
  theme: { name, enName, value, css: { light, dark, extra } },
  brandColor: '#0052D9',
  refreshId: 0,  // 强制刷新组件
}
```

### 4. 持久化

- `localStorage['custom-theme-options']` — 用户选项（当前主题名、颜色、圆角档位等）
- `localStorage['custom-theme-tokens']` — 用户自定义的 Token 值

页面加载时通过 `applyTokenFromLocal()` 恢复用户上次的自定义。

### 5. 导出（exportCustomStyleSheet）

将三个样式表合并为一个 CSS 文件，支持三种格式：
- Web：`:root` / `:root[theme-mode="dark"]`
- 小程序：`page, .page` + `@media (prefers-color-scheme)`
- uni-app：同小程序但增加 `#ifdef H5` 条件编译

用 `cssbeautify` 格式化后触发下载。

### 6. 亮暗模式

通过 MutationObserver 监听 `<html theme-mode="dark">` 属性变化，自动切换对应样式表。

### 7. iframe 同步（iframe.js）

移动端文档站通过 iframe 预览组件，需要将主题变化同步到 iframe 内部：
- 监听亮暗模式变化 → 同步 iframe 的 `theme-mode` 属性
- 监听样式 Token 变化 → 同步 iframe 内的 `<style>` 标签
- 支持嵌套 iframe（微信小程序预览场景）

## 内置 Token 体系

| 类别 | Token 前缀 | 数量 | 预设档位 |
|------|-----------|------|---------|
| 品牌色 | `--td-brand-color-{1~10}` | 10 | 由算法生成 |
| 功能色 | `--td-{success,error,warning}-color-{1~10}` | 30 | 由算法生成 |
| 中性色 | `--td-gray-color-{1~14}` | 14 | 由算法生成，可关联品牌色 |
| 字号 | `--td-font-size-{type}-{size}` | 16 | 5 级（超小号~特大号） |
| 字体颜色 | `--td-text-color-{type}` | 7 | — |
| 圆角 | `--td-radius-{small~circle}` | 6 | 5 级（全直角~超大） |
| 阴影 | `--td-shadow-{1~3}` | 3 | 5 级（超轻~超深） |
| 基础尺寸 | `--td-size-{1~16}` | 16 | — |
| 组件大小 | `--td-comp-size-{xxxs~xxxxxl}` | 11 | 引用基础尺寸 |
| 组件边距 | `--td-comp-paddingLR/TB-{xxs~xxl}` | 14 | 引用基础尺寸 |
| 弹出层边距 | `--td-pop-padding-{s~xxl}` | 5 | 引用基础尺寸 |
| 组件间距 | `--td-comp-margin-{xxs~xxxxl}` | 9 | 引用基础尺寸 |

## 预设颜色

- 默认色：腾讯蓝 `#0052D9`、风信子蓝 `#0894FA`、金花茶黄 `#F3B814`
- 推荐色：珙桐绿、鸢尾绿、花丹蓝、百子莲紫、玉兰粉、豆衫红、蔷薇红、万寿菊橙（共 8 种）
- 场景色：微信绿 `#07C160`、腾云黑 `#262626`、文旅紫 `#623BFF`、政务红 `#EE1C25`

## 内置主题

- TDesign（默认）— 品牌色 `#0052D9`，含 Web + Mobile 版本
- TCloud（腾讯云）— 品牌色 `#006EFF`，仅 Web 版本

## 构建命令

```bash
npm run dev          # 开发模式
npm run build        # 构建为 Web Component（td-theme-generator）
npm run build:watch  # 构建 + 热更新
```

## 使用方式

```js
import '@tdesign/theme-generator';
```
```html
<td-theme-generator />
<!-- 移动端 -->
<td-theme-generator device="mobile" />
```
