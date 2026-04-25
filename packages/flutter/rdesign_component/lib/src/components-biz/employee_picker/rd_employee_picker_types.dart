/// 员工选择器纯 UI 层类型定义
library;

/// 服务占用时间段（预约模式使用）
class RDScheduleTimeSlot {
  /// 开始时间（ISO 8601 格式）
  final String startTime;

  /// 结束时间（ISO 8601 格式）
  final String endTime;

  /// 是否为本次预约的时间段
  final bool thisReservationFlag;

  const RDScheduleTimeSlot({
    required this.startTime,
    required this.endTime,
    this.thisReservationFlag = false,
  });
}

/// 班次时间段详情
class RDClassesDetail {
  final String startTime;
  final String endTime;

  /// 开始时间类型（1=当日, 2=次日）
  final int startTimeType;

  /// 结束时间类型（1=当日, 2=次日）
  final int endTimeType;

  const RDClassesDetail({
    required this.startTime,
    required this.endTime,
    this.startTimeType = 1,
    this.endTimeType = 1,
  });
}

/// 班次信息
class RDClassesInfo {
  /// 班次名称
  final String classesName;

  /// 班次时间段详情列表
  final List<RDClassesDetail> details;

  const RDClassesInfo({
    required this.classesName,
    required this.details,
  });
}

/// 员工数据模型
class RDEmployeeItem {
  /// 员工组织 ID
  final String id;

  /// 员工姓名
  final String name;

  /// 手机号
  final String? phone;

  /// 头像 URL
  final String? avatar;

  /// 职位类型（0=全部, 1=店长, 2=顾问, 3=美容师, 4=院长, 5=前台, 99=自建）
  final int? postType;

  /// 职位名称
  final String? postName;

  /// 门店 ID
  final String? shopId;

  /// 门店名称
  final String? shopName;

  /// 在职状态（1=在职, 2=已离职）
  final int? status;

  /// 排班状态（1=已排班, 2=排休, null=未排班）
  final int? schedulingType;

  /// 班次信息列表（showWorkShiftInfo=true 时使用）
  final List<RDClassesInfo>? classesInfo;

  /// 服务占用时间列表（预约模式使用）
  final List<RDScheduleTimeSlot>? scheduleTimeSlots;

  /// 唯一标识 key，默认为 id，基础模式下可能为 "$id-$postType"
  final String key;

  /// 是否禁用（运行时状态，用于时间冲突检测，非 final）
  bool disabled;

  RDEmployeeItem({
    required this.id,
    required this.name,
    this.phone,
    this.avatar,
    this.postType,
    this.postName,
    this.shopId,
    this.shopName,
    this.status,
    this.schedulingType,
    this.classesInfo,
    this.scheduleTimeSlots,
    String? key,
    this.disabled = false,
  }) : key = key ?? id;
}

/// 选择器模式
enum RDEmployeePickerMode {
  /// 基础模式：一次性加载，本地搜索
  basic,

  /// 门店筛选模式：分页加载，服务端搜索，职位筛选
  shopFilter,

  /// 预约模式：排班员工，时间冲突检测
  reservation,
}

/// 选择模式
enum RDSelectionMode {
  /// 单选：点击即确认
  single,

  /// 复选：勾选后点击确认按钮
  multiple,
}

/// 职位筛选标签
class RDPostTag {
  final int id;
  final String name;

  /// 图标名称（可选）
  final String? icon;

  const RDPostTag({
    required this.id,
    required this.name,
    this.icon,
  });
}

/// 员工分组（预约模式使用）
class RDEmployeeGroup {
  /// 分组标题，空字符串表示无标题
  final String title;
  final List<RDEmployeeItem> list;

  const RDEmployeeGroup({
    required this.title,
    required this.list,
  });
}

/// 员工分页结果
///
/// 基础模式和预约模式下 totalPage 可设为 1（一次性加载）。
/// 预约模式下使用 groups 字段返回分组数据。
class RDEmployeePageResult {
  /// 当前页员工列表（基础模式和门店筛选模式使用）
  final List<RDEmployeeItem> list;

  /// 总页数
  final int totalPage;

  /// 分组数据（预约模式使用）
  /// 例如 [RDEmployeeGroup(title: '', list: 已排班), RDEmployeeGroup(title: '未排班员工', list: 未排班)]
  final List<RDEmployeeGroup>? groups;

  const RDEmployeePageResult({
    required this.list,
    required this.totalPage,
    this.groups,
  });
}

/// 选择器返回结果
class RDEmployeePickerResult {
  /// 选中的员工列表
  final List<RDEmployeeItem> selectedItems;

  /// 是否需要为未排班员工创建排班（预约模式）
  final bool? isScheduling;

  const RDEmployeePickerResult({
    required this.selectedItems,
    this.isScheduling,
  });
}

/// 未排班员工处理动作
class RDScheduleAction {
  /// 是否确认选择
  final bool confirm;

  /// 是否创建排班
  final bool createSchedule;

  const RDScheduleAction({
    required this.confirm,
    this.createSchedule = false,
  });
}

/// 员工数据获取回调
///
/// 组件在以下时机调用：
/// - 初始化时
/// - 切换筛选条件时（重置 pageNo=1）
/// - 搜索输入后 300ms 防抖（门店筛选模式，重置 pageNo=1）
/// - 滚动到列表底部时（门店筛选模式，pageNo 自增）
typedef RDEmployeeFetcher = Future<RDEmployeePageResult> Function({
  required String keyword,
  required int pageNo,
  required int pageSize,
  required RDEmployeePickerMode pickerMode,

  /// 门店筛选模式下当前选中的职位类型 ID
  int? postTypeId,

  /// 预约模式下的开始时间
  String? startTime,

  /// 预约模式下的结束时间
  String? endTime,

  /// 宿主可能需要的额外参数
  Map<String, dynamic>? extra,
});

/// 选择回调，选中后关闭前执行
typedef RDEmployeeSelectCallback = Future<void> Function(
  List<RDEmployeeItem> items,
);
