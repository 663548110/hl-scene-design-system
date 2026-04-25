---
title: Popover 弹出气泡
description: 用于文字提示的气泡框。
spline: base
isComponent: true
---

<span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20lines-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20functions-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20statements-100%25-blue" /></span><span class="coverages-badge" style="margin-right: 10px"><img src="https://img.shields.io/badge/coverages%3A%20branches-83%25-blue" /></span>
## 引入

在rdesign_flutter/rdesign_flutter.dart中有所有组件的路径。

```dart
import 'package:rdesign_flutter/rdesign_flutter.dart';
```

## 代码演示

[td_popover_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_popover_page.dart)

### 1 组件类型

带箭头的弹出气泡
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '带箭头',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                  context: _, content: '弹出气泡内容', theme: theme);
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                                  

不带箭头的弹出气泡
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildNoArrowPopover(BuildContext context) {
    return LayoutBuilder(
      builder: (_, constrains) {
        return RDButton(
          size: RDButtonSize.medium,
          text: '不带箭头',
          type: RDButtonType.outline,
          theme: RDButtonTheme.primary,
          onTap: () {
            RDPopover.showPopover(
                context: _, content: '弹出气泡内容', showArrow: false, theme: theme);
          },
        );
      },
    );
  }</pre>

</td-code-block>
                                  

自定义内容弹出气泡
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildNCustomPopover(BuildContext context) {
    var textStyle = TextStyle(
        color: theme == RDPopoverTheme.light
            ? RDTheme.of(context).fontGyColor1
            : RDTheme.of(context).fontWhColor1);
    return LayoutBuilder(
      builder: (_, constrains) {
        return RDButton(
          text: '自定义内容',
          type: RDButtonType.outline,
          theme: RDButtonTheme.primary,
          onTap: () {
            RDPopover.showPopover(
              context: _,
              padding: const EdgeInsets.all(0),
              theme: theme,
              width: 108,
              height: 152,
              contentWidget: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                    child: RDText('选项1', style: textStyle),
                  ),
                  const RDDivider(height: 0.5),
                  Container(
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                    child: RDText('选项2', style: textStyle),
                  ),
                  const RDDivider(height: 0.5),
                  Container(
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                    child: RDText('选项3', style: textStyle),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }</pre>

</td-code-block>
                                  
### 1 组件样式



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDarkPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '深色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '浅色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.light,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildInfoPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '品牌色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.info,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSuccessPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '成功色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.success,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildWarningPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '警告色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.warning,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildErrorPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '错误色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.error,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildDarkPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '深色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '浅色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.light,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildInfoPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '品牌色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.info,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildSuccessPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '成功色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.success,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildWarningPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '警告色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.warning,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildErrorPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '错误色',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                theme: RDPopoverTheme.error,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

顶部弹出气泡

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTopLeftPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '顶部左',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.topLeft,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTopPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '顶部中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.top,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTopRightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '顶部右',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.topRight,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTopLeftPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '顶部左',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.topLeft,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTopPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '顶部中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.top,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildTopRightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '顶部右',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.topRight,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

底部弹出气泡

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBottomLeftPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '底部左',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.bottomLeft,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBottomPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '底部中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.bottom,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBottomRightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '底部右',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.bottomRight,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBottomLeftPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '底部左',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.bottomLeft,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBottomPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '底部中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.bottom,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildBottomRightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '底部右',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.bottomRight,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

右侧弹出气泡

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightTopPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '右侧上',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.rightTop,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '右侧中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.right,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightBottomPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '右侧下',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.rightBottom,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightTopPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '右侧上',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.rightTop,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '右侧中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.right,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildRightBottomPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '右侧下',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.rightBottom,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

左侧弹出气泡

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLeftTopPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '左侧上',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.leftTop,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLeftPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '左侧中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.left,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLeftBottomPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '左侧下',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.leftBottom,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLeftTopPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '左侧上',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.leftTop,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLeftPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '左侧中',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.left,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                

          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildLeftBottomPopover(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 0),
      margin: const EdgeInsets.all(8),
      child: LayoutBuilder(
        builder: (_, constraints) {
          return RDButton(
            size: RDButtonSize.medium,
            text: '左侧下',
            type: RDButtonType.outline,
            theme: RDButtonTheme.primary,
            onTap: () {
              RDPopover.showPopover(
                context: _,
                content: '弹出气泡内容',
                placement: RDPopoverPlacement.leftBottom,
                theme: theme,
              );
            },
          );
        },
      ),
    );
  }</pre>

</td-code-block>
                


## API
### RDPopover
#### 简介


#### 静态方法

| 名称 | 返回类型 | 参数 | 说明 |
| --- | --- | --- | --- |
| showPopover |  |   required BuildContext context,  String? content,  Widget? contentWidget,  double offset,  RDPopoverTheme? theme,  bool closeOnClickOutside,  RDPopoverPlacement? placement,  bool? showArrow,  double arrowSize,  EdgeInsetsGeometry? padding,  double? width,  double? height,  Color? overlayColor,  OnTap? onTap,  OnLongTap? onLongTap,  BorderRadius? radius, |  |

```
```
 ### RDPopoverWidget
#### 简介

#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| arrowSize | double | 8 | 箭头大小 |
| content | String? | - | 显示内容 |
| contentWidget | Widget? | - | 自定义内容 |
| context | BuildContext | - | 上下文 |
| height | double? | - | 内容高度（包含padding，实际高度：height - paddingTop - paddingBottom） |
| key |  | - |  |
| offset | double | 4 | 偏移 |
| onLongTap | OnLongTap? | - | 长按事件 |
| onTap | OnTap? | - | 点击事件 |
| padding | EdgeInsetsGeometry? | - | 内容内边距 |
| placement | RDPopoverPlacement? | - | 浮层出现位置 |
| radius | BorderRadius? | - | 圆角 |
| showArrow | bool? | true | 是否显示浮层箭头 |
| theme | RDPopoverTheme? | - | 弹出气泡主题 |
| width | double? | - | 内容宽度（包含padding，实际高度：height - paddingLeft - paddingRight） |


  