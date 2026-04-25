---
title: NavBar 导航栏
description: 用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。
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

[td_navbar_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_navbar_page.dart)

### 1 组件类型

基础H5导航栏
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _baseH5Navbar(BuildContext context) {
    return const RDNavBar(
      height: 48,
      titleFontWeight: FontWeight.w600,
      title: titleText,
      screenAdaptation: false,
      useDefaultBack: true,
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _leftMultiAction(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: RDNavBar(
          height: 48,
          title: titleText,
          titleFontWeight: FontWeight.w600,
          screenAdaptation: false,
          useDefaultBack: true,
          leftBarItems: [
            RDNavBarItem(icon: RDIcons.close, iconSize: 24),
          ],
          rightBarItems: [
            RDNavBarItem(icon: RDIcons.ellipsis, iconSize: 24)
          ]),
    );
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _rightMultiAction(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: RDNavBar(
          height: 48,
          title: titleText,
          titleFontWeight: FontWeight.w600,
          screenAdaptation: false,
          useDefaultBack: true,
          rightBarItems: [
            RDNavBarItem(
              icon: RDIcons.home,
              iconSize: 24,
            ),
            RDNavBarItem(
              icon: RDIcons.ellipsis,
              iconSize: 24,
            )
          ]),
    );
  }</pre>

</td-code-block>
                                  

带搜索导航栏
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _searchNavbar(BuildContext context) {
    return RDNavBar(
        useDefaultBack: false,
        screenAdaptation: false,
        centerTitle: false,
        titleMargin: 0,
        titleWidget: RDSearchBar(
          needCancel: false,
          autoHeight: true,
          padding: const EdgeInsets.fromLTRB(0, 2, 0, 2),
          placeHolder: '搜索预设文案',
          mediumStyle: true,
          style: RDSearchStyle.round,
          onTextChanged: (String text) {
            print('input：$text');
          },
        ),
        rightBarItems: [
          RDNavBarItem(icon: RDIcons.home, iconSize: 24),
          RDNavBarItem(icon: RDIcons.ellipsis, iconSize: 24)
        ]);
  }</pre>

</td-code-block>
                                  

带图片导航栏
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _logoNavbar(BuildContext context) {
    return RDNavBar(
        useDefaultBack: false,
        screenAdaptation: false,
        centerTitle: false,
        titleMargin: 0,
        titleWidget: const RDImage(
          assetUrl: 'assets/img/td_brand.png',
          width: 102,
          height: 24,
        ),
        rightBarItems: [
          RDNavBarItem(icon: RDIcons.home, iconSize: 24),
          RDNavBarItem(icon: RDIcons.ellipsis, iconSize: 24)
        ]);
  }</pre>

</td-code-block>
                                  
### 1 组件样式

标题对齐
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _titleCenterNavbar(BuildContext context) {
    return RDNavBar(
        height: 48,
        title: titleText,
        titleFontWeight: FontWeight.w600,
        screenAdaptation: false,
        useDefaultBack: true,
        rightBarItems: [
          RDNavBarItem(icon: RDIcons.home, iconSize: 24),
          RDNavBarItem(icon: RDIcons.ellipsis, iconSize: 24)
        ]);
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _titleLeftNavbar(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: RDNavBar(
          height: 48,
          title: titleText,
          titleFontWeight: FontWeight.w600,
          centerTitle: false,
          titleMargin: 0,
          screenAdaptation: false,
          useDefaultBack: true,
          rightBarItems: [
            RDNavBarItem(icon: RDIcons.home, iconSize: 24),
            RDNavBarItem(icon: RDIcons.ellipsis, iconSize: 24)
          ]),
    );
  }</pre>

</td-code-block>
                                  

标题尺寸
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _titleNormalNavbar(BuildContext context) {
    return RDNavBar(
        height: 48,
        title: titleText,
        titleFontWeight: FontWeight.w600,
        screenAdaptation: false,
        useDefaultBack: true,
        rightBarItems: [
          RDNavBarItem(icon: RDIcons.home, iconSize: 24),
          RDNavBarItem(icon: RDIcons.ellipsis, iconSize: 24)
        ]);
  }</pre>

</td-code-block>
                                  


            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _titleBelowNavbar(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: RDNavBar(
          height: 104,
          title: '返回',
          titleColor: RDTheme.of(context).textColorPrimary,
          belowTitleWidget: SizedBox(
            height: 56,
            child: RDText(
              titleText,
              font: Font(size: 28, lineHeight: 52),
              fontWeight: FontWeight.w600,
            ),
          ),
          titleFont: Font(size: 16, lineHeight: 24),
          centerTitle: false,
          titleMargin: 0,
          screenAdaptation: false,
          useDefaultBack: false,
          leftBarItems: [
            RDNavBarItem(icon: RDIcons.chevron_left, iconSize: 24),
          ],
          rightBarItems: [
            RDNavBarItem(icon: RDIcons.home, iconSize: 24),
            RDNavBarItem(icon: RDIcons.ellipsis, iconSize: 24)
          ]),
    );
  }</pre>

</td-code-block>
                                  

自定义颜色
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _setBgColorNavbar(BuildContext context) {
    return RDNavBar(
        height: 48,
        title: titleText,
        titleColor: Colors.white,
        backgroundColor: RDTheme.of(context).brandNormalColor,
        titleFontWeight: FontWeight.w600,
        useDefaultBack: false,
        screenAdaptation: false,
        leftBarItems: [
          RDNavBarItem(
              icon: RDIcons.chevron_left,
              iconSize: 24,
              iconColor: Colors.white),
        ],
        rightBarItems: [
          RDNavBarItem(
              icon: RDIcons.home, iconSize: 24, iconColor: Colors.white),
          RDNavBarItem(
              icon: RDIcons.ellipsis, iconSize: 24, iconColor: Colors.white)
        ]);
  }</pre>

</td-code-block>
                                  


## API
### RDNavBar
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| backgroundColor | Color? | - | 背景颜色 |
| backIconColor | Color? | - | 左边返回图标颜色 |
| belowTitleWidget | Widget? | - | belowTitleWidget navbar 下方的 widget |
| border | RDNavBarItemBorder? | - | 边框 |
| boxShadow | List<BoxShadow>? | - | 底部阴影 |
| centerTitle | bool | true | 标题是否居中 |
| flexibleSpace | Widget? | - | 固定背景 |
| height | double | 48 | 高度 |
| key |  | - |  |
| leftBarItems | List<RDNavBarItem>? | - | 左边操作项 |
| onBack | VoidCallback? | - | 返回事件 |
| opacity | double | 1.0 | 透明度 |
| padding | EdgeInsetsGeometry? | - | 内部填充 |
| rightBarItems | List<RDNavBarItem>? | - | 右边操作项 |
| screenAdaptation | bool | true | 是否进行屏幕适配，默认 true |
| title | String? | - | 标题文案 |
| titleColor | Color? | - | 标题颜色 |
| titleFont | Font? | - | 标题字体尺寸 |
| titleFontFamily | FontFamily? | - | 标题字体样式 |
| titleFontWeight | FontWeight? | FontWeight.w500 | 标题字体粗细 |
| titleMargin | double | 16 | 中间文案左右两边间距 |
| titleWidget | Widget? | - | 标题控件，优先级高于 title 文案 |
| useBorderStyle | bool | false | 是否使用边框模式 |
| useDefaultBack | bool | true | 是否使用默认的返回 |

```
```
 ### RDNavBarItem
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| action | RDBarItemAction? | - | 操作回调 |
| icon | IconData? | - | 图标 |
| iconColor | Color? | - | 图标颜色 |
| iconSize | double? | 24.0 | 图标尺寸 |
| iconWidget | Widget? | - | 图标组件，优先级高于 icon |
| padding | EdgeInsetsGeometry? | - |  |


  