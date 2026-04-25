import 'package:flutter/material.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

/// RDDatetimePicker 日期时间选择器示例页
class RDDatetimePickerPage extends StatefulWidget {
  const RDDatetimePickerPage({super.key});

  @override
  State<RDDatetimePickerPage> createState() => _RDDatetimePickerPageState();
}

class _RDDatetimePickerPageState extends State<RDDatetimePickerPage> {
  // 各场景的选中结果
  String _dateResult = '未选择';
  String _timeResult = '未选择';
  String _datetimeResult = '未选择';
  String _yearMonthResult = '未选择';
  String _rangeResult = '未选择';
  String _allResult = '未选择';

  // 各场景的 picker key（用于调用 open()）
  final _dateKey = GlobalKey<RDDatetimePickerState>();
  final _timeKey = GlobalKey<RDDatetimePickerState>();
  final _datetimeKey = GlobalKey<RDDatetimePickerState>();
  final _yearMonthKey = GlobalKey<RDDatetimePickerState>();
  final _rangeKey = GlobalKey<RDDatetimePickerState>();
  final _allKey = GlobalKey<RDDatetimePickerState>();

  @override
  Widget build(BuildContext context) {
    final c = RDColors.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('RDDatetimePicker 日期时间选择器'),
        backgroundColor: c.brand,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ── 日期选择（date）──────────────────────────────
            _buildSection(
              c: c,
              title: '日期选择（date 模式）',
              result: _dateResult,
              buttonLabel: '选择日期',
              onTap: () => _dateKey.currentState?.open(),
              picker: RDDatetimePicker(
                key: _dateKey,
                title: '选择日期',
                mode: DatetimePickerMode.date,
                pickerMode: DatetimePickerType.single,
                options: const [
                  RDDatetimeQuickOption.day(0),
                  RDDatetimeQuickOption.month(1),
                  RDDatetimeQuickOption.month(3),
                ],
                onConfirm: (result) {
                  setState(() => _dateResult = result.time);
                },
              ),
            ),

            const SizedBox(height: 12),

            // ── 时间选择（time）──────────────────────────────
            _buildSection(
              c: c,
              title: '时间选择（time 模式）',
              result: _timeResult,
              buttonLabel: '选择时间',
              onTap: () => _timeKey.currentState?.open(),
              picker: RDDatetimePicker(
                key: _timeKey,
                title: '选择时间',
                mode: DatetimePickerMode.time,
                pickerMode: DatetimePickerType.single,
                showFastSelect: false,
                minHour: 8,
                maxHour: 22,
                onConfirm: (result) {
                  setState(() => _timeResult =
                      '${result.hour.toString().padLeft(2, '0')}:${result.minute.toString().padLeft(2, '0')}');
                },
              ),
            ),

            const SizedBox(height: 12),

            // ── 日期时间（datetime）──────────────────────────
            _buildSection(
              c: c,
              title: '日期时间（datetime 模式）',
              result: _datetimeResult,
              buttonLabel: '选择日期时间',
              onTap: () => _datetimeKey.currentState?.open(),
              picker: RDDatetimePicker(
                key: _datetimeKey,
                title: '选择日期时间',
                mode: DatetimePickerMode.datetime,
                pickerMode: DatetimePickerType.single,
                showFastSelect: false,
                onConfirm: (result) {
                  setState(() => _datetimeResult = result.time);
                },
              ),
            ),

            const SizedBox(height: 12),

            // ── 年月选择（yearMonth）────────────────────────
            _buildSection(
              c: c,
              title: '年月选择（yearMonth 模式）',
              result: _yearMonthResult,
              buttonLabel: '选择年月',
              onTap: () => _yearMonthKey.currentState?.open(),
              picker: RDDatetimePicker(
                key: _yearMonthKey,
                title: '选择年月',
                mode: DatetimePickerMode.yearMonth,
                pickerMode: DatetimePickerType.single,
                options: const [
                  RDDatetimeQuickOption.month(1),
                  RDDatetimeQuickOption.month(3),
                  RDDatetimeQuickOption.month(6),
                ],
                onConfirm: (result) {
                  setState(() => _yearMonthResult =
                      '${result.year}年${result.month}月');
                },
              ),
            ),

            const SizedBox(height: 12),

            // ── 范围选择（multiple）──────────────────────────
            _buildSection(
              c: c,
              title: '范围选择（multiple 模式）',
              result: _rangeResult,
              buttonLabel: '选择日期范围',
              onTap: () => _rangeKey.currentState?.open(),
              picker: RDDatetimePicker(
                key: _rangeKey,
                title: '选择日期范围',
                mode: DatetimePickerMode.date,
                pickerMode: DatetimePickerType.multiple,
                maxRange: const RDDatetimeMaxRange(type: 'month', value: 3),
                warningTitle: '最多选择 3 个月',
                options: const [
                  RDDatetimeQuickOption.month(1),
                  RDDatetimeQuickOption.month(3),
                ],
                onRangeConfirm: (result, {opIndex}) {
                  setState(() => _rangeResult =
                      '${result.startTime.time} ~ ${result.endTime.time}');
                },
              ),
            ),

            const SizedBox(height: 12),

            // ── Tab 切换（all 模式）──────────────────────────
            _buildSection(
              c: c,
              title: 'Tab 切换（all 模式：单选 + 范围）',
              result: _allResult,
              buttonLabel: '打开选择器',
              onTap: () => _allKey.currentState?.open(),
              picker: RDDatetimePicker(
                key: _allKey,
                title: '选择日期',
                mode: DatetimePickerMode.date,
                pickerMode: DatetimePickerType.all,
                tabs: const ['日期选择', '范围选择'],
                options: const [
                  RDDatetimeQuickOption.day(0),
                  RDDatetimeQuickOption.month(1),
                  RDDatetimeQuickOption.month(3),
                ],
                onConfirm: (result) {
                  setState(() => _allResult = result.time);
                },
                onRangeConfirm: (result, {opIndex}) {
                  setState(() => _allResult =
                      '${result.startTime.time} ~ ${result.endTime.time}');
                },
              ),
            ),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({
    required RDColors c,
    required String title,
    required String result,
    required String buttonLabel,
    required VoidCallback onTap,
    required Widget picker,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: c.bgContainer,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: c.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: c.textPrimary)),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: onTap,
              style: ElevatedButton.styleFrom(
                backgroundColor: c.brand,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(6)),
                padding: const EdgeInsets.symmetric(vertical: 12),
              ),
              child: Text(buttonLabel),
            ),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: c.brandLight,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text('结果：$result',
                style: TextStyle(fontSize: 12, color: c.brand)),
          ),
          // picker 本身在弹窗模式下不渲染 UI，放在这里只是为了持有 key
          picker,
        ],
      ),
    );
  }
}
