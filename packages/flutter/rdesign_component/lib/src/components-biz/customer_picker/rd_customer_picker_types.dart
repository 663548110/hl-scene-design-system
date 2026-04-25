/// 客户选择器纯 UI 层类型定义
library;

/// 客户数据模型（纯 UI 层，不含 raw）
class RDCustomerItem {
  final String id;
  final String name;
  final String? phone;
  final String? avatar;

  /// 客户类型：1=客户, 2=散客
  final int? type;

  const RDCustomerItem({
    required this.id,
    required this.name,
    this.phone,
    this.avatar,
    this.type,
  });
}

/// 通用分页结果
class RDPageResult<T> {
  final List<T> list;
  final int totalPage;

  const RDPageResult({required this.list, required this.totalPage});
}

/// Tab 配置
class RDCustomerTab {
  final String name;

  const RDCustomerTab({required this.name});
}

/// 数据获取回调
typedef RDCustomerFetcher = Future<RDPageResult<RDCustomerItem>> Function({
  required int tabIndex,
  required String keyword,
  required int pageNo,
  required int pageSize,
});

/// 选择回调
typedef RDCustomerSelectCallback = Future<void> Function(RDCustomerItem item);
