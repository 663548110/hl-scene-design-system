/// 日期时间选择器核心算法工具函数
///
/// 纯 Dart 函数，不依赖 Flutter。
/// 从源组件 datetime-picker.vue 移植。
library;

import 'rd_datetime_picker_types.dart';

// ── 辅助函数 ──

/// 补零：n < 10 时返回 "0n"，否则返回 "n"
String padZero(int n) => n < 10 ? '0$n' : '$n';

/// 获取指定年月的天数
int getDaysInMonth(int year, int month) {
  // 下个月的第 0 天 = 当月最后一天
  return DateTime(year, month + 1, 0).day;
}

// ── getDateList ──

/// 根据 startDate 和 endDate（格式 "YYYY-MM-DD"）生成日期范围内所有日期列表。
///
/// 从 startDate 开始，每天递增，直到 endDate（含）。
List<String> getDateList(String startDate, String endDate) {
  final start = DateTime.parse(startDate);
  final end = DateTime.parse(endDate);
  final result = <String>[];
  var current = DateTime(start.year, start.month, start.day);
  final endDay = DateTime(end.year, end.month, end.day);

  while (!current.isAfter(endDay)) {
    result.add(
      '${current.year}-${padZero(current.month)}-${padZero(current.day)}',
    );
    current = current.add(const Duration(days: 1));
  }
  return result;
}

// ── defaultFormatter ──

/// 默认格式化规则（移植自源组件 innerFormatter）
///
/// [type] 列类型：year / month / day / hour / minute / date
/// [value] 原始值（date 类型时为时间戳 int 或日期字符串，其他为数值字符串）
String defaultFormatter(String type, dynamic value) {
  if (type == 'year') return '$value年';
  if (type == 'month') return '$value月';
  if (type == 'day') return '$value日';
  if (type == 'hour') return '$value点';
  if (type == 'minute') return '$value分';

  if (type == 'date') {
    // value 可能是时间戳 int 或日期字符串 "YYYY-MM-DD"
    DateTime targetDate;
    if (value is int) {
      targetDate = DateTime.fromMillisecondsSinceEpoch(value);
    } else if (value is String) {
      // 尝试解析日期字符串
      targetDate = DateTime.tryParse(value) ??
          DateTime.fromMillisecondsSinceEpoch(int.tryParse(value) ?? 0);
    } else {
      return '$value';
    }

    final target = DateTime(targetDate.year, targetDate.month, targetDate.day);
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final diffDays = target.difference(today).inDays;

    // 今天 / 明天
    if (diffDays == 0) {
      return '今天(${target.month}月${target.day}日)';
    }
    if (diffDays == 1) {
      return '明天(${target.month}月${target.day}日)';
    }

    // 判断是否在本周内（周一到周日）
    // DateTime.weekday: 1=Monday, 7=Sunday
    final todayWeekday = today.weekday; // 1-7
    final weekStart = today.subtract(Duration(days: todayWeekday - 1));
    final weekEnd = weekStart.add(const Duration(days: 6));

    if (!target.isBefore(weekStart) && !target.isAfter(weekEnd)) {
      const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
      final weekDay = weekDays[target.weekday - 1];
      return '周$weekDay(${target.month}月${target.day}日)';
    }

    // 当年内
    if (target.year == now.year) {
      return '${target.month}月${target.day}日';
    }

    // 跨年
    return '${target.year}年${target.month}月${target.day}日';
  }

  return '$value';
}

// ── correctValue ──

/// 确保选中值在合法范围内
///
/// - mode != time: value 为时间戳 int，clamp 到 [minDateMs, maxDateMs]
/// - mode == time: value 为 "HH:mm" 字符串，clamp hour/minute
dynamic correctValue({
  required dynamic value,
  required DatetimePickerMode mode,
  required int minDateMs,
  required int maxDateMs,
  required int minHour,
  required int maxHour,
  required int minMinute,
  required int maxMinute,
}) {
  final isDateMode = mode != DatetimePickerMode.time;

  if (isDateMode) {
    // 日期模式：value 应为时间戳 int
    int ts;
    if (value is int) {
      ts = value;
    } else {
      // 无效值回退到 minDate
      ts = minDateMs;
    }
    if (ts < minDateMs) return minDateMs;
    if (ts > maxDateMs) return maxDateMs;
    return ts;
  } else {
    // 时间模式：value 应为 "HH:mm" 字符串，但也兼容 int 时间戳
    String timeStr;
    if (value is int) {
      final dt = DateTime.fromMillisecondsSinceEpoch(value);
      timeStr = '${padZero(dt.hour)}:${padZero(dt.minute)}';
    } else if (value is String && value.contains(':')) {
      timeStr = value;
    } else {
      return '${padZero(minHour)}:${padZero(minMinute)}';
    }
    final parts = timeStr.split(':');
    var hour = int.tryParse(parts[0]) ?? minHour;
    var minute = int.tryParse(parts.length > 1 ? parts[1] : '0') ?? minMinute;

    hour = hour.clamp(minHour, maxHour);
    minute = minute.clamp(minMinute, maxMinute);

    return '${padZero(hour)}:${padZero(minute)}';
  }
}

// ── getBoundary ──

/// 根据 type（'min' 或 'max'）和 innerValue 逐级计算边界值。
///
/// 返回 Map 包含 keys: '${type}Year', '${type}Month', '${type}Date',
/// '${type}Hour', '${type}Minute'
///
/// 算法从源组件 getBoundary 方法移植。
Map<String, int> getBoundary({
  required String type,
  required int innerValueMs,
  required int minDateMs,
  required int maxDateMs,
}) {
  final value = DateTime.fromMillisecondsSinceEpoch(innerValueMs);
  final boundaryMs = type == 'max' ? maxDateMs : minDateMs;
  final boundary = DateTime.fromMillisecondsSinceEpoch(boundaryMs);

  final year = boundary.year;
  var month = type == 'max' ? 12 : 1;
  var date = type == 'max' ? getDaysInMonth(value.year, value.month) : 1;
  var hour = type == 'max' ? 23 : 0;
  var minute = type == 'max' ? 59 : 0;

  if (value.year == year) {
    month = boundary.month;
    if (value.month == month) {
      date = boundary.day;
      if (value.day == date) {
        hour = boundary.hour;
        if (value.hour == hour) {
          minute = boundary.minute;
        }
      }
    }
  }

  return {
    '${type}Year': year,
    '${type}Month': month,
    '${type}Date': date,
    '${type}Hour': hour,
    '${type}Minute': minute,
  };
}


// ── ColumnConfig / ColumnData ──

/// 列范围配置
class ColumnConfig {
  final String type;
  final List<dynamic> range;

  const ColumnConfig({required this.type, required this.range});
}

/// 列数据（生成后的可选值）
class ColumnData {
  final String type;
  final List<String> values;

  const ColumnData({required this.type, required this.values});
}

// ── getRanges ──

/// 根据 mode 和当前选中值计算各列范围配置。
///
/// 从源组件 getRanges 方法移植。
List<ColumnConfig> getRanges({
  required DatetimePickerMode mode,
  required int innerValueMs,
  required int minDateMs,
  required int maxDateMs,
  required int minHour,
  required int maxHour,
  required int minMinute,
  required int maxMinute,
  required bool mergeDate,
}) {
  // 获取时分列配置
  List<ColumnConfig> getTimeColumns() {
    if (mode == DatetimePickerMode.datetime) {
      final maxBoundary = getBoundary(
        type: 'max',
        innerValueMs: innerValueMs,
        minDateMs: minDateMs,
        maxDateMs: maxDateMs,
      );
      final minBoundary = getBoundary(
        type: 'min',
        innerValueMs: innerValueMs,
        minDateMs: minDateMs,
        maxDateMs: maxDateMs,
      );
      return [
        ColumnConfig(
          type: 'hour',
          range: [minBoundary['minHour']!, maxBoundary['maxHour']!],
        ),
        ColumnConfig(
          type: 'minute',
          range: [minBoundary['minMinute']!, maxBoundary['maxMinute']!],
        ),
      ];
    }
    return [
      ColumnConfig(type: 'hour', range: [minHour, maxHour]),
      ColumnConfig(type: 'minute', range: [minMinute, maxMinute]),
    ];
  }

  // 获取日期列配置
  List<ColumnConfig> getDateColumns() {
    final maxBoundary = getBoundary(
      type: 'max',
      innerValueMs: innerValueMs,
      minDateMs: minDateMs,
      maxDateMs: maxDateMs,
    );
    final minBoundary = getBoundary(
      type: 'min',
      innerValueMs: innerValueMs,
      minDateMs: minDateMs,
      maxDateMs: maxDateMs,
    );
    return [
      ColumnConfig(
        type: 'year',
        range: [minBoundary['minYear']!, maxBoundary['maxYear']!],
      ),
      ColumnConfig(
        type: 'month',
        range: [minBoundary['minMonth']!, maxBoundary['maxMonth']!],
      ),
      ColumnConfig(
        type: 'day',
        range: [minBoundary['minDate']!, maxBoundary['maxDate']!],
      ),
    ];
  }

  switch (mode) {
    case DatetimePickerMode.time:
      return getTimeColumns();

    case DatetimePickerMode.yearMonth:
      // 只取年、月两列
      return getDateColumns().sublist(0, 2);

    case DatetimePickerMode.date:
      if (mergeDate) {
        final minDt = DateTime.fromMillisecondsSinceEpoch(minDateMs);
        final maxDt = DateTime.fromMillisecondsSinceEpoch(maxDateMs);
        final startStr =
            '${minDt.year}-${padZero(minDt.month)}-${padZero(minDt.day)}';
        final endStr =
            '${maxDt.year}-${padZero(maxDt.month)}-${padZero(maxDt.day)}';
        return [
          ColumnConfig(type: 'date', range: [startStr, endStr]),
        ];
      }
      return getDateColumns();

    case DatetimePickerMode.datetime:
      if (mergeDate) {
        final minDt = DateTime.fromMillisecondsSinceEpoch(minDateMs);
        final maxDt = DateTime.fromMillisecondsSinceEpoch(maxDateMs);
        final startStr =
            '${minDt.year}-${padZero(minDt.month)}-${padZero(minDt.day)}';
        final endStr =
            '${maxDt.year}-${padZero(maxDt.month)}-${padZero(maxDt.day)}';
        return [
          ColumnConfig(type: 'date', range: [startStr, endStr]),
          ...getTimeColumns(),
        ];
      }
      return [...getDateColumns(), ...getTimeColumns()];
  }
}

// ── getOriginColumns ──

/// 根据 ranges 生成各列可选值数组，应用 formatter 和 filter。
///
/// 从源组件 getOriginColumns 方法移植。
List<ColumnData> getOriginColumns({
  required List<ColumnConfig> ranges,
  required DatetimeFormatter? formatter,
  required DatetimeFormatter defaultFmt,
  required DatetimeFilter? filter,
  bool mergeDate = false,
}) {
  final fmt = formatter ?? defaultFmt;

  return ranges.map((config) {
    final type = config.type;
    final range = config.range;

    List<String> columnValues;

    if (type == 'date') {
      // 合并日期模式：生成日期列表
      columnValues = getDateList(range[0] as String, range[1] as String);
    } else {
      // 数值模式：生成 [range[0]..range[1]] 的连续数值
      final start = range[0] as int;
      final end = range[1] as int;
      final count = end - start + 1;
      columnValues = List.generate(count, (index) {
        final value = start + index;
        return type == 'year' ? '$value' : padZero(value);
      });
    }

    // 应用 filter
    if (filter != null) {
      columnValues = filter(type, columnValues);
    }

    // 应用 formatter
    final formattedValues = columnValues.map((v) => fmt(type, v)).toList();

    return ColumnData(type: type, values: formattedValues);
  }).toList();
}

// ── calculateMaxOffset ──

/// 计算最大偏移量（从源组件移植）
///
/// 根据 minDate、maxDate、step、unit 计算最大偏移量。
/// 返回值单位与 unit 一致。
int calculateMaxOffset({
  required DateTime minDate,
  required DateTime maxDate,
  required int step,
  required String unit,
}) {
  if (!maxDate.isAfter(minDate)) return 0;

  final totalMsDiff = maxDate.millisecondsSinceEpoch - minDate.millisecondsSinceEpoch;

  // 单位到毫秒的换算
  const unitToMs = {
    'second': 1000,
    'minute': 60 * 1000,
    'hour': 60 * 60 * 1000,
    'day': 24 * 60 * 60 * 1000,
  };

  final msPerUnit = unitToMs[unit];
  if (msPerUnit == null) return 0;

  final totalUnitDiff = totalMsDiff / msPerUnit;
  final maxOffset = (totalUnitDiff / step).floor() * step;

  return maxOffset;
}

// ── getOriginColumnsByStep ──

/// 特殊步进模式下按 step 间隔生成非连续时分选项（从源组件移植）
///
/// 当 specialStep > 1 且处于结束时间编辑模式时使用。
List<ColumnData> getOriginColumnsByStep({
  required List<ColumnConfig> ranges,
  required DateTime startTime,
  required RDTimeOptionsRangeCallback endTimeOptionsRange,
  required int innerValueMs,
  required DatetimeFormatter? formatter,
  required DatetimeFormatter defaultFmt,
  required DatetimeFilter? filter,
}) {
  final fmt = formatter ?? defaultFmt;
  final config = endTimeOptionsRange(startTime);
  final step = config.step;
  final unit = config.unit;

  final maxStepNum = calculateMaxOffset(
    minDate: config.minDate,
    maxDate: config.maxDate,
    step: step,
    unit: unit,
  );

  // 生成所有时间点
  final startDayjs = startTime;
  final startDateStr =
      '${startDayjs.year}-${padZero(startDayjs.month)}-${padZero(startDayjs.day)}';

  final allTimes = <_StepTimeOption>[];
  final unitMs = _unitToMs(unit);

  for (var offset = step; offset <= maxStepNum; offset += step) {
    final currentMs =
        startDayjs.millisecondsSinceEpoch + offset * unitMs;
    final current = DateTime.fromMillisecondsSinceEpoch(currentMs);

    if (current.isAfter(config.maxDate)) break;

    final dateStr =
        '${current.year}-${padZero(current.month)}-${padZero(current.day)}';
    final isTomorrow = dateStr != startDateStr;

    allTimes.add(_StepTimeOption(
      hour: current.hour,
      minute: current.minute,
      labelHour: isTomorrow ? '明天 ${padZero(current.hour)}' : padZero(current.hour),
      labelMinute: padZero(current.minute),
      isTomorrow: isTomorrow,
      dateTime: current,
    ));
  }

  // 过滤：只保留当天内的时间点
  final innerValue = DateTime.fromMillisecondsSinceEpoch(innerValueMs);
  final dayStart = DateTime(innerValue.year, innerValue.month, innerValue.day);
  final dayEnd = DateTime(innerValue.year, innerValue.month, innerValue.day, 23, 59, 59, 999);

  // 构建小时选项（去重）
  final hourMap = <String, _HourOption>{};
  for (final time in allTimes) {
    final hourKey = '${time.hour}';
    if (!hourMap.containsKey(hourKey)) {
      hourMap[hourKey] = _HourOption(
        label: time.labelHour,
        originalHour: time.hour,
        isTomorrow: time.isTomorrow,
        dateTime: time.dateTime,
      );
    }
  }

  final hourOptions = hourMap.values.where((item) {
    return item.dateTime.isBefore(dayEnd) &&
        item.dateTime.isAfter(dayStart.subtract(const Duration(seconds: 1)));
  }).toList();

  // 构建小时到分钟的映射
  final minuteMap = <String, List<_MinuteOption>>{};
  for (final time in allTimes) {
    final hourKey = '${time.hour}';
    minuteMap.putIfAbsent(hourKey, () => []);
    final existing = minuteMap[hourKey]!;
    if (!existing.any((m) => m.value == time.minute)) {
      existing.add(_MinuteOption(
        value: time.minute,
        label: time.labelMinute,
      ));
    }
  }

  // 根据 ranges 生成列数据
  final currentHour = '${innerValue.hour}';

  return ranges.map((rangeConfig) {
    final type = rangeConfig.type;
    final range = rangeConfig.range;

    if (type == 'date') {
      final values = getDateList(range[0] as String, range[1] as String);
      return ColumnData(type: type, values: values);
    }

    List<String> columnValues;

    if (type == 'hour') {
      columnValues = hourOptions.map((o) => o.label).toList();
    } else if (type == 'minute') {
      final minutes = minuteMap[currentHour] ?? [];
      columnValues = minutes.map((m) => m.label).toList();
    } else {
      // 其他列正常生成
      final start = range[0] as int;
      final end = range[1] as int;
      final count = end - start + 1;
      columnValues = List.generate(count, (index) {
        final value = start + index;
        return type == 'year' ? '$value' : padZero(value);
      });
    }

    // 应用 filter
    if (filter != null) {
      columnValues = filter(type, columnValues);
    }

    // 应用 formatter
    final formattedValues = columnValues.map((v) => fmt(type, v)).toList();

    return ColumnData(type: type, values: formattedValues);
  }).toList();
}

// ── 内部辅助类型 ──

int _unitToMs(String unit) {
  switch (unit) {
    case 'second':
      return 1000;
    case 'minute':
      return 60 * 1000;
    case 'hour':
      return 60 * 60 * 1000;
    case 'day':
      return 24 * 60 * 60 * 1000;
    default:
      return 60 * 1000; // 默认分钟
  }
}

class _StepTimeOption {
  final int hour;
  final int minute;
  final String labelHour;
  final String labelMinute;
  final bool isTomorrow;
  final DateTime dateTime;

  const _StepTimeOption({
    required this.hour,
    required this.minute,
    required this.labelHour,
    required this.labelMinute,
    required this.isTomorrow,
    required this.dateTime,
  });
}

class _HourOption {
  final String label;
  final int originalHour;
  final bool isTomorrow;
  final DateTime dateTime;

  const _HourOption({
    required this.label,
    required this.originalHour,
    required this.isTomorrow,
    required this.dateTime,
  });
}

class _MinuteOption {
  final int value;
  final String label;

  const _MinuteOption({required this.value, required this.label});
}
