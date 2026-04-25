---
title: ActionSheet 动作面板
description: 由用户操作后触发的一种特定的模态弹出框 ，呈现一组与当前情境相关的两个或多个选项。
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

[td_action_sheet_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_action_sheet_page.dart)

### 1 组件类型

列表型动作面板

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBaseListActionSheet(BuildContext context) {
  return RDButton(
    text: '常规列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: _nums.map((e) => RDActionSheetItem(label: '选项$e')).toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildDescListActionSheet(BuildContext context) {
  return RDButton(
    text: '带描述列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        items: _nums.map((e) => RDActionSheetItem(label: '选项$e')).toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildIconListActionSheet(BuildContext context) {
  return RDButton(
    text: '带图标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: _nums
            .map((e) => RDActionSheetItem(
                  label: '选项$e',
                  icon: const Icon(RDIcons.app),
                ))
            .toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBadgeListActionSheet(BuildContext context) {
  return RDButton(
    text: '带徽标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: [
          RDActionSheetItem(
            label: '选项一',
            badge: const RDBadge(RDBadgeType.redPoint),
          ),
          RDActionSheetItem(
            label: '选项二',
            badge: const RDBadge(RDBadgeType.message, count: '8'),
          ),
          RDActionSheetItem(
            label: '选项三',
            badge: const RDBadge(RDBadgeType.message, count: '99'),
          ),
          RDActionSheetItem(
            label: '选项四',
            badge: const RDBadge(RDBadgeType.message, count: '99+'),
          ),
        ],
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildItemDescriptionListActionSheet(BuildContext context) {
  return RDButton(
    text: '带Cell描述常规列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: _nums.map((e) => RDActionSheetItem(label: '选项$e',description: '描述$e')).toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

宫格型动作面板

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBaseGridActionSheet(BuildContext context) {
  return RDButton(
    text: '常规宫格',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        theme: RDActionSheetTheme.grid,
        count: 8,
        items: _gridItems,
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildDescGridActionSheet(BuildContext context) {
  return RDButton(
    text: '带描述宫格',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        theme: RDActionSheetTheme.grid,
        count: 8,
        description: '动作面板描述文字',
        items: _gridItems,
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildPaginationGridActionSheet(BuildContext context) {
  return RDButton(
    text: '带翻页宫格',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        theme: RDActionSheetTheme.grid,
        count: 8,
        showPagination: true,
        items: [
          ..._gridItems,
          RDActionSheetItem(
            label: '安卓',
            icon: const IconWithBackground(icon: RDIcons.logo_android),
          ),
          RDActionSheetItem(
            label: 'Apple',
            icon: const IconWithBackground(icon: RDIcons.logo_apple),
          ),
          RDActionSheetItem(
            label: 'Chrome',
            icon: const IconWithBackground(icon: RDIcons.logo_chrome),
          ),
          RDActionSheetItem(
            label: 'Github',
            icon: const IconWithBackground(icon: RDIcons.logo_github),
          ),
        ],
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildScrollGridActionSheet(BuildContext context) {
  return RDButton(
    text: '多行滚动宫格',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        theme: RDActionSheetTheme.grid,
        count: 8,
        scrollable: true,
        items: [
          ..._gridItems,
          RDActionSheetItem(
            label: '安卓',
            icon: const IconWithBackground(icon: RDIcons.logo_android),
          ),
          RDActionSheetItem(
            label: 'Apple',
            icon: const IconWithBackground(icon: RDIcons.logo_apple),
          ),
          RDActionSheetItem(
            label: 'Chrome',
            icon: const IconWithBackground(icon: RDIcons.logo_chrome),
          ),
          RDActionSheetItem(
            label: 'Github',
            icon: const IconWithBackground(icon: RDIcons.logo_github),
          ),
          RDActionSheetItem(
            label: 'Twitter',
            icon: const IconWithBackground(icon: RDIcons.logo_twitter),
          ),
        ],
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildMultiScrollGridActionSheet(BuildContext context) {
  return RDButton(
    text: '带描述多行滚动宫格',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet.showGroupActionSheet(context, items: [
        RDActionSheetItem(
          label: 'Allen',
          icon: Image.asset('assets/img/td_action_sheet_5.png'),
          group: '分享给好友',
        ),
        RDActionSheetItem(
          label: 'Nick',
          icon: Image.asset('assets/img/td_action_sheet_6.png'),
          group: '分享给好友',
        ),
        RDActionSheetItem(
          label: 'Jacky',
          icon: Image.asset('assets/img/td_action_sheet_7.png'),
          group: '分享给好友',
        ),
        RDActionSheetItem(
          label: 'Eric',
          icon: Image.asset('assets/img/td_action_sheet_8.png'),
          group: '分享给好友',
        ),
        RDActionSheetItem(
          label: 'Johnsc',
          icon: Image.asset('assets/img/td_action_sheet_5.png'),
          group: '分享给好友',
        ),
        RDActionSheetItem(
          label: 'Kevin',
          icon: Image.asset('assets/img/td_action_sheet_6.png'),
          group: '分享给好友',
        ),
        ..._gridItems,
      ]);
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBadgeGridActionSheet(BuildContext context) {
  return RDButton(
    text: '带徽标宫格型',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet.showGridActionSheet(context, items: [
        RDActionSheetItem(
            label: '微信',
            icon: Image.asset('assets/img/td_action_sheet_1.png'),
            badge: const RDBadge(RDBadgeType.message, count: 'NEW')),
        RDActionSheetItem(
            label: '朋友圈',
            icon: Image.asset('assets/img/td_action_sheet_2.png')),
        RDActionSheetItem(
            label: 'QQ', icon: Image.asset('assets/img/td_action_sheet_3.png')),
        RDActionSheetItem(
            label: '企业微信',
            icon: Image.asset('assets/img/td_action_sheet_4.png')),
        RDActionSheetItem(
            label: '收藏',
            icon: const IconWithBackground(icon: RDIcons.star),
            badge: const RDBadge(RDBadgeType.redPoint)),
        RDActionSheetItem(
            label: '刷新', icon: const IconWithBackground(icon: RDIcons.refresh)),
        RDActionSheetItem(
            label: '下载',
            icon: const IconWithBackground(icon: RDIcons.download),
            badge: const RDBadge(RDBadgeType.message, count: '8')),
        RDActionSheetItem(
            label: '复制', icon: const IconWithBackground(icon: RDIcons.queue)),
      ]);
    },
  );
}</pre>

</td-code-block>
                
### 1 组件状态

列表型选项状态

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBaseListStateActionSheet(BuildContext context) {
  return RDButton(
    text: '列表型选项状态',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: [
          RDActionSheetItem(
            label: '默认选项',
          ),
          RDActionSheetItem(
            label: '自定义选项',
            textStyle: TextStyle(
              color: RDTheme.of(context).brandNormalColor,
            ),
          ),
          RDActionSheetItem(
            label: '失效选项',
            disabled: true,
          ),
          RDActionSheetItem(
            label: '警告选项',
            textStyle: const TextStyle(
              color: Colors.red,
            ),
          ),
        ],
        onSelected: (item, index) {
          print('选中了：${item.label}');
        },
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildIconListStateActionSheet(BuildContext context) {
  return RDButton(
    text: '列表型带图标状态',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: [
          RDActionSheetItem(
            label: '默认选项',
            icon: const Icon(RDIcons.app),
          ),
          RDActionSheetItem(
            label: '自定义选项',
            icon: const Icon(RDIcons.app),
            textStyle: TextStyle(
              color: RDTheme.of(context).brandNormalColor,
            ),
          ),
          RDActionSheetItem(
            label: '失效选项',
            icon: const Icon(RDIcons.app),
            disabled: true,
          ),
          RDActionSheetItem(
            label: '警告选项',
            icon: const Icon(RDIcons.app),
            textStyle: const TextStyle(
              color: Colors.red,
            ),
          ),
        ],
        onSelected: (item, index) {
          print('选中了：${item.label}');
        },
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBaseListStateActionSheet(BuildContext context) {
  return RDButton(
    text: '列表型选项状态',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: [
          RDActionSheetItem(
            label: '默认选项',
          ),
          RDActionSheetItem(
            label: '自定义选项',
            textStyle: TextStyle(
              color: RDTheme.of(context).brandNormalColor,
            ),
          ),
          RDActionSheetItem(
            label: '失效选项',
            disabled: true,
          ),
          RDActionSheetItem(
            label: '警告选项',
            textStyle: const TextStyle(
              color: Colors.red,
            ),
          ),
        ],
        onSelected: (item, index) {
          print('选中了：${item.label}');
        },
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildIconListStateActionSheet(BuildContext context) {
  return RDButton(
    text: '列表型带图标状态',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        items: [
          RDActionSheetItem(
            label: '默认选项',
            icon: const Icon(RDIcons.app),
          ),
          RDActionSheetItem(
            label: '自定义选项',
            icon: const Icon(RDIcons.app),
            textStyle: TextStyle(
              color: RDTheme.of(context).brandNormalColor,
            ),
          ),
          RDActionSheetItem(
            label: '失效选项',
            icon: const Icon(RDIcons.app),
            disabled: true,
          ),
          RDActionSheetItem(
            label: '警告选项',
            icon: const Icon(RDIcons.app),
            textStyle: const TextStyle(
              color: Colors.red,
            ),
          ),
        ],
        onSelected: (item, index) {
          print('选中了：${item.label}');
        },
      );
    },
  );
}</pre>

</td-code-block>
                
### 1 组件样式

列表型对齐方式

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBadgeListCenterActionSheet(BuildContext context) {
  return RDButton(
    text: '居中带徽标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        items: [
          RDActionSheetItem(
            label: '选项一',
            badge: const RDBadge(RDBadgeType.redPoint),
          ),
          RDActionSheetItem(
            label: '选项二',
            badge: const RDBadge(
              RDBadgeType.message,
              count: '8',
            ),
          ),
          RDActionSheetItem(
            label: '选项三',
            badge: const RDBadge(
              RDBadgeType.message,
              count: '99',
            ),
          ),
        ],
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildIconListCenterActionSheet(BuildContext context) {
  return RDButton(
    text: '居中带图标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        items: _nums
            .map((e) => RDActionSheetItem(
                  label: '选项$e',
                  icon: const Icon(RDIcons.app),
                ))
            .toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBadgeListLeftActionSheet(BuildContext context) {
  return RDButton(
    text: '左对齐带徽标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        align: RDActionSheetAlign.left,
        items: _nums
            .map((e) => RDActionSheetItem(
                  label: '选项$e',
                  badge: const RDBadge(RDBadgeType.redPoint),
                ))
            .toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildIconListLeftActionSheet(BuildContext context) {
  return RDButton(
    text: '左对齐带图标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        align: RDActionSheetAlign.left,
        items: _nums
            .map((e) => RDActionSheetItem(
                  label: '选项$e',
                  icon: const Icon(RDIcons.app),
                ))
            .toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBadgeListCenterActionSheet(BuildContext context) {
  return RDButton(
    text: '居中带徽标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        items: [
          RDActionSheetItem(
            label: '选项一',
            badge: const RDBadge(RDBadgeType.redPoint),
          ),
          RDActionSheetItem(
            label: '选项二',
            badge: const RDBadge(
              RDBadgeType.message,
              count: '8',
            ),
          ),
          RDActionSheetItem(
            label: '选项三',
            badge: const RDBadge(
              RDBadgeType.message,
              count: '99',
            ),
          ),
        ],
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildIconListCenterActionSheet(BuildContext context) {
  return RDButton(
    text: '居中带图标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        items: _nums
            .map((e) => RDActionSheetItem(
                  label: '选项$e',
                  icon: const Icon(RDIcons.app),
                ))
            .toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildBadgeListLeftActionSheet(BuildContext context) {
  return RDButton(
    text: '左对齐带徽标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        align: RDActionSheetAlign.left,
        items: _nums
            .map((e) => RDActionSheetItem(
                  label: '选项$e',
                  badge: const RDBadge(RDBadgeType.redPoint),
                ))
            .toList(),
      );
    },
  );
}</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
Widget _buildIconListLeftActionSheet(BuildContext context) {
  return RDButton(
    text: '左对齐带图标列表',
    isBlock: true,
    type: RDButtonType.outline,
    theme: RDButtonTheme.primary,
    size: RDButtonSize.large,
    onTap: () {
      RDActionSheet(
        context,
        visible: true,
        description: '动作面板描述文字',
        align: RDActionSheetAlign.left,
        items: _nums
            .map((e) => RDActionSheetItem(
                  label: '选项$e',
                  icon: const Icon(RDIcons.app),
                ))
            .toList(),
      );
    },
  );
}</pre>

</td-code-block>
                


## API
### RDActionSheetItem
#### 简介
动作面板项目
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| badge | RDBadge? | - | 角标 |
| description | String? | - | 描述信息 |
| disabled | bool | false | 是否禁用 |
| group | String? | - | 分组，用于带描述多行滚动宫格 |
| icon | Widget? | - | 图标 |
| iconSize | double? | - | 图标大小 |
| label | String | - | 标题 |
| textStyle | TextStyle? | - | 标题样式 |

```
```
 ### RDActionSheet
#### 简介
动作面板
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| align | RDActionSheetAlign | RDActionSheetAlign.center | 对齐方式 |
| cancelText | String? | - | 取消按钮的文本 |
| closeOnOverlayClick | bool | true | 点击蒙层时是否关闭 |
| context | BuildContext | context | 上下文 |
| count | int | 8 | 每页显示的项目数 |
| description | String? | - | 描述文本 |
| itemHeight | double | 96.0 | 项目的行高 |
| itemMinWidth | double | 80.0 | 项目的最小宽度 |
| items | List<RDActionSheetItem> | - | ActionSheet的项目列表 |
| onCancel | VoidCallback? | - | 取消按钮的回调函数 |
| onClose | VoidCallback? | - | 关闭时的回调函数 |
| onSelected | RDActionSheetItemCallback? | - | 选择项目时的回调函数 |
| rows | int | 2 | 显示的行数 |
| scrollable | bool | false | 是否可以横向滚动 |
| showCancel | bool | true | 是否显示取消按钮 |
| showOverlay | bool | true | 是否显示遮罩层 |
| showPagination | bool | false | 是否显示分页 |
| theme | RDActionSheetTheme | RDActionSheetTheme.list | 主题样式 |
| useSafeArea | bool | true | 使用安全区域 |
| visible | bool | false | 是否立即显示 |


#### 静态方法

| 名称 | 返回类型 | 参数 | 说明 |
| --- | --- | --- | --- |
| showGridActionSheet |  |   required BuildContext context,  required List<RDActionSheetItem> items,  RDActionSheetAlign align,  String? cancelText,  bool showCancel,  RDActionSheetItemCallback? onSelected,  bool showOverlay,  bool closeOnOverlayClick,  int count,  int rows,  double itemHeight,  double itemMinWidth,  bool scrollable,  bool showPagination,  VoidCallback? onCancel,  String? description,  VoidCallback? onClose,  bool useSafeArea, | 显示宫格类型面板 |
| showGroupActionSheet |  |   required BuildContext context,  required List<RDActionSheetItem> items,  RDActionSheetAlign align,  String? cancelText,  bool showCancel,  RDActionSheetItemCallback? onSelected,  bool showOverlay,  bool closeOnOverlayClick,  double itemHeight,  double itemMinWidth,  VoidCallback? onCancel,  VoidCallback? onClose,  bool useSafeArea, | 显示分组类型面板 |
| showListActionSheet |  |   required BuildContext context,  required List<RDActionSheetItem> items,  RDActionSheetAlign align,  String? cancelText,  bool showCancel,  VoidCallback? onCancel,  RDActionSheetItemCallback? onSelected,  bool showOverlay,  bool closeOnOverlayClick,  VoidCallback? onClose,  bool useSafeArea, | 显示列表类型面板 |


  