import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

/// 业务组件示例页
///
/// 演示三个业务组件的基础用法：
/// - RDCustomerPickerSheet 客户选择器
/// - RDEmployeePickerSheet 员工选择器
/// - RDCustomerCreatePopup 客户创建弹窗
class RDBizComponentsPage extends StatefulWidget {
  const RDBizComponentsPage({super.key});

  @override
  State<RDBizComponentsPage> createState() => _RDBizComponentsPageState();
}

class _RDBizComponentsPageState extends State<RDBizComponentsPage> {
  String? _selectedCustomer;
  String? _selectedEmployee;
  String? _createdCustomer;

  // ── Mock 数据 ──────────────────────────────────────────────────────────────

  static final _mockCustomers = List.generate(
    12,
    (i) => RDCustomerItem(
      id: 'cust_$i',
      name: '客户${i + 1}',
      phone: '138${(10000000 + i * 1234567).toString().substring(0, 8)}',
      type: i % 5 == 0 ? 2 : 1,
    ),
  );

  static final _mockEmployees = List.generate(
    10,
    (i) => RDEmployeeItem(
      id: 'emp_$i',
      name: '员工${i + 1}',
      phone: '139${(10000000 + i * 9876543).toString().substring(0, 8)}',
      postType: [2, 3, 2, 3, 1][i % 5],
      postName: ['顾问', '美容师', '顾问', '美容师', '店长'][i % 5],
    ),
  );

  Future<RDPageResult<RDCustomerItem>> _customerFetcher({
    required int tabIndex,
    required String keyword,
    required int pageNo,
    required int pageSize,
  }) async {
    await Future.delayed(const Duration(milliseconds: 300));
    final filtered = keyword.isEmpty
        ? _mockCustomers
        : _mockCustomers
            .where((e) =>
                e.name.contains(keyword) ||
                (e.phone?.contains(keyword) ?? false))
            .toList();
    return RDPageResult(list: filtered, totalPage: 1);
  }

  Future<RDEmployeePageResult> _employeeFetcher({
    required String keyword,
    required int pageNo,
    required int pageSize,
    required RDEmployeePickerMode pickerMode,
    int? postTypeId,
    String? startTime,
    String? endTime,
    Map<String, dynamic>? extra,
  }) async {
    await Future.delayed(const Duration(milliseconds: 300));
    var list = _mockEmployees;
    if (keyword.isNotEmpty) {
      list = list.where((e) => e.name.contains(keyword)).toList();
    }
    if (postTypeId != null && postTypeId != 0) {
      list = list.where((e) => e.postType == postTypeId).toList();
    }
    return RDEmployeePageResult(list: list, totalPage: 1);
  }

  // ── 通用弹出方法（iOS 压窗屏风格）─────────────────────────────────────────

  Future<T?> _pushSheet<T>(Widget child) {
    return Navigator.of(context, rootNavigator: true).push<T>(
      CupertinoPageRoute<T>(
        fullscreenDialog: true,
        builder: (_) => child,
      ),
    );
  }

  // ── 弹出客户选择器 ─────────────────────────────────────────────────────────

  Future<void> _showCustomerPicker() async {
    final result = await _pushSheet<RDCustomerItem>(
      RDCustomerPickerSheet(
        tabs: [
          RDCustomerTab(name: '全部客户'),
          RDCustomerTab(name: 'VIP 客户'),
        ],
        fetcher: _customerFetcher,
      ),
    );
    if (result != null) {
      setState(() =>
          _selectedCustomer = '${result.name}（${result.phone ?? '无手机号'}）');
    }
  }

  // ── 弹出员工选择器（basic 单选）────────────────────────────────────────────

  Future<void> _showEmployeePicker() async {
    final result = await _pushSheet<RDEmployeePickerResult>(
      RDEmployeePickerSheet(
        pickerMode: RDEmployeePickerMode.basic,
        fetcher: _employeeFetcher,
      ),
    );
    if (result != null && result.selectedItems.isNotEmpty) {
      final emp = result.selectedItems.first;
      setState(() => _selectedEmployee = '${emp.name}（${emp.postName ?? ''}）');
    }
  }

  // ── 弹出员工选择器（shopFilter 多选）──────────────────────────────────────

  Future<void> _showEmployeeMultiPicker() async {
    final result = await _pushSheet<RDEmployeePickerResult>(
      RDEmployeePickerSheet(
        pickerMode: RDEmployeePickerMode.shopFilter,
        selectionMode: RDSelectionMode.multiple,
        max: 3,
        positionTagVisible: true,
        positionTags: [
          RDPostTag(id: 0, name: '全部'),
          RDPostTag(id: 2, name: '顾问'),
          RDPostTag(id: 3, name: '美容师'),
        ],
        fetcher: _employeeFetcher,
      ),
    );
    if (result != null && result.selectedItems.isNotEmpty) {
      final names = result.selectedItems.map((e) => e.name).join('、');
      setState(() =>
          _selectedEmployee = '已选 ${result.selectedItems.length} 人：$names');
    }
  }

  // ── 弹出客户创建弹窗（createWithReceive）──────────────────────────────────

  Future<void> _showCustomerCreate() async {
    await _pushSheet<RDCustomerCreateResult>(
      RDCustomerCreatePopup(
        pageType: PageType.createWithReceive,
        onCreateCustomer: (data) async {
          await Future.delayed(const Duration(milliseconds: 500));
          return RDCustomerCreateResult(
            companyCustomerId:
                'mock_${DateTime.now().millisecondsSinceEpoch}',
            customerShopId: 'shop_mock_001',
            type: data.type,
            realname: data.realname,
            telephone: data.telephone,
          );
        },
        employeePickerBuilder: (ctx,
            {required value,
            required onChanged,
            postType,
            title,
            readOnly = false}) {
          return GestureDetector(
            onTap: readOnly
                ? null
                : () async {
                    final res = await Navigator.of(ctx, rootNavigator: true)
                        .push<RDEmployeePickerResult>(
                      CupertinoPageRoute(
                        fullscreenDialog: true,
                        builder: (_) => RDEmployeePickerSheet(
                          pickerMode: RDEmployeePickerMode.basic,
                          fetcher: _employeeFetcher,
                        ),
                      ),
                    );
                    if (res != null && res.selectedItems.isNotEmpty) {
                      onChanged(res.selectedItems.first.id);
                    }
                  },
            child: Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey.shade300),
                borderRadius: BorderRadius.circular(3),
              ),
              child: Text(
                value != null
                    ? (_mockEmployees
                            .where((e) => e.id == value)
                            .firstOrNull
                            ?.name ??
                        value)
                    : '请选择',
                style: TextStyle(
                  fontSize: 14,
                  color: value != null ? Colors.black87 : Colors.grey,
                ),
              ),
            ),
          );
        },
        onShowLoading: () {},
        onHideLoading: () {},
        onShowSuccess: () {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                  content: Text('创建成功'),
                  duration: Duration(seconds: 1)),
            );
          }
        },
        onShowToast: (msg) {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                  content: Text(msg),
                  duration: const Duration(seconds: 2)),
            );
          }
        },
        onConfirm: (result) {
          setState(() =>
              _createdCustomer =
                  '${result.realname}（${result.telephone ?? '无手机号'}）');
        },
      ),
    );
  }

  // ── 弹出仅新建散客 ─────────────────────────────────────────────────────────

  Future<void> _showWalkInCreate() async {
    await _pushSheet<RDCustomerCreateResult>(
      RDCustomerCreatePopup(
        pageType: PageType.createWalkInOnly,
        onCreateCustomer: (data) async {
          await Future.delayed(const Duration(milliseconds: 300));
          return RDCustomerCreateResult(type: 2, realname: data.realname);
        },
        onShowLoading: () {},
        onHideLoading: () {},
        onShowSuccess: () {},
        onShowToast: (msg) {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                  content: Text(msg),
                  duration: const Duration(seconds: 2)),
            );
          }
        },
        onConfirm: (result) {
          setState(() => _createdCustomer = '散客：${result.realname}');
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final c = RDColors.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('业务组件'),
        backgroundColor: c.brand,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ── 客户选择器 ──────────────────────────────────
            _SectionCard(
              title: 'RDCustomerPickerSheet 客户选择器',
              description:
                  '弹出 iOS 风格压窗屏，支持搜索、Tab 切换、分页加载、手机号脱敏。',
              result: _selectedCustomer,
              resultLabel: '已选客户',
              children: [
                _DemoButton(
                  label: '选择客户（双 Tab）',
                  color: c.brand,
                  onTap: _showCustomerPicker,
                ),
              ],
            ),

            const SizedBox(height: 16),

            // ── 员工选择器 ──────────────────────────────────
            _SectionCard(
              title: 'RDEmployeePickerSheet 员工选择器',
              description:
                  '支持 basic / shopFilter / reservation 三种模式，单选/复选，职位筛选。',
              result: _selectedEmployee,
              resultLabel: '已选员工',
              children: [
                _DemoButton(
                  label: 'basic 单选',
                  color: c.brand,
                  onTap: _showEmployeePicker,
                ),
                const SizedBox(height: 8),
                _DemoButton(
                  label: 'shopFilter 多选（最多 3 人）',
                  color: c.brandHover,
                  onTap: _showEmployeeMultiPicker,
                ),
              ],
            ),

            const SizedBox(height: 16),

            // ── 客户创建弹窗 ────────────────────────────────
            _SectionCard(
              title: 'RDCustomerCreatePopup 客户创建弹窗',
              description:
                  '支持 6 种模式：新建客户/散客+接收、仅接收、创建老客、编辑、仅新建客户、仅新建散客。',
              result: _createdCustomer,
              resultLabel: '最近创建',
              children: [
                _DemoButton(
                  label: '新建客户（createWithReceive 模式）',
                  color: c.brand,
                  onTap: _showCustomerCreate,
                ),
                const SizedBox(height: 8),
                _DemoButton(
                  label: '新建散客（createWalkInOnly 模式）',
                  color: c.brandHover,
                  onTap: _showWalkInCreate,
                ),
              ],
            ),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

// ── 辅助 Widget ───────────────────────────────────────────────────────────────

class _SectionCard extends StatelessWidget {
  const _SectionCard({
    required this.title,
    required this.description,
    required this.children,
    this.result,
    this.resultLabel,
  });

  final String title;
  final String description;
  final List<Widget> children;
  final String? result;
  final String? resultLabel;

  @override
  Widget build(BuildContext context) {
    final c = RDColors.of(context);
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
          const SizedBox(height: 4),
          Text(description,
              style: TextStyle(fontSize: 12, color: c.textSecondary)),
          const SizedBox(height: 12),
          ...children,
          if (result != null) ...[
            const SizedBox(height: 10),
            Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: c.brandLight,
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                '${resultLabel ?? '结果'}：$result',
                style: TextStyle(fontSize: 12, color: c.brand),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _DemoButton extends StatelessWidget {
  const _DemoButton(
      {required this.label, required this.color, required this.onTap});

  final String label;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          backgroundColor: color,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(6)),
          padding: const EdgeInsets.symmetric(vertical: 12),
        ),
        child: Text(label, style: const TextStyle(fontSize: 14)),
      ),
    );
  }
}
