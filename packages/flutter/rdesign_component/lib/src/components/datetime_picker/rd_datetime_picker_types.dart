/// 日期时间选择器类型定义
///
/// 包含所有枚举、数据模型和回调 typedef。
/// 源组件：lx-lib l-datetime-picker
library;

// ── 枚举 ──

/// 日期时间选择格式
enum DatetimePickerMode {
  /// 年月日
  date,

  /// 时分
  time,

  /// 年月
  yearMonth,

  /// 年月日时分
  datetime,
}

/// 选择器模式
enum DatetimePickerType {
  /// 单日期选择
  single,

  /// 范围选择
  multiple,

  /// Tab 切换（单选 + 范围选择）
  all,
}

/// 显示模式
enum DatetimePageMode {
  /// 弹窗模式（底部弹出）
  modal,

  /// 页面内嵌模式
  innerPage,
}

// ── 数据模型 ──

/// 单选模式返回结果
class RDDatetimePickerResult {
  final int year;
  final int month;
  final int day;
  final int hour;
  final int minute;
  final int timestamp;
  final String time;

  const RDDatetimePickerResult({
    required this.year,
    required this.month,
    required this.day,
    this.hour = 0,
    this.minute = 0,
    required this.timestamp,
    required this.time,
  });
}

/// 范围选择模式返回结果
class RDDatetimeRangeResult {
  final RDDatetimePickerResult startTime;
  final RDDatetimePickerResult endTime;
  final int? opIndex;

  const RDDatetimeRangeResult({
    required this.startTime,
    required this.endTime,
    this.opIndex,
  });
}

/// 快捷选项配置
///
/// 支持 year/month/day/all 四种类型，通过命名构造函数创建。
/// [label] getter 自动生成中文按钮文案。
class RDDatetimeQuickOption {
  /// 类型：'year' | 'month' | 'day' | 'all'
  final String type;

  /// 数值（all 类型时为 0）
  final int value;

  const RDDatetimeQuickOption._({required this.type, required this.value});

  /// 近 X 年
  const RDDatetimeQuickOption.year(int v) : type = 'year', value = v;

  /// 近 X 个月
  const RDDatetimeQuickOption.month(int v) : type = 'month', value = v;

  /// 近 X 天（0=今天，-1=昨天，-2=前天）
  const RDDatetimeQuickOption.day(int v) : type = 'day', value = v;

  /// 全部
  const RDDatetimeQuickOption.all() : type = 'all', value = 0;

  /// 生成按钮文案
  String get label {
    switch (type) {
      case 'year':
        return '近${_toCN(value)}年';
      case 'month':
        return '近${_toCN(value)}个月';
      case 'day':
        if (value == 0) return '今天';
        if (value == -1) return '昨天';
        if (value == -2) return '前天';
        return '近${_toCN(value)}天';
      case 'all':
        return '全部';
      default:
        return '';
    }
  }

  /// 数字转中文
  static String _toCN(int n) {
    const cnNums = [
      '零', '一', '二', '三', '四', '五', //
      '六', '七', '八', '九', '十',
    ];
    if (n <= 10) return cnNums[n];
    if (n < 20) return '十${cnNums[n - 10]}';
    return '$n';
  }
}

/// 最大范围限制配置
class RDDatetimeMaxRange {
  /// 类型：'year' | 'month' | 'day'
  final String type;

  /// 限制值
  final int value;

  const RDDatetimeMaxRange({required this.type, required this.value});
}

/// 特殊步进时间范围配置
class RDTimeOptionsRange {
  final DateTime minDate;
  final DateTime maxDate;

  /// 步进值，默认 30
  final int step;

  /// 步进单位：'minute' | 'hour' | 'day'
  final String unit;

  /// 结束时间是否跟随开始时间变化
  final bool isChangeFollowStartTime;

  const RDTimeOptionsRange({
    required this.minDate,
    required this.maxDate,
    this.step = 30,
    this.unit = 'minute',
    this.isChangeFollowStartTime = false,
  });
}

// ── 回调 typedef ──

/// 选项格式化函数
///
/// [type] 列类型：year / month / day / hour / minute / date
/// [value] 原始值字符串
typedef DatetimeFormatter = String Function(String type, String value);

/// 选项过滤函数
///
/// [type] 列类型
/// [values] 该列所有可选值
typedef DatetimeFilter = List<String> Function(
  String type,
  List<String> values,
);

/// 范围选择展示格式函数
typedef RangeFormatFn = String Function(int timestamp);

/// 结束时间范围选择配置回调
typedef RDTimeOptionsRangeCallback = RDTimeOptionsRange Function(
  DateTime startTime,
);

/// 开始时间范围选择配置回调
typedef RDStartTimeOptionsRangeCallback = RDTimeOptionsRange Function();
