# RDCustomerPickerSheet 客户选择器

## 介绍

纯 UI 客户选择器组件，通过 `showCupertinoSheet` 弹出 iOS 风格的压窗屏。组件本身不包含任何网络请求逻辑，数据获取完全由宿主通过 `fetcher` 回调提供。

支持搜索、Tab 切换、分页加载、关键词高亮、手机号脱敏。

## 基础用法

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';

final customer = await showCupertinoSheet<RDCustomerItem>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerPickerSheet(
    fetcher: ({
      required tabIndex,
      required keyword,
      required pageNo,
      required pageSize,
    }) async {
      final res = await myApi.searchCustomers(
        keyword: keyword,
        page: pageNo,
        size: pageSize,
      );
      return RDPageResult(
        list: res.items.map((e) => RDCustomerItem(
          id: e.id,
          name: e.name,
          phone: e.phone,
          avatar: e.avatarUrl,
          type: e.type,
        )).toList(),
        totalPage: res.totalPages,
      );
    },
  ),
);

if (customer != null) {
  print('选中: ${customer.id} ${customer.name}');
}
```

## 自定义 Tab

```dart
RDCustomerPickerSheet(
  tabs: [
    RDCustomerTab(name: '全部客户'),
    RDCustomerTab(name: 'VIP 客户'),
    RDCustomerTab(name: '新客户'),
  ],
  fetcher: myFetcher,
)
```

`fetcher` 的 `tabIndex` 参数对应当前选中的 Tab 索引，宿主可根据不同 Tab 调用不同接口或传递不同参数。

## 隐藏 Tab（单列表模式）

```dart
RDCustomerPickerSheet(
  tabs: [RDCustomerTab(name: '全部')],
  showTabs: false,
  fetcher: myFetcher,
)
```

## 关闭手机号脱敏

```dart
RDCustomerPickerSheet(
  maskPhone: false,
  fetcher: myFetcher,
)
```

## 自定义选择回调

```dart
RDCustomerPickerSheet(
  fetcher: myFetcher,
  onSelect: (item) async {
    // 选中后的额外操作，如保存选择记录
    await myApi.saveSelectLog(customerId: item.id);
  },
)
```

选择后组件会自动关闭弹窗并返回选中的 `RDCustomerItem`。`onSelect` 在关闭前执行，可用于保存记录等异步操作。

## API

### RDCustomerPickerSheet

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fetcher | `RDCustomerFetcher` | 必填 | 数据获取回调，由宿主实现 |
| onSelect | `RDCustomerSelectCallback?` | null | 选择回调，选中后关闭前执行 |
| title | `String` | `'选择客户'` | 弹窗标题 |
| tabs | `List<RDCustomerTab>` | `[历史选择, 最近新增]` | Tab 配置列表 |
| showTabs | `bool` | `true` | 是否显示 Tab 栏 |
| searchPlaceholder | `String` | `'请输入搜索内容'` | 搜索框占位文案 |
| emptyText | `String?` | `null` | 空状态文案，默认「暂无数据」 |
| maskPhone | `bool` | `true` | 是否脱敏手机号 |

### RDCustomerFetcher

数据获取回调签名：

```dart
typedef RDCustomerFetcher = Future<RDPageResult<RDCustomerItem>> Function({
  required int tabIndex,    // 当前 Tab 索引
  required String keyword,  // 搜索关键词，空字符串表示无搜索
  required int pageNo,      // 页码，从 1 开始
  required int pageSize,    // 每页条数，固定 20
});
```

组件会在以下时机调用 `fetcher`：
- 初始化时（tabIndex=0, keyword='', pageNo=1）
- 切换 Tab 时（重置 pageNo=1）
- 搜索输入后 300ms 防抖（重置 pageNo=1）
- 滚动到列表底部时（pageNo 自增）

### RDCustomerSelectCallback

```dart
typedef RDCustomerSelectCallback = Future<void> Function(RDCustomerItem item);
```

### RDCustomerItem

| 字段 | 类型 | 说明 |
|------|------|------|
| id | `String` | 客户 ID |
| name | `String` | 客户姓名 |
| phone | `String?` | 手机号 |
| avatar | `String?` | 头像 URL |
| type | `int?` | 1=客户 2=散客（散客会显示标签，不显示手机号） |

### RDPageResult\<T\>

| 字段 | 类型 | 说明 |
|------|------|------|
| list | `List<T>` | 当前页数据列表 |
| totalPage | `int` | 总页数 |

### RDCustomerTab

| 字段 | 类型 | 说明 |
|------|------|------|
| name | `String` | Tab 显示名称 |

## 组件行为说明

- 搜索时自动隐藏 Tab 栏，清空搜索后恢复显示
- 散客（type=2）会在姓名右侧显示「散」标签，且不显示手机号
- 搜索关键词会在姓名和手机号中高亮显示
- `fetcher` 抛出异常时，组件会保留已加载的数据，不会清空列表
- 组件使用 `Navigator.of(context, rootNavigator: true).pop()` 关闭，适配 `showCupertinoSheet` 的嵌套导航
