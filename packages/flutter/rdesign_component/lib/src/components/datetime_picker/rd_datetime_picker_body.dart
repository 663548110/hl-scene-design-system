/// RDDatetimePickerBody — 日期时间选择器核心组件
///
/// 包含滚轮列生成、范围选择 UI、快捷选项、底部按钮等核心逻辑。
/// 从源组件 datetime-picker.vue 移植。
library;

import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import '../button/rd_button.dart';
import 'rd_datetime_picker_types.dart';
import 'rd_datetime_picker_utils.dart';

/// 日期时间选择器核心组件
class RDDatetimePickerBody extends StatefulWidget {
  /// 选择器模式：single / multiple
  final DatetimePickerType pickerMode;

  /// 日期时间选择格式
  final DatetimePickerMode mode;

  /// 单选默认时间
  final DateTime? defaultTime;

  /// 范围选择默认开始时间
  final DateTime? defaultStartTime;

  /// 范围选择默认结束时间
  final DateTime? defaultEndTime;

  /// 可选最小日期
  final DateTime? minDate;

  /// 可选最大日期
  final DateTime? maxDate;

  /// 最小小时，仅 mode=time 生效
  final int minHour;

  /// 最大小时，仅 mode=time 生效
  final int maxHour;

  /// 最小分钟，仅 mode=time 生效
  final int minMinute;

  /// 最大分钟，仅 mode=time 生效
  final int maxMinute;

  /// 选项格式化函数
  final DatetimeFormatter? formatter;

  /// 选项过滤函数
  final DatetimeFilter? filter;

  /// 是否开启严格模式
  final bool strict;

  /// 快捷选项配置
  final List<RDDatetimeQuickOption> options;

  /// 是否显示快捷选项
  final bool showFastSelect;

  /// 最大范围限制
  final RDDatetimeMaxRange? maxRange;

  /// 警告提示文案
  final String warningTitle;

  /// 是否合并年月日为一列
  final bool mergeDate;

  /// 是否显示确定按钮
  final bool isConfirm;

  /// 是否显示重置按钮
  final bool isCancel;

  /// 确定按钮文案
  final String confirmText;

  /// 重置按钮文案
  final String cancelText;

  /// 范围选择禁用配置 [开始时间禁用, 结束时间禁用]
  final List<bool> rangeDisabled;

  /// 特殊步进值
  final int specialStep;

  /// 结束时间范围选择配置回调
  final RDTimeOptionsRangeCallback? endTimeOptionsRange;

  /// 开始时间范围选择配置回调
  final RDStartTimeOptionsRangeCallback? startTimeOptionsRange;

  /// 范围选择展示格式回调
  final RangeFormatFn? rangeFormatFn;

  /// 默认快捷选项索引
  final int opIndexs;

  /// 是否立即触发 change
  final bool immediateChange;

  /// 确认回调
  final void Function(dynamic result, {int? opIndex})? onConfirm;

  /// 重置回调
  final VoidCallback? onReset;

  /// 值变化回调
  final ValueChanged<dynamic>? onChange;

  const RDDatetimePickerBody({
    super.key,
    this.pickerMode = DatetimePickerType.single,
    this.mode = DatetimePickerMode.date,
    this.defaultTime,
    this.defaultStartTime,
    this.defaultEndTime,
    this.minDate,
    this.maxDate,
    this.minHour = 0,
    this.maxHour = 23,
    this.minMinute = 0,
    this.maxMinute = 59,
    this.formatter,
    this.filter,
    this.strict = false,
    this.options = const [
      RDDatetimeQuickOption.month(1),
      RDDatetimeQuickOption.month(3),
      RDDatetimeQuickOption.month(6),
    ],
    this.showFastSelect = true,
    this.maxRange,
    this.warningTitle = '',
    this.mergeDate = false,
    this.isConfirm = true,
    this.isCancel = true,
    this.confirmText = '确定',
    this.cancelText = '重置',
    this.rangeDisabled = const [false, false],
    this.specialStep = 1,
    this.endTimeOptionsRange,
    this.startTimeOptionsRange,
    this.rangeFormatFn,
    this.opIndexs = -1,
    this.immediateChange = false,
    this.onConfirm,
    this.onReset,
    this.onChange,
  });

  @override
  State<RDDatetimePickerBody> createState() => RDDatetimePickerBodyState();
}

class RDDatetimePickerBodyState extends State<RDDatetimePickerBody> {
  // ── 核心状态 ──
  List<List<String>> _columns = [];
  List<int> _innerDefaultIndex = [];
  dynamic _innerValue;
  int? _timeValue;
  int? _startTimeValue;
  int? _endTimeValue;
  int _rangeIndex = 0;
  int? _opIndex;
  bool _showWarningText = false;
  bool _isAll = false;
  late int _minDateMs;
  late int _maxDateMs;
  List<FixedExtentScrollController> _scrollControllers = [];
  late DatetimeFormatter _innerFormatter;

  // ── 列类型记录（用于 change 回调解析） ──
  List<String> _columnTypes = [];

  // ── 防抖（滚动停止后才刷新关联列数据） ──
  Timer? _debounceTimer;
  int _pendingColumnIndex = -1;
  int _pendingItemIndex = -1;
  // 标记是否由快捷选项/程序触发的滚轮跳转（非用户手动拖动）
  bool _isProgrammaticScroll = false;

  @override
  void initState() {
    super.initState();
    _innerFormatter = widget.formatter ?? defaultFormatter;
    init();
  }

  @override
  void dispose() {
    _debounceTimer?.cancel();
    _disposeControllers();
    super.dispose();
  }

  void _disposeControllers() {
    for (final c in _scrollControllers) {
      c.dispose();
    }
    _scrollControllers = [];
  }

  // ── 公开方法 ──

  /// 重新初始化选择器状态
  void init() {
    _minDateMs = widget.minDate?.millisecondsSinceEpoch ??
        DateTime(DateTime.now().year - 50, 1, 1).millisecondsSinceEpoch;
    _maxDateMs = widget.maxDate?.millisecondsSinceEpoch ??
        DateTime.now().millisecondsSinceEpoch;

    // 范围模式初始化：找到第一个未禁用项
    if (widget.pickerMode == DatetimePickerType.multiple) {
      final findIndex =
          widget.rangeDisabled.indexWhere((item) => !item);
      _rangeIndex = findIndex > -1 ? findIndex : 0;
    } else {
      _rangeIndex = 0;
    }

    _opIndex = widget.opIndexs >= 0 ? widget.opIndexs : null;
    _showWarningText = false;
    _initSelectedTime();
  }

  /// 动态设置格式化函数
  void setFormatter(DatetimeFormatter fn) {
    setState(() {
      _innerFormatter = fn;
      _updateColumns();
      _updateIndexs(_innerValue);
    });
  }

  /// 切换选择模式（Tab 切换时由主组件调用）
  void changeMode(DatetimePickerType mode) {
    setState(() {
      if (mode == DatetimePickerType.multiple) {
        _innerValue = _rangeIndex == 1 ? _endTimeValue : _startTimeValue;
      } else {
        _innerValue = _timeValue;
      }
      _updateColumnValue(_innerValue);
    });
  }

  // ── 初始化默认选中时间 ──

  void _initSelectedTime() {
    final now = DateTime.now().millisecondsSinceEpoch;

    // 单选默认时间
    if (widget.defaultTime != null) {
      _timeValue = _correctValueInt(widget.defaultTime!.millisecondsSinceEpoch);
    } else {
      _timeValue = _correctValueInt(now);
    }

    // 范围选择默认开始时间
    if (widget.defaultStartTime != null) {
      _startTimeValue =
          _correctValueInt(widget.defaultStartTime!.millisecondsSinceEpoch);
    } else {
      _startTimeValue = _correctValueInt(now);
    }

    // 范围选择默认结束时间
    if (widget.defaultEndTime != null) {
      _endTimeValue =
          _correctValueInt(widget.defaultEndTime!.millisecondsSinceEpoch);
    } else {
      _endTimeValue = _correctValueInt(now);
    }

    // 设置当前编辑值
    _innerValue = widget.pickerMode == DatetimePickerType.multiple
        ? _startTimeValue
        : _timeValue;

    // 范围模式下处理禁用项的原始值保留
    if (widget.pickerMode == DatetimePickerType.multiple) {
      for (var i = 0; i < widget.rangeDisabled.length && i < 2; i++) {
        if (widget.rangeDisabled[i]) {
          if (i == 0 && widget.defaultStartTime != null) {
            _startTimeValue =
                widget.defaultStartTime!.millisecondsSinceEpoch;
          }
          if (i == 1 && widget.defaultEndTime != null) {
            _endTimeValue =
                widget.defaultEndTime!.millisecondsSinceEpoch;
          }
        }
      }
      // 重新赋值 innerValue 为第一个未禁用项
      final findIndex =
          widget.rangeDisabled.indexWhere((item) => !item);
      if (findIndex == 0) {
        _innerValue = _startTimeValue;
      } else if (findIndex == 1) {
        _innerValue = _endTimeValue;
      }
    }

    _updateColumnValue(_innerValue);

    // 如果 defaultStartTime 为空但 defaultEndTime 不为空，判定为"全部"
    if (widget.defaultStartTime == null && widget.defaultEndTime != null) {
      _isAll = true;
    }
  }

  // ── correctValue 包装 ──

  dynamic _correctVal(dynamic value) {
    return correctValue(
      value: value,
      mode: widget.mode,
      minDateMs: _minDateMs,
      maxDateMs: _maxDateMs,
      minHour: widget.minHour,
      maxHour: widget.maxHour,
      minMinute: widget.minMinute,
      maxMinute: widget.maxMinute,
    );
  }

  int _correctValueInt(int value) {
    final result = _correctVal(value);
    return result is int ? result : _minDateMs;
  }

  // ── 列数据更新 ──

  void _updateColumnValue(dynamic value) {
    _innerValue = value;
    _updateColumns();
    _updateIndexs(value);
  }

  void _updateColumns() {
    final ranges = _getRanges();

    List<ColumnData> originColumns;

    // 特殊步进模式
    if (widget.specialStep > 1 &&
        widget.endTimeOptionsRange != null &&
        _rangeIndex == 1 &&
        _startTimeValue != null) {
      originColumns = getOriginColumnsByStep(
        ranges: ranges,
        startTime: DateTime.fromMillisecondsSinceEpoch(_startTimeValue!),
        endTimeOptionsRange: widget.endTimeOptionsRange!,
        innerValueMs: _innerValue is int ? _innerValue : _minDateMs,
        formatter: widget.formatter,
        defaultFmt: _innerFormatter,
        filter: widget.filter,
      );
    } else {
      originColumns = getOriginColumns(
        ranges: ranges,
        formatter: widget.formatter,
        defaultFmt: _innerFormatter,
        filter: widget.filter,
        mergeDate: widget.mergeDate,
      );
    }

    _columnTypes = originColumns.map((c) => c.type).toList();
    _columns = originColumns.map((c) => c.values).toList();
  }

  List<ColumnConfig> _getRanges() {
    // 处理特殊步进模式下的 min/max 日期
    int minMs = _minDateMs;
    int maxMs = _maxDateMs;

    if (widget.specialStep > 1 &&
        widget.endTimeOptionsRange != null &&
        widget.startTimeOptionsRange != null) {
      // 保持原始 min/max
    }

    return getRanges(
      mode: widget.mode,
      innerValueMs: _innerValue is int ? _innerValue : _minDateMs,
      minDateMs: minMs,
      maxDateMs: maxMs,
      minHour: widget.minHour,
      maxHour: widget.maxHour,
      minMinute: widget.minMinute,
      maxMinute: widget.maxMinute,
      mergeDate: widget.mergeDate,
    );
  }

  void _updateIndexs(dynamic value) {
    final fmt = widget.formatter ?? _innerFormatter;
    List<String> values = [];

    if (widget.mode == DatetimePickerMode.time) {
      if (value is String && value.contains(':')) {
        final parts = value.split(':');
        values = [
          fmt('hour', parts[0]),
          fmt('minute', parts[1]),
        ];
      }
    } else {
      final ts = value is int ? value : _minDateMs;
      final date = DateTime.fromMillisecondsSinceEpoch(ts);

      if (widget.mergeDate) {
        values = [fmt('date', value.toString())];
        if (widget.mode == DatetimePickerMode.datetime) {
          values.add(fmt('hour', padZero(date.hour)));
          values.add(fmt('minute', padZero(date.minute)));
        }
      } else {
        values = [
          fmt('year', '${date.year}'),
          fmt('month', padZero(date.month)),
        ];
        if (widget.mode == DatetimePickerMode.date) {
          values.add(fmt('day', padZero(date.day)));
        }
        if (widget.mode == DatetimePickerMode.datetime) {
          values.add(fmt('day', padZero(date.day)));
          values.add(fmt('hour', padZero(date.hour)));
          values.add(fmt('minute', padZero(date.minute)));
        }
      }
    }

    // 计算各列索引
    final indexs = <int>[];
    for (var i = 0; i < _columns.length; i++) {
      if (i < values.length) {
        final idx = _columns[i].indexOf(values[i]);
        indexs.add(idx >= 0 ? idx : 0);
      } else {
        indexs.add(0);
      }
    }

    setState(() {
      _innerDefaultIndex = indexs;
      _syncScrollControllers(indexs);
    });
  }

  void _syncScrollControllers(List<int> indexs) {
    // 如果列数变化，重建 controllers
    if (_scrollControllers.length != _columns.length) {
      _disposeControllers();
      _scrollControllers = List.generate(
        _columns.length,
        (i) => FixedExtentScrollController(
          initialItem: i < indexs.length ? indexs[i] : 0,
        ),
      );
    } else {
      // 列数不变，跳转到目标索引（程序触发，不应清除快捷选项高亮）
      _isProgrammaticScroll = true;
      for (var i = 0; i < _scrollControllers.length; i++) {
        final targetIndex = i < indexs.length ? indexs[i] : 0;
        if (_scrollControllers[i].hasClients) {
          _scrollControllers[i].jumpToItem(targetIndex);
        }
      }
      // 跳转完成后重置标志（下一帧之后用户的滚动才算手动）
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _isProgrammaticScroll = false;
      });
    }
  }

  // ── 滚轮变化回调 ──

  void _onColumnChanged(int columnIndex, int itemIndex) {
    if (columnIndex >= _columns.length) return;

    // 用户开始手动拖动时，立即清除快捷选项高亮
    // （程序触发的跳转会先设置 _isProgrammaticScroll = true）
    if (!_isProgrammaticScroll && _opIndex != null) {
      setState(() {
        _opIndex = null;
        _isAll = false;
      });
    }

    // 记录最新的选中索引
    _pendingColumnIndex = columnIndex;
    _pendingItemIndex = itemIndex;

    // 取消之前的防抖定时器，重新计时
    _debounceTimer?.cancel();
    _debounceTimer = Timer(const Duration(milliseconds: 150), () {
      if (!mounted) return;
      _processColumnChange(_pendingColumnIndex, _pendingItemIndex);
    });
  }

  void _processColumnChange(int columnIndex, int itemIndex) {
    if (columnIndex >= _columns.length) return;

    // 从格式化后的文本中提取数值
    dynamic selectValue;

    if (widget.mode == DatetimePickerMode.time) {
      final hourStr = _extractNumber(_columns[0][_getColumnIndex(0)]);
      final minuteStr = _extractNumber(_columns[1][_getColumnIndex(1)]);
      selectValue = '$hourStr:$minuteStr';
    } else {
      if (widget.mergeDate) {
        // 合并日期模式
        int fixedMinMs = _minDateMs;
        int fixedMaxMs = _maxDateMs;

        // 结束时间特殊步进模式下更新 min/max
        if (_rangeIndex == 1 &&
            widget.specialStep > 1 &&
            widget.endTimeOptionsRange != null &&
            _startTimeValue != null) {
          final config = widget.endTimeOptionsRange!(
              DateTime.fromMillisecondsSinceEpoch(_startTimeValue!));
          fixedMinMs = config.minDate.millisecondsSinceEpoch;
          fixedMaxMs = config.maxDate.millisecondsSinceEpoch;
        }

        final minDt = DateTime.fromMillisecondsSinceEpoch(fixedMinMs);
        final maxDt = DateTime.fromMillisecondsSinceEpoch(fixedMaxMs);
        final startStr =
            '${minDt.year}-${padZero(minDt.month)}-${padZero(minDt.day)}';
        final endStr =
            '${maxDt.year}-${padZero(maxDt.month)}-${padZero(maxDt.day)}';
        final dateList = getDateList(startStr, endStr);

        final dateIdx = _getColumnIndex(0);
        if (dateIdx < dateList.length) {
          final targetDateStr = dateList[dateIdx];
          final targetDate = DateTime.parse(targetDateStr);

          if (widget.mode == DatetimePickerMode.datetime && _columns.length >= 3) {
            final hour = int.tryParse(_extractNumber(
                    _columns[1][_getColumnIndex(1)])) ??
                0;
            final minute = int.tryParse(_extractNumber(
                    _columns[2][_getColumnIndex(2)])) ??
                0;
            selectValue = DateTime(targetDate.year, targetDate.month,
                    targetDate.day, hour, minute)
                .millisecondsSinceEpoch;
          } else {
            selectValue = DateTime(
                    targetDate.year, targetDate.month, targetDate.day)
                .millisecondsSinceEpoch;
          }
        }
      } else {
        // 非合并模式
        final yearStr = _extractNumber(_columns[0][_getColumnIndex(0)], isYear: true);
        final monthStr = _extractNumber(_columns[1][_getColumnIndex(1)]);
        final year = int.tryParse(yearStr) ?? DateTime.now().year;
        final month = int.tryParse(monthStr) ?? 1;

        int day = 1;
        int hour = 0;
        int minute = 0;

        final maxDaysInMonth = getDaysInMonth(year, month);

        if (widget.mode == DatetimePickerMode.date && _columns.length >= 3) {
          day = int.tryParse(
                  _extractNumber(_columns[2][_getColumnIndex(2)])) ??
              1;
          day = day.clamp(1, maxDaysInMonth);
        } else if (widget.mode == DatetimePickerMode.datetime &&
            _columns.length >= 5) {
          day = int.tryParse(
                  _extractNumber(_columns[2][_getColumnIndex(2)])) ??
              1;
          day = day.clamp(1, maxDaysInMonth);
          hour = int.tryParse(
                  _extractNumber(_columns[3][_getColumnIndex(3)])) ??
              0;
          minute = int.tryParse(
                  _extractNumber(_columns[4][_getColumnIndex(4)])) ??
              0;
        }

        selectValue =
            DateTime(year, month, day, hour, minute).millisecondsSinceEpoch;
      }
    }

    // 修正值
    selectValue = _correctVal(selectValue);
    _innerValue = selectValue;

    // 更新对应的时间值
    if (widget.pickerMode == DatetimePickerType.multiple) {
      if (_rangeIndex == 0) {
        _startTimeValue = selectValue is int ? selectValue : _startTimeValue;
        // 特殊步进：开始时间变化时结束时间跟随
        if (widget.specialStep > 1 &&
            widget.endTimeOptionsRange != null &&
            _startTimeValue != null) {
          final config = widget.endTimeOptionsRange!(
              DateTime.fromMillisecondsSinceEpoch(_startTimeValue!));
          if (config.isChangeFollowStartTime) {
            _endTimeValue = config.minDate.millisecondsSinceEpoch;
          }
        }
      } else {
        _endTimeValue = selectValue is int ? selectValue : _endTimeValue;
      }
    } else {
      _timeValue = selectValue is int ? selectValue : _timeValue;
    }

    // 严格模式
    if (widget.strict) _updateTimeRange();

    _isProgrammaticScroll = false;

    setState(() {
      _updateColumnValue(selectValue);
    });

    // 触发 onChange
    if (widget.pickerMode != DatetimePickerType.multiple) {
      widget.onChange?.call({'time': _innerValue});
    }
  }

  int _getColumnIndex(int col) {
    if (col < _scrollControllers.length && _scrollControllers[col].hasClients) {
      return _scrollControllers[col].selectedItem
          .clamp(0, _columns[col].length - 1);
    }
    return col < _innerDefaultIndex.length ? _innerDefaultIndex[col] : 0;
  }

  /// 从格式化文本中提取数字
  String _extractNumber(String text, {bool isYear = false}) {
    final matches = RegExp(r'\d+').allMatches(text);
    if (matches.isEmpty) return '0';
    if (isYear) {
      // 年份：找4位数字
      for (final m in matches) {
        if (m.group(0)!.length == 4) return m.group(0)!;
      }
    }
    return matches.first.group(0)!;
  }

  // ── 严格模式 & 范围限制 ──

  void _updateTimeRange() {
    if (_startTimeValue == null || _endTimeValue == null) return;

    if (_rangeIndex == 1) {
      if (_startTimeValue! > _endTimeValue!) {
        _startTimeValue = _endTimeValue;
      }
    } else {
      if (_startTimeValue! > _endTimeValue!) {
        _endTimeValue = _startTimeValue;
      }
    }

    widget.onChange?.call({
      'startTime': _startTimeValue,
      'endTime': _endTimeValue,
    });

    // maxRange 检测
    if (widget.maxRange != null &&
        _startTimeValue != null &&
        _endTimeValue != null) {
      final start = DateTime.fromMillisecondsSinceEpoch(_startTimeValue!);
      DateTime validEnd;
      switch (widget.maxRange!.type) {
        case 'year':
          validEnd = DateTime(
              start.year + widget.maxRange!.value, start.month, start.day);
          break;
        case 'month':
          validEnd = DateTime(
              start.year, start.month + widget.maxRange!.value, start.day);
          break;
        case 'day':
        default:
          validEnd = start.add(Duration(days: widget.maxRange!.value));
          break;
      }
      final end = DateTime.fromMillisecondsSinceEpoch(_endTimeValue!);
      _showWarningText = end.isAfter(validEnd);
    }
  }

  // ── 快捷选项点击 ──

  void _optionSelect(int i) {
    if (i >= widget.options.length) return;
    final option = widget.options[i];

    setState(() {
      _isAll = false;

      if (option.type == 'all') {
        _endTimeValue = _correctValueInt(DateTime.now().millisecondsSinceEpoch);
        _startTimeValue =
            _correctValueInt(DateTime.now().millisecondsSinceEpoch);
        _rangeTimeClick(_rangeIndex);
        _opIndex = i;
        _isAll = true;
        return;
      }

      _endTimeValue = _correctValueInt(DateTime.now().millisecondsSinceEpoch);

      final now = DateTime.now();
      DateTime startDt;
      switch (option.type) {
        case 'year':
          startDt =
              DateTime(now.year - option.value, now.month, now.day);
          break;
        case 'month':
          startDt =
              DateTime(now.year, now.month - option.value, now.day);
          break;
        case 'day':
          if (option.value <= 0) {
            startDt = now.subtract(Duration(days: option.value.abs()));
          } else {
            startDt = now.subtract(Duration(days: option.value));
          }
          break;
        default:
          startDt = now;
      }
      _startTimeValue = startDt.millisecondsSinceEpoch;

      _rangeTimeClick(_rangeIndex);
      _opIndex = i;
      _showWarningText = false;
    });
  }

  // ── 范围时间切换 ──

  void _rangeTimeClick(int i) {
    if (i < widget.rangeDisabled.length && widget.rangeDisabled[i]) return;

    setState(() {
      _rangeIndex = i;

      int? timeValue;
      if (i == 0) {
        // 编辑开始时间
        if (widget.strict) {
          if (widget.pickerMode == DatetimePickerType.multiple &&
              widget.mode == DatetimePickerMode.datetime &&
              widget.startTimeOptionsRange != null) {
            final config = widget.startTimeOptionsRange!();
            _maxDateMs = config.maxDate.millisecondsSinceEpoch;
            _minDateMs = config.minDate.millisecondsSinceEpoch;
          } else {
            if (_endTimeValue != null) {
              _maxDateMs = _endTimeValue!;
            }
            _minDateMs = widget.minDate?.millisecondsSinceEpoch ??
                DateTime(DateTime.now().year - 50, 1, 1)
                    .millisecondsSinceEpoch;
          }
        }
        timeValue = _startTimeValue;
      } else {
        // 编辑结束时间
        if (widget.strict) {
          if (widget.pickerMode == DatetimePickerType.multiple &&
              widget.mode == DatetimePickerMode.datetime &&
              widget.endTimeOptionsRange != null &&
              _startTimeValue != null) {
            final config = widget.endTimeOptionsRange!(
                DateTime.fromMillisecondsSinceEpoch(_startTimeValue!));
            _maxDateMs = config.maxDate.millisecondsSinceEpoch;
            _minDateMs = config.minDate.millisecondsSinceEpoch;
          } else {
            if (_startTimeValue != null) {
              _minDateMs = _startTimeValue!;
            }
            _maxDateMs = widget.maxDate?.millisecondsSinceEpoch ??
                DateTime.now().millisecondsSinceEpoch;
          }
        }
        timeValue = _endTimeValue;
      }

      if (timeValue != null) {
        _updateColumnValue(timeValue);
      }
    });
  }

  // ── 确认 ──

  void _confirm() {
    if (_showWarningText) return;

    if (widget.pickerMode == DatetimePickerType.multiple) {
      // 范围模式
      if (_startTimeValue == null || _endTimeValue == null) return;

      var startTs = _startTimeValue!;
      var endTs = _endTimeValue!;

      // 自动排序
      if (startTs > endTs) {
        final temp = startTs;
        startTs = endTs;
        endTs = temp;
        _startTimeValue = startTs;
        _endTimeValue = endTs;
        _updateColumnValue(
            _rangeIndex == 1 ? _endTimeValue : _startTimeValue);
      }

      RDDatetimePickerResult? startResult;
      if (_isAll) {
        startResult = null;
      } else {
        startResult = _buildResult(startTs);
      }
      final endResult = _buildResult(endTs);

      if (startResult != null && endResult != null) {
        final rangeResult = RDDatetimeRangeResult(
          startTime: startResult,
          endTime: endResult,
          opIndex: _opIndex,
        );
        widget.onConfirm?.call(rangeResult, opIndex: _opIndex);
      } else if (endResult != null) {
        // "全部"模式：startResult 为 null
        final rangeResult = RDDatetimeRangeResult(
          startTime: const RDDatetimePickerResult(
            year: 0, month: 0, day: 0, timestamp: 0, time: '',
          ),
          endTime: endResult,
          opIndex: _opIndex,
        );
        widget.onConfirm?.call(rangeResult, opIndex: _opIndex);
      }
    } else {
      // 单选模式
      if (_innerValue == null) return;
      if (widget.mode == DatetimePickerMode.time) {
        widget.onConfirm?.call(_innerValue);
      } else {
        final result = _buildResult(_innerValue is int ? _innerValue : _minDateMs);
        if (result != null) {
          widget.onConfirm?.call(result);
        }
      }
    }
  }

  RDDatetimePickerResult? _buildResult(int timestamp) {
    final date = DateTime.fromMillisecondsSinceEpoch(timestamp);
    String timeStr;
    if (widget.mode == DatetimePickerMode.datetime) {
      timeStr =
          '${date.year}-${padZero(date.month)}-${padZero(date.day)} ${padZero(date.hour)}:${padZero(date.minute)}';
    } else {
      timeStr =
          '${date.year}-${padZero(date.month)}-${padZero(date.day)}';
    }
    return RDDatetimePickerResult(
      year: date.year,
      month: date.month,
      day: date.day,
      hour: date.hour,
      minute: date.minute,
      timestamp: timestamp,
      time: timeStr,
    );
  }

  // ── 重置 ──

  void _reset() {
    widget.onReset?.call();
    // 延迟重新初始化，与源组件行为一致
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        setState(() {
          init();
        });
      }
    });
  }

  // ── UI 构建 ──

  @override
  Widget build(BuildContext context) {
    final theme = TDTheme.of(context);
    final isMultiple = widget.pickerMode == DatetimePickerType.multiple;
    // 源组件：multiple=200px, single=320px（实际 px，非 rpx）
    final pickerHeight = isMultiple ? 200.0 : 320.0;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // 范围选择区域
        if (isMultiple) ...[
          _buildRangeArea(theme),
        ],
        // 警告提示
        if (isMultiple && widget.maxRange != null && _showWarningText)
          _buildWarningTip(theme),
        // 滚轮区域（带渐变遮罩）
        _buildPickerBox(theme, pickerHeight),
        // 底部按钮
        if (widget.isConfirm || widget.isCancel)
          _buildBottomButtons(theme),
      ],
    );
  }

  // ── 滚轮区域（带渐变遮罩） ──

  Widget _buildPickerBox(TDThemeData theme, double height) {
    final bgColor = theme.whiteColor1;
    return ClipRect(
      child: SizedBox(
        height: height,
        child: Stack(
          children: [
            // 滚轮列
            if (_columns.isNotEmpty)
              Row(
                children: List.generate(_columns.length, (i) {
                  return Expanded(
                    child: _buildPickerColumn(i, theme),
                  );
                }),
              ),
            // 顶部渐变遮罩（60px）
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              height: 60,
              child: IgnorePointer(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [bgColor, bgColor.withOpacity(0)],
                    ),
                  ),
                ),
              ),
            ),
            // 底部渐变遮罩（60px）
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              child: IgnorePointer(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.bottomCenter,
                      end: Alignment.topCenter,
                      colors: [bgColor, bgColor.withOpacity(0)],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ── 范围选择区域 ──

  Widget _buildRangeArea(TDThemeData theme) {
    return Padding(
      // 源组件 datetimeOptionsBoxStyle 默认: padding 0 12px, marginTop 16px, marginBottom 12px
      padding: const EdgeInsets.only(left: 12, right: 12, top: 16, bottom: 12),
      child: Column(
        children: [
          // 快捷选项
          if (widget.showFastSelect) _buildFastSelectRow(theme),
          // 开始/结束时间切换
          _buildRangeTimeRow(theme),
        ],
      ),
    );
  }

  // ── 快捷选项按钮行 ──

  Widget _buildFastSelectRow(TDThemeData theme) {
    return Padding(
      // 源组件 l-m-b-32 = margin-bottom 16px
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        children: List.generate(widget.options.length, (i) {
          final option = widget.options[i];
          final isSelected = _opIndex == i;
          return Expanded(
            child: Padding(
              // 源组件 margin: 0 8rpx = 0 4px
              padding: EdgeInsets.only(
                left: i == 0 ? 0 : 4,
                right: i == widget.options.length - 1 ? 0 : 4,
              ),
              child: GestureDetector(
                onTap: () => _optionSelect(i),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 7),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? theme.brandLightColor
                        : theme.grayColor1,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: isSelected
                          ? theme.brandNormalColor
                          : Colors.transparent,
                      width: 1,
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    option.label,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      // 源组件 line-height: 40rpx = 20px
                      height: 20 / 14,
                      color: isSelected
                          ? theme.brandNormalColor
                          : theme.fontGyColor1,
                    ),
                  ),
                ),
              ),
            ),
          );
        }),
      ),
    );
  }

  // ── 开始/结束时间切换行 ──

  Widget _buildRangeTimeRow(TDThemeData theme) {
    return Row(
      children: [
        // 开始时间
        Expanded(
          child: _buildRangeTimeItem(
            index: 0,
            theme: theme,
            value: _startTimeValue,
            isAll: _isAll,
          ),
        ),
        // 分隔线
        Container(
          width: 8,
          height: 1,
          margin: const EdgeInsets.symmetric(horizontal: 8),
          color: theme.fontGyColor3,
        ),
        // 结束时间
        Expanded(
          child: _buildRangeTimeItem(
            index: 1,
            theme: theme,
            value: _endTimeValue,
            isAll: false,
          ),
        ),
      ],
    );
  }

  Widget _buildRangeTimeItem({
    required int index,
    required TDThemeData theme,
    required int? value,
    required bool isAll,
  }) {
    final isActive = _rangeIndex == index;
    final isDisabled =
        index < widget.rangeDisabled.length && widget.rangeDisabled[index];

    String displayText;
    if (index == 0 && isAll) {
      displayText = '--';
    } else if (value != null) {
      if (widget.rangeFormatFn != null) {
        displayText = widget.rangeFormatFn!(value);
      } else {
        final dt = DateTime.fromMillisecondsSinceEpoch(value);
        displayText =
            '${dt.year}-${padZero(dt.month)}-${padZero(dt.day)}';
      }
    } else {
      displayText = '--';
    }

    return GestureDetector(
      onTap: isDisabled ? null : () => _rangeTimeClick(index),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 7),
        decoration: BoxDecoration(
          color: isDisabled
              ? theme.grayColor1
              : (isActive ? theme.brandLightColor : theme.grayColor1),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isDisabled
                ? Colors.transparent
                : (isActive ? theme.brandNormalColor : Colors.transparent),
            width: 1,
          ),
        ),
        alignment: Alignment.center,
        child: Text(
          displayText,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            // 源组件 line-height: 40rpx = 20px, height: 40rpx = 20px
            height: 20 / 14,
            color: isDisabled
                ? theme.fontGyColor4
                : (isActive ? theme.brandNormalColor : theme.fontGyColor1),
          ),
        ),
      ),
    );
  }

  // ── 警告提示 ──

  Widget _buildWarningTip(TDThemeData theme) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Text(
        widget.warningTitle,
        style: TextStyle(
          fontSize: 12,
          color: theme.errorNormalColor,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }

  // ── 滚轮列 ──

  Widget _buildPickerColumn(int columnIndex, TDThemeData theme) {
    if (columnIndex >= _columns.length) return const SizedBox.shrink();

    final items = _columns[columnIndex];
    if (items.isEmpty) return const SizedBox.shrink();

    // 确保 controller 存在
    if (columnIndex >= _scrollControllers.length) return const SizedBox.shrink();

    return CupertinoPicker(
      scrollController: _scrollControllers[columnIndex],
      itemExtent: 40,
      diameterRatio: 1.07,
      squeeze: 1.45,
      useMagnifier: true,
      magnification: 1.0,
      backgroundColor: Colors.transparent,
      // 选中指示器：半透明背景，匹配源组件 picker-indicator（z-index: -1 在文字后面）
      selectionOverlay: CupertinoPickerDefaultSelectionOverlay(
        background: theme.grayColor5.withOpacity(0.5),
        capStartEdge: columnIndex == 0,
        capEndEdge: columnIndex == _columns.length - 1,
      ),
      onSelectedItemChanged: (index) {
        _onColumnChanged(columnIndex, index);
      },
      children: List.generate(items.length, (idx) {
        return Center(
          child: Text(
            items[idx],
            style: TextStyle(
              fontSize: 16,
              // 源组件选中项 font-weight: 600，非选中 400
              fontWeight: idx == _getColumnIndex(columnIndex)
                  ? FontWeight.w600
                  : FontWeight.w400,
              color: theme.fontGyColor1,
            ),
          ),
        );
      }),
    );
  }

  // ── 底部按钮 ──

  Widget _buildBottomButtons(TDThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      height: 54,
      child: Row(
        children: [
          if (widget.isCancel)
            Expanded(
              child: RDButton(
                text: widget.cancelText,
                size: TDButtonSize.large,
                type: TDButtonType.outline,
                theme: TDButtonTheme.defaultTheme,
                onTap: _reset,
              ),
            ),
          if (widget.isCancel && widget.isConfirm)
            const SizedBox(width: 12),
          if (widget.isConfirm)
            Expanded(
              child: RDButton(
                text: widget.confirmText,
                size: TDButtonSize.large,
                type: TDButtonType.fill,
                theme: TDButtonTheme.primary,
                disabled: _showWarningText,
                onTap: _showWarningText ? null : _confirm,
              ),
            ),
        ],
      ),
    );
  }
}
