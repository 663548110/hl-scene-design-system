/// 员工选择器工具函数
library;

import 'package:flutter/material.dart';

import 'rd_employee_picker_types.dart';

/// 将文本按关键词拆分为高亮 TextSpan 列表
///
/// - 不区分大小写匹配 [keyword]
/// - 匹配片段使用 [highlightColor] 颜色
/// - 非匹配片段使用 [baseStyle]（可为 null）
/// - [keyword] 为空时返回 `[TextSpan(text: text, style: baseStyle)]`
List<TextSpan> highlightSpans(
  String text, {
  required String keyword,
  required Color highlightColor,
  TextStyle? baseStyle,
}) {
  if (keyword.isEmpty) {
    return [TextSpan(text: text, style: baseStyle)];
  }

  final List<TextSpan> spans = [];
  final String lowerText = text.toLowerCase();
  final String lowerKeyword = keyword.toLowerCase();
  int start = 0;

  while (true) {
    final int index = lowerText.indexOf(lowerKeyword, start);
    if (index == -1) {
      // 剩余非匹配部分
      if (start < text.length) {
        spans.add(TextSpan(text: text.substring(start), style: baseStyle));
      }
      break;
    }
    // 匹配前的非高亮部分
    if (index > start) {
      spans.add(TextSpan(text: text.substring(start, index), style: baseStyle));
    }
    // 高亮匹配部分
    spans.add(TextSpan(
      text: text.substring(index, index + keyword.length),
      style: TextStyle(color: highlightColor),
    ));
    start = index + keyword.length;
  }

  return spans;
}

/// 按关键词过滤员工列表（本地过滤）
///
/// - [keyword] 为空时返回全部
/// - 按 [RDEmployeeItem.name] 或 [RDEmployeeItem.phone] 包含 [keyword] 过滤（不区分大小写）
List<RDEmployeeItem> filterByKeyword(
  List<RDEmployeeItem> list,
  String keyword,
) {
  if (keyword.isEmpty) return list;
  final String lower = keyword.toLowerCase();
  return list.where((item) {
    final bool nameMatch = item.name.toLowerCase().contains(lower);
    final bool phoneMatch =
        item.phone != null && item.phone!.toLowerCase().contains(lower);
    return nameMatch || phoneMatch;
  }).toList();
}

/// 排除指定 ID 的员工（filterIds 过滤）
///
/// - [filterIds] 为空时返回全部
/// - 排除 id 在 [filterIds] 中的员工
List<RDEmployeeItem> filterByIds(
  List<RDEmployeeItem> list,
  List<String> filterIds,
) {
  if (filterIds.isEmpty) return list;
  final Set<String> idSet = filterIds.toSet();
  return list.where((item) => !idSet.contains(item.id)).toList();
}

/// 检测预约时间段与排班时间段是否存在冲突
///
/// 输入均为 ISO 8601 字符串，使用 [DateTime.parse] 解析。
///
/// 以下任一条件成立时返回 true：
/// 1. resvStart < slotEnd && resvEnd > slotStart（时间段重叠）
/// 2. resvStart == slotStart
/// 3. resvEnd == slotEnd
/// 4. resvEnd == slotStart
///
/// 完全不重叠时返回 false。
bool checkTimeConflict(
  String resvStart,
  String resvEnd,
  String slotStart,
  String slotEnd,
) {
  final DateTime rs = DateTime.parse(resvStart);
  final DateTime re = DateTime.parse(resvEnd);
  final DateTime ss = DateTime.parse(slotStart);
  final DateTime se = DateTime.parse(slotEnd);

  // 条件 2：预约开始 == 排班开始
  if (rs == ss) return true;
  // 条件 3：预约结束 == 排班结束
  if (re == se) return true;
  // 条件 4：预约结束 == 排班开始
  if (re == ss) return true;
  // 条件 1：时间段重叠
  if (rs.isBefore(se) && re.isAfter(ss)) return true;

  return false;
}

/// 从备选员工列表中自动选中未被禁用的员工
///
/// 返回 id 在 [spareIds] 中且 [RDEmployeeItem.disabled] 为 false 的员工列表。
List<RDEmployeeItem> autoSelectSpare(
  List<RDEmployeeItem> allEmployees,
  List<String> spareIds,
) {
  if (spareIds.isEmpty) return [];
  final Set<String> idSet = spareIds.toSet();
  return allEmployees
      .where((item) => idSet.contains(item.id) && !item.disabled)
      .toList();
}
