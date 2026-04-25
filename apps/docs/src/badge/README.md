---
title: Badge 徽标
description: 用于告知用户，该区域的状态变化或者待处理任务的数量。
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

[td_badge_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_badge_page.dart)

### 1 组件类型

红点徽标

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRedPointMessageBadge(BuildContext context) {
    return SizedBox(
      width: 40,
      height: 24,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          RDText(
            '消息',
            font: RDTheme.of(context).fontBodyLarge,
          ),
          const Positioned(
            child: RDBadge(RDBadgeType.redPoint),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRedPointIconBadge(BuildContext context) {
    return const SizedBox(
      width: 27,
      height: 27,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          Icon(RDIcons.notification),
          Positioned(
            child: RDBadge(RDBadgeType.redPoint),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRedPointButtonBadge(BuildContext context) {
    return const SizedBox(
      width: 83,
      height: 48,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          RDButton(
            width: 80,
            height: 48,
            text: '按钮',
            size: RDButtonSize.large,
            type: RDButtonType.fill,
          ),
          Positioned(
            child: RDBadge(RDBadgeType.redPoint),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

数字徽标

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildMessageNumberBadge(BuildContext context) {
    return SizedBox(
      width: 56,
      height: 36,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          RDText('消息', font: RDTheme.of(context).fontBodyLarge),
          Positioned(
            child: RDBadge(RDBadgeType.message, count: num.toString()),
            left: 28,
            bottom: 18,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildIconNumberBadge(BuildContext context) {
    return SizedBox(
      width: 46,
      height: 36,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          const Icon(RDIcons.notification),
          Positioned(
            child: RDBadge(RDBadgeType.message, count: num.toString()),
            left: 18,
            bottom: 18,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildButtonNumberBadge(BuildContext context) {
    return SizedBox(
      width: 86,
      height: 54,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          const RDButton(
            width: 80,
            height: 48,
            text: '按钮',
            size: RDButtonSize.large,
          ),
          Positioned(
            child: RDBadge(RDBadgeType.message, count: num.toString()),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

自定义徽标

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCustomBadgeShowingNumber(BuildContext context) {
    return SizedBox(
      width: 64,
      height: 56,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          Container(
            child: const Icon(RDIcons.notification),
            decoration: BoxDecoration(
                color: RDTheme.of(context).bgColorComponent,
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            height: 48,
            width: 48,
          ),
          Positioned(
            child: RDBadge(RDBadgeType.message, count: num.toString()),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCustomBadgeShowingNumberZero(BuildContext context) {
    return SizedBox(
      width: 64,
      height: 56,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          Container(
            child: const Icon(RDIcons.notification),
            decoration: BoxDecoration(
                color: RDTheme.of(context).bgColorComponent,
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            height: 48,
            width: 48,
          ),
          const Positioned(
            child: RDBadge(RDBadgeType.message, count: '0'),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCustomBadgeWithoutShowingNumberZero(BuildContext context) {
    return SizedBox(
      width: 64,
      height: 56,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          Container(
            child: const Icon(RDIcons.notification),
            decoration: BoxDecoration(
                color: RDTheme.of(context).bgColorComponent,
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            height: 48,
            width: 48,
          ),
          const Positioned(
            // 不显示 0
            child: RDBadge(RDBadgeType.message, count: '0', showZero: false),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                
### 1 组件样式

圆形徽标
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCircleBadge(BuildContext context) {
    return SizedBox(
      width: 48,
      height: 34,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          const Icon(RDIcons.notification),
          Positioned(
            child: RDBadge(RDBadgeType.message, count: num.toString()),
            left: 18,
            bottom: 18,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                                  

方形徽标
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSquareBadge(BuildContext context) {
    return SizedBox(
      width: 48,
      height: 34,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          const Icon(RDIcons.notification),
          Positioned(
            child: RDBadge(
              RDBadgeType.square,
              border: RDBadgeBorder.small,
              count: num.toString(),
            ),
            left: 20,
            bottom: 18,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                                  

气泡徽标
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBubbleBadge(BuildContext context) {
    return SizedBox(
      width: 67,
      height: 56,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          Container(
            child: const Icon(RDIcons.shop),
            decoration: BoxDecoration(
                color: RDTheme.of(context).bgColorComponent,
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            height: 48,
            width: 48,
          ),
          const Positioned(
            child: RDBadge(RDBadgeType.bubble, count: '领积分'),
            right: 0,
            top: 0,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                                  

角标
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSubscriptBadge(BuildContext context) {
    return const Stack(
      alignment: Alignment.topRight,
      children: [
        RDCell(title: '单行标题'),
        RDBadge(RDBadgeType.subscript, message: 'NEW'),
      ],
    );
  }</pre>

</td-code-block>
                                  
### 1 组件尺寸

Large
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLargeBadge(BuildContext context) {
    return SizedBox(
      width: 80,
      height: 68,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          const RDAvatar(size: RDAvatarSize.large, type: RDAvatarType.icon),
          Positioned(
            child: RDBadge(RDBadgeType.message,
                size: RDBadgeSize.large, count: num.toString()),
            left: 48,
            bottom: 48,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                                  

Medium
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildMediumBadge(BuildContext context) {
    return SizedBox(
      width: 72,
      height: 54,
      child: Stack(
        alignment: Alignment.bottomLeft,
        children: [
          const RDAvatar(size: RDAvatarSize.medium, type: RDAvatarType.icon),
          Positioned(
            child: RDBadge(RDBadgeType.message, count: num.toString()),
            left: 36,
            bottom: 36,
          )
        ],
      ),
    );
  }</pre>

</td-code-block>
                                  


## API
### RDBadge
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| border | RDBadgeBorder | RDBadgeBorder.large | 红点圆角大小 |
| color | Color? | - | 红点颜色 |
| count | String? | - | 红点数量 |
| key |  | - |  |
| maxCount | String? | '99' | 最大红点数量 |
| message | String? | - | 消息内容 |
| padding | EdgeInsetsGeometry? | - | 角标自定义padding |
| showZero | bool | true | 值为0是否显示 |
| size | RDBadgeSize | RDBadgeSize.small | 红点尺寸 |
| textColor | Color? | - | 文字颜色 |
| type | RDBadgeType | type | 红点样式 |
| widthLarge | double | 32 | 角标大三角形宽 |
| widthSmall | double | 12 | 角标小三角形宽 |


  