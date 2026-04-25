---
title: Empty 空状态
description: 用于空状态时的占位提示。
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

[td_empty_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_empty_page.dart)

### 1 组件类型

图标空状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _iconEmpty(BuildContext context) {
    return const RDEmpty(
      type: RDEmptyType.plain,
      emptyText: '描述文字',
    );
  }</pre>

</td-code-block>
                                  

自定义图标空状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _iconEmptyCustom(BuildContext context) {
    return const RDEmpty(
      type: RDEmptyType.plain,
      icon: Icons.hourglass_empty_sharp,
      emptyText: '描述文字',
    );
  }</pre>

</td-code-block>
                                  

自定义图片空状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageEmpty(BuildContext context) {
    return RDEmpty(
      type: RDEmptyType.plain,
      emptyText: '描述文字',
      image: Container(
        decoration: BoxDecoration(
          color: RDTheme.of(context).bgColorComponent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: const RDImage(
          width: 120,
          assetUrl: 'assets/img/empty.png',
          type: RDImageType.fitWidth,
        ),
      ),
    );
  }</pre>

</td-code-block>
                                  

带操作空状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _operationEmpty(BuildContext context) {
    return const RDEmpty(
      type: RDEmptyType.operation,
      operationText: '操作按钮',
      emptyText: '描述文字',
    );
  }</pre>

</td-code-block>
                                  

自定义带操作空状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _operationCustomEmpty(BuildContext context) {
    return RDEmpty(
      type: RDEmptyType.operation,
      emptyText: '描述文字',
      customOperationWidget: Padding(
        padding: const EdgeInsets.only(top: 32),
        child: RDButton(
          text: '自定义操作按钮',
          size: RDButtonSize.medium,
          theme: RDButtonTheme.danger,
          width: 160,
          onTap: () {},
        ),
      ),
    );
  }</pre>

</td-code-block>
                                  


## API
### RDEmpty
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| customOperationWidget | Widget? | - | 自定义操作按钮 |
| emptyText | String? | - | 描述文字 |
| emptyTextColor | Color? | - | 描述文字颜色 |
| emptyTextFont | Font? | - | 描述文字大小 |
| icon | IconData? | RDIcons.info_circle_filled | 图标 |
| image | Widget? | - | 展示图片 |
| key |  | - |  |
| onTapEvent | RDTapEvent? | - | 点击事件 |
| operationText | String? | - | 操作按钮文案 |
| operationTheme | RDButtonTheme? | - | 操作按钮文案主题色 |
| type | RDEmptyType | RDEmptyType.plain | 类型，为operation有操作按钮，plain无按钮 |


  