# RDEmployeePickerSheet 员工选择器

## 介绍

纯 UI 员工选择器组件，通过 `showCupertinoSheet` 弹出 iOS 风格的压窗屏。组件本身不包含任何网络请求逻辑，数据获取完全由宿主通过 `fetcher` 回调提供。

支持三种选择器模式：

- **basic（基础模式）**：一次性加载，本地搜索过滤，支持班次信息展示
- **shopFilter（门店筛选模式）**：分页加载，服务端搜索，职位标签筛选
- **reservation（预约模式）**：排班员工分组展示，时间冲突检测，备选员工一键选中

支持单选/复选、关键词高亮、跨组件通信回调。

## 基础用法（basic 模式）

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';

final result = await showCupertinoSheet<RDEmployeePickerResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDEmployeePickerSheet(
    pickerMode: RDEmployeePickerMode.basic,
    fetcher: ({
      required keyword,
      required pageNo,
      required pageSize,
      required pickerMode,
      postTypeId,
      startTime,
      endTime,
      extra,
    }) async {
      final res = await myApi.getEmployees(shopId: currentShopId);
      return RDEmployeePageResult(
        list: res.items.map((e) => RDEmployeeItem(
          id: e.id,
          name: e.name,
          phone: e.phone,
          avatar: e.avatarUrl,
          postType: e.postType,
          postName: e.postName,
        )).toList(),
        totalPage: 1,
      );
    },
  ),
);

if (result != null) {
  final employee = result.selectedItems.first;
  print('选中员工: ${employee.id} ${employee.name}');
}
```

## 门店筛选模式（shopFilter）

```dart
final result = await showCupertinoSheet<RDEmployeePickerResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDEmployeePickerSheet(
    pickerMode: RDEmployeePickerMode.shopFilter,
    selectionMode: RDSelectionMode.multiple,
    max: 5,
    positionTagVisible: true,
    showShopName: true,
    fetcher: ({
      required keyword,
      required pageNo,
      required pageSize,
      required pickerMode,
      postTypeId,
      startTime,
      endTime,
      extra,
    }) async {
      final res = await myApi.searchEmployees(
        keyword: keyword,
        page: pageNo,
        size: pageSize,
        postTypeId: postTypeId,
        shopIds: myShopIds,
      );
      return RDEmployeePageResult(
        list: res.items.map((e) => RDEmployeeItem(
          id: e.id,
          name: e.name,
          phone: e.phone,
          avatar: e.avatarUrl,
          postType: e.postType,
          postName: e.postName,
          shopName: e.shopName,
        )).toList(),
        totalPage: res.totalPages,
      );
    },
    onReset: () {
      // 重置时的额外操作
    },
  ),
);

if (result != null) {
  final employees = result.selectedItems;
  print('选中 ${employees.length} 名员工');
}
```

## 预约模式（reservation）

```dart
final result = await showCupertinoSheet<RDEmployeePickerResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDEmployeePickerSheet(
    pickerMode: RDEmployeePickerMode.reservation,
    startTime: '2024-01-15T10:00:00',
    endTime: '2024-01-15T11:00:00',
    spareIds: ['emp001', 'emp002'], // 已预约的备选员工
    fetcher: ({
      required keyword,
      required pageNo,
      required pageSize,
      required pickerMode,
      postTypeId,
      startTime,
      endTime,
      extra,
    }) async {
      final res = await myApi.getScheduledEmployees(
        startTime: startTime,
        endTime: endTime,
      );
      return RDEmployeePageResult(
        list: res.items.map((e) => RDEmployeeItem(
          id: e.id,
          name: e.name,
          schedulingType: e.schedulingType,
          scheduleTimeSlots: e.timeSlots?.map((s) => RDScheduleTimeSlot(
            startTime: s.startTime,
            endTime: s.endTime,
            thisReservationFlag: s.isCurrentReservation,
          )).toList(),
        )).toList(),
        totalPage: 1,
        groups: [
          RDEmployeeGroup(title: '', list: res.scheduledItems),
          RDEmployeeGroup(title: '未排班员工', list: res.unscheduledItems),
        ],
      );
    },
    onUnscheduledSelected: (unscheduledEmployees) async {
      // 弹出确认弹窗，询问是否为未排班员工创建排班
      final confirmed = await showDialog<bool>(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('提示'),
          content: const Text('所选员工未排班，是否为其创建排班？'),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('取消')),
            TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('确认')),
          ],
        ),
      );
      if (confirmed == null) return null;
      return RDScheduleAction(confirm: true, createSchedule: confirmed);
    },
    beforeClose: (selectedItems) async {
      // 关闭前的异步校验，返回 false 阻止关闭
      return true;
    },
  ),
);

if (result != null) {
  final employee = result.selectedItems.first;
  final needCreateSchedule = result.isScheduling ?? false;
  print('选中: ${employee.name}, 需创建排班: $needCreateSchedule');
}
```

## 自定义职位筛选标签

```dart
RDEmployeePickerSheet(
  pickerMode: RDEmployeePickerMode.shopFilter,
  positionTags: [
    RDPostTag(id: 1, name: '全部'),
    RDPostTag(id: 2, name: '顾问'),
    RDPostTag(id: 3, name: '美容师'),
    RDPostTag(id: 4, name: '店长'),
  ],
  fetcher: myFetcher,
)
```

`fetcher` 的 `postTypeId` 参数对应当前选中的职位标签 ID，宿主可根据不同标签调用不同接口或传递不同参数。

## 班次信息展示

```dart
RDEmployeePickerSheet(
  pickerMode: RDEmployeePickerMode.basic,
  showWorkShiftInfo: true,
  fetcher: ({required keyword, required pageNo, required pageSize, required pickerMode, postTypeId, startTime, endTime, extra}) async {
    final res = await myApi.getEmployeesWithShift();
    return RDEmployeePageResult(
      list: res.items.map((e) => RDEmployeeItem(
        id: e.id,
        name: e.name,
        schedulingType: e.schedulingType, // 2=排休
        classesInfo: e.classes?.map((c) => RDClassesInfo(
          classesName: c.name,
          details: c.details.map((d) => RDClassesDetail(
            startTime: d.startTime,
            endTime: d.endTime,
            startTimeType: d.startTimeType, // 1=当日, 2=次日
            endTimeType: d.endTimeType,
          )).toList(),
        )).toList(),
      )).toList(),
      totalPage: 1,
    );
  },
)
```

## 跨组件通信（顾问/美容师联动）

```dart
// 顾问选择器
RDEmployeePickerSheet(
  pickerMode: RDEmployeePickerMode.basic,
  selectionMode: RDSelectionMode.multiple,
  onClearBeautician: () {
    // 顾问清空时，通知美容师选择器也清空
    beauticianPickerController.clear();
  },
  fetcher: myAdviserFetcher,
)

// 美容师选择器
RDEmployeePickerSheet(
  pickerMode: RDEmployeePickerMode.basic,
  selectionMode: RDSelectionMode.multiple,
  onClearAdviser: () {
    // 美容师清空时，通知顾问选择器也清空
    adviserPickerController.clear();
  },
  fetcher: myBeauticianFetcher,
)
```

## 选择回调

```dart
RDEmployeePickerSheet(
  fetcher: myFetcher,
  onSelect: (items) async {
    // 选中后关闭前执行，可用于保存记录等异步操作
    await myApi.saveSelectLog(employeeIds: items.map((e) => e.id).toList());
  },
)
```

## API

### RDEmployeePickerSheet

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fetcher | `RDEmployeeFetcher` | 必填 | 数据获取回调，由宿主实现 |
| pickerMode | `RDEmployeePickerMode` | `basic` | 选择器模式（basic / shopFilter / reservation） |
| selectionMode | `RDSelectionMode` | `single` | 选择模式（单选 / 复选） |
| title | `String` | `'选择员工'` | 弹窗标题 |
| onSelect | `RDEmployeeSelectCallback?` | null | 选择回调，选中后关闭前执行 |
| searchPlaceholder | `String` | `'请输入搜索内容'` | 搜索框占位文案 |
| emptyText | `String?` | null | 空状态文案，默认「暂无数据」 |
| max | `int` | `99` | 复选模式下最大选择人数 |
| filterIds | `List<String>` | `[]` | 需要过滤不显示的员工 ID 列表 |
| disabledKeys | `List<String>` | `[]` | 禁用的员工 key 列表（复选模式下不可取消勾选） |
| showWorkShiftInfo | `bool` | `false` | 是否显示班次信息（basic 模式） |
| positionTagVisible | `bool` | `true` | 是否显示职位筛选标签栏（shopFilter 模式） |
| positionTags | `List<RDPostTag>` | `[]` | 自定义职位筛选标签，为空时使用默认（全部/顾问/美容师） |
| showShopName | `bool` | `true` | 是否显示员工所属门店名称（shopFilter 模式） |
| onReset | `VoidCallback?` | null | 重置回调（shopFilter 模式） |
| startTime | `String?` | null | 预约开始时间，ISO 8601 格式（reservation 模式） |
| endTime | `String?` | null | 预约结束时间，ISO 8601 格式（reservation 模式） |
| spareIds | `List<String>` | `[]` | 已预约的备选员工 ID 列表（reservation 模式） |
| beforeClose | `Future<bool> Function(List<RDEmployeeItem>?)?` | null | 关闭前回调，返回 false 阻止关闭 |
| onUnscheduledSelected | `Future<RDScheduleAction?> Function(List<RDEmployeeItem>)?` | null | 选中未排班员工时的回调（reservation 模式） |
| onClearBeautician | `VoidCallback?` | null | 清除已选美容师回调（跨组件通信） |
| onClearAdviser | `VoidCallback?` | null | 清除已选顾问回调（跨组件通信） |

### RDEmployeeFetcher

数据获取回调签名：

```dart
typedef RDEmployeeFetcher = Future<RDEmployeePageResult> Function({
  required String keyword,                  // 搜索关键词，空字符串表示无搜索
  required int pageNo,                      // 页码，从 1 开始
  required int pageSize,                    // 每页条数，固定 20
  required RDEmployeePickerMode pickerMode, // 当前选择器模式
  int? postTypeId,                          // 门店筛选模式下当前选中的职位类型 ID
  String? startTime,                        // 预约模式下的开始时间
  String? endTime,                          // 预约模式下的结束时间
  Map<String, dynamic>? extra,              // 宿主可能需要的额外参数
});
```

组件会在以下时机调用 `fetcher`：
- 初始化时（keyword='', pageNo=1）
- 切换职位筛选标签时（重置 pageNo=1）
- 搜索输入后 300ms 防抖（shopFilter 模式，重置 pageNo=1）
- 滚动到列表底部时（shopFilter 模式，pageNo 自增）

### RDEmployeeSelectCallback

```dart
typedef RDEmployeeSelectCallback = Future<void> Function(
  List<RDEmployeeItem> items,
);
```

### RDEmployeeItem

| 字段 | 类型 | 说明 |
|------|------|------|
| id | `String` | 员工组织 ID |
| name | `String` | 员工姓名 |
| phone | `String?` | 手机号 |
| avatar | `String?` | 头像 URL |
| postType | `int?` | 职位类型（0=全部, 1=店长, 2=顾问, 3=美容师, 4=院长, 5=前台, 99=自建） |
| postName | `String?` | 职位名称 |
| shopId | `String?` | 门店 ID |
| shopName | `String?` | 门店名称 |
| status | `int?` | 在职状态（1=在职, 2=已离职） |
| schedulingType | `int?` | 排班状态（1=已排班, 2=排休, null=未排班） |
| classesInfo | `List<RDClassesInfo>?` | 班次信息列表（showWorkShiftInfo=true 时使用） |
| scheduleTimeSlots | `List<RDScheduleTimeSlot>?` | 服务占用时间列表（reservation 模式使用） |
| key | `String` | 唯一标识，默认为 id |
| disabled | `bool` | 是否禁用（时间冲突时由组件内部设置） |

### RDEmployeePageResult

| 字段 | 类型 | 说明 |
|------|------|------|
| list | `List<RDEmployeeItem>` | 当前页员工列表（basic / shopFilter 模式使用） |
| totalPage | `int` | 总页数，basic 和 reservation 模式可设为 1 |
| groups | `List<RDEmployeeGroup>?` | 分组数据（reservation 模式使用） |

### RDEmployeePickerResult

| 字段 | 类型 | 说明 |
|------|------|------|
| selectedItems | `List<RDEmployeeItem>` | 选中的员工列表 |
| isScheduling | `bool?` | 是否需要为未排班员工创建排班（reservation 模式） |

### RDEmployeeGroup

| 字段 | 类型 | 说明 |
|------|------|------|
| title | `String` | 分组标题，空字符串表示无标题 |
| list | `List<RDEmployeeItem>` | 分组内员工列表 |

### RDScheduleTimeSlot

| 字段 | 类型 | 说明 |
|------|------|------|
| startTime | `String` | 开始时间（ISO 8601 格式） |
| endTime | `String` | 结束时间（ISO 8601 格式） |
| thisReservationFlag | `bool` | 是否为本次预约的时间段，默认 false |

### RDClassesInfo

| 字段 | 类型 | 说明 |
|------|------|------|
| classesName | `String` | 班次名称 |
| details | `List<RDClassesDetail>` | 班次时间段详情列表 |

### RDClassesDetail

| 字段 | 类型 | 说明 |
|------|------|------|
| startTime | `String` | 开始时间 |
| endTime | `String` | 结束时间 |
| startTimeType | `int` | 开始时间类型（1=当日, 2=次日），默认 1 |
| endTimeType | `int` | 结束时间类型（1=当日, 2=次日），默认 1 |

### RDPostTag

| 字段 | 类型 | 说明 |
|------|------|------|
| id | `int` | 标签 ID，传给 fetcher 的 postTypeId |
| name | `String` | 标签显示名称 |
| icon | `String?` | 图标名称（可选） |

### RDScheduleAction

| 字段 | 类型 | 说明 |
|------|------|------|
| confirm | `bool` | 是否确认选择 |
| createSchedule | `bool` | 是否创建排班，默认 false |

### RDEmployeePickerMode

| 枚举值 | 说明 |
|--------|------|
| `basic` | 基础模式：一次性加载，本地搜索 |
| `shopFilter` | 门店筛选模式：分页加载，服务端搜索，职位筛选 |
| `reservation` | 预约模式：排班员工，时间冲突检测 |

### RDSelectionMode

| 枚举值 | 说明 |
|--------|------|
| `single` | 单选：点击即确认 |
| `multiple` | 复选：勾选后点击确认按钮 |

## 组件行为说明

- **搜索防抖**：shopFilter 模式下，搜索输入后 300ms 防抖再调用 fetcher；basic 和 reservation 模式下，搜索在本地实时过滤，不触发 fetcher
- **分页加载**：shopFilter 模式下，列表滚动到底部 100px 时自动加载下一页；加载完最后一页后停止触底加载
- **时间冲突检测**：reservation 模式下，组件自动对每个员工的 scheduleTimeSlots 与 startTime/endTime 进行重叠检测，冲突员工置为禁用状态（半透明显示，不可点击）
- **备选员工一键选中**：reservation 模式下，spareIds 非空时显示已预约员工提示栏，点击"选择"按钮自动选中 spareIds 中未被禁用的员工
- **未排班员工处理**：reservation 模式下，选中未排班员工（schedulingType=null）时触发 onUnscheduledSelected 回调，宿主可弹窗询问是否创建排班，返回 null 或 confirm=false 时取消选择
- **关键词高亮**：搜索关键词会在员工姓名和手机号中高亮显示，高亮颜色使用品牌色
- **异常处理**：fetcher 抛出异常时，组件保留已加载的数据，不清空列表，并通过 debugPrint 输出错误信息
- **关闭拦截**：beforeClose 回调返回 false 时阻止弹窗关闭，可用于关闭前的异步校验
- **跨组件通信**：basic 模式复选下，清空选择时触发 onClearBeautician / onClearAdviser 回调，通知关联选择器同步清空
- **调休印章**：basic 模式下 showWorkShiftInfo=true 且 schedulingType=2 时，在员工列表项右侧显示"调休中"印章
- 组件使用 `Navigator.of(context, rootNavigator: true).pop()` 关闭，适配 `showCupertinoSheet` 的嵌套导航
