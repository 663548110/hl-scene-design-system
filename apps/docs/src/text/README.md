---
title: Text 文本
description: 
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

[td_text_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_text_page.dart)

### 1 使用示例

系统Text:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSystemText(BuildContext context) {
    return Text(
      exampleTxt,
    );
  }</pre>

</td-code-block>
                                  

普通RDText:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildNormalRDText(BuildContext context) {
    return RDText(
      exampleTxt,
    );
  }</pre>

</td-code-block>
                                  

指定常用属性:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildGeneralProp(BuildContext context) {
    return RDText(
      exampleTxt,
      font: RDTheme.of(context).fontHeadlineLarge,
      textColor: RDTheme.of(context).brandNormalColor,
      backgroundColor: RDTheme.of(context).brandFocusColor,
    );
  }</pre>

</td-code-block>
                                  

style覆盖textColor,不覆盖font:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildStyleCoverColor(BuildContext context) {
    return RDText(
      exampleTxt,
      font: RDTheme.of(context).fontBodyLarge,
      textColor: RDTheme.of(context).brandNormalColor,
      style: TextStyle(color: RDTheme.of(context).errorNormalColor),
    );
  }</pre>

</td-code-block>
                                  

style覆盖textColor和font:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildStyleCoverColorAndFont(BuildContext context) {
    return RDText(
      exampleTxt,
      font: RDTheme.of(context).fontBodyLarge,
      textColor: RDTheme.of(context).brandNormalColor,
    );
  }</pre>

</td-code-block>
                                  

RDText.rich测试:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRichText(BuildContext context) {
    return RDText.rich(
      TextSpan(children: [
        RDTextSpan(
            text: 'RDTextSpan1',
            font: RDTheme.of(context).fontTitleExtraLarge,
            textColor: RDTheme.of(context).warningNormalColor,
            isTextThrough: true,
            lineThroughColor: RDTheme.of(context).brandNormalColor,
            style: TextStyle(color: RDTheme.of(context).errorNormalColor)),
        TextSpan(
            text: 'TextSpan2',
            style: TextStyle(
                fontSize: 14, color: RDTheme.of(context).brandNormalColor)),
        const WidgetSpan(
            child: Icon(
          RDIcons.setting,
          size: 24,
        )),
      ]),
      font: RDTheme.of(context).fontBodyLarge,
      textColor: RDTheme.of(context).brandNormalColor,
      style:
          TextStyle(color: RDTheme.of(context).errorNormalColor, fontSize: 32),
    );
  }</pre>

</td-code-block>
                                  

获取系统Text:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _getSystemText(BuildContext context) {
    return RDText(
      exampleTxt,
      backgroundColor: RDTheme.of(context).brandFocusColor,
    ).getRawText(context: context);
  }</pre>

</td-code-block>
                                  

中文居中:（带有英文可能不居中）
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVerticalCenterText(BuildContext context) {
    return RDText(
      '中华人民共和国腾讯科技',
      // font: Font(size: 100, lineHeight: 100),
      forceVerticalCenter: true,
      backgroundColor: RDTheme.of(context).brandFocusColor,
    );
  }</pre>

</td-code-block>
                                  

自定义内部padding:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCustomPaddingText(BuildContext context) {
    return RDTextConfiguration(
      paddingConfig: CustomTextPaddingConfig(),
      child: const CustomPaddingText(),
    );
  }</pre>

</td-code-block>
                                  

删除线:
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTextThrough(BuildContext context) {
    return RDText(exampleTxt, isTextThrough: true);
  }</pre>

</td-code-block>
                                  


## API
### RDText
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| backgroundColor | Color? | - | 背景颜色 |
| data | null | data | 以下系统 text 属性，释义请参考系统 [Text] 中注释 |
| font | Font? | - | 字体尺寸，包含 大小size 和 行高height |
| fontFamily | FontFamily? | - | 字体ttf |
| fontFamilyUrl | String? | - | 是否禁用懒加载 FontFamily 的能力 |
| fontWeight | FontWeight? | - | 字体粗细 |
| forceVerticalCenter | bool | false | 是否强制居中 |
| isInFontLoader | bool | false | 是否在 FontLoader 中使用 |
| isTextThrough | bool? | false | 是否是横线穿过样式（删除线） |
| key |  | - |  |
| lineThroughColor | Color? | - | 删除线颜色，对应 TestStyle 的 decorationColor |
| locale |  | - |  |
| maxLines |  | - |  |
| overflow |  | - |  |
| package | String? | - | 字体包名 |
| semanticsLabel |  | - |  |
| softWrap |  | - |  |
| strutStyle |  | - |  |
| style | TextStyle? | - | 自定义的 TextStyle，其中指定的属性，将覆盖扩展的外层属性 |
| textAlign |  | - |  |
| textColor | Color? | - | 文本颜色 |
| textDirection |  | - |  |
| textHeightBehavior |  | - |  |
| textScaleFactor |  | - |  |
| textWidthBasis |  | - |  |


#### 工厂构造方法

| 名称  | 说明 |
| --- |  --- |
| RDText.rich  | 富文本构造方法 |

```
```
 ### RDTextSpan
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children |  | - |  |
| context |  | - |  |
| font |  | - |  |
| fontFamily |  | - |  |
| fontWeight |  | - |  |
| isTextThrough |  | false |  |
| lineThroughColor |  | - |  |
| mouseCursor |  | - |  |
| onEnter |  | - |  |
| onExit |  | - |  |
| package |  | - |  |
| recognizer |  | - |  |
| semanticsLabel |  | - |  |
| style |  | - |  |
| text |  | - |  |
| textColor |  | - |  |

```
```
 ### RDTextConfiguration
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| child |  | - |  |
| globalFontFamily | FontFamily? | - | 全局字体，kTextNeedGlobalFontFamily=true 时生效 |
| key |  | - |  |
| paddingConfig | RDTextPaddingConfig? | - | forceVerticalCenter=true 时，内置 padding 配置 |


  