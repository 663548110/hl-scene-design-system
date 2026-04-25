/// 接收客户子视图
library;

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

import 'rd_customer_create_popup_types.dart';

/// 接收客户子视图，展示查询到的客户信息、授权码输入、验证码倒计时等 UI。
///
/// 三种状态展示：
/// - 公司有客户且门店已有（customerShopId != null && !received）：显示警告
/// - 公司有客户且刚接收成功（customerShopId != null && received）：显示顾问/美容师选择
/// - 公司有客户但门店无（customerShopId == null）：显示授权码输入
class RDReceiveCustomerView extends StatefulWidget {
  /// 查询到的客户信息
  final RDSearchedCustomerInfo customer;

  /// 授权码值
  final String code;

  /// 授权码变更回调
  final ValueChanged<String> onCodeChanged;

  /// 发送验证码回调
  final SendCodeCallback? onSendCode;

  /// 员工选择器构建器（用于顾问/美容师选择）
  final EmployeePickerBuilder? employeePickerBuilder;

  /// 顾问值
  final String? consultant;

  /// 美容师值
  final String? beautician;

  /// 顾问变更回调
  final ValueChanged<String?> onConsultantChanged;

  /// 美容师变更回调
  final ValueChanged<String?> onBeauticianChanged;

  /// Toast 回调
  final ValueChanged<String>? onShowToast;

  const RDReceiveCustomerView({
    super.key,
    required this.customer,
    this.code = '',
    required this.onCodeChanged,
    this.onSendCode,
    this.employeePickerBuilder,
    this.consultant,
    this.beautician,
    required this.onConsultantChanged,
    required this.onBeauticianChanged,
    this.onShowToast,
  });

  @override
  State<RDReceiveCustomerView> createState() => _RDReceiveCustomerViewState();
}

class _RDReceiveCustomerViewState extends State<RDReceiveCustomerView> {
  /// 倒计时剩余秒数
  int _seconds = 60;

  /// 倒计时是否激活
  bool _timerActive = false;

  /// 倒计时定时器
  Timer? _timer;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  /// 点击获取验证码
  Future<void> _getCode() async {
    final companyCustomerId = widget.customer.companyCustomerId;
    if (companyCustomerId == null || companyCustomerId.isEmpty) {
      widget.onShowToast?.call('用户不存在');
      return;
    }
    try {
      await widget.onSendCode?.call(companyCustomerId);
      _startTimer();
    } catch (e) {
      widget.onShowToast?.call(e.toString());
    }
  }

  /// 启动 60 秒倒计时
  void _startTimer() {
    _timer?.cancel();
    setState(() {
      _seconds = 60;
      _timerActive = true;
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }
      setState(() {
        _seconds--;
        if (_seconds <= 0) {
          _timerActive = false;
          timer.cancel();
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = TDTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // 客户信息展示区域
        _buildInfoRow('姓名', widget.customer.realname ?? '', theme),
        _buildInfoRow('手机号', widget.customer.telephone ?? '', theme),

        // 三种状态展示
        if (widget.customer.customerShopId != null &&
            !widget.customer.received)
          _buildWarningTip(theme),

        if (widget.customer.customerShopId != null &&
            widget.customer.received)
          _buildConsultantForm(context, theme),

        if (widget.customer.customerShopId == null)
          _buildCodeInput(context, theme),
      ],
    );
  }

  /// 客户信息行（姓名/手机号）
  Widget _buildInfoRow(String label, String value, TDThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: theme.grayColor3,
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 64,
            child: Text(
              label,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: theme.fontGyColor2,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: theme.fontGyColor1,
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// 警告提示：该客户已存在于本门店中，无需接收
  Widget _buildWarningTip(TDThemeData theme) {
    return Container(
      margin: const EdgeInsets.only(top: 8),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: theme.warningLightColor,
        borderRadius: BorderRadius.circular(3),
      ),
      child: Text(
        '该客户已存在于本门店中，无需接收',
        style: TextStyle(
          fontSize: 13,
          color: theme.warningNormalColor,
        ),
      ),
    );
  }

  /// 接收成功后：顾问/美容师选择表单
  Widget _buildConsultantForm(BuildContext context, TDThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        // 顾问
        Text(
          '顾问',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: theme.fontGyColor1,
          ),
        ),
        const SizedBox(height: 8),
        if (widget.employeePickerBuilder != null)
          widget.employeePickerBuilder!(
            context,
            value: widget.consultant,
            onChanged: widget.onConsultantChanged,
            postType: '2',
            title: '选择顾问',
          )
        else
          Text(
            '请配置员工选择器',
            style: TextStyle(fontSize: 14, color: theme.fontGyColor3),
          ),
        const SizedBox(height: 16),
        // 美容师
        Text(
          '美容师',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: theme.fontGyColor1,
          ),
        ),
        const SizedBox(height: 8),
        if (widget.employeePickerBuilder != null)
          widget.employeePickerBuilder!(
            context,
            value: widget.beautician,
            onChanged: widget.onBeauticianChanged,
            postType: '3',
            title: '选择美容师',
          )
        else
          Text(
            '请配置员工选择器',
            style: TextStyle(fontSize: 14, color: theme.fontGyColor3),
          ),
      ],
    );
  }

  /// 授权码输入区域
  Widget _buildCodeInput(BuildContext context, TDThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Text(
              '输入授权码',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: theme.fontGyColor2,
              ),
            ),
          ),
          // 授权码输入框 + 获取按钮
          TextField(
            maxLength: 6,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              hintText: '请输入授权码',
              hintStyle: TextStyle(
                fontSize: 14,
                color: theme.fontGyColor3,
              ),
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
              suffixIcon: _buildSendCodeButton(theme),
            ),
            onChanged: widget.onCodeChanged,
          ),
          // 警告提示
          Container(
            margin: const EdgeInsets.only(top: 4),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: theme.warningLightColor,
              borderRadius: BorderRadius.circular(3),
            ),
            child: Text(
              '接收后本门店可服务此客户，请谨慎操作！',
              style: TextStyle(
                fontSize: 13,
                color: theme.warningNormalColor,
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// 发送验证码按钮 / 倒计时
  Widget _buildSendCodeButton(TDThemeData theme) {
    if (_timerActive) {
      return Padding(
        padding: const EdgeInsets.only(right: 12),
        child: Center(
          widthFactor: 1,
          child: Text(
            '${_seconds}s',
            style: TextStyle(
              fontSize: 14,
              color: theme.brandNormalColor,
            ),
          ),
        ),
      );
    }

    if (widget.onSendCode == null) {
      return const SizedBox.shrink();
    }

    return Padding(
      padding: const EdgeInsets.only(right: 4),
      child: Center(
        widthFactor: 1,
        child: GestureDetector(
          onTap: _getCode,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Text(
              '点击获取',
              style: TextStyle(
                fontSize: 14,
                color: theme.brandNormalColor,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
