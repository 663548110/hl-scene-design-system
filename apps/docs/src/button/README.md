---
title: Button 按钮
description: 用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
spline: base
isComponent: true
---

<span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20lines-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20functions-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20statements-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20branches-83%25-blue" /></span>
## 引入

在rdesign_flutter/rdesign_flutter.dart中有所有组件的路径。

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';
```

## 代码演示

[td_button_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_button_page.dart)

### 1 组件类型

基础按钮

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  @Demo(group: 'button')
  RDButton _buildPrimaryFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildLightFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.light,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDefaultFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.defaultTheme,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildPrimaryStrokeButton(BuildContext context) {
    return const RDButton(
      text: '描边按钮',
      size: RDButtonSize.large,
      type: RDButtonType.outline,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildPrimaryTextButton(BuildContext context) {
    return const RDButton(
      text: '文字按钮',
      size: RDButtonSize.large,
      type: RDButtonType.text,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

图标按钮

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildRectangleIconButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      icon: RDIcons.app,
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildSquareIconButton(BuildContext context) {
    return const RDButton(
      icon: RDIcons.app,
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.square,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildLoadingIconButton(BuildContext context) {
    return RDButton(
      text: '加载中',
      iconWidget: RDLoading(
        size: RDLoadingSize.small,
        icon: RDLoadingIcon.circle,
        iconColor: RDTheme.of(context).whiteColor1,
      ),
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

幽灵按钮

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildPrimaryGhostButton(BuildContext context) {
    return const RDButton(
      text: '幽灵按钮',
      size: RDButtonSize.large,
      type: RDButtonType.ghost,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDangerGhostButton(BuildContext context) {
    return const RDButton(
      text: '幽灵按钮',
      size: RDButtonSize.large,
      type: RDButtonType.ghost,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.danger,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDefaultGhostButton(BuildContext context) {
    return const RDButton(
      text: '幽灵按钮',
      size: RDButtonSize.large,
      type: RDButtonType.ghost,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.defaultTheme,
    );
  }</pre>

</td-code-block>
                

组合按钮

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCombinationButtons(BuildContext context) {
    return const Padding(
        padding: EdgeInsets.symmetric(horizontal: 16),
        child: Row(
          // spacing: 16,
          children: [
            Expanded(
              child: RDButton(
                text: '填充按钮',
                size: RDButtonSize.large,
                type: RDButtonType.fill,
                shape: RDButtonShape.rectangle,
                theme: RDButtonTheme.light,
              ),
            ),
            SizedBox(width: 16),
            Expanded(
              child: RDButton(
                text: '填充按钮',
                size: RDButtonSize.large,
                type: RDButtonType.fill,
                shape: RDButtonShape.rectangle,
                theme: RDButtonTheme.primary,
              ),
            ),
          ],
        ));
  }</pre>

</td-code-block>
                

通栏按钮
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildFilledFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      icon: RDIcons.app,
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      theme: RDButtonTheme.primary,
      isBlock: true,
    );
  }</pre>

</td-code-block>
                                  
### 1 组件状态

按钮禁用状态

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDisablePrimaryFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
      disabled: true,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDisableLightFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.light,
      disabled: true,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDisableDefaultFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.defaultTheme,
      disabled: true,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDisablePrimaryStrokeButton(BuildContext context) {
    return const RDButton(
      text: '描边按钮',
      size: RDButtonSize.large,
      type: RDButtonType.outline,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
      disabled: true,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDisablePrimaryTextButton(BuildContext context) {
    return const RDButton(
      text: '文字按钮',
      size: RDButtonSize.large,
      type: RDButtonType.text,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
      disabled: true,
    );
  }</pre>

</td-code-block>
                
### 1 组件主题

按钮尺寸

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildLargeButton(BuildContext context) {
    return const RDButton(
      text: '按钮48',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildMediumButton(BuildContext context) {
    return const RDButton(
      text: '按钮40',
      size: RDButtonSize.medium,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildSmallButton(BuildContext context) {
    return const RDButton(
      text: '按钮32',
      size: RDButtonSize.small,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildExtraSmallButton(BuildContext context) {
    return const RDButton(
      text: '按钮28',
      size: RDButtonSize.extraSmall,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

按钮形状

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  @Demo(group: 'button')
  RDButton _buildPrimaryFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildSquareIconButton(BuildContext context) {
    return const RDButton(
      icon: RDIcons.app,
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.square,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildRoundButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.round,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildCircleButton(BuildContext context) {
    return const RDButton(
      icon: RDIcons.app,
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.circle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildFilledButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.filled,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

按钮主题

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDefaultFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.defaultTheme,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDefaultStrokeButton(BuildContext context) {
    return const RDButton(
      text: '描边按钮',
      size: RDButtonSize.large,
      type: RDButtonType.outline,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.defaultTheme,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDefaultTextButton(BuildContext context) {
    return const RDButton(
      text: '文字按钮',
      size: RDButtonSize.large,
      type: RDButtonType.text,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.defaultTheme,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  @Demo(group: 'button')
  RDButton _buildPrimaryFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildPrimaryStrokeButton(BuildContext context) {
    return const RDButton(
      text: '描边按钮',
      size: RDButtonSize.large,
      type: RDButtonType.outline,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildPrimaryTextButton(BuildContext context) {
    return const RDButton(
      text: '文字按钮',
      size: RDButtonSize.large,
      type: RDButtonType.text,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.primary,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDangerFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.danger,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDangerStrokeButton(BuildContext context) {
    return const RDButton(
      text: '描边按钮',
      size: RDButtonSize.large,
      type: RDButtonType.outline,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.danger,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildDangerTextButton(BuildContext context) {
    return const RDButton(
      text: '文字按钮',
      size: RDButtonSize.large,
      type: RDButtonType.text,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.danger,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildLightFillButton(BuildContext context) {
    return const RDButton(
      text: '填充按钮',
      size: RDButtonSize.large,
      type: RDButtonType.fill,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.light,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildLightStrokeButton(BuildContext context) {
    return const RDButton(
      text: '描边按钮',
      size: RDButtonSize.large,
      type: RDButtonType.outline,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.light,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDButton _buildLightTextButton(BuildContext context) {
    return const RDButton(
      text: '文字按钮',
      size: RDButtonSize.large,
      type: RDButtonType.text,
      shape: RDButtonShape.rectangle,
      theme: RDButtonTheme.light,
    );
  }</pre>

</td-code-block>
                


## API
### RDButton
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| activeStyle | RDButtonStyle? | - | 自定义点击样式，有则优先用它，没有则根据 type 和 theme 选取 |
| child | Widget? | - | 自控件 |
| disabled | bool | false | 禁止点击 |
| disableStyle | RDButtonStyle? | - | 自定义禁用样式，有则优先用它，没有则根据 type 和 theme 选取 |
| disableTextStyle | TextStyle? | - | 自定义不可点击状态文本样式 |
| gradient | Gradient? | - | 渐变背景色，优先级高于backgroundColor |
| height | double? | - | 自定义高度 |
| icon | IconData? | - | 图标icon |
| iconPosition | RDButtonIconPosition? | RDButtonIconPosition.left | 图标位置 |
| iconTextSpacing | double? | - | 自定义图标与文本之间距离 |
| iconWidget | Widget? | - | 自定义图标 icon 控件 |
| isBlock | bool | false | 是否为通栏按钮 |
| key |  | - |  |
| margin | EdgeInsetsGeometry? | - | 自定义 margin |
| onLongPress | RDButtonEvent? | - | 长按事件 |
| onTap | RDButtonEvent? | - | 点击事件 |
| padding | EdgeInsetsGeometry? | - | 自定义 padding |
| shape | RDButtonShape | RDButtonShape.rectangle | 形状：圆角，胶囊，方形，圆形，填充 |
| size | RDButtonSize | RDButtonSize.medium | 尺寸 |
| style | RDButtonStyle? | - | 自定义样式，有则优先用它，没有则根据 type 和 theme 选取。如果设置了 style，则 activeStyle 和 disableStyle 也应该设置 |
| text | String? | - | 文本内容 |
| textStyle | TextStyle? | - | 自定义可点击状态文本样式 |
| theme | RDButtonTheme? | - | 主题 |
| type | RDButtonType | RDButtonType.fill | 类型：填充，描边，文字 |
| width | double? | - | 自定义宽度 |

```
```
 ### RDButtonStyle
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| backgroundColor | Color? | - | 背景颜色 |
| frameColor | Color? | - | 边框颜色 |
| frameWidth | double? | - | 边框宽度 |
| gradient | Gradient? | - | 渐变背景色 |
| radius | BorderRadiusGeometry? | - | 自定义圆角 |
| textColor | Color? | - | 文字颜色 |


#### 工厂构造方法

| 名称  | 说明 |
| --- |  --- |
| RDButtonStyle.generateFillStyleByTheme  | 生成不同主题的填充按钮样式 |
| RDButtonStyle.generateGhostStyleByTheme  | 生成不同主题的幽灵按钮样式 |
| RDButtonStyle.generateOutlineStyleByTheme  | 生成不同主题的描边按钮样式 |
| RDButtonStyle.generateTextStyleByTheme  | 生成不同主题的文本按钮样式 |


  