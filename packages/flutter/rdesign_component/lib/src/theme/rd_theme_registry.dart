import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter/scheduler.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import 'tokens/rdesign_theme_tokens.dart' as generated_theme_tokens;

/// 项目标识符枚举，避免字符串拼写错误。
///
/// 所有业务主题都来自 Figma 同步生成的本地 token 文件。
/// 新增主题优先使用 [RDThemeRegistry.registeredProjectIds] 动态读取。
enum RDProject {
  defaultTheme('default'),
  sl('sl'),
  slOrange('sl_orange'),
  mrj('mrj');

  /// 对应注册表 key（与 token JSON 顶层 key 保持一致）
  final String id;

  const RDProject(this.id);
}

/// 多项目主题注册表
///
/// 以 Map<String, TDThemeData> 形式维护所有已注册项目的主题数据。
/// 预注册 Figma 同步生成主题，支持运行时扩展。
///
/// 使用方式：
/// ```dart
/// // main.dart 启动时注册一次
/// RDThemeRegistry.setup(RDProject.defaultTheme);
///
/// // 任意地方直接取颜色，无需 context
/// RDColors.brand        // 品牌主色
/// RDColors.brandLight   // 品牌浅色
/// ```
class RDThemeRegistry {
  RDThemeRegistry._();

  static final Map<String, TDThemeData> _registry = _buildInitial();

  static String? _currentProjectId;

  /// 启动时调用一次，设置当前项目主题
  ///
  /// 支持枚举和字符串两种方式：
  /// ```dart
  /// RDThemeRegistry.setup(RDProject.defaultTheme); // 推荐，编译期检查
  /// RDThemeRegistry.setup('sl');                   // 兼容动态主题
  /// ```
  static void setup(Object project) {
    final id = project is RDProject ? project.id : project as String;
    if (_registry[id] == null) {
      debugPrint('[RDThemeRegistry] 警告：未找到 projectId="$id"，将使用默认主题');
    }
    _currentProjectId = id;
  }

  /// 当前激活的主题数据，自动跟随系统深色/浅色模式。
  ///
  /// - 浅色模式：返回 light TDThemeData
  /// - 深色模式：返回 dark TDThemeData（若 dark 未定义则回退到 light）
  ///
  /// 可通过 [isDarkMode] 手动覆盖，传 null 则跟随系统。
  static TDThemeData get currentTheme {
    final lightData = _currentProjectId != null
        ? (_registry[_currentProjectId!] ?? _fallbackTheme)
        : _fallbackTheme;

    if (_isDark) {
      return lightData.dark ?? lightData;
    }
    return lightData;
  }

  /// 判断当前是否为深色模式：
  /// 优先使用手动设置的 [isDarkMode]，否则跟随系统
  static bool get _isDark {
    if (_isDarkModeOverride != null) return _isDarkModeOverride!;
    final brightness =
        SchedulerBinding.instance.platformDispatcher.platformBrightness;
    return brightness == Brightness.dark;
  }

  static bool? _isDarkModeOverride;

  /// 深色模式变化通知器，监听它可在模式切换时自动重建 Widget。
  ///
  /// ```dart
  /// ValueListenableBuilder<bool?>(
  ///   valueListenable: RDThemeRegistry.isDarkModeNotifier,
  ///   builder: (context, _, child) {
  ///     return Container(color: RDColors.brand);
  ///   },
  /// )
  /// ```
  static final ValueNotifier<bool?> isDarkModeNotifier = ValueNotifier(null);

  /// 手动覆盖深色/浅色模式，传 null 则恢复跟随系统
  ///
  /// 适用于 App 内自定义主题切换（不跟随系统）的场景：
  /// ```dart
  /// RDThemeRegistry.isDarkMode = true;   // 强制深色
  /// RDThemeRegistry.isDarkMode = false;  // 强制浅色
  /// RDThemeRegistry.isDarkMode = null;   // 跟随系统
  /// ```
  static set isDarkMode(bool? value) {
    if (_isDarkModeOverride == value) return;
    _isDarkModeOverride = value;
    isDarkModeNotifier.value = value;
  }

  static bool? get isDarkMode => _isDarkModeOverride;

  static TDThemeData get _fallbackTheme {
    return _registry[RDProject.defaultTheme.id] ??
        (_registry.isNotEmpty ? _registry.values.first : TDTheme.defaultData());
  }

  static Map<String, TDThemeData> _buildInitial() {
    final map = <String, TDThemeData>{};

    for (final themeSpec in generated_theme_tokens.rdThemeTokenSpecs) {
      _registerBuiltIn(
        map,
        themeSpec.id,
        themeSpec.lightJson,
        themeSpec.darkJson,
        darkName: themeSpec.darkId,
      );
    }

    return map;
  }

  /// 将 light JSON 和 dark JSON 合并后调用 TDThemeData.fromJson
  static void _registerBuiltIn(
    Map<String, TDThemeData> map,
    String projectId,
    String lightJson,
    String darkJson, {
    String? darkName,
  }) {
    map[projectId] = _buildThemeDataFromJson(
      projectId,
      lightJson,
      darkJson,
      darkName: darkName,
    );
  }

  /// 从 Figma/design system 生成的 light/dark JSON 字符串注册主题。
  ///
  /// 推荐配合 `lib/src/theme/tokens/rdesign_theme_tokens.dart` 使用：
  ///
  /// ```dart
  /// RDThemeRegistry.registerFromJson(
  ///   rdGeneratedThemeId,
  ///   rdGeneratedLightJson,
  ///   rdGeneratedDarkJson,
  ///   darkName: rdGeneratedDarkThemeId,
  /// );
  /// RDThemeRegistry.setup(rdGeneratedThemeId);
  /// ```
  static TDThemeData registerFromJson(
    String projectId,
    String lightJson,
    String darkJson, {
    String? darkName,
  }) {
    final themeData = _buildThemeDataFromJson(
      projectId,
      lightJson,
      darkJson,
      darkName: darkName,
    );
    _registry[projectId] = themeData;
    return themeData;
  }

  static TDThemeData _buildThemeDataFromJson(
    String projectId,
    String lightJson,
    String darkJson, {
    String? darkName,
  }) {
    try {
      final lightMap = json.decode(lightJson) as Map<String, dynamic>;
      final darkMap = json.decode(darkJson) as Map<String, dynamic>;
      final merged = <String, dynamic>{...lightMap, ...darkMap};
      final mergedJson = json.encode(merged);
      final resolvedDarkName = darkName ?? '${projectId}Dark';
      final themeData = TDThemeData.fromJson(
        projectId,
        mergedJson,
        darkName: resolvedDarkName,
      );
      if (themeData != null) {
        return themeData;
      }
      debugPrint('[RDThemeRegistry] 警告：$projectId 主题解析失败，回退到默认主题');
    } catch (e) {
      debugPrint('[RDThemeRegistry] 警告：$projectId 主题初始化异常：$e，回退到默认主题');
    }

    return TDTheme.defaultData();
  }

  /// 注册或覆盖一个项目主题
  static void register(String projectId, TDThemeData themeData) {
    _registry[projectId] = themeData;
  }

  /// 获取指定项目的主题数据，不存在时返回 null
  static TDThemeData? get(String projectId) => _registry[projectId];

  /// 所有已注册的 projectId
  static Set<String> get registeredIds => _registry.keys.toSet();

  /// 所有已注册 projectId 的有序列表，适合用于主题选择器 UI。
  static List<String> get registeredProjectIds =>
      List<String>.unmodifiable(_registry.keys);
}
