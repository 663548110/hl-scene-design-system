---
title: Tag 标签
description: 用于表明主体的类目，属性或状态
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

[td_tag_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_tag_page.dart)

### 1 组件类型

基础标签

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDTag _buildSimpleFillTag(BuildContext context) {
    return const RDTag('标签文字');
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  RDTag _buildSimpleOutlineTag(BuildContext context) {
    return const RDTag(
      '标签文字',
      isOutline: true,
    );
  }</pre>

</td-code-block>
                

圆弧标签

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCircleFillTag(BuildContext context) {
    return const RDTag(
      '标签文字',
      shape: RDTagShape.round,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCircleOutlineTag(BuildContext context) {
    return const RDTag(
      '标签文字',
      shape: RDTagShape.round,
      isOutline: true,
    );
  }</pre>

</td-code-block>
                

Mark标签

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildMarkFillTag(BuildContext context) {
    return const RDTag(
      '标签文字',
      shape: RDTagShape.mark,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildMarkOutlineTag(BuildContext context) {
    return const RDTag(
      '标签文字',
      shape: RDTagShape.mark,
      isOutline: true,
    );
  }</pre>

</td-code-block>
                

带图标的标签

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildIconFillTag(BuildContext context) {
    return const RDTag(
      '标签文字',
      icon: RDIcons.discount,
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildIconOutlineTag(BuildContext context) {
    return const RDTag(
      '标签文字',
      icon: RDIcons.discount,
      isOutline: true,
    );
  }</pre>

</td-code-block>
                

可关闭的标签

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCloseFillTag(BuildContext context) {
    return RDTag(
      '标签文字',
      needCloseIcon: true,
      onCloseTap: () {
        RDToast.showText('点击关闭', context: context);
      },
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCloseOutlineTag(BuildContext context) {
    return RDTag('标签文字', needCloseIcon: true, isOutline: true, onCloseTap: () {
      RDToast.showText('点击关闭', context: context);
    });
  }</pre>

</td-code-block>
                

可选中的标签

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDarkSelectTags(BuildContext context) {
    return const Wrap(spacing: 8, children: [
      RDSelectTag(
        '未选中态',
        theme: RDTagTheme.primary,
      ),
      RDSelectTag(
        '已选中态',
        theme: RDTagTheme.primary,
        isSelected: true,
      ),
      RDSelectTag(
        '不可选态',
        theme: RDTagTheme.primary,
        disableSelect: true,
      ),
    ]);
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLightSelectTags(BuildContext context) {
    return const Wrap(spacing: 8, children: [
      RDSelectTag(
        '未选中态',
        theme: RDTagTheme.primary,
        isLight: true,
      ),
      RDSelectTag(
        '已选中态',
        theme: RDTagTheme.primary,
        isLight: true,
        isSelected: true,
      ),
      RDSelectTag(
        '不可选态',
        theme: RDTagTheme.primary,
        isLight: true,
        disableSelect: true,
      ),
    ]);
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildOutlineSelectTags(BuildContext context) {
    return const Wrap(spacing: 8, children: [
      RDSelectTag(
        '未选中态',
        theme: RDTagTheme.primary,
        isOutline: true,
      ),
      RDSelectTag(
        '已选中态',
        theme: RDTagTheme.primary,
        isOutline: true,
        isSelected: true,
      ),
      RDSelectTag(
        '不可选态',
        theme: RDTagTheme.primary,
        isOutline: true,
        disableSelect: true,
      ),
    ]);
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLightOutlineSelectTags(BuildContext context) {
    return const Wrap(spacing: 8, children: [
      RDSelectTag(
        '未选中态',
        theme: RDTagTheme.primary,
        isOutline: true,
        isLight: true,
      ),
      RDSelectTag(
        '已选中态',
        theme: RDTagTheme.primary,
        isOutline: true,
        isLight: true,
        isSelected: true,
      ),
      RDSelectTag(
        '不可选态',
        theme: RDTagTheme.primary,
        isOutline: true,
        isLight: true,
        disableSelect: true,
      ),
    ]);
  }</pre>

</td-code-block>
                
### 1 组件状态（主题）

展示型标签

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLightShowTags(BuildContext context) {
    return const Wrap(
      spacing: 8,
      children: [
        RDTag('默认', isLight: true),
        RDTag(
          '主要',
          isLight: true,
          theme: RDTagTheme.primary,
        ),
        RDTag(
          '警告',
          isLight: true,
          theme: RDTagTheme.warning,
        ),
        RDTag(
          '危险',
          isLight: true,
          theme: RDTagTheme.danger,
        ),
        RDTag(
          '成功',
          isLight: true,
          theme: RDTagTheme.success,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDarkShowTags(BuildContext context) {
    return const Wrap(
      spacing: 8,
      children: [
        RDTag('默认'),
        RDTag(
          '主要',
          theme: RDTagTheme.primary,
        ),
        RDTag(
          '警告',
          theme: RDTagTheme.warning,
        ),
        RDTag(
          '危险',
          theme: RDTagTheme.danger,
        ),
        RDTag(
          '成功',
          theme: RDTagTheme.success,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildOutlineShowTags(BuildContext context) {
    return const Wrap(
      spacing: 8,
      children: [
        RDTag('默认', isOutline: true),
        RDTag(
          '主要',
          isOutline: true,
          theme: RDTagTheme.primary,
        ),
        RDTag(
          '警告',
          isOutline: true,
          theme: RDTagTheme.warning,
        ),
        RDTag(
          '危险',
          isOutline: true,
          theme: RDTagTheme.danger,
        ),
        RDTag(
          '成功',
          isOutline: true,
          theme: RDTagTheme.success,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLightOutlineShowTags(BuildContext context) {
    return const Wrap(
      spacing: 8,
      children: [
        RDTag('默认', isOutline: true, isLight: true),
        RDTag(
          '主要',
          isOutline: true,
          isLight: true,
          theme: RDTagTheme.primary,
        ),
        RDTag(
          '警告',
          isOutline: true,
          isLight: true,
          theme: RDTagTheme.warning,
        ),
        RDTag(
          '危险',
          isOutline: true,
          isLight: true,
          theme: RDTagTheme.danger,
        ),
        RDTag(
          '成功',
          isOutline: true,
          isLight: true,
          theme: RDTagTheme.success,
        ),
      ],
    );
  }</pre>

</td-code-block>
                
### 1 组件尺寸



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildAllSizeTags(BuildContext context) {
    return const Wrap(spacing: 8, children: [
      RDTag(
        '加大尺寸',
        size: RDTagSize.extraLarge,
      ),
      RDTag(
        '大尺寸',
        size: RDTagSize.large,
      ),
      RDTag(
        '中尺寸',
        size: RDTagSize.medium,
      ),
      RDTag(
        '小尺寸',
        size: RDTagSize.small,
      ),
    ]);
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildAllSizeCloseTags(BuildContext context) {
    return const Wrap(spacing: 8, children: [
      RDTag(
        '加大尺寸',
        needCloseIcon: true,
        size: RDTagSize.extraLarge,
      ),
      RDTag(
        '大尺寸',
        needCloseIcon: true,
        size: RDTagSize.large,
      ),
      RDTag(
        '中尺寸',
        needCloseIcon: true,
        size: RDTagSize.medium,
      ),
      RDTag(
        '小尺寸',
        needCloseIcon: true,
        size: RDTagSize.small,
      ),
    ]);
  }</pre>

</td-code-block>
                


## API
### RDTag
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| backgroundColor | Color? | - | 背景颜色，优先级高于style的backgroundColor |
| disable | bool | false | 是否为禁用状态 |
| fixedWidth | double? | - | 标签的固定宽度 |
| font | Font? | - | 字体尺寸，优先级高于style的font |
| fontWeight | FontWeight? | - | 字体粗细，优先级高于style的fontWeight |
| forceVerticalCenter | bool | true | 是否强制中文文字居中 |
| icon | IconData? | - | 图标内容，可随状态改变颜色 |
| iconWidget | Widget? | - | 自定义图标内容，需自处理颜色 |
| isLight | bool | false | 是否为浅色 |
| isOutline | bool | false | 是否为描边类型，默认不是 |
| key |  | - |  |
| needCloseIcon | bool | false | 关闭图标 |
| onCloseTap | GestureTapCallback? | - | 关闭图标点击事件 |
| overflow | TextOverflow? | - | 文字溢出处理 |
| padding | EdgeInsets? | - | 自定义模式下的间距 |
| shape | RDTagShape | RDTagShape.square | 标签形状 |
| size | RDTagSize | RDTagSize.medium | 标签大小 |
| style | RDTagStyle? | - | 标签样式 |
| text | String | text | 标签内容 |
| textColor | Color? | - | 文字颜色，优先级高于style的textColor |
| theme | RDTagTheme? | - | 主题 |

```
```
 ### RDSelectTag
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| disableSelect | bool | false | 是否禁用选择 |
| disableSelectStyle | RDTagStyle? | - | 不可选标签样式 |
| fixedWidth | double? | - | 标签的固定宽度 |
| forceVerticalCenter | bool | true | 是否强制中文文字居中 |
| icon | IconData? | - | 图标内容，可随状态改变颜色 |
| iconWidget | Widget? | - | 自定义图标内容，需自处理颜色 |
| isLight | bool | false | 是否为浅色 |
| isOutline | bool | false | 是否为描边类型，默认不是 |
| isSelected | bool | false | 是否选中 |
| key |  | - |  |
| needCloseIcon | bool | false | 关闭图标 |
| onCloseTap | GestureTapCallback? | - | 关闭图标点击事件 |
| onSelectChanged | ValueChanged<bool>? | - | 标签点击，选中状态改变时的回调 |
| padding | EdgeInsets? | - | 自定义模式下的间距 |
| selectStyle | RDTagStyle? | - | 选中的标签样式 |
| shape | RDTagShape | RDTagShape.square | 标签形状 |
| size | RDTagSize | RDTagSize.medium | 标签大小 |
| text | String | text | 标签内容 |
| theme | RDTagTheme? | - | 主题 |
| unSelectStyle | RDTagStyle? | - | 未选中标签样式 |

```
```
 ### RDTagStyle
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| backgroundColor | Color? | - | 背景颜色 |
| border | double | 0 | 线框粗细 |
| borderColor | Color? | - | 边框颜色 |
| borderRadius | BorderRadiusGeometry? | - | 圆角 |
| context | BuildContext? | - | 上下文，方便获取主题内容 |
| font | Font? | - | 字体尺寸 |
| fontWeight | FontWeight? | - | 字体粗细 |
| textColor | Color? | - | 文字颜色 |


#### 工厂构造方法

| 名称  | 说明 |
| --- |  --- |
| RDTagStyle.generateDisableSelectStyle  | 根据主题生成禁用Tag样式 |
| RDTagStyle.generateFillStyleByTheme  | 根据主题生成填充Tag样式 |
| RDTagStyle.generateOutlineStyleByTheme  | 根据主题生成描边Tag样式 |


  