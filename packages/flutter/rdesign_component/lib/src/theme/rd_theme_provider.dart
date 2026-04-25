import 'package:flutter/widgets.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';
import 'rd_theme_registry.dart';

/// 多项目主题注入 Widget
///
/// 将指定 [projectId] 对应的主题注入 Widget 树，子组件通过
/// `TDTheme.of(context)` 或 `RDColors.of(context)` 读取主题。
///
/// 适用于在同一 App 内局部切换品牌主题的场景。
///
/// 示例：
/// ```dart
/// RDThemeProvider(
///   projectId: 'mrj',
///   child: TDButton(text: '预约', theme: TDButtonTheme.primary),
/// )
/// ```
class RDThemeProvider extends StatelessWidget {
  const RDThemeProvider({
    super.key,
    required this.projectId,
    required this.child,
  });

  /// 项目标识符，如 'default'、'sl'、'mrj'
  final String projectId;

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final themeData = RDThemeRegistry.get(projectId);
    if (themeData == null) {
      debugPrint('[RDThemeProvider] 未找到 projectId="$projectId" 的主题，回退到默认主题');
    }
    return TDTheme(
      data: themeData ?? TDTheme.defaultData(),
      child: child,
    );
  }
}
