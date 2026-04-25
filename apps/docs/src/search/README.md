---
title: Search 搜索框
description: 用于一组预设数据中的选择。
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

[td_search_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_search_page.dart)

### 1 组件类型

基础搜索框
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDefaultSearchBar(BuildContext context) {
    return RDSearchBar(
      placeHolder: '搜索预设文案',
      onTextChanged: (String text) {
        setState(() {
          inputText = text;
        });
      },
    );
  }</pre>

</td-code-block>
                                  

获取焦点后显示取消按钮
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildFocusSearchBar(BuildContext context) {
    return const RDSearchBar(
      placeHolder: '搜索预设文案',
      needCancel: true,
      autoFocus: true,
    );
  }</pre>

</td-code-block>
                                  
### 1 组件样式

搜索框形状
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSearchBarWithShape(BuildContext context) {
    return Column(
      // spacing: 16,
      children: [
        RDSearchBar(
          placeHolder: '搜索预设文案',
          // 方形
          style: RDSearchStyle.square,
          onTextChanged: (String text) {
            setState(() {
              inputText = text;
            });
          },
        ),
        const SizedBox(height: 16),
        RDSearchBar(
          placeHolder: '搜索预设文案',
          // 圆形
          style: RDSearchStyle.round,
          onTextChanged: (String text) {
            setState(() {
              inputText = text;
            });
          },
        ),
      ],
    );
  }</pre>

</td-code-block>
                                  

默认状态其他对齐方式
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildCenterSearchBar(BuildContext context) {
    return RDSearchBar(
      placeHolder: '搜索预设文案',
      alignment: RDSearchAlignment.center,
      onTextChanged: (String text) {
        setState(() {
          inputText = text;
        });
      },
    );
  }</pre>

</td-code-block>
                                  


## API
### RDSearchBar
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| action | String | '' | 自定义操作文字 |
| alignment | RDSearchAlignment? | RDSearchAlignment.left | 对齐方式，居中或这头部对齐 |
| autoFocus | bool | false | 是否自动获取焦点 |
| autoHeight | bool | false | 是否自动计算高度 |
| backgroundColor | Color? | - | 背景颜色 |
| controller | TextEditingController? | - | 控制器 |
| cursorHeight | double? | - | 光标的高 |
| enabled | bool? | - | 是否禁用 |
| focusNode | FocusNode? | - | 自定义焦点 |
| inputAction | TextInputAction? | - | 键盘动作类型 |
| key |  | - |  |
| mediumStyle | bool | false | 是否在导航栏中的样式 |
| needCancel | bool | false | 是否需要取消按钮 |
| onActionClick | RDSearchBarEvent? | - | 自定义操作回调 |
| onClearClick | RDSearchBarClearEvent? | - | 自定义操作回调 |
| onEditComplete | RDSearchBarCallBack? | - | 编辑完成回调 |
| onInputClick | GestureTapCallback? | - | 输入框点击事件 |
| onSubmitted | RDSearchBarEvent? | - | 提交回调 |
| onTapOutside | TapRegionCallback? | - | 点击输入框外部回调 |
| onTextChanged | RDSearchBarEvent? | - | 文字改变回调 |
| padding | EdgeInsets | const EdgeInsets.symmetric(horizontal: 16, vertical: 8) | 内部填充 |
| placeHolder | String? | - | 预设文案 |
| readOnly | bool? | - | 是否只读 |
| style | RDSearchStyle? | RDSearchStyle.square | 样式 |


  