---
title: Fab 悬浮按钮
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

[td_fab_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_fab_page.dart)

### 1 组件类型

Icon Fab 纯图标悬浮按钮
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildPureIconFab(BuildContext context) {
    return _buildRowDemo([
      const RDFab(
        theme: RDFabTheme.primary,
      )
    ]);
  }</pre>

</td-code-block>
                                  

Icon Fab with Text 图标加文字悬浮按钮
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTextFab(BuildContext context) {
    return _buildRowDemo([
      const RDFab(
        theme: RDFabTheme.primary,
        text: 'Floating',
      )
    ]);
  }</pre>

</td-code-block>
                                  
### 1 组件状态

Fab Theme 悬浮按钮主题
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildThemeFab(BuildContext context) {
    return _buildRowDemoWidthDescription([
      {
        'component': const RDFab(
          theme: RDFabTheme.primary,
        ),
        'desc': 'Primary'
      },
      {
        'component': const RDFab(
          theme: RDFabTheme.defaultTheme,
        ),
        'desc': 'Default'
      },
      {
        'component': const RDFab(
          theme: RDFabTheme.light,
        ),
        'desc': 'Light'
      },
      {
        'component': const RDFab(
          theme: RDFabTheme.danger,
        ),
        'desc': 'Danger'
      },
    ]);
  }</pre>

</td-code-block>
                                  

Fab Shape 悬浮按钮形状
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildShapeFab(BuildContext context) {
    return _buildRowDemoWidthDescription([
      {
        'component': const RDFab(
          theme: RDFabTheme.primary,
          shape: RDFabShape.circle,
        ),
        'desc': 'Circle'
      },
      {
        'component': const RDFab(
          theme: RDFabTheme.primary,
          shape: RDFabShape.square,
        ),
        'desc': 'Square'
      },
    ]);
  }</pre>

</td-code-block>
                                  

Fab Size 悬浮按钮尺寸
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSizeFab(BuildContext context) {
    return _buildRowDemoWidthDescription([
      {
        'component': const RDFab(
          theme: RDFabTheme.primary,
          size: RDFabSize.large,
        ),
        'desc': 'Large'
      },
      {
        'component': const RDFab(
          theme: RDFabTheme.primary,
          size: RDFabSize.medium,
        ),
        'desc': 'Medium'
      },
      {
        'component': const RDFab(
          theme: RDFabTheme.primary,
          size: RDFabSize.small,
        ),
        'desc': 'Small'
      },
      {
        'component': const RDFab(
          theme: RDFabTheme.primary,
          size: RDFabSize.extraSmall,
        ),
        'desc': 'extraSmall'
      },
    ]);
  }</pre>

</td-code-block>
                                  


## API
### RDFab
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| icon | Icon? | - | 图标 |
| key |  | - |  |
| onClick | VoidCallback? | - | 点击事件 |
| shape | RDFabShape | RDFabShape.circle | 形状 |
| size | RDFabSize | RDFabSize.large | 大小 |
| text | String? | - | 文本 |
| theme | RDFabTheme | RDFabTheme.defaultTheme | 主题 |


  