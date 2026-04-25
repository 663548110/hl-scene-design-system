---
title: Link 链接
description: 文字超链接用于跳转一个新页面，如当前项目跳转，友情链接等。
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

[td_link_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_link_page.dart)

### 1 组件类型

基础文字链接
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _basicTypeBasic(BuildContext context) {
    return Container(
        height: 48,
        color: RDTheme.of(context).bgColorContainer,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: _buildLinksWithType(RDLinkType.basic),
        ));
  }</pre>

</td-code-block>
                                  

下划线文字链接
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _withUnderline(BuildContext context) {
    return Container(
        height: 48,
        color: RDTheme.of(context).bgColorContainer,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: _buildLinksWithType(RDLinkType.withUnderline),
        ));
  }</pre>

</td-code-block>
                                  

前置图标文字链接
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _withPrefixIcon(BuildContext context) {
    return Container(
        height: 48,
        color: RDTheme.of(context).bgColorContainer,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: _buildLinksWithType(RDLinkType.withPrefixIcon),
        ));
  }</pre>

</td-code-block>
                                  

后置图标文字链接
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _withSuffixIcon(BuildContext context) {
    return Container(
        height: 48,
        color: RDTheme.of(context).bgColorContainer,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: _buildLinksWithType(RDLinkType.withSuffixIcon),
        ));
  }</pre>

</td-code-block>
                                  
### 1 组件状态

不同主题
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLinkStats(BuildContext context) {
    return _buildLinkWithStyles(RDLinkState.normal);
  }</pre>

</td-code-block>
                                  

禁用状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDisabledLinkStats(BuildContext context) {
    return _buildLinkWithStyles(RDLinkState.disabled);
  }</pre>

</td-code-block>
                                  
### 1 组件样式

链接尺寸
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLinkSizes(BuildContext context) {
    return Container(
        height: 48,
        color: RDTheme.of(context).bgColorContainer,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildLinkWithSizeAndStyle(RDLinkStyle.primary, RDLinkSize.small),
            _buildLinkWithSizeAndStyle(RDLinkStyle.primary, RDLinkSize.medium),
            _buildLinkWithSizeAndStyle(RDLinkStyle.primary, RDLinkSize.large),
          ],
        ));
  }</pre>

</td-code-block>
                                  


## API
### RDLink
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| color | Color? | - | link 文本的颜色，如果不设置则根据状态和风格进行计算 |
| fontSize | double? | - | link 文本的字体大小，如果不设置则根据状态和风格进行计算 |
| iconSize | double? | - | link icon 大小，如果不设置则根据状态和风格进行计算 |
| key |  | - |  |
| label | String | - | link 展示的文本 |
| leftGapWithIcon | double? | - | 前置icon和文本之间的间隔，如果不设置则根据状态和风格进行计算 |
| linkClick | LinkClick? | - | link 被点击之后所采取的动作，会将uri当做参数传入到该方法当中 |
| prefixIcon | Icon? | - | 前置 icon |
| rightGapWithIcon | double? | - | 后置icon和文本之间的间隔，如果不设置则根据状态和风格进行计算 |
| size | RDLinkSize | RDLinkSize.medium | link 大小 |
| state | RDLinkState | RDLinkState.normal | link 状态 |
| style | RDLinkStyle | RDLinkStyle.defaultStyle | link 风格 |
| suffixIcon | Icon? | - | 后置 icon |
| type | RDLinkType | RDLinkType.basic | link 类型 |
| uri | Uri? | - | link 跳转的uri |


  