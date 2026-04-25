---
title: Swiper 轮播图
description: 
spline: base
isComponent: true
---

<span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20lines-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20functions-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20statements-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20branches-83%25-blue" /></span>
## 引入

在rdesign_flutter/rdesign_flutter.dart中有所有组件的路径。

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart'; 
import 'package:flutter_swiper_null_safety/flutter_swiper_null_safety.dart';
```

## 代码演示

[td_swiper_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_swiper_page.dart)

### 1 组件类型

点状(dots)

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDotsSwiper(BuildContext context) {
    return Swiper(
      autoplay: true,
      itemCount: 6,
      loop: true,
      pagination: const SwiperPagination(
        alignment: Alignment.bottomCenter,
        builder: RDSwiperPagination.dots,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                

点条状(dots-bar)

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDotsBarSwiper(BuildContext context) {
    return Swiper(
      autoplay: true,
      itemCount: 6,
      loop: true,
      pagination: const SwiperPagination(
        alignment: Alignment.bottomCenter,
        builder: RDSwiperPagination.dotsBar,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                

分式(fraction)

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildFractionSwiper(BuildContext context) {
    return Swiper(
      autoplay: true,
      itemCount: 6,
      loop: true,
      scrollDirection: Axis.vertical,
      pagination: const SwiperPagination(
        alignment: Alignment.bottomCenter,
        builder: RDSwiperPagination.fraction,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                

切换按钮(controls)

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildControlsSwiper(BuildContext context) {
    return Swiper(
      // autoplay: true,
      itemCount: 6,
      loop: false,
      pagination: const SwiperPagination(
        alignment: Alignment.center,
        builder: RDSwiperPagination.controls,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                

卡片式(cards)

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCardsSwiper(BuildContext context) {
    return Swiper(
      viewportFraction: 0.75,
      outer: true,
      autoplay: true,
      itemCount: 6,
      loop: true,
      transformer: RDPageTransformer.margin(),
      pagination: const SwiperPagination(
        alignment: Alignment.center,
        builder: RDSwiperPagination.dots,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                

卡片式(cards)-scale:0.8

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildScaleCardsSwiper(BuildContext context) {
    return Swiper(
      viewportFraction: 0.75,
      outer: true,
      autoplay: true,
      itemCount: 6,
      loop: true,
      transformer: RDPageTransformer.scaleAndFade(),
      pagination: const SwiperPagination(
        alignment: Alignment.center,
        builder: RDSwiperPagination.dots,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                
### 1 组件样式

内部

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDotsSwiper(BuildContext context) {
    return Swiper(
      autoplay: true,
      itemCount: 6,
      loop: true,
      pagination: const SwiperPagination(
        alignment: Alignment.bottomCenter,
        builder: RDSwiperPagination.dots,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                

外部

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildOuterDotsSwiper(BuildContext context) {
    return Swiper(
      autoplay: true,
      itemCount: 6,
      loop: true,
      outer: true,
      pagination: const SwiperPagination(
        alignment: Alignment.bottomCenter,
        builder: RDSwiperPagination.dots,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                

右边(竖向)

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightDotsSwiper(BuildContext context) {
    return Swiper(
      autoplay: true,
      itemCount: 6,
      loop: true,
      scrollDirection: Axis.vertical,
      pagination: const SwiperPagination(
        alignment: Alignment.centerRight,
        builder: RDSwiperPagination.dots,
      ),
      itemBuilder: (BuildContext context, int index) {
        return const RDImage(
          assetUrl: 'assets/img/image.png',
        );
      },
    );
  }</pre>

</td-code-block>
                


## API
### RDSwiperPagination
#### 简介
RDesign风格的Swiper指示器样式，与flutter_swiper的Swiper结合使用
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| alignment | Alignment? | - | 当 scrollDirection== Axis.horizontal 时，默认Alignment.bottomCenter |
| builder | SwiperPlugin | RDSwiperPagination.dots | 具体样式 |
| key | Key? | - |  |
| margin | EdgeInsetsGeometry | const EdgeInsets.all(10.0) | 指示器和container之间的距离 |

```
```
 ### RDPageTransformer
#### 简介
RD默认PageTransformer
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fade | double? | - | 淡化比例 |
| margin | double? | - | 左右间隔 |
| scale | double? | - | 缩放比例 |


#### 工厂构造方法

| 名称  | 说明 |
| --- |  --- |
| RDPageTransformer.margin  | 普通margin的卡片式 |
| RDPageTransformer.scaleAndFade  | 缩放或透明的卡片式 |


  