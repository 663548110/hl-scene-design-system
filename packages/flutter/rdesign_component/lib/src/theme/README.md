# RDesign Theme 主题系统

基于 TDesign Flutter 的多项目主题封装层，支持多品牌色、深色模式、无 context 颜色访问。

---

## 目录结构

```
theme/
├── rd_theme.dart              # RDTheme / RDThemeData 别名（re-export TDTheme）
├── rd_theme_registry.dart     # 多项目主题注册表（核心）
├── rd_default_theme.dart      # RDDefaultTheme 别名
├── rd_colors_accessor.dart    # 无 context 颜色访问器 RDColors
├── rd_colors.dart             # re-export TDColors
├── rd_fonts.dart              # re-export TDFonts
├── rd_font_family.dart        # re-export TDFontFamily
├── rd_radius.dart             # re-export TDRadius
├── rd_shadows.dart            # re-export TDShadows
├── rd_spacers.dart            # re-export TDSpacers
└── resource_delegate.dart     # RDResourceManager 别名
```

> 业务 token 全部从 Figma 同步生成，并直接提交到 `lib/src/theme/tokens/`。组件库不再通过独立 `rdesign_theme_tokens` Git 依赖读取主题。

---

## 快速开始

在 `main.dart` 注册项目主题，只需调用一次：

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';

void main() {
  RDThemeRegistry.setup(RDProject.defaultTheme);
  runApp(const MyApp());
}
```

之后直接通过 `RDColors` 访问颜色，无需任何 Widget 包裹。

---

## RDColors — 颜色访问

在 `build` 方法中调用 `RDColors.of(context)`，走 Flutter 标准 InheritedWidget 机制，深色模式切换时 Widget 自动重建：

```dart
@override
Widget build(BuildContext context) {
  final colors = RDColors.of(context);
  return Column(
    children: [
      Container(color: colors.brand),
      Container(color: colors.bgPage),
      Text('主要文字', style: TextStyle(color: colors.textPrimary)),
    ],
  );
}
```

### 可用颜色一览

| getter | 说明 |
|--------|------|
| `brand` / `brandHover` / `brandActive` / `brandFocus` / `brandDisabled` / `brandLight` | 品牌色语义 |
| `textPrimary` / `textSecondary` / `textPlaceholder` / `textDisabled` / `textWhite` | 文字色 |
| `bgPage` / `bgContainer` / `bgComponent` | 背景色 |
| `success` / `warning` / `error` | 功能色 |
| `border` / `borderStrong` | 边框色 |
| `brand1` ~ `brand10` | 品牌色色阶 |

---

## 深色模式

### 跟随系统（默认）

无需任何配置，`RDColors.of(context)` 通过 `TDTheme.of(context)` 自动跟随系统亮度，Widget 会在模式切换时自动重建。

### 手动覆盖

```dart
RDThemeRegistry.isDarkMode = true;   // 强制深色
RDThemeRegistry.isDarkMode = false;  // 强制浅色
RDThemeRegistry.isDarkMode = null;   // 恢复跟随系统
```

手动切换后，使用 `RDColors.of(context)` 的 Widget 会随下一次 build 自动更新。

---

## 多项目主题

### Figma 同步主题

组件库启动时会读取 `lib/src/theme/tokens/rdesign_theme_tokens.dart` 中的 `rdThemeTokenSpecs` 并注册其中所有主题。当前可用主题不要在组件库中手写维护，请通过 `RDThemeRegistry.registeredProjectIds` 获取。

### 添加新品牌或同步 Figma 主题

新的主题不通过手写组件库源码接入，而是由 Figma 插件同步生成到 `lib/src/theme/tokens/`。

**第一步：启动时选择生成主题**

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';

void main() {
  RDThemeRegistry.setup(RDProject.defaultTheme);
  runApp(const MyApp());
}
```

也可以继续用字符串 key：`RDThemeRegistry.setup('sl')`。设计师在 Figma 更新 Variables 后，只需要通过插件同步仓库，组件库源码内的 token 文件会随提交一起更新。

如果 Figma Variables 里存在多套 `Light/Dark` mode，例如 `Light/Dark`、`SL Light/SL Dark`、`Mrj Light/Mrj Dark`，生成文件会同时提供多组常量和 `rdThemeTokenSpecs` 注册列表。

---

### 查询已注册的项目

```dart
print(RDThemeRegistry.registeredProjectIds); // ['default', 'sl', ...]
print(RDThemeRegistry.get('default')); // TDThemeData?
```

---

## 生成主题文件格式

`lib/src/theme/tokens/rdesign_theme_tokens.dart` 会生成入口和主题规格列表：

```dart
export 'default_tokens.dart';

const List<RDThemeTokenSpec> rdThemeTokenSpecs = [
  RDThemeTokenSpec(
    id: 'default',
    darkId: 'defaultDark',
    lightJson: rdDefaultLightJson,
    darkJson: rdDefaultDarkJson,
  ),
];
```

常量名前缀由主题 ID 生成；默认 `Light/Dark` 使用插件里的 `themeId`，其它 mode pair 会根据前缀生成，例如 `SL Light/Dark` -> `rdSlLightJson` / `rdSlDarkJson`。

---

## 与 TDesign 的关系

| RD 类型 | 对应 TD 类型 | 说明 |
|---------|-------------|------|
| `RDTheme` | `TDTheme` | typedef 别名 |
| `RDThemeData` | `TDThemeData` | typedef 别名 |
| `RDDefaultTheme` | `TDDefaultTheme` | typedef 别名 |
| `RDResourceManager` | `TDResourceManager` | typedef 别名 |
| `RDThemeRegistry` | — | RD 新增，多项目注册表 |
| `RDColors` | — | RD 新增，无 context 颜色访问器 |

其余文件（`rd_fonts`、`rd_radius`、`rd_shadows`、`rd_spacers`、`rd_font_family`）均为 re-export，直接透传 TDesign 能力，用法与 TD 完全一致。

---

## 注意事项

- `RDThemeRegistry.setup` 建议在 `runApp` 之前调用；未调用时会优先使用 Figma 同步的 `default` 主题。
- 深色模式下 `RDColors` 自动切换，无需手动判断。
- 不要在业务代码中硬编码颜色值，始终通过 `RDColors` 或 `TDTheme.of(context)` 访问。
- 不要手写 `tokens/*_tokens.dart`；所有业务 token 必须由 Figma 插件同步生成。
- 不要直接使用 `TD*` 组件，业务侧统一使用 `RD*` 组件。
