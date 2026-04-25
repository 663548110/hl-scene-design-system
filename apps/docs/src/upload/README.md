---
title: Upload 上传
description: 用于相册读取或拉起拍照的图片上传功能。
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

[td_upload_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_upload_page.dart)

### 1 组件类型

单选上传
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _uploadSingle(BuildContext context) {
    return wrapDemoContainer('单选上传',
        child: RDUpload(
          files: files1,
          onClick: onClick,
          onCancel: onCancel,
          onError: print,
          onValidate: print,
          onChange: ((files, type) => onValueChanged(files1, files, type)),
        ));
  }</pre>

</td-code-block>
                                  

单选上传(替换)
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _uploadSingleWithReplace(BuildContext context) {
    return wrapDemoContainer('单选上传(替换)',
        child: RDUpload(
          files: files6,
          width: 60,
          height: 60,
          type: RDUploadBoxType.circle,
          enabledReplaceType: true,
          onClick: onClick,
          onCancel: onCancel,
          onError: print,
          onValidate: print,
          onChange: ((files, type) => onValueChanged(files6, files, type)),
        ));
  }</pre>

</td-code-block>
                                  

多选上传
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _uploadMultiple(BuildContext context) {
    return wrapDemoContainer('多选上传',
        child: RDUpload(
          files: files2,
          multiple: true,
          max: 9,
          onClick: onClick,
          onCancel: onCancel,
          onError: print,
          onValidate: print,
          onChange: ((files, type) => onValueChanged(files2, files, type)),
        ));
  }</pre>

</td-code-block>
                                  

自定义upload按钮事件
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _uploadTap(BuildContext context) {
    return wrapDemoContainer('自定义upload按钮事件',
        child: RDUpload(
          files: files7,
          multiple: true,
          max: 9,
          onUploadTap: onUploadTap,
          onClick: onClick,
          onCancel: onCancel,
          onError: print,
          onValidate: print,
          onChange: ((files, type) => onValueChanged(files7, files, type)),
        ));
  }</pre>

</td-code-block>
                                  
### 1 组件状态

加载状态
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _uploadLoading(BuildContext context) {
    return wrapDemoContainer('上传图片',
        child: RDUpload(
          files: files3,
          multiple: true,
          max: 9,
          onClick: onClick,
          onCancel: onCancel,
          onError: print,
          onValidate: print,
          onChange: ((files, type) => onValueChanged(files3, files, type)),
        ));
  }</pre>

</td-code-block>
                                  

重新上传
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _uploadRetry(BuildContext context) {
    return wrapDemoContainer('上传图片',
        child: RDUpload(
          files: files4,
          multiple: true,
          max: 9,
          onClick: onClick,
          onCancel: onCancel,
          onError: print,
          onValidate: print,
          onChange: ((files, type) => onValueChanged(files4, files, type)),
        ));
  }</pre>

</td-code-block>
                                  

上传失败
            
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _uploadError(BuildContext context) {
    return wrapDemoContainer('上传图片',
        child: RDUpload(
          files: files5,
          multiple: true,
          max: 9,
          onClick: onClick,
          onCancel: onCancel,
          onError: print,
          onValidate: print,
          onChange: ((files, type) => onValueChanged(files5, files, type)),
        ));
  }</pre>

</td-code-block>
                                  


## API
### RDUpload
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| disabled | bool? | false | 是否禁用 |
| enabledReplaceType | bool? | false | 是否启用replace功能 |
| files | List<RDUploadFile> | - | 控制展示的文件列表 |
| height | double? | 80.0 | 图片高度 |
| key |  | - |  |
| max | int | 0 | 用于控制文件上传数量，0为不限制，仅在multiple为true时有效 |
| mediaType | List<RDUploadMediaType> | const [RDUploadMediaType.image, RDUploadMediaType.video] | 支持上传的文件类型，图片或视频 |
| multiple | bool | false | 是否多选上传，默认false |
| onCancel | VoidCallback? | - | 监听取消上传 |
| onChange | RDUploadValueChangedEvent? | - | 监听添加, 删除和替换media事件 |
| onClick | RDUploadClickEvent? | - | 监听点击图片位 |
| onError | RDUploadErrorEvent? | - | 监听获取资源错误 |
| onMaxLimitReached | VoidCallback? | - | 监听文件超过最大数量 |
| onUploadTap | VoidCallback? | - | 自定义upload按钮事件 |
| onValidate | RDUploadValidatorEvent? | - | 监听文件校验出错 |
| sizeLimit | double? | - | 图片大小限制，单位为KB |
| type | RDUploadBoxType | RDUploadBoxType.roundedSquare | Box类型 |
| width | double? | 80.0 | 图片宽度 |
| wrapAlignment | WrapAlignment? | - | 多图对齐方式 |
| wrapRunSpacing | double? | - | 多图布局时的 runSpacing |
| wrapSpacing | double? | - | 多图布局时的 spacing |


  