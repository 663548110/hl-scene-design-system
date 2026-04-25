# RDCustomerCreatePopup 客户创建弹窗

## 1. 组件介绍

本组件由 Uni App (Vue) 组件 `custome-create-popup`（`lx-lib/packages/lx-ui/src/components/custome-create-popup/`）转换为 Flutter (Dart) 实现。

### 功能概述

客户创建/编辑/接收弹窗组件，支持 **6 种功能模式**（通过 `PageType` 枚举控制）：

- **新建客户 + 散客 + 接收**（默认模式）
- **仅接收公司客户**
- **创建老客**
- **编辑客户**
- **仅新建客户**
- **仅新建散客**

### 设计理念

组件采用**纯 UI 组件**设计，不内置任何网络层依赖：

- 所有 API 调用通过 **7 个业务回调** 注入
- 员工选择器和客户选择器通过 **2 个 Builder 回调** 注入
- 加载/提示等 UI 反馈通过 **4 个可选回调** 注入
- 不依赖 `dio` 或任何业务 API 代码，仅依赖 `flutter` 和 `rdesign_flutter`

---

## 2. 快速开始

组件通过 `showCupertinoSheet` 弹出，与 `RDCustomerPickerSheet` 风格一致：

```dart
import 'package:flutter/cupertino.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

// 弹出客户创建弹窗
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    onCreateCustomer: (data) async {
      // 调用你的 API 创建客户
      return RDCustomerCreateResult(
        type: data.type,
        realname: data.realname,
      );
    },
    onConfirm: (result) {
      print('创建成功: ${result.realname}');
    },
  ),
);
```

---

## 3. 各 PageType 模式用法示例

### 3.1 createWithReceive（默认模式：新建客户/散客 + 接收）

```dart
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    pageType: PageType.createWithReceive,
  // 创建客户/散客
  onCreateCustomer: (data) async {
    final res = await myApi.createCustomer(
      realname: data.realname,
      telephone: data.telephone,
      consultant: data.consultant,
      beautician: data.beautician,
      inviteUserType: data.inviteUserType.index,
      inviteUserId: data.inviteUserId,
      type: data.type,
    );
    return RDCustomerCreateResult(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      type: data.type,
      realname: data.realname,
      telephone: data.telephone,
    );
  },
  // 查询公司客户（用于接收功能）
  onSearchCustomer: (telephone) async {
    final res = await myApi.searchCompanyCustomer(telephone);
    return RDSearchedCustomerInfo(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      realname: res.realname,
      telephone: res.telephone,
    );
  },
  // 发送验证码
  onSendCode: (companyCustomerId) async {
    await myApi.sendVerifyCode(companyCustomerId);
  },
  // 接收客户
  onReceiveCustomer: (companyCustomerId, code) async {
    final res = await myApi.receiveCustomer(companyCustomerId, code);
    return res.customerShopId;
  },
  // 保存顾问/美容师
  onSaveConsultantBeautician: (customerShopId, {consultant, beautician}) async {
    await myApi.saveConsultantBeautician(
      customerShopId,
      consultant: consultant,
      beautician: beautician,
    );
  },
  // 员工选择器
  employeePickerBuilder: (context, {required value, required onChanged, postType, readOnly = false}) {
    return MyEmployeePicker(
      value: value,
      onChanged: onChanged,
      postType: postType,
      readOnly: readOnly,
    );
  },
  // 客户选择器（用于顾客推荐人）
  customerPickerBuilder: (context, {required value, required onChanged, readOnly = false}) {
    return MyCustomerPicker(
      value: value,
      onChanged: onChanged,
      readOnly: readOnly,
    );
  },
  // 结果回调
  onConfirm: (result) {
    print('创建成功: ${result.realname}');
  },
  onReceiveSuccess: (result) {
    print('接收成功: ${result.realname}');
  },
  // UI 反馈
  onShowLoading: () => showLoading(context),
  onHideLoading: () => hideLoading(context),
  onShowSuccess: () => showSuccess(context),
  onShowToast: (msg) => showToast(context, msg),
  ),
);
```

### 3.2 receiveOnly（仅接收公司客户）

```dart
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    pageType: PageType.receiveOnly,
  onSearchCustomer: (telephone) async {
    final res = await myApi.searchCompanyCustomer(telephone);
    return RDSearchedCustomerInfo(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      realname: res.realname,
      telephone: res.telephone,
    );
  },
  onSendCode: (companyCustomerId) async {
    await myApi.sendVerifyCode(companyCustomerId);
  },
  onReceiveCustomer: (companyCustomerId, code) async {
    final res = await myApi.receiveCustomer(companyCustomerId, code);
    return res.customerShopId;
  },
  onSaveConsultantBeautician: (customerShopId, {consultant, beautician}) async {
    await myApi.saveConsultantBeautician(
      customerShopId,
      consultant: consultant,
      beautician: beautician,
    );
  },
  // 接收成功后可能需要创建客户（公司无此客户时）
  onCreateCustomer: (data) async {
    final res = await myApi.createCustomer(
      realname: data.realname,
      telephone: data.telephone,
      type: data.type,
    );
    return RDCustomerCreateResult(
      type: data.type,
      realname: data.realname,
    );
  },
  employeePickerBuilder: myEmployeePickerBuilder,
  onReceiveSuccess: (result) {
    print('接收成功: ${result.realname}');
  },
  onConfirm: (result) {
    print('创建成功: ${result.realname}');
  },
  onShowLoading: () => showLoading(context),
  onHideLoading: () => hideLoading(context),
  onShowToast: (msg) => showToast(context, msg),
  ),
);
```


### 3.3 createOldCustomer（创建老客）

```dart
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    pageType: PageType.createOldCustomer,
  onCreateTourist: (data) async {
    final res = await myApi.createOldCustomer(
      realname: data.realname,
      telephone: data.telephone,
      consultant: data.consultant,
      beautician: data.beautician,
      inviteUserType: data.inviteUserType.index,
      inviteUserId: data.inviteUserId,
    );
    return RDCustomerCreateResult(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      type: 1,
      realname: data.realname,
      telephone: data.telephone,
    );
  },
  employeePickerBuilder: myEmployeePickerBuilder,
  onConfirm: (result) {
    print('创建老客成功: ${result.realname}');
  },
  onShowLoading: () => showLoading(context),
  onHideLoading: () => hideLoading(context),
  onShowSuccess: () => showSuccess(context),
  onShowToast: (msg) => showToast(context, msg),
  ),
);
```

### 3.4 editCustomer（编辑客户）

```dart
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    pageType: PageType.editCustomer,
  customerInfo: RDCustomerEditInfo(
    realname: '张三',
    telephone: '13812345678',
    consultant: 'emp_001',
    beautician: 'emp_002',
    inviteUserType: InviteUserType.employee,
    inviteUserId: 'emp_003',
    mobileDisabled: true,       // 手机号不可编辑
    inviteUserDisabled: false,  // 推荐人可修改
  ),
  onCreateTourist: (data) async {
    final res = await myApi.updateCustomer(
      realname: data.realname,
      telephone: data.telephone,
      consultant: data.consultant,
      beautician: data.beautician,
      inviteUserType: data.inviteUserType.index,
      inviteUserId: data.inviteUserId,
    );
    return RDCustomerCreateResult(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      type: 1,
      realname: data.realname,
      telephone: data.telephone,
    );
  },
  employeePickerBuilder: myEmployeePickerBuilder,
  customerPickerBuilder: myCustomerPickerBuilder,
  onConfirm: (result) {
    print('编辑成功: ${result.realname}');
  },
  onShowLoading: () => showLoading(context),
  onHideLoading: () => hideLoading(context),
  onShowSuccess: () => showSuccess(context),
  onShowToast: (msg) => showToast(context, msg),
)
```

### 3.5 createCustomerOnly（仅新建客户）

```dart
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    pageType: PageType.createCustomerOnly,
  requiredPhone: true,
  onCreateCustomer: (data) async {
    final res = await myApi.createCustomer(
      realname: data.realname,
      telephone: data.telephone,
      consultant: data.consultant,
      beautician: data.beautician,
      inviteUserType: data.inviteUserType.index,
      inviteUserId: data.inviteUserId,
      type: data.type,
    );
    return RDCustomerCreateResult(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      type: data.type,
      realname: data.realname,
      telephone: data.telephone,
    );
  },
  // 支持接收开关（需提供 onSearchCustomer）
  onSearchCustomer: (telephone) async {
    final res = await myApi.searchCompanyCustomer(telephone);
    return RDSearchedCustomerInfo(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      realname: res.realname,
      telephone: res.telephone,
    );
  },
  onSendCode: (companyCustomerId) async {
    await myApi.sendVerifyCode(companyCustomerId);
  },
  onReceiveCustomer: (companyCustomerId, code) async {
    final res = await myApi.receiveCustomer(companyCustomerId, code);
    return res.customerShopId;
  },
  onSaveConsultantBeautician: (customerShopId, {consultant, beautician}) async {
    await myApi.saveConsultantBeautician(
      customerShopId,
      consultant: consultant,
      beautician: beautician,
    );
  },
  employeePickerBuilder: myEmployeePickerBuilder,
  customerPickerBuilder: myCustomerPickerBuilder,
  onConfirm: (result) {
    print('创建成功: ${result.realname}');
  },
  onReceiveSuccess: (result) {
    print('接收成功: ${result.realname}');
  },
  onShowLoading: () => showLoading(context),
  onHideLoading: () => hideLoading(context),
  onShowSuccess: () => showSuccess(context),
  onShowToast: (msg) => showToast(context, msg),
)
```

### 3.6 createWalkInOnly（仅新建散客）

```dart
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    pageType: PageType.createWalkInOnly,
  onCreateCustomer: (data) async {
    final res = await myApi.createWalkIn(realname: data.realname);
    return RDCustomerCreateResult(
      companyCustomerId: res.companyCustomerId,
      customerShopId: res.customerShopId,
      type: 2,
      realname: data.realname,
    );
  },
  onConfirm: (result) {
    print('散客创建成功: ${result.realname}');
  },
  onShowLoading: () => showLoading(context),
  onHideLoading: () => hideLoading(context),
  onShowSuccess: () => showSuccess(context),
  onShowToast: (msg) => showToast(context, msg),
)
```

---

## 4. API 参数表格

### RDCustomerCreatePopup 构造函数参数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| `pageType` | `PageType` | `PageType.createWithReceive` | 否 | 功能模式，控制弹窗行为 |
| `customerInfo` | `RDCustomerEditInfo?` | `null` | 否 | 编辑模式下的客户信息（用于回显） |
| `requiredPhone` | `bool` | `true` | 否 | 手机号是否必填 |
| `onCreateCustomer` | `CreateCustomerCallback?` | `null` | 否 | 创建客户/散客回调 |
| `onSearchCustomer` | `SearchCustomerCallback?` | `null` | 否 | 按手机号查询公司客户回调 |
| `onSendCode` | `SendCodeCallback?` | `null` | 否 | 发送验证码回调 |
| `onReceiveCustomer` | `ReceiveCustomerCallback?` | `null` | 否 | 接收客户回调 |
| `onSaveConsultantBeautician` | `SaveConsultantBeauticianCallback?` | `null` | 否 | 保存顾问/美容师回调 |
| `onCreateTourist` | `CreateTouristCallback?` | `null` | 否 | 创建老客/准备客回调 |
| `employeePickerBuilder` | `EmployeePickerBuilder?` | `null` | 否 | 员工选择器构建器 |
| `customerPickerBuilder` | `CustomerPickerBuilder?` | `null` | 否 | 客户选择器构建器 |
| `onConfirm` | `ValueChanged<RDCustomerCreateResult>?` | `null` | 否 | 创建/编辑成功回调 |
| `onReceiveSuccess` | `ValueChanged<RDCustomerReceiveResult>?` | `null` | 否 | 接收成功回调 |
| `onShowLoading` | `VoidCallback?` | `null` | 否 | 显示加载状态回调 |
| `onShowSuccess` | `VoidCallback?` | `null` | 否 | 显示成功提示回调 |
| `onShowToast` | `ValueChanged<String>?` | `null` | 否 | 显示 Toast 提示回调 |
| `onHideLoading` | `VoidCallback?` | `null` | 否 | 隐藏加载状态回调 |

> **注意**：当 `onSearchCustomer` 为 `null` 时，"从公司客户中接收"开关将自动隐藏。当 `onSendCode` 为 `null` 时，"点击获取"验证码按钮将隐藏。当 `employeePickerBuilder` 为 `null` 时，顾问/美容师字段显示为禁用提示。当 `customerPickerBuilder` 为 `null` 时，顾客推荐选项不可选。

---

## 5. 回调参数详细说明

### 5.1 业务回调

#### onCreateCustomer — 创建客户/散客

```dart
typedef CreateCustomerCallback = Future<RDCustomerCreateResult> Function(
  RDCustomerFormData data,
);
```

- **参数**：`data` — 客户表单数据（`RDCustomerFormData`），包含姓名、手机号、顾问、美容师、推荐人等信息。散客创建时 `data.type = 2`，仅包含 `realname`。
- **返回值**：`RDCustomerCreateResult` — 创建结果，包含 `companyCustomerId`、`customerShopId`、`type`、`realname` 等。
- **调用时机**：客户创建表单验证通过后、散客创建表单验证通过后。
- **异常处理**：抛出异常时，组件通过 `onShowToast` 通知宿主，弹窗保持打开。

```dart
// 实现示例
onCreateCustomer: (data) async {
  final response = await dio.post('/api/customer/create', data: {
    'realname': data.realname,
    'telephone': data.telephone,
    'consultant': data.consultant,
    'beautician': data.beautician,
    'invite_user_type': data.inviteUserType.index,
    'invite_user_id': data.inviteUserId,
    'type': data.type,
    'create_type': data.createType,
  });
  final res = response.data['data'];
  return RDCustomerCreateResult(
    companyCustomerId: res['companyCustomerId'],
    customerShopId: res['customerShopId'],
    type: data.type,
    realname: data.realname,
    telephone: data.telephone,
    picture: res['picture'],
  );
},
```

#### onSearchCustomer — 查询公司客户

```dart
typedef SearchCustomerCallback = Future<RDSearchedCustomerInfo> Function(
  String telephone,
);
```

- **参数**：`telephone` — 用户输入的手机号（已通过格式验证）。
- **返回值**：`RDSearchedCustomerInfo` — 查询结果。若公司无此客户，返回 `companyCustomerId` 为 `null` 的对象。
- **调用时机**：接收模式下用户点击"查询"按钮时。

```dart
// 实现示例
onSearchCustomer: (telephone) async {
  final response = await dio.get('/api/customer/search', queryParameters: {
    'telephone': telephone,
  });
  final res = response.data['data'];
  if (res == null) {
    return RDSearchedCustomerInfo(); // 公司无此客户
  }
  return RDSearchedCustomerInfo(
    companyCustomerId: res['companyCustomerId'],
    customerShopId: res['customerShopId'],
    realname: res['realname'],
    telephone: res['telephone'],
  );
},
```

#### onSendCode — 发送验证码

```dart
typedef SendCodeCallback = Future<void> Function(String companyCustomerId);
```

- **参数**：`companyCustomerId` — 公司客户 ID。
- **返回值**：无。
- **调用时机**：用户点击"点击获取"验证码按钮时。成功后自动启动 60 秒倒计时。

```dart
// 实现示例
onSendCode: (companyCustomerId) async {
  await dio.post('/api/customer/sendCode', data: {
    'companyCustomerId': companyCustomerId,
  });
},
```

#### onReceiveCustomer — 接收客户

```dart
typedef ReceiveCustomerCallback = Future<String> Function(
  String companyCustomerId,
  String code,
);
```

- **参数**：`companyCustomerId` — 公司客户 ID；`code` — 用户输入的授权码。
- **返回值**：`String` — 接收成功后的 `customerShopId`。
- **调用时机**：用户输入授权码（≥4 位）并点击"接收"按钮时。

```dart
// 实现示例
onReceiveCustomer: (companyCustomerId, code) async {
  final response = await dio.post('/api/customer/receive', data: {
    'companyCustomerId': companyCustomerId,
    'code': code,
  });
  return response.data['data']['customerShopId'];
},
```

#### onSaveConsultantBeautician — 保存顾问/美容师

```dart
typedef SaveConsultantBeauticianCallback = Future<void> Function(
  String customerShopId, {
  String? consultant,
  String? beautician,
});
```

- **参数**：`customerShopId` — 门店客户 ID；`consultant` — 顾问 ID（可选）；`beautician` — 美容师 ID（可选）。
- **返回值**：无。
- **调用时机**：接收成功后，用户选择顾问/美容师并点击"确认"按钮时。

```dart
// 实现示例
onSaveConsultantBeautician: (customerShopId, {consultant, beautician}) async {
  await dio.post('/api/customer/saveConsultant', data: {
    'customerShopId': customerShopId,
    'consultant': consultant,
    'beautician': beautician,
  });
},
```

#### onCreateTourist — 创建老客/准备客

```dart
typedef CreateTouristCallback = Future<RDCustomerCreateResult> Function(
  RDCustomerFormData data,
);
```

- **参数**：`data` — 客户表单数据（`RDCustomerFormData`）。
- **返回值**：`RDCustomerCreateResult` — 创建结果。
- **调用时机**：`createOldCustomer` 或 `editCustomer` 模式下用户提交表单时。

```dart
// 实现示例
onCreateTourist: (data) async {
  final response = await dio.post('/api/customer/createTourist', data: {
    'realname': data.realname,
    'telephone': data.telephone,
    'consultant': data.consultant,
    'beautician': data.beautician,
  });
  final res = response.data['data'];
  return RDCustomerCreateResult(
    companyCustomerId: res['companyCustomerId'],
    customerShopId: res['customerShopId'],
    type: 1,
    realname: data.realname,
    telephone: data.telephone,
  );
},
```

#### onConfirm — 创建/编辑成功回调

```dart
ValueChanged<RDCustomerCreateResult>? onConfirm;
```

- **参数**：`result` — 创建/编辑操作的返回结果。
- **调用时机**：`onCreateCustomer` 或 `onCreateTourist` 成功返回后，弹窗关闭前。

#### onReceiveSuccess — 接收成功回调

```dart
ValueChanged<RDCustomerReceiveResult>? onReceiveSuccess;
```

- **参数**：`result` — 接收操作的返回结果，包含客户信息和顾问/美容师。
- **调用时机**：接收成功后用户保存顾问/美容师并点击"确认"后。

### 5.2 Builder 回调

#### employeePickerBuilder — 员工选择器

```dart
typedef EmployeePickerBuilder = Widget Function(
  BuildContext context, {
  required String? value,
  required ValueChanged<String?> onChanged,
  String? postType,
  bool readOnly,
});
```

- **参数说明**：
  - `context` — BuildContext
  - `value` — 当前选中的员工 ID
  - `onChanged` — 选中值变更回调
  - `postType` — 岗位类型筛选（`'2'` = 顾问，`'3'` = 美容师）
  - `readOnly` — 是否只读（编辑模式下字段禁用时为 `true`）
- **使用场景**：顾问选择、美容师选择、员工推荐人选择、接收成功后顾问/美容师选择。

```dart
// 实现示例
employeePickerBuilder: (context, {required value, required onChanged, postType, readOnly = false}) {
  return GestureDetector(
    onTap: readOnly ? null : () async {
      final selected = await showEmployeePicker(context, postType: postType);
      if (selected != null) {
        onChanged(selected.id);
      }
    },
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        borderRadius: BorderRadius.circular(3),
      ),
      child: Text(
        value != null ? getEmployeeName(value) : '请选择',
        style: TextStyle(
          fontSize: 14,
          color: value != null ? Colors.black87 : Colors.grey,
        ),
      ),
    ),
  );
},
```

#### customerPickerBuilder — 客户选择器

```dart
typedef CustomerPickerBuilder = Widget Function(
  BuildContext context, {
  required String? value,
  required ValueChanged<String?> onChanged,
  bool readOnly,
});
```

- **参数说明**：
  - `context` — BuildContext
  - `value` — 当前选中的客户 ID
  - `onChanged` — 选中值变更回调
  - `readOnly` — 是否只读
- **使用场景**：顾客推荐人选择。

```dart
// 实现示例
customerPickerBuilder: (context, {required value, required onChanged, readOnly = false}) {
  return GestureDetector(
    onTap: readOnly ? null : () async {
      final selected = await showCupertinoSheet<RDCustomerItem>(
        context: context,
        useNestedNavigation: true,
        builder: (ctx) => RDCustomerPickerSheet(fetcher: myFetcher),
      );
      if (selected != null) {
        onChanged(selected.id);
      }
    },
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        borderRadius: BorderRadius.circular(3),
      ),
      child: Text(
        value != null ? getCustomerName(value) : '请选择推荐客户',
        style: TextStyle(
          fontSize: 14,
          color: value != null ? Colors.black87 : Colors.grey,
        ),
      ),
    ),
  );
},
```

### 5.3 UI 反馈回调

| 回调 | 签名 | 说明 |
|------|------|------|
| `onShowLoading` | `VoidCallback?` | 业务操作开始时调用，宿主显示加载遮罩 |
| `onHideLoading` | `VoidCallback?` | 业务操作结束时调用（成功或异常），宿主隐藏加载遮罩 |
| `onShowSuccess` | `VoidCallback?` | 创建/编辑成功时调用，宿主显示成功提示 |
| `onShowToast` | `ValueChanged<String>?` | 需要提示用户时调用（错误信息、"接收成功"、"请输入授权码"等） |

```dart
// 实现示例（以 EasyLoading 为例）
onShowLoading: () => EasyLoading.show(status: '加载中...'),
onHideLoading: () => EasyLoading.dismiss(),
onShowSuccess: () => EasyLoading.showSuccess('操作成功'),
onShowToast: (msg) => EasyLoading.showToast(msg),
```


---

## 6. 类型定义说明

### 6.1 PageType 枚举值对照表

| 枚举值 | 源组件 pageType | 弹窗标题 | Tab 显示 | 接收开关 | 提交回调 | 说明 |
|--------|----------------|----------|----------|----------|----------|------|
| `createWithReceive` | `'1'` | 动态（Tab 切换） | 新建客户 / 新建散客 | 有 | `onCreateCustomer` | 默认模式，支持创建客户、散客和接收 |
| `receiveOnly` | `'2'` | 接收公司客户 | 无 | 强制开启 | `onReceiveCustomer` | 仅接收，公司无客户时可切换到创建 |
| `createOldCustomer` | `'3'` | 创建老客 | 无 | 无 | `onCreateTourist` | 创建老客/准备客 |
| `editCustomer` | `'4'` | 编辑老客 | 无 | 无 | `onCreateTourist` | 编辑已有客户，回显 customerInfo |
| `createCustomerOnly` | `'5'` | 新建客户 | 无 | 有 | `onCreateCustomer` | 仅新建客户表单 + 接收开关 |
| `createWalkInOnly` | `'6'` | 新建散客 | 无 | 无 | `onCreateCustomer` | 仅新建散客表单 |

### 6.2 数据模型字段说明

#### RDCustomerFormData — 客户表单数据

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `realname` | `String` | — (必填) | 客户姓名 |
| `telephone` | `String?` | `null` | 手机号 |
| `consultant` | `String?` | `null` | 顾问 ID |
| `beautician` | `String?` | `null` | 美容师 ID |
| `inviteUserType` | `InviteUserType` | `InviteUserType.none` | 推荐人类型 |
| `inviteUserId` | `String?` | `null` | 推荐人 ID |
| `type` | `int` | `1` | 客户类型：1=正式客户，2=散客 |
| `createType` | `int?` | `null` | 供应链渠道创建时的 createType（`requiredPhone=false` 时为 12） |

#### RDWalkInFormData — 散客表单数据

| 字段 | 类型 | 说明 |
|------|------|------|
| `realname` | `String` | 客户描述/姓名（必填） |

#### RDCustomerCreateResult — 创建/编辑操作返回结果

| 字段 | 类型 | 说明 |
|------|------|------|
| `companyCustomerId` | `String?` | 公司客户 ID |
| `customerShopId` | `String?` | 门店客户 ID |
| `type` | `int` | 客户类型：1=正式客户，2=散客（必填） |
| `realname` | `String` | 客户姓名（必填） |
| `telephone` | `String?` | 手机号 |
| `picture` | `String?` | 头像 URL |

#### RDSearchedCustomerInfo — 查询到的公司客户信息

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `companyCustomerId` | `String?` | `null` | 公司客户 ID（`null` 表示公司无此客户） |
| `customerShopId` | `String?` | `null` | 门店客户 ID（非 `null` 表示门店已有此客户） |
| `realname` | `String?` | `null` | 客户姓名 |
| `telephone` | `String?` | `null` | 手机号 |
| `received` | `bool` | `false` | 是否刚接收成功（用于控制显示顾问/美容师选择表单） |
| `consultant` | `String?` | `null` | 顾问 ID |
| `beautician` | `String?` | `null` | 美容师 ID |

> **状态判断逻辑**：
> - `companyCustomerId == null`：公司无此客户 → 显示"创建客户"按钮
> - `companyCustomerId != null && customerShopId == null`：公司有、门店无 → 显示授权码输入
> - `customerShopId != null && !received`：门店已有此客户 → 显示"无需接收"提示
> - `customerShopId != null && received`：刚接收成功 → 显示顾问/美容师选择

#### RDCustomerReceiveResult — 接收客户操作返回结果

| 字段 | 类型 | 说明 |
|------|------|------|
| `companyCustomerId` | `String?` | 公司客户 ID |
| `customerShopId` | `String?` | 门店客户 ID |
| `realname` | `String?` | 客户姓名 |
| `telephone` | `String?` | 手机号 |
| `consultant` | `String?` | 顾问 ID |
| `beautician` | `String?` | 美容师 ID |

#### RDCustomerEditInfo — 编辑模式下的客户信息（用于回显）

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `realname` | `String?` | `null` | 客户姓名 |
| `telephone` | `String?` | `null` | 手机号 |
| `consultant` | `String?` | `null` | 顾问 ID |
| `beautician` | `String?` | `null` | 美容师 ID |
| `inviteUserType` | `InviteUserType?` | `null` | 推荐人类型 |
| `inviteUserId` | `String?` | `null` | 推荐人 ID |
| `prepareOrderId` | `String?` | `null` | 准备单 ID |
| `mobileDisabled` | `bool` | `false` | 手机号是否禁用编辑 |
| `inviteUserDisabled` | `bool` | `false` | 推荐人是否禁用修改 |

### 6.3 枚举类型

#### CustomerType — 客户类型

| 枚举值 | 说明 |
|--------|------|
| `regular` | 正式客户（type=1） |
| `walkIn` | 散客（type=2） |

#### InviteUserType — 推荐人类型

| 枚举值 | 说明 |
|--------|------|
| `none` | 无推荐人 |
| `employee` | 员工推荐人 |
| `customer` | 顾客推荐 |

---

## 7. 弹出方式

组件通过 `showCupertinoSheet` 弹出，使用 `CupertinoPageScaffold` + `CupertinoNavigationBar` 作为页面容器：

```dart
final result = await showCupertinoSheet<RDCustomerCreateResult>(
  context: context,
  useNestedNavigation: true,
  builder: (context) => RDCustomerCreatePopup(
    pageType: PageType.createWithReceive,
    onCreateCustomer: myCreateCallback,
    onConfirm: (result) {
      print('创建成功: ${result.realname}');
    },
  ),
);
```

### 页面结构

- 导航栏左侧：「取消」按钮，点击后 `Navigator.pop()` 关闭页面
- 导航栏中间：标题文字（或 `createWithReceive` 模式下的 Tab 切换）
- 内容区域：表单/接收视图（可滚动）
- 底部：操作按钮（创建/查询/接收/确认等）

### 生命周期

- 组件在 `initState` 中根据 `pageType` 初始化标题和表单状态
- `editCustomer` 和 `createCustomerOnly` 模式会回显 `customerInfo` 数据
- 操作成功后通过 `Navigator.pop()` 关闭页面
- 每次弹出都是新的 Widget 实例，无需手动重置状态

---

## 8. 平台差异

本组件由 Uni App (Vue) 组件 `custome-create-popup` 转换而来，以下是主要差异：

| 差异项 | 源组件（Uni App / Vue） | Flutter 组件 |
|--------|------------------------|-------------|
| **PageType 表示** | 字符串 `'1'` ~ `'6'` | 语义化枚举 `PageType`（`createWithReceive`、`receiveOnly` 等） |
| **表单验证** | `l-form` + `l-form-item` 组件验证 | Flutter `Form` + `FormField` + `GlobalKey<FormState>` 机制 |
| **员工选择器** | 直接引用 `lx-employee-picker` 组件 | 通过 `employeePickerBuilder` 回调注入，解耦组件依赖 |
| **客户选择器** | 直接引用 `lx-custome-picker` 组件 | 通过 `customerPickerBuilder` 回调注入，解耦组件依赖 |
| **API 调用** | 组件内部直接调用 API（`customerApi.xxx`） | 所有 API 通过 7 个回调注入，组件不依赖任何网络层 |
| **加载/提示** | 使用 `uni.showLoading` / `uni.showToast` | 通过 `onShowLoading` / `onShowToast` 等回调注入，由宿主决定展示方式 |
| **弹窗容器** | `l-picker-panel` 组件 | `showCupertinoSheet` + `CupertinoPageScaffold` |
| **样式系统** | CSS + rpx 单位 | `TDTheme.of(context)` 主题 token + RDesign 基础组件 |
| **单位转换** | rpx（小程序响应式单位） | 逻辑像素（rpx / 2） |
| **小程序专属功能** | 部分小程序特有 API（如 `uni.xxx`） | 已移除，使用 Flutter 等效实现 |
| **状态管理** | Vue 响应式数据（`ref` / `reactive`） | `StatefulWidget` + `setState` |
| **推荐人类型** | 数字 `0` / `1` / `2` | 枚举 `InviteUserType`（`none` / `employee` / `customer`） |
| **客户类型** | 数字 `1` / `2` | 枚举 `CustomerType`（`regular` / `walkIn`），表单数据中仍使用 `int type` 保持 API 兼容 |

---

## 9. 文件结构

```
rdesign-component/lib/src/components-biz/customer_create_popup/
├── rd_customer_create_popup.dart          ← 主组件（RDCustomerCreatePopup StatefulWidget）
│                                            包含多模式 Tab 切换、表单构建、接收流程、
│                                            底部按钮、业务操作处理等全部逻辑
├── rd_customer_create_popup_types.dart    ← 类型定义文件
│                                            PageType / CustomerType / InviteUserType 枚举
│                                            RDCustomerFormData / RDWalkInFormData 表单数据模型
│                                            RDCustomerCreateResult / RDSearchedCustomerInfo /
│                                            RDCustomerReceiveResult / RDCustomerEditInfo 数据模型
│                                            所有回调 typedef 定义
├── rd_receive_customer_view.dart          ← 接收客户子视图（RDReceiveCustomerView StatefulWidget）
│                                            客户信息展示、授权码输入、60 秒倒计时、
│                                            顾问/美容师选择表单
├── rd_customer_create_popup_utils.dart    ← 工具函数
│                                            isValidChar() — 合法字符验证
│                                            validateName() — 姓名验证（长度 + 字符）
│                                            validatePhone() — 手机号格式验证
└── README.md                              ← 本文档
```

### 导出入口

组件已在 `rdesign-component/lib/rdesign_flutter.dart` 中注册导出：

```dart
// customer_create_popup
export 'src/components-biz/customer_create_popup/rd_customer_create_popup_types.dart';
export 'src/components-biz/customer_create_popup/rd_customer_create_popup.dart';
export 'src/components-biz/customer_create_popup/rd_receive_customer_view.dart';
export 'src/components-biz/customer_create_popup/rd_customer_create_popup_utils.dart';
```

使用时只需导入统一入口：

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';
```
