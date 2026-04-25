import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

/// 颜色访问器，从 Widget 树读取当前主题颜色，能感知深色模式和 Widget 重建。
///
/// 在 build 方法中通过 [RDColors.of] 获取实例：
/// ```dart
/// @override
/// Widget build(BuildContext context) {
///   final colors = RDColors.of(context);
///   return Container(color: colors.brand);
/// }
/// ```
class RDColors {
  const RDColors._(this._theme);

  final TDThemeData _theme;

  /// 从 context 读取当前主题，返回颜色实例。
  static RDColors of(BuildContext context) => RDColors._(TDTheme.of(context));

  // ── 品牌色 ───────────────────────────────────────────────
  Color get brand => _theme.brandNormalColor;
  Color get brandHover => _theme.brandHoverColor;
  Color get brandActive => _theme.brandClickColor;
  Color get brandFocus => _theme.brandFocusColor;
  Color get brandDisabled => _theme.brandDisabledColor;
  Color get brandLight => _theme.brandLightColor;

  // ── 文字色 ───────────────────────────────────────────────
  Color get textPrimary => _theme.fontGyColor1;
  Color get textSecondary => _theme.fontGyColor2;
  Color get textPlaceholder => _theme.fontGyColor3;
  Color get textDisabled => _theme.fontGyColor4;
  Color get textWhite => _theme.fontWhColor1;

  // ── 背景色 ───────────────────────────────────────────────
  Color get bgPage => _theme.grayColor1;
  Color get bgContainer => _theme.whiteColor1;
  Color get bgComponent => _theme.grayColor2;

  // ── 功能色 ───────────────────────────────────────────────
  Color get success => _theme.successNormalColor;
  Color get warning => _theme.warningNormalColor;
  Color get error => _theme.errorNormalColor;

  // ── 边框色 ───────────────────────────────────────────────
  Color get border => _theme.grayColor4;
  Color get borderStrong => _theme.grayColor6;

  // ── 品牌色色阶 ───────────────────────────────────────────
  Color get brand1 => _theme.brandColor1;
  Color get brand2 => _theme.brandColor2;
  Color get brand3 => _theme.brandColor3;
  Color get brand4 => _theme.brandColor4;
  Color get brand5 => _theme.brandColor5;
  Color get brand6 => _theme.brandColor6;
  Color get brand7 => _theme.brandColor7;
  Color get brand8 => _theme.brandColor8;
  Color get brand9 => _theme.brandColor9;
  Color get brand10 => _theme.brandColor10;
}
