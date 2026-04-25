---
title: Skeleton 骨架屏
description: 当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
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

[td_skeleton_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_skeleton_page.dart)

### 1 类型

头像骨架屏

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildAvatarSkeleton(BuildContext context) {
    return RDSkeleton(theme: RDSkeletonTheme.avatar);
  }</pre>

</td-code-block>


图片骨架屏

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildImageSkeleton(BuildContext context) {
    return RDSkeleton(theme: RDSkeletonTheme.image);
  }</pre>

</td-code-block>


文本骨架屏

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTextSkeleton(BuildContext context) {
    return RDSkeleton(theme: RDSkeletonTheme.text);
  }</pre>

</td-code-block>


段落骨架屏

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildParagraphSkeleton(BuildContext context) {
    return RDSkeleton(theme: RDSkeletonTheme.paragraph);
  }</pre>

</td-code-block>


单元格骨架屏

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCellSkeleton(BuildContext context) {
    var rowColsAvatar = RDSkeleton(theme: RDSkeletonTheme.avatar);
    var rowColsImage = RDSkeleton.fromRowCol(
      rowCol: RDSkeletonRowCol(objects: const [
        [RDSkeletonRowColObj.rect(width: 48, height: 48, flex: null)]
      ]),
    );
    var rowColsContent = RDSkeleton.fromRowCol(
      rowCol: RDSkeletonRowCol(
        objects: const [
          [RDSkeletonRowColObj(), RDSkeletonRowColObj.spacer(flex: 1)],
          [RDSkeletonRowColObj()]
        ],
      ),
    );

    return Column(
      children: [
        Row(
          children: [
            rowColsAvatar,
            const SizedBox(width: 12),
            rowColsContent,
          ],
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            rowColsImage,
            const SizedBox(width: 12),
            rowColsContent,
          ],
        ),
      ],
    );
  }</pre>

</td-code-block>


宫格骨架屏

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildGridSkeleton(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        for (var i = 0; i < 5; i++)
          RDSkeleton.fromRowCol(
            rowCol: RDSkeletonRowCol(objects: const [
              [RDSkeletonRowColObj.rect(width: 48, height: 48, flex: null)],
              [RDSkeletonRowColObj.text(width: 48, flex: null)],
            ]),
          ),
      ],
    );
  }</pre>

</td-code-block>


图文组合骨架屏

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCombineSkeleton(BuildContext context) {
    var rowCols = Flexible(
        child: LayoutBuilder(
            builder: (context, constraints) => Row(children: [
                  RDSkeleton.fromRowCol(
                    rowCol: RDSkeletonRowCol(
                      objects: [
                        [
                          RDSkeletonRowColObj(
                              width: constraints.maxWidth*0.96,
                              height: constraints.maxWidth,
                              flex: null,
                              style: RDSkeletonRowColObjStyle(
                                  borderRadius: (context) =>
                                      RDTheme.of(context).radiusExtraLarge))
                        ],
                        [RDSkeletonRowColObj.text(
                          width: constraints.maxWidth*0.96,
                        )],
                        const [
                          RDSkeletonRowColObj.text(),
                          RDSkeletonRowColObj.spacer(flex: 1),
                        ],
                      ],
                    ),
                  )
                ])));

    return Row(
      children: [
        rowCols,
        SizedBox(width: RDTheme.of(context).spacer4),
        rowCols,
      ],
    );
  }</pre>

</td-code-block>

### 1 组件动效

渐变加载效果

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildGradientSkeleton(BuildContext context) {
    return RDSkeleton(
      animation: RDSkeletonAnimation.gradient,
      theme: RDSkeletonTheme.paragraph,
    );
  }</pre>

</td-code-block>


闪烁加载效果

<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildFlashedSkeleton(BuildContext context) {
    return RDSkeleton(
      animation: RDSkeletonAnimation.flashed,
      theme: RDSkeletonTheme.paragraph,
    );
  }</pre>

</td-code-block>



## API
### RDSkeleton
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| key |  | - |  |
| animation | RDSkeletonAnimation? | null | 动画效果 |
| delay | int | 0 | 延迟显示加载时间 |
| theme | RDSkeletonTheme | RDSkeletonTheme.text | 风格 |


#### 命名构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| key |  | - |  |
| animation | RDSkeletonAnimation? | null | 动画效果 |
| delay | int | 0 | 延迟显示加载时间 |
| rowCol | RDSkeletonRowCol | - | 自定义行列数量、宽度高度、间距等 |

```
```
### RDSkeletonRowColStyle
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| rowSpacing | double Function(BuildContext) | (context) => RDTheme.of(context).spacer16 | 行间距 |

```
```
### RDSkeletonRowCol
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| objects | List<List<RDSkeletonRowColObj>> | - | 行列对象 |
| style | RDSkeletonRowColStyle | RDSkeletonRowColStyle() | 样式 |

```
```
### RDSkeletonRowColObjStyle
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| background | double Function(BuildContext) | (context) => RDTheme.of(context).grayColor1 | 背景颜色 |
| borderRadius | double Function(BuildContext) | (context) => RDTheme.of(context).radiusSmall | 圆角 |


#### 工厂构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| background | double Function(BuildContext) | (context) => RDTheme.of(context).grayColor1 | 背景颜色 |

```
```
### RDSkeletonRowColObj
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | double? | null | 宽度 |
| height | double? | 16 | 高度 |
| flex | int? | 1 | 弹性因子 |
| margin | EdgeInsets | EdgeInsets.zero | 间距 |
| style | RDSkeletonRowColObjStyle | RDSkeletonRowColObjStyle() | 样式 |


#### 工厂构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | double? | 48 / null | 宽度 |
| height | double? | 48 / 16 / null | 高度 |
| flex | int? | null / 1 | 弹性因子 |
| margin | EdgeInsets | EdgeInsets.zero | 间距 |
| style | RDSkeletonRowColObjStyle | RDSkeletonRowColObjStyle.circle() / RDSkeletonRowColObjStyle.rect() / RDSkeletonRowColObjStyle.text() / RDSkeletonRowColObjStyle.spacer() | 样式 |

  
