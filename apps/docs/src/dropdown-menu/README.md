---
title: DropdownMenu 下拉菜单
description: 菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。
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

[td_dropdown_menu_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_dropdown_menu_page.dart)

### 1 组件类型

单选下拉菜单
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDDropdownMenu _buildDownSimple(BuildContext context) {
  return RDDropdownMenu(
    direction: RDDropdownMenuDirection.down,
    onMenuOpened: (value) {
      print('打开第$value个菜单');
    },
    onMenuClosed: (value) {
      print('关闭第$value个菜单');
    },
    items: [
      RDDropdownItem(
        options: [
          RDDropdownItemOption(label: '全部产品', value: 'all', selected: true),
          RDDropdownItemOption(label: '最新产品', value: 'new'),
          RDDropdownItemOption(label: '最火产品', value: 'hot'),
        ],
        onChange: (value) {
          print('选择：$value');
        },
      ),
      RDDropdownItem(
        options: [
          RDDropdownItemOption(label: '默认排序', value: 'default', selected: true),
          RDDropdownItemOption(label: '价格从高到低', value: 'price'),
        ],
      ),
    ],
  );
}</pre>

</td-code-block>
                                  

分栏下拉菜单
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDDropdownMenu _buildDownChunk(BuildContext context) {
  return RDDropdownMenu(
    direction: RDDropdownMenuDirection.down,
    items: [
      RDDropdownItem(
        label: '单列多选',
        multiple: true,
        options: [
          RDDropdownItemOption(label: '选项1', value: '1', selected: true),
          RDDropdownItemOption(label: '选项2', value: '2'),
          RDDropdownItemOption(label: '选项3', value: '3'),
          RDDropdownItemOption(label: '选项4', value: '4'),
          RDDropdownItemOption(label: '选项5', value: '5'),
          RDDropdownItemOption(label: '选项6', value: '6'),
          RDDropdownItemOption(label: '选项7', value: '7'),
          RDDropdownItemOption(label: '选项8', value: '8'),
          RDDropdownItemOption(label: '禁用选项', value: '9', disabled: true),
        ],
        onChange: (value) {
          print('选择：$value');
        },
        onConfirm: (value) {
          print('确定选择：$value');
        },
        onReset: () {
          print('清空选择');
        },
      ),
      RDDropdownItem(
        // label: '双列单选',
        multiple: false,
        optionsColumns: 2,
        maxHeight: 300,
        options: [
          RDDropdownItemOption(label: '双列单选1', value: '1'),
          RDDropdownItemOption(label: '双列单选2', value: '2', selected: true),
          RDDropdownItemOption(label: '双列单选3', value: '3'),
          RDDropdownItemOption(label: '双列单选4', value: '4'),
          RDDropdownItemOption(label: '双列单选5', value: '5'),
          RDDropdownItemOption(label: '双列单选6', value: '6'),
          RDDropdownItemOption(label: '双列单选7', value: '7'),
          RDDropdownItemOption(label: '双列单选8', value: '8'),
          RDDropdownItemOption(label: '禁用选项', value: '9', disabled: true),
          RDDropdownItemOption(label: '禁用选项', value: '10', disabled: true),
        ],
      ),
      RDDropdownItem(
        label: '双列多选',
        multiple: true,
        optionsColumns: 2,
        options: [
          RDDropdownItemOption(label: '选项1', value: '1', selected: true),
          RDDropdownItemOption(label: '选项2', value: '2', selected: true),
          RDDropdownItemOption(label: '选项3', value: '3'),
          RDDropdownItemOption(label: '选项4', value: '4'),
          RDDropdownItemOption(label: '选项5', value: '5'),
          RDDropdownItemOption(label: '选项6', value: '6'),
          RDDropdownItemOption(label: '选项7', value: '7'),
          RDDropdownItemOption(label: '选项8', value: '8'),
          RDDropdownItemOption(label: '禁用选项', value: '9', disabled: true),
          RDDropdownItemOption(label: '禁用选项', value: '10', disabled: true),
        ],
      ),
      RDDropdownItem(
        label: '三列多选',
        multiple: true,
        optionsColumns: 3,
        options: [
          RDDropdownItemOption(label: '选项1', value: '1', selected: true),
          RDDropdownItemOption(label: '选项2', value: '2', selected: true),
          RDDropdownItemOption(label: '选项3', value: '3', selected: true),
          RDDropdownItemOption(label: '选项4', value: '4'),
          RDDropdownItemOption(label: '选项5', value: '5'),
          RDDropdownItemOption(label: '选项6', value: '6'),
          RDDropdownItemOption(label: '选项7', value: '7'),
          RDDropdownItemOption(label: '选项8', value: '8'),
          RDDropdownItemOption(label: '选项9', value: '9'),
          RDDropdownItemOption(label: '禁用选项', value: '10', disabled: true),
          RDDropdownItemOption(label: '禁用选项', value: '11', disabled: true),
          RDDropdownItemOption(label: '禁用选项', value: '12', disabled: true),
        ],
      ),
    ],
  );
}</pre>

</td-code-block>
                                  

向上展开
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDDropdownMenu _buildUp(BuildContext context) {
  return RDDropdownMenu(
    direction: RDDropdownMenuDirection.up,
    onMenuOpened: (value) {
      print('打开第$value个菜单');
    },
    onMenuClosed: (value) {
      print('关闭第$value个菜单');
    },
    builder: (context) {
      return [
        RDDropdownItem(
          options: [
            RDDropdownItemOption(label: '全部产品', value: 'all', selected: true),
            RDDropdownItemOption(label: '最新产品', value: 'new'),
            RDDropdownItemOption(label: '最火产品', value: 'hot'),
          ],
          onChange: (value) {
            print('选择：$value');
          },
        ),
        RDDropdownItem(
          options: [
            RDDropdownItemOption(
                label: '默认排序', value: 'default', selected: true),
            RDDropdownItemOption(label: '价格从高到低', value: 'price'),
          ],
        ),
      ];
    },
  );
}</pre>

</td-code-block>
                                  
### 1 组件状态

禁用状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDDropdownMenu _buildDisabled(BuildContext context) {
  return RDDropdownMenu(
    direction: RDDropdownMenuDirection.down,
    builder: (context) {
      return [
        const RDDropdownItem(
          disabled: true,
          label: '禁用菜单',
        ),
        const RDDropdownItem(
          disabled: true,
          label: '禁用菜单',
        ),
      ];
    },
  );
}</pre>

</td-code-block>
                                  

分组菜单
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
RDDropdownMenu _buildGroup(BuildContext context) {
  return RDDropdownMenu(
    direction: RDDropdownMenuDirection.up,
    builder: (context) {
      return [
        RDDropdownItem(
          label: '分组菜单',
          multiple: true,
          optionsColumns: 3,
          options: [
            RDDropdownItemOption(
                label: '选项1', value: '1', selected: true, group: '类型'),
            RDDropdownItemOption(label: '选项2', value: '2', group: '类型'),
            RDDropdownItemOption(label: '选项3', value: '3', group: '类型'),
            RDDropdownItemOption(label: '选项4', value: '4', group: '类型'),
            RDDropdownItemOption(label: '选项5', value: '5', group: '角色'),
            RDDropdownItemOption(label: '选项6', value: '6', group: '角色'),
            RDDropdownItemOption(label: '选项7', value: '7', group: '角色'),
            RDDropdownItemOption(label: '选项8', value: '8', group: '角色'),
            RDDropdownItemOption(label: '选项9', value: '9', group: '能力'),
            RDDropdownItemOption(label: '选项10', value: '10', group: '能力'),
            RDDropdownItemOption(label: '选项11', value: '11', group: '能力'),
            RDDropdownItemOption(label: '选项12', value: '12', group: '能力'),
          ],
          onChange: (value) {
            print('选择：$value');
          },
          onConfirm: (value) {
            print('确定选择：$value');
          },
        ),
      ];
    },
  );
}</pre>

</td-code-block>
                                  


## API
### RDDropdownItemController
#### 简介
下拉菜单控制器
```
```
 ### RDDropdownItem
#### 简介
下拉菜单内容
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| arrowColor | Color? | - | 自定义箭头颜色 |
| arrowIcon | IconData? | - | 自定义箭头图标 |
| builder | RDDropdownItemContentBuilder? | - | 完全自定义展示内容 |
| controller | RDDropdownItemController? | - | 下拉菜单控制器 |
| disabled | bool? | false | 是否禁用 |
| key |  | - |  |
| label | String? | - | 标题 |
| maxHeight | double? | - | 内容最大高度 |
| minHeight | double? | - | 内容最小高度 |
| multiple | bool? | false | 是否多选 |
| onChange | ValueChanged<T?>? | - | 值改变时触发 |
| onConfirm | ValueChanged<T?>? | - | 点击确认时触发 |
| onReset | VoidCallback? | - | 点击重置时触发 |
| options | List<RDDropdownItemOption>? | const [] | 选项数据 |
| optionsColumns | int? | 1 | 选项分栏（1-3） |
| tabBarAlign | MainAxisAlignment? | - | [label]和[arrowIcon]/[RDDropdownMenu.arrowIcon]的对齐方式 |
| tabBarFlex | int? | 1 | 该item在menu上的宽度占比，仅在[RDDropdownMenu.isScrollable]为false时有效 |
| tabBarWidth | double? | - | 该item在menu上的宽度，仅在[RDDropdownMenu.isScrollable]为true时有效 |

```
```
 ### RDDropdownItemOption
#### 简介
选项数据
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| disabled | bool? | false | 是否禁用 |
| disabledColor | Color? | - | 禁用颜色 |
| group | String? | - | 分组，相同的为一组 |
| label | String | - | 选项标题 |
| selected | bool | false | 是否选中 |
| selectedColor | Color? | - | 选中颜色 |
| value | String | - | 选项值 |

```
```
 ### RDDropdownMenu
#### 简介
下拉菜单
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| arrowColor | Color? | - | 自定义箭头颜色 |
| arrowIcon | IconData? | - | 自定义箭头图标 |
| builder | RDDropdownItemBuilder? | - | 下拉菜单构建器，优先级高于[items] |
| closeOnClickOverlay | bool? | true | 是否在点击遮罩层后关闭菜单 |
| decoration | Decoration? | - | 下拉菜单的装饰器 |
| direction | RDDropdownMenuDirection? | RDDropdownMenuDirection.auto | 菜单展开方向（down、up、auto） |
| duration | double? | 200.0 | 动画时长，毫秒 |
| height | double? | 48 | menu的高度 |
| isScrollable | bool? | false | 是否开启滚动列表 |
| items | List<RDDropdownItem>? | - | 下拉菜单 |
| key |  | - |  |
| labelBuilder | LabelBuilder? | - | 自定义标签内容 |
| onMenuClosed | ValueChanged<int>? | - | 关闭菜单事件 |
| onMenuOpened | ValueChanged<int>? | - | 展开菜单事件 |
| showOverlay | bool? | true | 是否显示遮罩层 |
| tabBarAlign | MainAxisAlignment? | MainAxisAlignment.center | [RDDropdownItem.label]和[arrowIcon]/[RDDropdownItem.arrowIcon]的对齐方式 |
| width | double? | - | menu的宽度 |


  