# RDesign Flutter

基于 [TDesign Flutter](https://tdesign.tencent.com/flutter) 的企业内部二次封装组件库。

## 特性

- 所有组件 API 与 TDesign Flutter 完全一致
- 组件前缀由 `TD` 改为 `RD`，包名由 `tdesign_flutter` 改为 `rdesign_flutter`
- 后续可直接修改 RD 层代码定制样式，不影响上游 TD 代码

## 安装

在 `pubspec.yaml` 中添加：

```yaml
dependencies:
  rdesign_flutter:
    path: ../rdesign-component  # 或发布后使用版本号
```

## 使用

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';

// 使用方式与 TDesign 完全一致，只需将 TD 前缀改为 RD
RDButton(text: '按钮', onTap: () {})
RDText('文本')
RDTheme.of(context).brandNormalColor
```

## 自定义组件样式

当需要修改某个组件样式时，将对应 `rd_*.dart` 文件中的 `export` 替换为自己的实现：

```dart
// rdesign-component/lib/src/components/button/rd_button.dart
// 修改前：
// export 'package:tdesign_flutter/src/components/button/td_button.dart';

// 修改后：自己实现
import 'package:flutter/material.dart';
import 'package:tdesign_flutter/tdesign_flutter.dart';

class RDButton extends StatelessWidget {
  // 自定义实现...
}
```
