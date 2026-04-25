/// 客户创建弹窗纯 UI 层类型定义
library;

import 'package:flutter/widgets.dart';

/// 功能模式枚举
enum PageType {
  /// 新建客户/散客 + 接收（默认），对应源组件 pageType='1'
  createWithReceive,

  /// 仅接收，对应源组件 pageType='2'
  receiveOnly,

  /// 创建老客，对应源组件 pageType='3'
  createOldCustomer,

  /// 编辑客户，对应源组件 pageType='4'
  editCustomer,

  /// 仅新建客户，对应源组件 pageType='5'
  createCustomerOnly,

  /// 仅新建散客，对应源组件 pageType='6'
  createWalkInOnly,
}

/// 客户类型枚举
enum CustomerType {
  /// 正式客户（type=1）
  regular,

  /// 散客（type=2）
  walkIn,
}

/// 推荐人类型枚举
enum InviteUserType {
  /// 无推荐人
  none,

  /// 员工推荐人
  employee,

  /// 顾客推荐
  customer,
}

/// 客户表单数据
class RDCustomerFormData {
  final String realname;
  final String? telephone;
  final String? consultant;
  final String? beautician;
  final InviteUserType inviteUserType;
  final String? inviteUserId;

  /// 客户类型：1=正式客户，2=散客
  final int type;

  /// 供应链渠道创建时的 createType
  final int? createType;

  const RDCustomerFormData({
    required this.realname,
    this.telephone,
    this.consultant,
    this.beautician,
    this.inviteUserType = InviteUserType.none,
    this.inviteUserId,
    this.type = 1,
    this.createType,
  });
}

/// 散客表单数据（简化版，仅包含描述）
class RDWalkInFormData {
  final String realname;

  const RDWalkInFormData({required this.realname});
}

/// 创建/编辑操作返回结果
class RDCustomerCreateResult {
  final String? companyCustomerId;
  final String? customerShopId;
  final int type;
  final String realname;
  final String? telephone;
  final String? picture;

  const RDCustomerCreateResult({
    this.companyCustomerId,
    this.customerShopId,
    required this.type,
    required this.realname,
    this.telephone,
    this.picture,
  });
}

/// 按手机号查询到的公司客户信息
class RDSearchedCustomerInfo {
  final String? companyCustomerId;

  /// 门店客户 ID（接收成功后由主组件设置）
  String? customerShopId;

  final String? realname;
  final String? telephone;

  /// 是否刚接收成功（用于控制显示顾问/美容师选择表单）
  bool received;

  /// 顾问 ID
  String? consultant;

  /// 美容师 ID
  String? beautician;

  RDSearchedCustomerInfo({
    this.companyCustomerId,
    this.customerShopId,
    this.realname,
    this.telephone,
    this.received = false,
    this.consultant,
    this.beautician,
  });
}

/// 接收客户操作返回结果
class RDCustomerReceiveResult {
  final String? companyCustomerId;
  final String? customerShopId;
  final String? realname;
  final String? telephone;
  final String? consultant;
  final String? beautician;

  const RDCustomerReceiveResult({
    this.companyCustomerId,
    this.customerShopId,
    this.realname,
    this.telephone,
    this.consultant,
    this.beautician,
  });
}

/// 编辑模式下的客户信息（用于回显）
class RDCustomerEditInfo {
  final String? realname;
  final String? telephone;
  final String? consultant;
  final String? beautician;
  final InviteUserType? inviteUserType;
  final String? inviteUserId;
  final String? prepareOrderId;

  /// 手机号是否禁用编辑
  final bool mobileDisabled;

  /// 推荐人是否禁用修改
  final bool inviteUserDisabled;

  const RDCustomerEditInfo({
    this.realname,
    this.telephone,
    this.consultant,
    this.beautician,
    this.inviteUserType,
    this.inviteUserId,
    this.prepareOrderId,
    this.mobileDisabled = false,
    this.inviteUserDisabled = false,
  });
}

// ── 回调 typedef ──

/// 创建客户回调
typedef CreateCustomerCallback = Future<RDCustomerCreateResult> Function(
  RDCustomerFormData data,
);

/// 按手机号查询客户回调
typedef SearchCustomerCallback = Future<RDSearchedCustomerInfo> Function(
  String telephone,
);

/// 发送验证码回调
typedef SendCodeCallback = Future<void> Function(String companyCustomerId);

/// 接收客户回调，返回 customerShopId
typedef ReceiveCustomerCallback = Future<String> Function(
  String companyCustomerId,
  String code,
);

/// 保存顾问/美容师回调
typedef SaveConsultantBeauticianCallback = Future<void> Function(
  String customerShopId, {
  String? consultant,
  String? beautician,
});

/// 创建老客/准备客回调
typedef CreateTouristCallback = Future<RDCustomerCreateResult> Function(
  RDCustomerFormData data,
);

/// 员工选择器构建器
///
/// [postType] 数据源类型：
/// - `null` — 全部员工（用于员工推荐人场景）
/// - `'2'`  — 顾问
/// - `'3'`  — 美容师
///
/// [title] 选择器弹窗标题，宿主应将其透传给弹窗组件：
/// - 推荐人场景传 `'选择推荐人'`
/// - 顾问场景传 `'选择顾问'`
/// - 美容师场景传 `'选择美容师'`
typedef EmployeePickerBuilder = Widget Function(
  BuildContext context, {
  required String? value,
  required ValueChanged<String?> onChanged,
  String? postType,
  String? title,
  bool readOnly,
});

/// 客户选择器构建器
typedef CustomerPickerBuilder = Widget Function(
  BuildContext context, {
  required String? value,
  required ValueChanged<String?> onChanged,
  bool readOnly,
});
