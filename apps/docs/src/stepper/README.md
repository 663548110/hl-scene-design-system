---
title: Stepper 步进器
description: 用于数量的增减。
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

[td_stepper_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_stepper_page.dart)

### 1 组件类型

基础步进器
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildStepperWithBase(BuildContext context) {
    return _buildRow(context, [
      const RDStepper(
        theme: RDStepperTheme.filled,
      )
    ]);
  }</pre>

</td-code-block>
                                  
### 1 组件状态

最大最小状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildStepperWithMaxMinStatus(BuildContext context) {
    return _buildRow(context, [
      const RDStepper(theme: RDStepperTheme.filled, value: 0, min: 0),
      const RDStepper(theme: RDStepperTheme.filled, value: 999, max: 999),
    ]);
  }</pre>

</td-code-block>
                                  

禁用状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildStepperWithDisableStatus(BuildContext context) {
    return _buildRow(context, [
      const RDStepper(
        theme: RDStepperTheme.filled,
        disabled: true,
      ),
      const RDStepper(
        theme: RDStepperTheme.outline,
        disabled: true,
      ),
      const RDStepper(
        theme: RDStepperTheme.normal,
        disabled: true,
      ),
    ]);
  }</pre>

</td-code-block>
                                  
### 1 组件样式

步进器样式
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildStepperWithTheme(BuildContext context) {
    return _buildRow(context, [
      const RDStepper(theme: RDStepperTheme.filled, value: 3),
      const RDStepper(theme: RDStepperTheme.outline, value: 3),
      const RDStepper(theme: RDStepperTheme.normal, value: 3),
    ]);
  }</pre>

</td-code-block>
                                  

步进器尺寸
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildStepperWithSize(BuildContext context) {
    return _buildRow(context, [
      const RDStepper(
          size: RDStepperSize.large, theme: RDStepperTheme.filled, value: 3),
      const RDStepper(
          size: RDStepperSize.medium, theme: RDStepperTheme.filled, value: 3),
      const RDStepper(
          size: RDStepperSize.small, theme: RDStepperTheme.filled, value: 3),
    ]);
  }</pre>

</td-code-block>
                                  


## API
### RDStepper
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| controller | RDStepperController? | - | Stepper控制器 |
| defaultValue | int? | 0 | 默认值 |
| disabled | bool | false | 禁用全部操作 |
| disableInput | bool | false | 禁用输入框 |
| eventController | StreamController<RDStepperEventType>? | - | 事件控制器 |
| inputWidth | double? | - | 禁用全部操作 |
| key |  | - |  |
| max | int | 100 | 最大值 |
| min | int | 0 | 最小值 |
| onBlur | VoidCallback? | - | 输入框失去焦点时触发 |
| onChange | ValueChanged<int>? | - | 数值发生变更时触发 |
| onOverlimit | RDStepperOverlimitFunction? | - | 数值超出限制时触发 |
| size | RDStepperSize | RDStepperSize.medium | 组件尺寸 |
| step | int | 1 | 步长 |
| theme | RDStepperTheme | RDStepperTheme.normal | 组件风格 |
| value | int? | 0 | 值 |


  