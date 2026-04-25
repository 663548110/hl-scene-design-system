---
title: Image 图片
description: 用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。
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

[td_image_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_image_page.dart)

### 1 组件类型



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageClip(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '裁剪',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.clip,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageStretch(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '拉伸',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          color: RDTheme.of(context).bgColorContainerHover,
          width: 121,
          height: 72,
          child: const Stack(
            alignment: Alignment.center,
            children: [
              RDImage(
                assetUrl: 'assets/img/image.png',
                width: 121,
                height: 50,
                type: RDImageType.stretch,
              ),
            ],
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitHeight(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应高',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 89,
          height: 72,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitHeight,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitWidth(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应宽',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 72,
          height: 89,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitWidth,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.square,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageRoundedSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆角方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.roundedSquare,
          width: 72,
          height: 72,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageCircle(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          width: 72,
          height: 72,
          type: RDImageType.circle,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageClip(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '裁剪',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.clip,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageStretch(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '拉伸',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          color: RDTheme.of(context).bgColorContainerHover,
          width: 121,
          height: 72,
          child: const Stack(
            alignment: Alignment.center,
            children: [
              RDImage(
                assetUrl: 'assets/img/image.png',
                width: 121,
                height: 50,
                type: RDImageType.stretch,
              ),
            ],
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitHeight(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应高',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 89,
          height: 72,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitHeight,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitWidth(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应宽',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 72,
          height: 89,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitWidth,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.square,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageRoundedSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆角方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.roundedSquare,
          width: 72,
          height: 72,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageCircle(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          width: 72,
          height: 72,
          type: RDImageType.circle,
        ),
      ],
    );
  }</pre>

</td-code-block>
                



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageClip(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '裁剪',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.clip,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageStretch(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '拉伸',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          color: RDTheme.of(context).bgColorContainerHover,
          width: 121,
          height: 72,
          child: const Stack(
            alignment: Alignment.center,
            children: [
              RDImage(
                assetUrl: 'assets/img/image.png',
                width: 121,
                height: 50,
                type: RDImageType.stretch,
              ),
            ],
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitHeight(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应高',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 89,
          height: 72,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitHeight,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitWidth(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应宽',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 72,
          height: 89,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitWidth,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.square,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageRoundedSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆角方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.roundedSquare,
          width: 72,
          height: 72,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageCircle(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          width: 72,
          height: 72,
          type: RDImageType.circle,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageClip(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '裁剪',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.clip,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageStretch(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '拉伸',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          color: RDTheme.of(context).bgColorContainerHover,
          width: 121,
          height: 72,
          child: const Stack(
            alignment: Alignment.center,
            children: [
              RDImage(
                assetUrl: 'assets/img/image.png',
                width: 121,
                height: 50,
                type: RDImageType.stretch,
              ),
            ],
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitHeight(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应高',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 89,
          height: 72,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitHeight,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitWidth(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应宽',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 72,
          height: 89,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitWidth,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.square,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageRoundedSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆角方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.roundedSquare,
          width: 72,
          height: 72,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageCircle(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          width: 72,
          height: 72,
          type: RDImageType.circle,
        ),
      ],
    );
  }</pre>

</td-code-block>
                



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageClip(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '裁剪',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.clip,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageStretch(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '拉伸',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          color: RDTheme.of(context).bgColorContainerHover,
          width: 121,
          height: 72,
          child: const Stack(
            alignment: Alignment.center,
            children: [
              RDImage(
                assetUrl: 'assets/img/image.png',
                width: 121,
                height: 50,
                type: RDImageType.stretch,
              ),
            ],
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitHeight(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应高',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 89,
          height: 72,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitHeight,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitWidth(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应宽',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 72,
          height: 89,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitWidth,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.square,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageRoundedSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆角方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.roundedSquare,
          width: 72,
          height: 72,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageCircle(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          width: 72,
          height: 72,
          type: RDImageType.circle,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageClip(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '裁剪',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.clip,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageStretch(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '拉伸',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          color: RDTheme.of(context).bgColorContainerHover,
          width: 121,
          height: 72,
          child: const Stack(
            alignment: Alignment.center,
            children: [
              RDImage(
                assetUrl: 'assets/img/image.png',
                width: 121,
                height: 50,
                type: RDImageType.stretch,
              ),
            ],
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitHeight(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应高',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 89,
          height: 72,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitHeight,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageFitWidth(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '适应宽',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
          width: 72,
          height: 89,
          color: RDTheme.of(context).bgColorContainerHover,
          child: const RDImage(
            assetUrl: 'assets/img/image.png',
            type: RDImageType.fitWidth,
          ),
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.square,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageRoundedSquare(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆角方形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          type: RDImageType.roundedSquare,
          width: 72,
          height: 72,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _imageCircle(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '圆形',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          assetUrl: 'assets/img/image.png',
          width: 72,
          height: 72,
          type: RDImageType.circle,
        ),
      ],
    );
  }</pre>

</td-code-block>
                
### 1 组件状态



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: Icon(
                  RDIcons.ellipsis,
                  size: 22,
                  color: RDTheme.of(context).textColorPlaceholder,
                ))),

        /// @tips 实际组件写法如下：上面仅为加载展示
        // const RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: RotationTransition(
                    turns: animation,
                    alignment: Alignment.center,
                    child: RDCircleIndicator(
                      color: RDTheme.of(context).brandNormalColor,
                      size: 18,
                      lineWidth: 3,
                    )))),
        // 实际组件写法如下：上面仅为加载展示
        // RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   loadingWidget: RotationTransition(
        //       turns: animation,
        //       alignment: Alignment.center,
        //       child: RDCircleIndicator(
        //         color: RDTheme.of(context).brandNormalColor,
        //         size: 18,
        //         lineWidth: 3,
        //       )),
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          imgUrl: 'error',
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        RDImage(
          imgUrl: 'error',
          errorWidget: RDText(
            '加载失败',
            forceVerticalCenter: true,
            font: RDTheme.of(context).fontBodyExtraSmall,
          ),
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: Icon(
                  RDIcons.ellipsis,
                  size: 22,
                  color: RDTheme.of(context).textColorPlaceholder,
                ))),

        /// @tips 实际组件写法如下：上面仅为加载展示
        // const RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: RotationTransition(
                    turns: animation,
                    alignment: Alignment.center,
                    child: RDCircleIndicator(
                      color: RDTheme.of(context).brandNormalColor,
                      size: 18,
                      lineWidth: 3,
                    )))),
        // 实际组件写法如下：上面仅为加载展示
        // RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   loadingWidget: RotationTransition(
        //       turns: animation,
        //       alignment: Alignment.center,
        //       child: RDCircleIndicator(
        //         color: RDTheme.of(context).brandNormalColor,
        //         size: 18,
        //         lineWidth: 3,
        //       )),
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          imgUrl: 'error',
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        RDImage(
          imgUrl: 'error',
          errorWidget: RDText(
            '加载失败',
            forceVerticalCenter: true,
            font: RDTheme.of(context).fontBodyExtraSmall,
          ),
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: Icon(
                  RDIcons.ellipsis,
                  size: 22,
                  color: RDTheme.of(context).textColorPlaceholder,
                ))),

        /// @tips 实际组件写法如下：上面仅为加载展示
        // const RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: RotationTransition(
                    turns: animation,
                    alignment: Alignment.center,
                    child: RDCircleIndicator(
                      color: RDTheme.of(context).brandNormalColor,
                      size: 18,
                      lineWidth: 3,
                    )))),
        // 实际组件写法如下：上面仅为加载展示
        // RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   loadingWidget: RotationTransition(
        //       turns: animation,
        //       alignment: Alignment.center,
        //       child: RDCircleIndicator(
        //         color: RDTheme.of(context).brandNormalColor,
        //         size: 18,
        //         lineWidth: 3,
        //       )),
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          imgUrl: 'error',
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        RDImage(
          imgUrl: 'error',
          errorWidget: RDText(
            '加载失败',
            forceVerticalCenter: true,
            font: RDTheme.of(context).fontBodyExtraSmall,
          ),
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: Icon(
                  RDIcons.ellipsis,
                  size: 22,
                  color: RDTheme.of(context).textColorPlaceholder,
                ))),

        /// @tips 实际组件写法如下：上面仅为加载展示
        // const RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _loadingCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '加载自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        Container(
            height: 72,
            width: 72,
            clipBehavior: Clip.hardEdge,
            decoration: BoxDecoration(
                borderRadius:
                    BorderRadius.circular(RDTheme.of(context).radiusDefault)),
            child: Container(
                alignment: Alignment.center,
                color: RDTheme.of(context).bgColorContainerHover,
                child: RotationTransition(
                    turns: animation,
                    alignment: Alignment.center,
                    child: RDCircleIndicator(
                      color: RDTheme.of(context).brandNormalColor,
                      size: 18,
                      lineWidth: 3,
                    )))),
        // 实际组件写法如下：上面仅为加载展示
        // RDImage(
        //   imgUrl:
        //       'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        //   loadingWidget: RotationTransition(
        //       turns: animation,
        //       alignment: Alignment.center,
        //       child: RDCircleIndicator(
        //         color: RDTheme.of(context).brandNormalColor,
        //         size: 18,
        //         lineWidth: 3,
        //       )),
        //   type: RDImageType.roundedSquare,
        // ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failDefault(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败默认提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        const RDImage(
          imgUrl: 'error',
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _failCustom(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: RDText(
            '失败自定义提示',
            font: RDTheme.of(context).fontBodyMedium,
          ),
        ),
        RDImage(
          imgUrl: 'error',
          errorWidget: RDText(
            '加载失败',
            forceVerticalCenter: true,
            font: RDTheme.of(context).fontBodyExtraSmall,
          ),
          type: RDImageType.roundedSquare,
        ),
      ],
    );
  }</pre>

</td-code-block>
                


## API
### RDImage
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| alignment |  | Alignment.center |  |
| assetUrl | String? | - | 本地素材地址 |
| cacheHeight |  | - |  |
| cacheWidth |  | - |  |
| centerSlice |  | - |  |
| color |  | - |  |
| colorBlendMode |  | - |  |
| errorBuilder |  | - |  |
| errorWidget | Widget? | - | 失败自定义提示 |
| excludeFromSemantics |  | false |  |
| filterQuality |  | FilterQuality.low |  |
| fit | BoxFit? | - | 适配样式 |
| frameBuilder | ImageFrameBuilder? | - | 以下系统Image属性，释义请参考系统[Image]中注释 |
| gaplessPlayback |  | false |  |
| height | double? | - | 自定义高 |
| imageFile | File? | - | 图片文件路径 |
| imgUrl | String? | - | 图片地址 |
| isAntiAlias |  | false |  |
| key |  | - |  |
| loadingBuilder |  | - |  |
| loadingWidget | Widget? | - | 加载自定义提示 |
| matchTextDirection |  | false |  |
| opacity |  | - |  |
| repeat |  | ImageRepeat.noRepeat |  |
| semanticLabel |  | - |  |
| type | RDImageType | RDImageType.roundedSquare | 图片类型 |
| width | double? | - | 自定义宽 |


  