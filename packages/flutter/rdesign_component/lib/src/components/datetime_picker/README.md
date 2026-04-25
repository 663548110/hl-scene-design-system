# RDDatetimePicker 日期时间选择器

从 Uni App (Vue) 组件 `l-datetime-picker` 转换而来的 Flutter 通用 UI 组件。支持多种日期时间选择格式、单选/范围选择、弹窗/内嵌显示模式、快捷选项、日期合并列、特殊步进等功能。

## 文件结构

```
datetime_picker/
├── rd_datetime_picker.dart          ← 主组件（弹窗/内嵌、Tab 切换）
├── rd_datetime_picker_body.dart     ← 核心组件（滚轮、范围选择、快捷选项、按钮）
├── rd_datetime_picker_types.dart    ← 枚举、数据模型、回调 typedef
├── rd_datetime_picker_utils.dart    ← 核心算法（列生成、边界计算、格式化）
└── README.md
```

## 基本用法

### 弹窗模式 — 单选日期

```dart
final _pickerKey = GlobalKey<RDDatetimePickerState>();

RDDatetimePicker(
  key: _pickerKey,
  mode: DatetimePickerMode.date,
  pickerMode: DatetimePickerType.single,
  onConfirm: (result) {
    print('选中: ${result.time}'); // "2024-06-15"
  },
);

// 打开弹窗
_pickerKey.currentState?.open();
```

### 弹窗模式 — 范围选择

```dart
RDDatetimePicker(
  key: _pickerKey,
  mode: DatetimePickerMode.date,
  pickerMode: DatetimePickerType.multiple,
  onRangeConfirm: (result, {opIndex}) {
    print('${result.startTime.time} ~ ${result.endTime.time}');
  },
);
```

### 弹窗模式 — Tab 切换（单选 + 范围）

```dart
RDDatetimePicker(
  key: _pickerKey,
  pickerMode: DatetimePickerType.all,
  tabs: ['日期选择', '范围选择'],
  onConfirm: (result) { /* 单选确认 */ },
  onRangeConfirm: (result, {opIndex}) { /* 范围确认 */ },
  onTabChange: (index) { /* Tab 切换 */ },
);
```

### 内嵌模式

```dart
RDDatetimePicker(
  pageMode: DatetimePageMode.innerPage,
  mode: DatetimePickerMode.datetime,
  pickerMode: DatetimePickerType.single,
  onConfirm: (result) { ... },
);
```

### 时间选择（时分）

```dart
RDDatetimePicker(
  key: _pickerKey,
  mode: DatetimePickerMode.time,
  pickerMode: DatetimePickerType.single,
  minHour: 8,
  maxHour: 22,
  onConfirm: (result) { ... },
);
```

### 年月选择

```dart
RDDatetimePicker(
  key: _pickerKey,
  mode: DatetimePickerMode.yearMonth,
  pickerMode: DatetimePickerType.single,
  onConfirm: (result) { ... },
);
```

### 快捷选项

```dart
RDDatetimePicker(
  key: _pickerKey,
  pickerMode: DatetimePickerType.multiple,
  showFastSelect: true,
  options: [
    RDDatetimeQuickOption.day(0),    // 今天
    RDDatetimeQuickOption.month(1),  // 近一个月
    RDDatetimeQuickOption.month(3),  // 近三个月
    RDDatetimeQuickOption.year(1),   // 近一年
    RDDatetimeQuickOption.all(),     // 全部
  ],
  onRangeConfirm: (result, {opIndex}) { ... },
);
```

### 日期合并模式

```dart
RDDatetimePicker(
  key: _pickerKey,
  mode: DatetimePickerMode.date,
  mergeDate: true, // 年月日合并为一列
  onConfirm: (result) { ... },
);
```

### 严格模式 + 范围限制

```dart
RDDatetimePicker(
  key: _pickerKey,
  pickerMode: DatetimePickerType.multiple,
  strict: true,
  maxRange: RDDatetimeMaxRange(type: 'month', value: 6),
  warningTitle: '最多选择6个月范围',
  onRangeConfirm: (result, {opIndex}) { ... },
);
```

## formatter / filter 回调

### 自定义格式化

```dart
RDDatetimePicker(
  key: _pickerKey,
  formatter: (String type, String value) {
    switch (type) {
      case 'year': return '$value年';
      case 'month': return '$value月';
      case 'day': return '$value号';
      case 'hour': return '$value时';
      case 'minute': return '$value分';
      default: return value;
    }
  },
  onConfirm: (result) { ... },
);
```

### 过滤可选值

```dart
RDDatetimePicker(
  key: _pickerKey,
  mode: DatetimePickerMode.time,
  filter: (String type, List<String> values) {
    if (type == 'minute') {
      // 只保留 00、15、30、45
      return values.where((v) => int.parse(v) % 15 == 0).toList();
    }
    return values;
  },
  onConfirm: (result) { ... },
);
```

## API 参数

### RDDatetimePicker

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String | '选择日期' | 弹窗标题 |
| mode | DatetimePickerMode | date | 日期时间选择格式 |
| pickerMode | DatetimePickerType | all | 选择器模式 |
| pageMode | DatetimePageMode | modal | 显示模式 |
| tabs | List\<String\> | ['日期选择', '范围选择'] | Tab 标签文案 |
| defaultTabIndex | int | 0 | 默认 Tab 索引 |
| defaultTime | DateTime? | null | 单选默认时间 |
| defaultStartTime | DateTime? | null | 范围默认开始时间 |
| defaultEndTime | DateTime? | null | 范围默认结束时间 |
| minDate | DateTime? | 当前时间前50年 | 可选最小日期 |
| maxDate | DateTime? | 当前时间 | 可选最大日期 |
| minHour | int | 0 | 最小小时（mode=time） |
| maxHour | int | 23 | 最大小时（mode=time） |
| minMinute | int | 0 | 最小分钟（mode=time） |
| maxMinute | int | 59 | 最大分钟（mode=time） |
| formatter | DatetimeFormatter? | null | 选项格式化函数 |
| filter | DatetimeFilter? | null | 选项过滤函数 |
| strict | bool | false | 严格模式 |
| options | List\<RDDatetimeQuickOption\> | [month(1), month(3), month(6)] | 快捷选项 |
| showFastSelect | bool | true | 是否显示快捷选项 |
| maxRange | RDDatetimeMaxRange? | null | 最大范围限制 |
| warningTitle | String | '' | 超限警告文案 |
| mergeDate | bool | false | 合并年月日为一列 |
| isConfirm | bool | true | 显示确定按钮 |
| isCancel | bool | true | 显示重置按钮 |
| confirmText | String | '确定' | 确定按钮文案 |
| cancelText | String | '重置' | 重置按钮文案 |
| rangeDisabled | List\<bool\> | [false, false] | 范围禁用配置 |
| specialStep | int | 1 | 特殊步进值 |
| endTimeOptionsRange | RDTimeOptionsRangeCallback? | null | 结束时间范围配置回调 |
| startTimeOptionsRange | RDStartTimeOptionsRangeCallback? | null | 开始时间范围配置回调 |
| rangeFormatFn | RangeFormatFn? | null | 范围时间显示格式回调 |
| isMaskClick | bool | false | 允许点击遮罩关闭 |
| isManualClose | bool | false | 手动关闭弹窗 |
| opIndexs | int | -1 | 默认快捷选项索引 |
| immediateChange | bool | false | 立即触发 change |
| onConfirm | ValueChanged\<RDDatetimePickerResult\>? | null | 单选确认回调 |
| onRangeConfirm | Function? | null | 范围确认回调 |
| onChange | ValueChanged\<dynamic\>? | null | 值变化回调 |
| onReset | VoidCallback? | null | 重置回调 |
| onClose | VoidCallback? | null | 关闭回调 |
| onTabChange | ValueChanged\<int\>? | null | Tab 切换回调 |

### 公开方法

| 方法 | 说明 |
|------|------|
| open() | 弹窗模式下打开选择器 |
| close() | 弹窗模式下关闭选择器 |
| init() | 重新初始化选择器状态 |
| setFormatter(DatetimeFormatter fn) | 动态设置格式化函数 |

## 类型定义

### 枚举

| 枚举 | 值 | 说明 |
|------|-----|------|
| DatetimePickerMode | date, time, yearMonth, datetime | 日期时间选择格式 |
| DatetimePickerType | single, multiple, all | 选择器模式 |
| DatetimePageMode | modal, innerPage | 显示模式 |

### RDDatetimePickerResult

| 字段 | 类型 | 说明 |
|------|------|------|
| year | int | 年 |
| month | int | 月 |
| day | int | 日 |
| hour | int | 时（默认 0） |
| minute | int | 分（默认 0） |
| timestamp | int | 毫秒时间戳 |
| time | String | 格式化时间字符串 |

### RDDatetimeRangeResult

| 字段 | 类型 | 说明 |
|------|------|------|
| startTime | RDDatetimePickerResult | 开始时间 |
| endTime | RDDatetimePickerResult | 结束时间 |
| opIndex | int? | 快捷选项索引 |

### RDDatetimeQuickOption

通过命名构造函数创建：

| 构造函数 | 示例 | label 输出 |
|----------|------|-----------|
| RDDatetimeQuickOption.year(n) | .year(1) | "近一年" |
| RDDatetimeQuickOption.month(n) | .month(3) | "近三个月" |
| RDDatetimeQuickOption.day(n) | .day(0) / .day(-1) | "今天" / "昨天" |
| RDDatetimeQuickOption.all() | .all() | "全部" |

### RDDatetimeMaxRange

| 字段 | 类型 | 说明 |
|------|------|------|
| type | String | 限制类型：'year' / 'month' / 'day' |
| value | int | 限制值 |

### RDTimeOptionsRange

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| minDate | DateTime | — | 最小日期 |
| maxDate | DateTime | — | 最大日期 |
| step | int | 30 | 步进值 |
| unit | String | 'minute' | 步进单位 |
| isChangeFollowStartTime | bool | false | 结束时间跟随开始时间 |

### 回调 typedef

| typedef | 签名 | 说明 |
|---------|------|------|
| DatetimeFormatter | String Function(String type, String value) | 选项格式化 |
| DatetimeFilter | List\<String\> Function(String type, List\<String\> values) | 选项过滤 |
| RangeFormatFn | String Function(int timestamp) | 范围时间显示格式 |
| RDTimeOptionsRangeCallback | RDTimeOptionsRange Function(DateTime startTime) | 结束时间范围配置 |
| RDStartTimeOptionsRangeCallback | RDTimeOptionsRange Function() | 开始时间范围配置 |

## 与源组件的平台差异

| 差异点 | Uni App 源组件 | Flutter 组件 |
|--------|---------------|-------------|
| 弹窗方式 | uni.showModal / popup | showModalBottomSheet |
| 滚轮实现 | picker-view | ListWheelScrollView + FixedExtentScrollController |
| 单位转换 | rpx | 逻辑像素（rpx / 2） |
| 主题系统 | CSS 变量 | TDTheme.of(context) |
| 基础组件 | l-button 等 | RDButton 等 RD 组件 |
| 响应式状态 | Vue ref / reactive | StatefulWidget + setState |
| Tab 组件 | 自定义 Tab | 内置 Tab 实现 |
