---
title: TimeCounter 计时器
description: 用于实时展示计时数值。
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

[td_time-counter_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_time-counter_page.dart)

### 1 组件类型

时分秒
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSimple(BuildContext context) {
  return const RDTimeCounter(time: 60 * 60 * 1000);
}</pre>

</td-code-block>
                                  

带毫秒
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildMillisecondSimple(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    millisecond: true,
  );
}</pre>

</td-code-block>
                                  

正向计时
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUpSimple(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    millisecond: true,
    direction: RDTimeCounterDirection.up,
  );
}</pre>

</td-code-block>
                                  

带方形底
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSquareSimple(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    theme: RDTimeCounterTheme.square,
  );
}</pre>

</td-code-block>
                                  

带圆形底
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildRoundSimple(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    theme: RDTimeCounterTheme.round,
  );
}</pre>

</td-code-block>
                                  

带单位
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUnitSimple(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    theme: RDTimeCounterTheme.square,
    splitWithUnit: true,
  );
}</pre>

</td-code-block>
                                  

无底色带单位
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildCustomUnitSimple(BuildContext context) {
  var style = RDTimeCounterStyle.generateStyle(context);
  style.timeColor = RDTheme.of(context).errorNormalColor;
  return RDTimeCounter(
    time: 60 * 60 * 1000,
    splitWithUnit: true,
    style: style,
  );
}</pre>

</td-code-block>
                                  
### 1 组件尺寸

纯数字

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
  );
}</pre>

</td-code-block>
                

带方形底

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSquareSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
    theme: RDTimeCounterTheme.square,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSquareMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
    theme: RDTimeCounterTheme.square,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSquareLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
    theme: RDTimeCounterTheme.square,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSquareSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
    theme: RDTimeCounterTheme.square,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSquareMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
    theme: RDTimeCounterTheme.square,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildSquareLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
    theme: RDTimeCounterTheme.square,
  );
}</pre>

</td-code-block>
                

带圆形底

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildRoundSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
    theme: RDTimeCounterTheme.round,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildRoundMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
    theme: RDTimeCounterTheme.round,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildRoundLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
    theme: RDTimeCounterTheme.round,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildRoundSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
    theme: RDTimeCounterTheme.round,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildRoundMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
    theme: RDTimeCounterTheme.round,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildRoundLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
    theme: RDTimeCounterTheme.round,
  );
}</pre>

</td-code-block>
                

带单位

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUnitSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
    theme: RDTimeCounterTheme.square,
    splitWithUnit: true,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUnitMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
    theme: RDTimeCounterTheme.square,
    splitWithUnit: true,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUnitLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
    theme: RDTimeCounterTheme.square,
    splitWithUnit: true,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUnitSmallSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.small,
    theme: RDTimeCounterTheme.square,
    splitWithUnit: true,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUnitMediumSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.medium,
    theme: RDTimeCounterTheme.square,
    splitWithUnit: true,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildUnitLargeSize(BuildContext context) {
  return const RDTimeCounter(
    time: 60 * 60 * 1000,
    size: RDTimeCounterSize.large,
    theme: RDTimeCounterTheme.square,
    splitWithUnit: true,
  );
}</pre>

</td-code-block>
                

无底色带单位

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildCustomUnitSmallSize(BuildContext context) {
  var style =
      RDTimeCounterStyle.generateStyle(context, size: RDTimeCounterSize.small);
  style.timeColor = RDTheme.of(context).errorNormalColor;
  return RDTimeCounter(
    time: 60 * 60 * 1000,
    splitWithUnit: true,
    style: style,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildCustomUnitMediumSize(BuildContext context) {
  var style =
      RDTimeCounterStyle.generateStyle(context, size: RDTimeCounterSize.medium);
  style.timeColor = RDTheme.of(context).errorNormalColor;
  return RDTimeCounter(
    time: 60 * 60 * 1000,
    splitWithUnit: true,
    style: style,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildCustomUnitLargeSize(BuildContext context) {
  var style =
      RDTimeCounterStyle.generateStyle(context, size: RDTimeCounterSize.large);
  style.timeColor = RDTheme.of(context).errorNormalColor;
  return RDTimeCounter(
    time: 60 * 60 * 1000,
    splitWithUnit: true,
    style: style,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildCustomUnitSmallSize(BuildContext context) {
  var style =
      RDTimeCounterStyle.generateStyle(context, size: RDTimeCounterSize.small);
  style.timeColor = RDTheme.of(context).errorNormalColor;
  return RDTimeCounter(
    time: 60 * 60 * 1000,
    splitWithUnit: true,
    style: style,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildCustomUnitMediumSize(BuildContext context) {
  var style =
      RDTimeCounterStyle.generateStyle(context, size: RDTimeCounterSize.medium);
  style.timeColor = RDTheme.of(context).errorNormalColor;
  return RDTimeCounter(
    time: 60 * 60 * 1000,
    splitWithUnit: true,
    style: style,
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDTimeCounter _buildCustomUnitLargeSize(BuildContext context) {
  var style =
      RDTimeCounterStyle.generateStyle(context, size: RDTimeCounterSize.large);
  style.timeColor = RDTheme.of(context).errorNormalColor;
  return RDTimeCounter(
    time: 60 * 60 * 1000,
    splitWithUnit: true,
    style: style,
  );
}</pre>

</td-code-block>
                


## API
### RDTimeCounterStyle
#### 简介
计时组件样式
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| space | double? | - | 时间与分隔符的间隔 |
| splitColor | Color? | - | 分隔符字体颜色 |
| splitFontHeight | double? | - | 分隔符字体行高 |
| splitFontSize | double? | - | 分隔符字体尺寸 |
| splitFontWeight | FontWeight? | - | 分隔符字体粗细 |
| timeBox | BoxDecoration? | - | 时间容器装饰 |
| timeColor | Color? | - | 时间字体颜色 |
| timeFontFamily | FontFamily? | - | 时间字体 |
| timeFontHeight | double? | - | 时间字体行高 |
| timeFontSize | double? | - | 时间字体尺寸 |
| timeFontWeight | FontWeight? | - | 时间字体粗细 |
| timeHeight | double? | - | 时间容器高度 |
| timeMargin | EdgeInsets? | - | 时间容器外边距 |
| timePadding | EdgeInsets? | - | 时间容器内边距 |
| timeWidth | double? | - | 时间容器宽度 |


#### 工厂构造方法

| 名称  | 说明 |
| --- |  --- |
| RDTimeCounterStyle.generateStyle  | 生成默认样式 |

```
```
 ### RDTimeCounterController
#### 简介
倒计时组件控制器，可控制开始(`start()`)/暂停(`pause()`)/继续(`resume()`)/重置(`reset([int? time])`)
```
```
 ### RDTimeCounter
#### 简介
计时组件
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| autoStart | bool | true | 是否自动开始倒计时 |
| content | dynamic | 'default' | 'default' / Widget Function(int time) / Widget |
| controller | RDTimeCounterController? | - | 控制器，可控制开始/暂停/继续/重置 |
| direction | RDTimeCounterDirection | RDTimeCounterDirection.down | 计时方向，默认倒计时 |
| format | String | 'HH:mm:ss' | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒（分隔符必须为长度为1的非空格的字符） |
| key |  | - |  |
| millisecond | bool | false | 是否开启毫秒级渲染 |
| onChange |  Function(int time)? | - | 时间变化时触发回调 |
| onFinish | VoidCallback? | - | 计时结束时触发回调 |
| size | RDTimeCounterSize | RDTimeCounterSize.medium | 尺寸 |
| splitWithUnit | bool | false | 使用时间单位分割 |
| style | RDTimeCounterStyle? | - | 自定义样式，有则优先用它，没有则根据size和theme选取 |
| theme | RDTimeCounterTheme | RDTimeCounterTheme.defaultTheme | 风格 |
| time | int | - | 必需；计时时长，单位毫秒 |


  