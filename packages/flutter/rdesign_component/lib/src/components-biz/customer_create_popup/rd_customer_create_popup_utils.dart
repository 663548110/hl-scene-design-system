/// 客户创建弹窗工具函数
library;

/// 检查字符串中每个字符是否为中文（\u4e00-\u9fa5）、英文字母（a-zA-Z）或数字（0-9）。
/// 空字符串返回 true。
bool isValidChar(String s) {
  if (s.isEmpty) return true;
  for (final c in s.runes) {
    if (c >= 0x4e00 && c <= 0x9fa5) continue; // 中文
    if (c >= 0x41 && c <= 0x5a) continue; // A-Z
    if (c >= 0x61 && c <= 0x7a) continue; // a-z
    if (c >= 0x30 && c <= 0x39) continue; // 0-9
    return false;
  }
  return true;
}

/// 检查姓名：非空、长度 2-15（含边界）、仅含合法字符。
bool validateName(String s) {
  if (s.isEmpty) return false;
  if (s.length < 2 || s.length > 15) return false;
  return isValidChar(s);
}

/// 检查手机号是否匹配正则 `^1[3-9]\d{9}$`。
bool validatePhone(String s) {
  return RegExp(r'^1[3-9]\d{9}$').hasMatch(s);
}
