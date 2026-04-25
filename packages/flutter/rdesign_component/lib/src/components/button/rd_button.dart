import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

// re-export 枚举和 typedef，业务侧无需改 import
export 'package:tdesign_flutter/src/components/button/td_button.dart'
    show
        TDButton,
        TDButtonSize,
        TDButtonType,
        TDButtonShape,
        TDButtonTheme,
        TDButtonStatus,
        TDButtonIconPosition,
        TDButtonEvent;
export 'package:tdesign_flutter/src/components/button/td_button_style.dart';

// RD 前缀别名 — 业务侧统一使用 RD 前缀
typedef RDButtonSize = TDButtonSize;
typedef RDButtonType = TDButtonType;
typedef RDButtonShape = TDButtonShape;
typedef RDButtonTheme = TDButtonTheme;
typedef RDButtonStatus = TDButtonStatus;
typedef RDButtonIconPosition = TDButtonIconPosition;
typedef RDButtonEvent = TDButtonEvent;

/// RDButton - 基于 TDButton 的二次封装
/// 当前与 TD 默认样式完全一致，需要定制时参考 .kiro/steering/rdesign-component-guide.md
class RDButton extends StatelessWidget {
  const RDButton({
    Key? key,
    this.text,
    this.size = TDButtonSize.medium,
    this.type = TDButtonType.fill,
    this.shape = TDButtonShape.rectangle,
    this.theme,
    this.child,
    this.disabled = false,
    this.isBlock = false,
    this.style,
    this.activeStyle,
    this.disableStyle,
    this.textStyle,
    this.disableTextStyle,
    this.width,
    this.height,
    this.onTap,
    this.icon,
    this.iconWidget,
    this.iconTextSpacing,
    this.onLongPress,
    this.margin,
    this.padding,
    this.iconPosition = TDButtonIconPosition.left,
    this.gradient,
  }) : super(key: key);

  final Widget? child;
  final String? text;
  final bool disabled;
  final double? width;
  final double? height;
  final TDButtonSize size;
  final TDButtonType type;
  final TDButtonShape shape;
  final TDButtonTheme? theme;
  final TDButtonStyle? style;
  final TDButtonStyle? activeStyle;
  final TDButtonStyle? disableStyle;
  final TextStyle? textStyle;
  final TextStyle? disableTextStyle;
  final TDButtonEvent? onTap;
  final TDButtonEvent? onLongPress;
  final IconData? icon;
  final Widget? iconWidget;
  final double? iconTextSpacing;
  final TDButtonIconPosition? iconPosition;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final bool isBlock;
  final Gradient? gradient;

  @override
  Widget build(BuildContext context) {
    return TDButton(
      key: key,
      text: text,
      size: size,
      type: type,
      shape: shape,
      theme: theme,
      child: child,
      disabled: disabled,
      isBlock: isBlock,
      style: style,
      activeStyle: activeStyle,
      disableStyle: disableStyle,
      textStyle: textStyle,
      disableTextStyle: disableTextStyle,
      width: width,
      height: height,
      onTap: onTap,
      icon: icon,
      iconWidget: iconWidget,
      iconTextSpacing: iconTextSpacing,
      onLongPress: onLongPress,
      margin: margin,
      padding: padding,
      iconPosition: iconPosition,
      gradient: gradient,
    );
  }
}
