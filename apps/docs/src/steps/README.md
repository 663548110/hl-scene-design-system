---
title: Steps 步骤条
description: 用于任务步骤展示或任务进度展示。
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

[td_steps_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_steps_page.dart)

### 1 水平默认步骤条

水平默认步骤条1
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBasicHSteps1(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Steps1', content: 'Content1'),
        RDStepsItemData(title: 'Steps2', content: 'Content2'),
      ],
    );
  }</pre>

</td-code-block>
                                  

水平默认步骤条2
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBasicHSteps2(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Steps1', content: 'Content1'),
        RDStepsItemData(title: 'Steps2', content: 'Content2'),
        RDStepsItemData(title: 'Steps3', content: 'Content3'),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  

水平默认步骤条3
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBasicHSteps3(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Steps1', content: 'Content1'),
        RDStepsItemData(title: 'Steps2', content: 'Content2'),
        RDStepsItemData(title: 'Steps3', content: 'Content3'),
        RDStepsItemData(title: 'Steps4', content: 'Content4'),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  
### 1 水平图标步骤条

水平图标步骤条1
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildHIconSteps1(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Steps1',
          content: 'Content1',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps2',
          content: 'Content2',
          successIcon: RDIcons.cart,
        ),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 0,
    );
  }</pre>

</td-code-block>
                                  

水平图标步骤条2
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildHIconSteps2(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Steps1',
          content: 'Content1',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps2',
          content: 'Content2',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps3',
          content: 'Content3',
          successIcon: RDIcons.cart,
        ),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  

水平图标步骤条3
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildHIconSteps3(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Steps1',
          content: 'Content1',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps2',
          content: 'Content2',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps3',
          content: 'Content3',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps4',
          content: 'Content4',
          successIcon: RDIcons.cart,
        ),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  
### 1 水平简略步骤条

水平简略步骤条1
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSimpleHSteps1(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Steps1', content: 'Content1'),
        RDStepsItemData(title: 'Steps2', content: 'Content2'),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 0,
      // 简略模式
      simple: true,
    );
  }</pre>

</td-code-block>
                                  

水平简略步骤条2
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSimpleHSteps2(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Steps1', content: 'Content1'),
        RDStepsItemData(title: 'Steps2', content: 'Content2'),
        RDStepsItemData(title: 'Steps3', content: 'Content3'),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
      // 简略模式
      simple: true,
    );
  }</pre>

</td-code-block>
                                  

水平简略步骤条3
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSimpleHSteps3(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Steps1', content: 'Content1'),
        RDStepsItemData(title: 'Steps2', content: 'Content2'),
        RDStepsItemData(title: 'Steps3', content: 'Content3'),
        RDStepsItemData(title: 'Steps4', content: 'Content4'),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
      // 简略模式
      simple: true,
    );
  }</pre>

</td-code-block>
                                  
### 1 水平错误状态步骤条

水平错误状态基本步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildHErrorSteps1(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Steps1', content: 'Content1'),
        RDStepsItemData(title: 'Error', content: 'Content2'),
        RDStepsItemData(title: 'Steps3', content: 'Content3'),
        RDStepsItemData(title: 'Steps4', content: 'Content4'),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
      // 错误状态
      status: RDStepsStatus.error,
    );
  }</pre>

</td-code-block>
                                  

水平错误状态图标步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildHErrorSteps2(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Steps1',
          content: 'Content1',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Error',
          content: 'Content2',
          successIcon: RDIcons.cart,
          errorIcon: RDIcons.close_circle,
        ),
        RDStepsItemData(
          title: 'Steps3',
          content: 'Content3',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps4',
          content: 'Content4',
          successIcon: RDIcons.cart,
        ),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
      // 错误状态
      status: RDStepsStatus.error,
    );
  }</pre>

</td-code-block>
                                  

水平错误状态简略步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildHErrorSteps3(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Steps1',
          content: 'Content1',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Error',
          content: 'Content2',
          successIcon: RDIcons.cart,
          errorIcon: RDIcons.close_circle,
        ),
        RDStepsItemData(
          title: 'Steps3',
          content: 'Content3',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Steps4',
          content: 'Content4',
          successIcon: RDIcons.cart,
        ),
      ],
      // 水平方向
      direction: RDStepsDirection.horizontal,
      activeIndex: 1,
      // 错误状态
      status: RDStepsStatus.error,
      // 简略模式
      simple: true,
    );
  }</pre>

</td-code-block>
                                  
### 1 垂直步骤条

垂直默认步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVBasicSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Finish', content: 'Customize content'),
        RDStepsItemData(title: 'Process', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  

垂直图标步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVIconSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Finish',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Process',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Default',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Default',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  

垂直简略步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVSimpleSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Finish',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Process',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
            title: 'Default',
            content: 'Customize content',
            successIcon: RDIcons.cart),
        RDStepsItemData(
          title: 'Default',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
      // 简略模式
      simple: true,
    );
  }</pre>

</td-code-block>
                                  

垂直错误状态基本步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVErrorBasicSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Finish', content: 'Customize content'),
        RDStepsItemData(title: 'Process', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
      // 错误状态
      status: RDStepsStatus.error,
    );
  }</pre>

</td-code-block>
                                  

垂直错误状态图标步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVErrorIconSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Finish',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Process',
          content: 'Customize content',
          successIcon: RDIcons.cart,
          errorIcon: RDIcons.close_circle,
        ),
        RDStepsItemData(
          title: 'Default',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Default',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
      // 错误状态
      status: RDStepsStatus.error,
    );
  }</pre>

</td-code-block>
                                  

垂直错误状态简略步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVErrorSimpleSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(
          title: 'Finish',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Process',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Default',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
        RDStepsItemData(
          title: 'Default',
          content: 'Customize content',
          successIcon: RDIcons.cart,
        ),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
      // 简略模式
      simple: true,
      // 错误状态
      status: RDStepsStatus.error,
    );
  }</pre>

</td-code-block>
                                  

垂直自定义标题基本步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVCustomTitleBaseSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Finish', content: 'Customize content'),
        RDStepsItemData(
          title: 'Process',
          content: 'Customize content',
          customTitle: const RDText(
            '这是一个很长很长的自定义标题，可以自动换行的一个标题内容',
            softWrap: true,
            maxLines: 2,
            overflow: TextOverflow.visible,
          ),
        ),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  

垂直自定义内容基本步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVCustomContentBaseSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Finish', content: 'Customize content'),
        RDStepsItemData(
          title: '这是一个很长很长很长很长的文字，他是用来展示这个步骤的标题',
          content: 'Customize content',
          customContent: Container(
            margin: const EdgeInsets.only(bottom: 16, top: 4),
            child: const RDImage(
              assetUrl: 'assets/img/image.png',
              type: RDImageType.roundedSquare,
            ),
          ),
        ),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 1,
    );
  }</pre>

</td-code-block>
                                  
### 1 Extension 步骤条

Read-only Steps 纯展示水平步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildHReadOnlySteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Finish', content: 'content'),
        RDStepsItemData(title: 'Process', content: 'content'),
        RDStepsItemData(title: 'Default', content: 'content'),
        RDStepsItemData(title: 'Default', content: 'content'),
      ],
      // 只读模式
      readOnly: true,
    );
  }</pre>

</td-code-block>
                                  

Read-only Steps 纯展示垂直步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVReadOnlySteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Finish', content: 'Customize content'),
        RDStepsItemData(title: 'Process', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
        RDStepsItemData(title: 'Default', content: 'Customize content'),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      activeIndex: 0,
      // 只读模式
      readOnly: true,
    );
  }</pre>

</td-code-block>
                                  

Vertical Customize Steps 垂直自定义步骤条
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildVCustomizeSteps(BuildContext context) {
    return RDSteps(
      steps: [
        RDStepsItemData(title: 'Selected'),
        RDStepsItemData(title: 'Selected'),
        RDStepsItemData(title: 'Selected'),
        RDStepsItemData(title: 'Please Selected'),
      ],
      // 垂直方向
      direction: RDStepsDirection.vertical,
      // 简略模式
      simple: true,
      activeIndex: 3,
      // 步骤条垂直自定义步骤条选择模式
      verticalSelect: true,
    );
  }</pre>

</td-code-block>
                                  


## API
### RDStepsItemData
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | String? | - | 内容 |
| customContent | Widget? | - | 自定义内容 |
| customTitle | Widget? | - | 自定义标题 |
| errorIcon | IconData? | - | 失败图标 |
| successIcon | IconData? | - | 成功图标 |
| title | String? | - | 标题 |

```
```
 ### RDSteps
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| activeIndex | int | 0 | 步骤条当前激活的索引 |
| direction | RDStepsDirection | RDStepsDirection.horizontal | 步骤条方向 |
| key |  | - |  |
| readOnly | bool | false | 步骤条readOnly模式 |
| simple | bool | false | 步骤条simple模式 |
| status | RDStepsStatus | RDStepsStatus.success | 步骤条状态 |
| steps | List<RDStepsItemData> | - | 步骤条数据 |
| verticalSelect | bool | false | 步骤条垂直自定义步骤条选择模式 |


  