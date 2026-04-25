---
title: Progress 进度条
description: 用于展示任务当前的进度
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

[td_progress_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_progress_page.dart)

### 1 组件类型

线性进度条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightLabelLinear(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      value: value,
      strokeWidth: 6,
      progressLabelPosition: RDProgressLabelPosition.right,
    );
  }</pre>

</td-code-block>
                                  

百分比内显
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildInsideLabelLinear(BuildContext context) {
    return RDProgress(type: RDProgressType.linear, value: value);
  }</pre>

</td-code-block>
                                  

环形进度条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCircle(BuildContext context) {
    return RDProgress(type: RDProgressType.circular, value: value);
  }</pre>

</td-code-block>
                                  

微型环形进度条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildMicro(BuildContext context) {
    return RDProgress(type: RDProgressType.micro, value: value);
  }</pre>

</td-code-block>
                                  

按钮进度条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildButton(BuildContext context) {
    return RDProgress(
      type: RDProgressType.button,
      onTap: _toggleProgress,
      onLongPress: _resetProgress,
      value: progressValue,
      label: buttonLabel,
    );
  }</pre>

</td-code-block>
                                  

微型按钮进度条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildMicroButton(BuildContext context) {
    return RDProgress(
      type: RDProgressType.micro,
      value: microProgressValue,
      onTap: _toggleMicroProgress,
      label: RDIconLabel(
        isPlaying ? Icons.pause : Icons.play_arrow,
        color: RDTheme.of(context).brandNormalColor,
      ),
    );
  }</pre>

</td-code-block>
                                  
### 1 组件状态

线性进度条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildPrimary(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.primary,
      value: value,
      strokeWidth: 6,
      progressLabelPosition: RDProgressLabelPosition.right,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildWarning(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.warning,
      value: value,
      strokeWidth: 6,
      progressLabelPosition: RDProgressLabelPosition.right,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDanger(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.danger,
      value: value,
      strokeWidth: 6,
      progressLabelPosition: RDProgressLabelPosition.right,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSuccess(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.success,
      value: 1,
      strokeWidth: 6,
      progressLabelPosition: RDProgressLabelPosition.right,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildPrimaryInside(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.primary,
      value: value,
      progressLabelPosition: RDProgressLabelPosition.inside,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildWarningInside(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.warning,
      value: value,
      progressLabelPosition: RDProgressLabelPosition.inside,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDangerInside(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.danger,
      value: value,
      progressLabelPosition: RDProgressLabelPosition.inside,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSuccessInside(BuildContext context) {
    return RDProgress(
      type: RDProgressType.linear,
      progressStatus: RDProgressStatus.success,
      value: 1,
      progressLabelPosition: RDProgressLabelPosition.inside,
    );
  }</pre>

</td-code-block>
                                  

环形进度条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCirclePrimary(BuildContext context) {
    return RDProgress(
      type: RDProgressType.circular,
      progressStatus: RDProgressStatus.primary,
      value: value,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCircleWarning(BuildContext context) {
    return RDProgress(
      type: RDProgressType.circular,
      progressStatus: RDProgressStatus.warning,
      value: value,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCircleDanger(BuildContext context) {
    return RDProgress(
      type: RDProgressType.circular,
      progressStatus: RDProgressStatus.danger,
      value: value,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCircleSuccess(BuildContext context) {
    return RDProgress(
      type: RDProgressType.circular,
      progressStatus: RDProgressStatus.success,
      value: 1,
    );
  }</pre>

</td-code-block>
                                  


## API
### RDProgress
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animationDuration | int? | 300 | 动画持续时间（正整数，单位为毫秒） |
| backgroundColor | Color? | - | 进度条背景颜色 |
| circleRadius | double? | - | 环形进度条半径（正数） |
| color | Color? | - | 进度条颜色 |
| customProgressLabel | Widget? | - | 自定义标签 |
| key |  | - |  |
| label | RDLabelWidget? | - | 进度条标签 |
| labelWidgetAlignment | Alignment? | - | 自定义标签对齐方式 |
| labelWidgetWidth | double? | - | 自定义标签宽度 |
| linearBorderRadius | BorderRadiusGeometry? | - | 条形进度条末端形状 |
| onLongPress | VoidCallback? | - | 长按事件 |
| onTap | VoidCallback? | - | 点击事件 |
| progressLabelPosition | RDProgressLabelPosition | RDProgressLabelPosition.inside | 标签显示位置 |
| progressStatus | RDProgressStatus | RDProgressStatus.primary | 进度条状态 |
| showLabel | bool | true | 是否显示标签 |
| strokeWidth | double? | - | 进度条粗细（正数） |
| type | RDProgressType | - | 进度条类型 |
| value | double? | - | 进度值（0.0 到 1.0 之间的正数） |


  