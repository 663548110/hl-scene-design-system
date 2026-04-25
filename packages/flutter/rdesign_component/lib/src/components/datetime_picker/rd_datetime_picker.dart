/// RDDatetimePicker — 日期时间选择器主组件
///
/// 包含弹窗/内嵌模式切换、Tab 切换，内部包含 RDDatetimePickerBody。
/// 从源组件 l-datetime-picker.vue 移植。
library;

import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

import 'rd_datetime_picker_body.dart';
import 'rd_datetime_picker_types.dart';

/// 日期时间选择器主组件
///
/// 负责弹窗/内嵌模式切换、Tab 切换，内部包含 [RDDatetimePickerBody]。
class RDDatetimePicker extends StatefulWidget {
  /// 弹窗标题，默认"选择日期"
  final String title;

  /// 日期时间选择格式
  final DatetimePickerMode mode;

  /// 选择器模式：single / multiple / all
  final DatetimePickerType pickerMode;

  /// 显示模式：modal / innerPage
  final DatetimePageMode pageMode;

  /// Tab 标签文案，pickerMode 为 all 时生效
  final List<String> tabs;

  /// 默认选中的 Tab 索引
  final int defaultTabIndex;

  // ── 透传给 Body 的参数 ──

  /// 单选默认时间
  final DateTime? defaultTime;

  /// 范围选择默认开始时间
  final DateTime? defaultStartTime;

  /// 范围选择默认结束时间
  final DateTime? defaultEndTime;

  /// 可选最小日期，默认当前时间前 50 年
  final DateTime? minDate;

  /// 可选最大日期，默认当前时间
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

  /// 是否允许点击遮罩关闭
  final bool isMaskClick;

  /// 是否手动关闭弹窗（false 时确认后自动关闭）
  final bool isManualClose;

  /// 默认快捷选项索引
  final int opIndexs;

  /// 是否立即触发 change
  final bool immediateChange;

  // ── 事件回调 ──

  /// 确认回调（单选模式）
  final ValueChanged<RDDatetimePickerResult>? onConfirm;

  /// 确认回调（范围模式）
  final void Function(RDDatetimeRangeResult result, {int? opIndex})?
      onRangeConfirm;

  /// 值变化回调
  final ValueChanged<dynamic>? onChange;

  /// 重置回调
  final VoidCallback? onReset;

  /// 关闭回调
  final VoidCallback? onClose;

  /// Tab 切换回调
  final ValueChanged<int>? onTabChange;

  const RDDatetimePicker({
    super.key,
    this.title = '选择日期',
    this.mode = DatetimePickerMode.date,
    this.pickerMode = DatetimePickerType.all,
    this.pageMode = DatetimePageMode.modal,
    this.tabs = const ['日期选择', '范围选择'],
    this.defaultTabIndex = 0,
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
    this.isMaskClick = false,
    this.isManualClose = false,
    this.opIndexs = -1,
    this.immediateChange = false,
    this.onConfirm,
    this.onRangeConfirm,
    this.onChange,
    this.onReset,
    this.onClose,
    this.onTabChange,
  });

  @override
  State<RDDatetimePicker> createState() => RDDatetimePickerState();
}

class RDDatetimePickerState extends State<RDDatetimePicker> {
  /// 当前 Tab 索引（0=日期选择，1=范围选择）
  late int _tabIndex;

  /// Body 组件引用，用于调用 init() / setFormatter() / changeMode()
  final GlobalKey<RDDatetimePickerBodyState> _bodyKey =
      GlobalKey<RDDatetimePickerBodyState>();

  @override
  void initState() {
    super.initState();
    _tabIndex = widget.defaultTabIndex;
  }

  // ── 公开方法 ──

  /// 弹窗模式下打开选择器
  void open() {
    if (widget.pageMode != DatetimePageMode.modal) return;
    _showModal();
  }

  /// 弹窗模式下关闭选择器
  void close() {
    Navigator.of(context, rootNavigator: true).pop();
  }

  /// 重新初始化选择器状态
  void init() {
    _bodyKey.currentState?.init();
  }

  /// 动态设置格式化函数
  void setFormatter(DatetimeFormatter fn) {
    _bodyKey.currentState?.setFormatter(fn);
  }

  // ── 弹窗逻辑 ──

  void _showModal() {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      isDismissible: widget.isMaskClick,
      enableDrag: widget.isMaskClick,
      backgroundColor: Colors.transparent,
      builder: (sheetContext) {
        // 使用 StatefulBuilder 让弹窗内部可以 setState
        return StatefulBuilder(
          builder: (innerContext, setModalState) {
            return _ModalContent(
              title: widget.title,
              pickerMode: widget.pickerMode,
              tabs: widget.tabs,
              tabIndex: _tabIndex,
              bodyKey: _bodyKey,
              onTabChanged: (index) {
                setModalState(() {
                  _tabIndex = index;
                });
                setState(() {
                  _tabIndex = index;
                });
                widget.onTabChange?.call(index);
                // 切换 Body 模式
                final newMode = index == 0
                    ? DatetimePickerType.single
                    : DatetimePickerType.multiple;
                _bodyKey.currentState?.changeMode(newMode);
              },
              onClose: () {
                Navigator.of(innerContext).pop();
              },
              bodyWidget: _buildBody(),
            );
          },
        );
      },
    ).then((_) {
      // 弹窗关闭时触发 onClose 回调
      widget.onClose?.call();
    });
  }

  // ── 获取当前实际的 pickerMode ──

  DatetimePickerType get _currentPickerMode {
    if (widget.pickerMode == DatetimePickerType.all) {
      return _tabIndex == 0
          ? DatetimePickerType.single
          : DatetimePickerType.multiple;
    }
    return widget.pickerMode;
  }

  // ── 构建 Body ──

  Widget _buildBody() {
    return RDDatetimePickerBody(
      key: _bodyKey,
      pickerMode: _currentPickerMode,
      mode: widget.mode,
      defaultTime: widget.defaultTime,
      defaultStartTime: widget.defaultStartTime,
      defaultEndTime: widget.defaultEndTime,
      minDate: widget.minDate,
      maxDate: widget.maxDate,
      minHour: widget.minHour,
      maxHour: widget.maxHour,
      minMinute: widget.minMinute,
      maxMinute: widget.maxMinute,
      formatter: widget.formatter,
      filter: widget.filter,
      strict: widget.strict,
      options: widget.options,
      showFastSelect: widget.showFastSelect,
      maxRange: widget.maxRange,
      warningTitle: widget.warningTitle,
      mergeDate: widget.mergeDate,
      isConfirm: widget.isConfirm,
      isCancel: widget.isCancel,
      confirmText: widget.confirmText,
      cancelText: widget.cancelText,
      rangeDisabled: widget.rangeDisabled,
      specialStep: widget.specialStep,
      endTimeOptionsRange: widget.endTimeOptionsRange,
      startTimeOptionsRange: widget.startTimeOptionsRange,
      rangeFormatFn: widget.rangeFormatFn,
      opIndexs: widget.opIndexs,
      immediateChange: widget.immediateChange,
      onConfirm: _handleConfirm,
      onReset: widget.onReset,
      onChange: widget.onChange,
    );
  }

  // ── 确认回调处理 ──

  void _handleConfirm(dynamic result, {int? opIndex}) {
    if (result is RDDatetimeRangeResult) {
      widget.onRangeConfirm?.call(result, opIndex: opIndex);
    } else if (result is RDDatetimePickerResult) {
      widget.onConfirm?.call(result);
    }

    // 非手动关闭模式下，确认后自动关闭弹窗
    if (!widget.isManualClose &&
        widget.pageMode == DatetimePageMode.modal) {
      Navigator.of(context, rootNavigator: true).pop();
    }
  }

  // ── UI 构建 ──

  @override
  Widget build(BuildContext context) {
    if (widget.pageMode == DatetimePageMode.innerPage) {
      return _buildBody();
    }
    // 弹窗模式下，主组件本身不渲染任何内容
    // 通过 open() 方法触发弹窗
    return const SizedBox.shrink();
  }
}

/// 弹窗模式下的内容容器
///
/// 包含标题栏（带关闭按钮和可选 Tab）+ Body。
class _ModalContent extends StatelessWidget {
  final String title;
  final DatetimePickerType pickerMode;
  final List<String> tabs;
  final int tabIndex;
  final GlobalKey<RDDatetimePickerBodyState> bodyKey;
  final ValueChanged<int> onTabChanged;
  final VoidCallback onClose;
  final Widget bodyWidget;

  const _ModalContent({
    required this.title,
    required this.pickerMode,
    required this.tabs,
    required this.tabIndex,
    required this.bodyKey,
    required this.onTabChanged,
    required this.onClose,
    required this.bodyWidget,
  });

  @override
  Widget build(BuildContext context) {
    final theme = TDTheme.of(context);
    final showTabs = pickerMode == DatetimePickerType.all && tabs.length >= 2;

    return Container(
      decoration: BoxDecoration(
        color: theme.whiteColor1,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
      ),
      child: SafeArea(
        top: false,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // 标题栏
            _buildTitleBar(context, theme, showTabs),
            // 分隔线
            Divider(height: 1, color: theme.grayColor3),
            // Body
            bodyWidget,
          ],
        ),
      ),
    );
  }

  Widget _buildTitleBar(
    BuildContext context,
    TDThemeData theme,
    bool showTabs,
  ) {
    return Container(
      height: 50,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // 标题（居中，源组件 absolute center）
          if (!showTabs)
            Center(
              child: Text(
                title,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: theme.fontGyColor1,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          // Tab 栏（pickerMode=all 时替代标题，居中显示）
          if (showTabs)
            Center(
              child: SizedBox(
                // 源组件 width: 320rpx = 160px
                width: 160,
                child: _buildTabs(theme),
              ),
            ),
          // 关闭按钮（右侧）
          Positioned(
            right: 0,
            child: GestureDetector(
              onTap: onClose,
              child: Icon(
                TDIcons.close,
                size: 24,
                color: theme.fontGyColor1,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabs(TDThemeData theme) {
    // 源组件使用 l-tabs text 模式，带底部 bar 指示器
    // font-size="32"(16px), is-scroll=false(flex均分), gutter="24"(12px)
    return Row(
      children: List.generate(tabs.length, (i) {
        final selected = i == tabIndex;
        return Expanded(
          child: GestureDetector(
            onTap: () => onTabChanged(i),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  tabs[i],
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: selected ? FontWeight.w500 : FontWeight.w400,
                    color: selected
                        ? theme.brandNormalColor
                        : theme.fontGyColor1,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 4),
                // 底部指示条
                Container(
                  width: 20,
                  height: 3,
                  decoration: BoxDecoration(
                    color: selected
                        ? theme.brandNormalColor
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(1.5),
                  ),
                ),
              ],
            ),
          ),
        );
      }),
    );
  }
}
