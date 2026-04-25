/// 客户创建弹窗主组件
///
/// 使用 showCupertinoSheet 弹出，与 RDCustomerPickerSheet 风格一致。
library;

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

import 'rd_customer_create_popup_types.dart';
import 'rd_customer_create_popup_utils.dart';
import 'rd_receive_customer_view.dart';

/// 客户创建/编辑/接收弹窗组件。
///
/// 通过 `showCupertinoSheet` 弹出，使用 CupertinoPageScaffold 作为页面容器。
///
/// 用法示例：
/// ```dart
/// final result = await showCupertinoSheet<RDCustomerCreateResult>(
///   context: context,
///   builder: (context) => RDCustomerCreatePopup(
///     pageType: PageType.createWithReceive,
///     onCreateCustomer: (data) async { ... },
///   ),
/// );
/// ```
class RDCustomerCreatePopup extends StatefulWidget {
  final PageType pageType;
  final RDCustomerEditInfo? customerInfo;
  final bool requiredPhone;
  final CreateCustomerCallback? onCreateCustomer;
  final SearchCustomerCallback? onSearchCustomer;
  final SendCodeCallback? onSendCode;
  final ReceiveCustomerCallback? onReceiveCustomer;
  final SaveConsultantBeauticianCallback? onSaveConsultantBeautician;
  final CreateTouristCallback? onCreateTourist;
  final EmployeePickerBuilder? employeePickerBuilder;
  final CustomerPickerBuilder? customerPickerBuilder;
  final ValueChanged<RDCustomerCreateResult>? onConfirm;
  final ValueChanged<RDCustomerReceiveResult>? onReceiveSuccess;
  final VoidCallback? onShowLoading;
  final VoidCallback? onShowSuccess;
  final ValueChanged<String>? onShowToast;
  final VoidCallback? onHideLoading;

  const RDCustomerCreatePopup({
    super.key,
    this.pageType = PageType.createWithReceive,
    this.customerInfo,
    this.requiredPhone = true,
    this.onCreateCustomer,
    this.onSearchCustomer,
    this.onSendCode,
    this.onReceiveCustomer,
    this.onSaveConsultantBeautician,
    this.onCreateTourist,
    this.employeePickerBuilder,
    this.customerPickerBuilder,
    this.onConfirm,
    this.onReceiveSuccess,
    this.onShowLoading,
    this.onShowSuccess,
    this.onShowToast,
    this.onHideLoading,
  });

  @override
  State<RDCustomerCreatePopup> createState() => _RDCustomerCreatePopupState();
}

class _RDCustomerCreatePopupState extends State<RDCustomerCreatePopup> {
  late String _title;
  int _tabIndex = 0;
  bool _isReceive = false;
  bool _searching = false;
  RDSearchedCustomerInfo? _searchedCustomer;
  String _searchMsg = '';
  String _smCode = '';

  final _formKey = GlobalKey<FormState>();
  String _name = '';
  String _phone = '';
  InviteUserType _inviteUserType = InviteUserType.none;
  String? _inviteUserId;
  String? _consultant;
  String? _beautician;

  final _walkInFormKey = GlobalKey<FormState>();
  String _walkInName = '';

  String? _receiveConsultant;
  String? _receiveBeautician;

  @override
  void initState() {
    super.initState();
    _initForPageType();
  }

  void _initForPageType() {
    switch (widget.pageType) {
      case PageType.createWithReceive:
        _tabIndex = 0;
        _title = '新建客户';
      case PageType.receiveOnly:
        _title = '接收公司客户';
        _isReceive = true;
      case PageType.createOldCustomer:
        _title = '创建老客';
      case PageType.editCustomer:
        _title = '编辑老客';
        _fillFromCustomerInfo();
      case PageType.createCustomerOnly:
        _title = '新建客户';
        _tabIndex = 0;
        _fillFromCustomerInfo();
      case PageType.createWalkInOnly:
        _title = '新建散客';
        _tabIndex = 1;
    }
  }

  void _fillFromCustomerInfo() {
    final info = widget.customerInfo;
    if (info == null) return;
    _name = info.realname ?? '';
    _phone = info.telephone ?? '';
    _consultant = info.consultant;
    _beautician = info.beautician;
    _inviteUserType = info.inviteUserType ?? InviteUserType.none;
    _inviteUserId = info.inviteUserId;
  }

  bool get _showReceiveSwitch {
    if (widget.onSearchCustomer == null) return false;
    return widget.pageType == PageType.createWithReceive ||
        widget.pageType == PageType.createCustomerOnly;
  }

  bool get _receivable {
    if (widget.pageType == PageType.createWithReceive) return _tabIndex == 0;
    return true;
  }

  bool get _isCustomerFormVisible {
    switch (widget.pageType) {
      case PageType.createWithReceive:
        return _tabIndex == 0;
      case PageType.createOldCustomer:
      case PageType.editCustomer:
      case PageType.createCustomerOnly:
        return true;
      case PageType.receiveOnly:
        return !_isReceive;
      case PageType.createWalkInOnly:
        return false;
    }
  }

  bool get _isWalkInFormVisible {
    switch (widget.pageType) {
      case PageType.createWithReceive:
        return _tabIndex == 1;
      case PageType.createWalkInOnly:
        return true;
      default:
        return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = TDTheme.of(context);
    return CupertinoPageScaffold(
      backgroundColor: theme.whiteColor1,
      navigationBar: _buildNavigationBar(theme),
      child: Material(
        color: Colors.transparent,
        child: SafeArea(
          child: Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: _buildContent(theme),
                ),
              ),
              _buildFooter(theme),
            ],
          ),
        ),
      ),
    );
  }

  CupertinoNavigationBar _buildNavigationBar(TDThemeData theme) {
    final Widget middle;
    if (widget.pageType == PageType.createWithReceive) {
      middle = _buildTabs(theme);
    } else {
      middle = Text(
        _title,
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: theme.fontGyColor1,
        ),
      );
    }
    return CupertinoNavigationBar(
      middle: middle,
      leading: CupertinoButton(
        padding: EdgeInsets.zero,
        onPressed: () => Navigator.of(context, rootNavigator: true).pop(),
        child: const Text('取消'),
      ),
      backgroundColor: theme.whiteColor1,
      border: null,
    );
  }

  Widget _buildTabs(TDThemeData theme) {
    const tabs = ['新建客户', '新建散客'];
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(tabs.length, (i) {
        final selected = i == _tabIndex;
        return GestureDetector(
          onTap: () {
            if (_tabIndex == i) return;
            setState(() {
              _tabIndex = i;
              _isReceive = false;
              _searchedCustomer = null;
              _searchMsg = '';
            });
          },
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  tabs[i],
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
                    color: selected ? theme.brandNormalColor : theme.fontGyColor1,
                  ),
                ),
                const SizedBox(height: 2),
                Container(
                  height: 2,
                  width: 24,
                  decoration: BoxDecoration(
                    color: selected ? theme.brandNormalColor : Colors.transparent,
                    borderRadius: BorderRadius.circular(1),
                  ),
                ),
              ],
            ),
          ),
        );
      }),
    );
  }

  Widget _buildContent(TDThemeData theme) {
    final showSwitch = _showReceiveSwitch && _receivable;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (showSwitch) _buildReceiveSwitch(theme),
        if (_isReceive && _searchedCustomer?.companyCustomerId != null)
          RDReceiveCustomerView(
            customer: _searchedCustomer!,
            code: _smCode,
            onCodeChanged: (v) => setState(() => _smCode = v),
            onSendCode: widget.onSendCode,
            employeePickerBuilder: widget.employeePickerBuilder,
            consultant: _receiveConsultant,
            beautician: _receiveBeautician,
            onConsultantChanged: (v) => setState(() => _receiveConsultant = v),
            onBeauticianChanged: (v) => setState(() => _receiveBeautician = v),
            onShowToast: widget.onShowToast,
          ),
        if (_isReceive &&
            (_searchedCustomer == null ||
                _searchedCustomer?.companyCustomerId == null))
          _buildReceiveSearchForm(theme),
        if (!_isReceive && _isCustomerFormVisible) _buildCustomerForm(theme),
        if (!_isReceive && _isWalkInFormVisible) _buildWalkInForm(theme),
      ],
    );
  }

  Widget _buildReceiveSwitch(TDThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: theme.grayColor3, width: 0.5)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('从公司客户中接收',
              style: TextStyle(fontSize: 14, color: theme.fontGyColor1)),
          SizedBox(
            width: 45,
            height: 26,
            child: Switch.adaptive(
              value: _isReceive,
              activeColor: theme.brandNormalColor,
              onChanged: (v) => setState(() {
                _isReceive = v;
                _searchedCustomer = null;
                _searchMsg = '';
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildReceiveSearchForm(TDThemeData theme) {
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Text('手机号',
                style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: theme.fontGyColor1)),
          ),
          TextField(
            keyboardType: TextInputType.phone,
            maxLength: 11,
            decoration: InputDecoration(
              hintText: '请输入11位有效的手机号码',
              hintStyle: TextStyle(fontSize: 14, color: theme.fontGyColor3),
              counterText: '',
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(3),
                borderSide: BorderSide(color: theme.grayColor4),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(3),
                borderSide: BorderSide(color: theme.grayColor4),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(3),
                borderSide: BorderSide(color: theme.brandNormalColor),
              ),
            ),
            onChanged: (v) => setState(() {
              _phone = v;
              if (!validatePhone(v)) {
                _searchedCustomer = null;
                _searchMsg = '';
              }
            }),
          ),
          if (_searchMsg.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(_searchMsg,
                  style:
                      TextStyle(fontSize: 12, color: theme.errorNormalColor)),
            ),
          if (_searchedCustomer != null &&
              _searchedCustomer!.companyCustomerId == null)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: theme.warningLightColor,
                  borderRadius: BorderRadius.circular(3),
                ),
                child: Text('公司无此客户，请为客户建档！',
                    style: TextStyle(
                        fontSize: 13, color: theme.warningNormalColor)),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildCustomerForm(TDThemeData theme) {
    final isEdit = widget.pageType == PageType.editCustomer;
    final mobileDisabled =
        isEdit && (widget.customerInfo?.mobileDisabled ?? false);
    final inviteUserDisabled =
        isEdit && (widget.customerInfo?.inviteUserDisabled ?? false);
    final showInvite = !_isReceive &&
        (widget.pageType == PageType.createWithReceive && _tabIndex == 0 ||
            widget.pageType == PageType.createCustomerOnly);

    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildFieldLabel('姓名', theme, required: true),
          TextFormField(
            initialValue: _name,
            maxLength: 15,
            decoration: _inputDecoration(theme, hintText: '请输入客户姓名'),
            validator: (v) {
              if (v == null || v.isEmpty) return '请输入客户姓名';
              if (!isValidChar(v)) return '不得包含非法字符';
              if (v.length < 2 || v.length > 15) return '请输入客户姓名长度在2到15个字符';
              return null;
            },
            onChanged: (v) => _name = v,
            onSaved: (v) => _name = v ?? '',
          ),
          _buildFieldLabel('手机号', theme, required: widget.requiredPhone),
          TextFormField(
            initialValue: _phone,
            maxLength: 11,
            keyboardType: TextInputType.phone,
            readOnly: mobileDisabled,
            decoration: _inputDecoration(theme,
                hintText:
                    widget.requiredPhone ? '请输入11位有效的手机号码' : '请输入手机号'),
            validator: (v) {
              if (!widget.requiredPhone && (v == null || v.isEmpty)) return null;
              if (v == null || !validatePhone(v)) return '请输入有效的11位手机号';
              return null;
            },
            onChanged: (v) => _phone = v,
            onSaved: (v) => _phone = v ?? '',
          ),
          if (showInvite) ...[
            _buildFieldLabel('是否有推荐人', theme),
            _buildInviteOptions(theme, inviteUserDisabled),
            if (_inviteUserType == InviteUserType.employee ||
                _inviteUserType == InviteUserType.customer) ...[
              _buildFieldLabel('推荐人', theme, required: true),
              _buildInvitePicker(theme, inviteUserDisabled),
            ],
            _buildInviteWarning(theme),
          ],
          if (!_isReceive) ...[
            _buildFieldLabel('顾问', theme),
            _buildEmployeePicker(theme,
                value: _consultant,
                onChanged: (v) => setState(() => _consultant = v),
                postType: '2'),
          ],
          if (!_isReceive) ...[
            _buildFieldLabel('美容师', theme),
            _buildEmployeePicker(theme,
                value: _beautician,
                onChanged: (v) => setState(() => _beautician = v),
                postType: '3'),
          ],
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildWalkInForm(TDThemeData theme) {
    return Form(
      key: _walkInFormKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildFieldLabel('客户描述', theme, required: true),
          TextFormField(
            initialValue: _walkInName,
            maxLength: 15,
            decoration: _inputDecoration(theme, hintText: '请输入客户描述或姓名'),
            validator: (v) {
              if (v == null || v.isEmpty) return '请输入客户描述';
              if (!isValidChar(v)) return '不得包含非法字符';
              return null;
            },
            onChanged: (v) => _walkInName = v,
            onSaved: (v) => _walkInName = v ?? '',
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildInviteOptions(TDThemeData theme, bool disabled) {
    const options = [
      (InviteUserType.none, '无推荐人'),
      (InviteUserType.employee, '员工推荐人'),
      (InviteUserType.customer, '顾客推荐'),
    ];
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: options.map((opt) {
          final selected = _inviteUserType == opt.$1;
          return Expanded(
            child: Padding(
              padding: EdgeInsets.only(
                  right: opt.$1 != InviteUserType.customer ? 8 : 0),
              child: GestureDetector(
                onTap: disabled
                    ? null
                    : () => setState(() {
                          _inviteUserType = opt.$1;
                          _inviteUserId = null;
                        }),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 9),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: selected ? theme.brandLightColor : theme.grayColor1,
                    borderRadius: BorderRadius.circular(3),
                    border: Border.all(
                      color:
                          selected ? theme.brandNormalColor : theme.grayColor4,
                      width: 0.5,
                    ),
                  ),
                  child: Text(opt.$2,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: 14,
                        color: disabled
                            ? theme.fontGyColor3
                            : selected
                                ? theme.brandNormalColor
                                : theme.fontGyColor1,
                      )),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildInvitePicker(TDThemeData theme, bool disabled) {
    // 员工推荐人：使用 employeePickerBuilder，postType 不传（null）表示全部员工
    if (_inviteUserType == InviteUserType.employee) {
      if (widget.employeePickerBuilder != null) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: widget.employeePickerBuilder!(context,
              value: _inviteUserId,
              onChanged: (v) => setState(() => _inviteUserId = v),
              postType: null, // null = 全部员工（推荐人场景）
              title: '选择推荐人',
              readOnly: disabled),
        );
      }
      return _buildPickerFallback(theme, disabled, '请选择推荐人（员工）');
    }
    // 顾客推荐：使用 customerPickerBuilder
    if (_inviteUserType == InviteUserType.customer) {
      if (widget.customerPickerBuilder != null) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: widget.customerPickerBuilder!(context,
              value: _inviteUserId,
              onChanged: (v) => setState(() => _inviteUserId = v),
              readOnly: disabled),
        );
      }
      return _buildPickerFallback(theme, disabled, '请选择推荐人（顾客）');
    }
    return const SizedBox.shrink();
  }

  /// 当对应 builder 未注入时，渲染一个可点击的占位按钮（与 employee/customer picker 风格一致）
  Widget _buildPickerFallback(
      TDThemeData theme, bool disabled, String placeholder) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: GestureDetector(
        onTap: disabled
            ? null
            : () => widget.onShowToast?.call('请先配置对应的选择器'),
        child: Container(
          width: double.infinity,
          padding:
              const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          decoration: BoxDecoration(
            border: Border.all(color: theme.grayColor4, width: 0.5),
            borderRadius: BorderRadius.circular(3),
            color: disabled ? theme.grayColor1 : theme.whiteColor1,
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  placeholder,
                  style: TextStyle(
                      fontSize: 14,
                      color: disabled
                          ? theme.fontGyColor3
                          : theme.fontGyColor3),
                ),
              ),
              Icon(Icons.chevron_right,
                  size: 18, color: theme.fontGyColor3),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInviteWarning(TDThemeData theme) {
    return Container(
      margin: const EdgeInsets.only(top: 4, bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: theme.warningLightColor,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text.rich(TextSpan(children: [
        TextSpan(
            text: '重要提示：',
            style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: theme.warningNormalColor)),
        TextSpan(
            text: '新客户如被人邀请，请务必准确选择推荐人信息；这将直接影响后续营销活动中，系统基于邀请关系自动生成的积分或佣金的正常发放。',
            style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w400,
                color: theme.warningNormalColor)),
      ])),
    );
  }

  Widget _buildEmployeePicker(TDThemeData theme,
      {required String? value,
      required ValueChanged<String?> onChanged,
      String? postType}) {
    if (widget.employeePickerBuilder != null) {
      final title = postType == '2'
          ? '选择顾问'
          : postType == '3'
              ? '选择美容师'
              : '选择员工';
      return Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: widget.employeePickerBuilder!(context,
            value: value,
            onChanged: onChanged,
            postType: postType,
            title: title),
      );
    }
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text('请配置员工选择器',
          style: TextStyle(fontSize: 14, color: theme.fontGyColor3)),
    );
  }

  // ── 底部按钮 ──

  Widget _buildFooter(TDThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: theme.grayColor3, width: 0.5)),
      ),
      child: SafeArea(top: false, child: _buildFooterButtons(theme)),
    );
  }

  Widget _buildFooterButtons(TDThemeData theme) {
    if (_isReceive && _searchedCustomer != null) {
      if (_searchedCustomer!.customerShopId != null) {
        return _btn(theme, text: '确认', onTap: _handleSaveConsultant);
      }
      if (_searchedCustomer!.companyCustomerId != null) {
        return Row(children: [
          Expanded(
              child: _btn(theme,
                  text: '上一步',
                  isPrimary: false,
                  onTap: () => setState(() {
                        _smCode = '';
                        _searchedCustomer = null;
                      }))),
          const SizedBox(width: 12),
          Expanded(child: _btn(theme, text: '接收', onTap: _handleReceive)),
        ]);
      }
      return _btn(theme, text: '创建客户', onTap: _handleSwitchToCreate);
    }
    if (_isReceive) return _btn(theme, text: '查询', onTap: _handleSearch);
    if (widget.pageType == PageType.editCustomer) {
      return _btn(theme, text: '确认', onTap: _handleEditSubmit);
    }
    return _btn(theme, text: '创建', onTap: _handleCreate);
  }

  Widget _btn(TDThemeData theme,
      {required String text,
      required VoidCallback onTap,
      bool isPrimary = true}) {
    return SizedBox(
      width: double.infinity,
      height: 44,
      child: ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          backgroundColor:
              isPrimary ? theme.brandNormalColor : theme.grayColor1,
          foregroundColor:
              isPrimary ? theme.whiteColor1 : theme.fontGyColor1,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(6),
            side: isPrimary
                ? BorderSide.none
                : BorderSide(color: theme.grayColor4),
          ),
          elevation: 0,
        ),
        child: Text(text,
            style:
                const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
      ),
    );
  }

  // ── 业务操作 ──

  Future<void> _handleSearch() async {
    if (!validatePhone(_phone)) {
      widget.onShowToast?.call('请输入有效的11位手机号');
      return;
    }
    setState(() => _searching = true);
    try {
      final result = await widget.onSearchCustomer?.call(_phone);
      if (!mounted) return;
      setState(() {
        _searchedCustomer = result ?? RDSearchedCustomerInfo();
        _searchMsg = '';
        _searching = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _searchMsg = e.toString();
        _searchedCustomer = RDSearchedCustomerInfo();
        _searching = false;
      });
    }
  }

  Future<void> _handleReceive() async {
    if (_smCode.length < 4) {
      widget.onShowToast?.call('请输入授权码');
      return;
    }
    final cid = _searchedCustomer?.companyCustomerId;
    if (cid == null) return;
    // onReceiveCustomer 未注入时给出明确提示
    if (widget.onReceiveCustomer == null) {
      widget.onShowToast?.call('接收功能未配置');
      return;
    }
    try {
      widget.onShowLoading?.call();
      final shopId = await widget.onReceiveCustomer!.call(cid, _smCode);
      widget.onHideLoading?.call();
      if (!mounted) return;
      setState(() {
        _searchedCustomer!.customerShopId = shopId;
        _searchedCustomer!.received = true;
        _smCode = '';
      });
      widget.onShowToast?.call('接收成功');
    } catch (e) {
      widget.onHideLoading?.call();
      widget.onShowToast?.call(e.toString());
    }
  }

  Future<void> _handleSaveConsultant() async {
    final shopId = _searchedCustomer?.customerShopId;
    if (shopId == null) return;

    // 门店已有此客户（非本次接收）：直接触发成功回调关闭弹窗，无需保存顾问/美容师
    if (_searchedCustomer?.received != true) {
      widget.onReceiveSuccess?.call(RDCustomerReceiveResult(
        companyCustomerId: _searchedCustomer?.companyCustomerId,
        customerShopId: shopId,
        realname: _searchedCustomer?.realname,
        telephone: _searchedCustomer?.telephone,
      ));
      if (mounted) Navigator.of(context, rootNavigator: true).pop();
      return;
    }

    // 本次接收成功：保存顾问/美容师后关闭
    try {
      widget.onShowLoading?.call();
      if (_receiveConsultant != null || _receiveBeautician != null) {
        await widget.onSaveConsultantBeautician?.call(shopId,
            consultant: _receiveConsultant, beautician: _receiveBeautician);
      }
      widget.onHideLoading?.call();
      widget.onReceiveSuccess?.call(RDCustomerReceiveResult(
        companyCustomerId: _searchedCustomer?.companyCustomerId,
        customerShopId: shopId,
        realname: _searchedCustomer?.realname,
        telephone: _searchedCustomer?.telephone,
        consultant: _receiveConsultant,
        beautician: _receiveBeautician,
      ));
      if (mounted) Navigator.of(context, rootNavigator: true).pop();
    } catch (e) {
      widget.onHideLoading?.call();
      widget.onShowToast?.call(e.toString());
    }
  }

  void _handleSwitchToCreate() {
    setState(() {
      _isReceive = false;
      _searchedCustomer = null;
      _searchMsg = '';
      if (widget.pageType == PageType.receiveOnly) _title = '创建客户';
    });
  }

  Future<void> _handleCreate() async {
    if (widget.pageType == PageType.createOldCustomer) {
      return _handleTouristSubmit();
    }
    if (_isWalkInFormVisible) {
      if (_walkInFormKey.currentState?.validate() != true) return;
      _walkInFormKey.currentState?.save();
      try {
        widget.onShowLoading?.call();
        final result = await widget.onCreateCustomer
            ?.call(RDCustomerFormData(realname: _walkInName, type: 2));
        widget.onHideLoading?.call();
        if (result != null) {
          widget.onShowSuccess?.call();
          widget.onConfirm?.call(result);
          if (mounted) Navigator.of(context, rootNavigator: true).pop();
        }
      } catch (e) {
        widget.onHideLoading?.call();
        widget.onShowToast?.call(e.toString());
      }
      return;
    }
    if (_formKey.currentState?.validate() != true) return;
    _formKey.currentState?.save();
    if (_inviteUserType != InviteUserType.none && _inviteUserId == null) {
      widget.onShowToast?.call('请选择推荐人');
      return;
    }
    try {
      widget.onShowLoading?.call();
      final formData = RDCustomerFormData(
        realname: _name,
        telephone: _phone.isNotEmpty ? _phone : null,
        consultant: _consultant,
        beautician: _beautician,
        inviteUserType: _inviteUserType,
        inviteUserId: _inviteUserId,
        type: 1,
        createType: !widget.requiredPhone ? 12 : null,
      );
      final result = await widget.onCreateCustomer?.call(formData);
      widget.onHideLoading?.call();
      if (result != null) {
        widget.onShowSuccess?.call();
        widget.onConfirm?.call(result);
        if (mounted) Navigator.of(context, rootNavigator: true).pop();
      }
    } catch (e) {
      widget.onHideLoading?.call();
      widget.onShowToast?.call(e.toString());
    }
  }

  Future<void> _handleTouristSubmit() async {
    if (_formKey.currentState?.validate() != true) return;
    _formKey.currentState?.save();
    try {
      widget.onShowLoading?.call();
      final formData = RDCustomerFormData(
        realname: _name,
        telephone: _phone.isNotEmpty ? _phone : null,
        consultant: _consultant,
        beautician: _beautician,
        inviteUserType: _inviteUserType,
        inviteUserId: _inviteUserId,
        type: 1,
      );
      final result = await widget.onCreateTourist?.call(formData);
      widget.onHideLoading?.call();
      if (result != null) {
        widget.onShowSuccess?.call();
        widget.onConfirm?.call(result);
        if (mounted) Navigator.of(context, rootNavigator: true).pop();
      }
    } catch (e) {
      widget.onHideLoading?.call();
      widget.onShowToast?.call(e.toString());
    }
  }

  Future<void> _handleEditSubmit() async {
    if (_formKey.currentState?.validate() != true) return;
    _formKey.currentState?.save();
    try {
      widget.onShowLoading?.call();
      final formData = RDCustomerFormData(
        realname: _name,
        telephone: _phone.isNotEmpty ? _phone : null,
        consultant: _consultant,
        beautician: _beautician,
        inviteUserType: _inviteUserType,
        inviteUserId: _inviteUserId,
        type: 1,
      );
      final result = await widget.onCreateTourist?.call(formData);
      widget.onHideLoading?.call();
      if (result != null) {
        widget.onShowSuccess?.call();
        widget.onConfirm?.call(result);
        if (mounted) Navigator.of(context, rootNavigator: true).pop();
      }
    } catch (e) {
      widget.onHideLoading?.call();
      widget.onShowToast?.call(e.toString());
    }
  }

  // ── 通用 UI 辅助 ──

  Widget _buildFieldLabel(String label, TDThemeData theme,
      {bool required = false}) {
    return Padding(
      padding: const EdgeInsets.only(top: 8, bottom: 4),
      child: Row(children: [
        if (required)
          Text('*',
              style: TextStyle(fontSize: 14, color: theme.errorNormalColor)),
        Text(label,
            style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: theme.fontGyColor1)),
      ]),
    );
  }

  InputDecoration _inputDecoration(TDThemeData theme, {String? hintText}) {
    return InputDecoration(
      hintText: hintText,
      hintStyle: TextStyle(fontSize: 14, color: theme.fontGyColor3),
      counterText: '',
      contentPadding:
          const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(3),
          borderSide: BorderSide(color: theme.grayColor4)),
      enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(3),
          borderSide: BorderSide(color: theme.grayColor4)),
      focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(3),
          borderSide: BorderSide(color: theme.brandNormalColor)),
      errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(3),
          borderSide: BorderSide(color: theme.errorNormalColor)),
      focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(3),
          borderSide: BorderSide(color: theme.errorNormalColor)),
    );
  }
}
