---
title: Loading 加载
description: 用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。
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

[td_loading_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_loading_page.dart)

### 1 组件类型

纯图标
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildPureIconLoading(BuildContext context) {
    return Row(
      // spacing: 36,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.circle,
        ),
        const SizedBox(width: 36),
        const RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.activity,
        ),
        const SizedBox(width: 36),
        RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.point,
          iconColor: RDTheme.of(context).brandNormalColor,
        ),
      ],
    );
  }</pre>

</td-code-block>
                                  

图标加文字横向
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTextIconHorizontalLoading(BuildContext context) {
    return const Row(
      // spacing: 36,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.circle,
          text: '加载中…',
          axis: Axis.horizontal,
        ),
        const SizedBox(width: 36),
        RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.activity,
          text: '加载中…',
          axis: Axis.horizontal,
        ),
      ],
    );
  }</pre>

</td-code-block>
                                  

图标加文字竖向
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTextIconVerticalLoading(BuildContext context) {
    return const Row(
      // spacing: 36,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.circle,
          text: '加载中…',
          axis: Axis.vertical,
        ),
        SizedBox(width: 36),
        RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.activity,
          text: '加载中…',
          axis: Axis.vertical,
        ),
      ],
    );
  }</pre>

</td-code-block>
                                  

纯文字
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildPureTextLoading(BuildContext context) {
    return Row(
      // spacing: 36,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const RDLoading(
          size: RDLoadingSize.small,
          text: '加载中…',
        ),
        const SizedBox(width: 36),
        RDLoading(
          size: RDLoadingSize.small,
          text: '加载失败',
          textColor: RDTheme.of(context).textColorPlaceholder,
        ),
        const SizedBox(width: 36),
        RDLoading(
          size: RDLoadingSize.small,
          text: '加载失败',
          refreshWidget: GestureDetector(
            child: RDText(
              '刷新',
              font: RDTheme.of(context).fontBodySmall,
              textColor: RDTheme.of(context).brandNormalColor,
            ),
            onTap: () {
              RDToast.showText('刷新', context: context);
            },
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                                  
### 1 组件尺寸

大尺寸
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLargeLoading(BuildContext context) {
    return const RDLoading(
      size: RDLoadingSize.large,
      icon: RDLoadingIcon.circle,
      text: '加载中…',
      axis: Axis.horizontal,
    );
  }</pre>

</td-code-block>
                                  

中尺寸
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildMediumLoading(BuildContext context) {
    return const RDLoading(
      size: RDLoadingSize.medium,
      icon: RDLoadingIcon.circle,
      text: '加载中…',
      axis: Axis.horizontal,
    );
  }</pre>

</td-code-block>
                                  

小尺寸
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSmallLoading(BuildContext context) {
    return const RDLoading(
      size: RDLoadingSize.small,
      icon: RDLoadingIcon.circle,
      text: '加载中…',
      axis: Axis.horizontal,
    );
  }</pre>

</td-code-block>
                                  
### 1 加载速度

调整加载速度
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCustomSpeedLoading(BuildContext context) {
    return Column(
      // spacing: 16,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        RDLoading(
          size: RDLoadingSize.small,
          icon: RDLoadingIcon.circle,
          axis: Axis.horizontal,
          text: '加载中…',
          duration: _currentSliderValue.round(),
        ),
        const SizedBox(height: 16),
        RDSlider(
          value: _currentSliderValue,
          sliderThemeData: RDSliderThemeData(
            context: context,
            max: 2000,
            min: -20,
            divisions: 100,
            showThumbValue: true,
            scaleFormatter: (value) => value.toInt().toString(),
          ),
          onChanged: (double value) {
            setState(() {
              _currentSliderValue = value;
            });
          },
        )
      ],
    );
  }</pre>

</td-code-block>
                                  


## API
### RDLoading
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| axis | Axis | Axis.vertical | 文案和图标相对方向 |
| customIcon | Widget? | - | 自定义图标，优先级高于icon |
| duration | int | 2000 | 一次刷新的时间，控制动画速度 |
| icon | RDLoadingIcon? | RDLoadingIcon.circle | 图标，支持圆形、点状、菊花状 |
| iconColor | Color? | - | 图标颜色 |
| key |  | - |  |
| refreshWidget | Widget? | - | 失败刷新组件 |
| size | RDLoadingSize | - | 尺寸 |
| text | String? | - | 文案 |
| textColor | Color? | - | 文案颜色 |


  