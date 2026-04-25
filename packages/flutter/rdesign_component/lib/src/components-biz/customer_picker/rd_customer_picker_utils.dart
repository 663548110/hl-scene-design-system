/// 客户选择器工具函数
library;

/// 手机号脱敏：保留前 3 位和后 4 位，中间替换为 ****
///
/// 当输入长度 ≥ 7 时，返回 `前3位****后4位`；否则原样返回。
String maskPhone(String phone) {
  if (phone.length < 7) return phone;
  return '${phone.substring(0, 3)}****${phone.substring(phone.length - 4)}';
}
