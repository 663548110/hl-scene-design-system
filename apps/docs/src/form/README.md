---
title: Form 表单
description: 用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。
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

[td_form_page.dart](https://codeup.aliyun.com/656d6f743e469c2f3534a9ac/team3/flutter/rdesign-flutter-develop/blob/master/rdesign-component/example/lib/page/td_form_page.dart)

### 1 基础类型

基础表单
      
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">暂无演示代码</pre>

</td-code-block>
                



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildForm(BuildContext context) {
    final theme = RDTheme.of(context);
    return RDForm(
        formController: _formController,
        disabled: _formDisableState,
        data: _formData,
        isHorizontal: _isFormHorizontal,
        rules: _validationRules,
        formContentAlign: TextAlign.left,
        requiredMark: true,

        /// 确定整个表单是否展示提示信息
        formShowErrorMessage: true,
        onSubmit: onSubmit,
        items: [
          RDFormItem(
            label: '用户名',
            name: 'name',
            type: RDFormItemType.input,
            help: '请输入用户名',
            labelWidth: 82.0,
            formItemNotifier: _formItemNotifier['name'],

            /// 控制单个 item 是否展示错误提醒
            showErrorMessage: true,
            requiredMark: true,
            child: RDInput(
                leftContentSpace: 0,
                inputDecoration: InputDecoration(
                  hintText: '请输入用户名',
                  border: InputBorder.none,
                  hintStyle: TextStyle(
                    color: RDTheme.of(context).textColorPlaceholder,
                  ),
                ),
                controller: _controller[0],
                additionInfoColor: RDTheme.of(context).errorColor6,
                showBottomDivider: false,
                readOnly: _formDisableState,
                onChanged: (val) {
                  _formItemNotifier['name']?.upDataForm(val);
                },
                onClearTap: () {
                  _controller[0].clear();
                  _formItemNotifier['name']?.upDataForm('');
                }),
          ),
          RDFormItem(
            label: '密码',
            name: 'password',
            type: RDFormItemType.input,
            labelWidth: 82.0,
            formItemNotifier: _formItemNotifier['password'],
            showErrorMessage: true,
            child: RDInput(
                leftContentSpace: 0,
                inputDecoration: InputDecoration(
                  hintText: '请输入密码',
                  border: InputBorder.none,
                  hintStyle: TextStyle(
                    color: RDTheme.of(context).textColorPlaceholder,
                  ),
                ),
                type: RDInputType.normal,
                controller: _controller[1],
                obscureText: !browseOn,
                needClear: false,
                readOnly: _formDisableState,
                showBottomDivider: false,
                onChanged: (val) {
                  _formItemNotifier['password']?.upDataForm(val);
                },
                onClearTap: () {
                  _controller[1].clear();
                  _formItemNotifier['password']?.upDataForm('');
                }),
          ),
          RDFormItem(
            label: '性别',
            name: 'gender',
            type: RDFormItemType.radios,
            labelWidth: 82.0,
            showErrorMessage: true,
            formItemNotifier: _formItemNotifier['gender'],
            child: RDRadioGroup(
              spacing: 0,
              direction: Axis.horizontal,
              controller: _genderCheckboxGroupController,
              directionalTdRadios: _radios.entries.map((entry) {
                return RDRadio(
                  id: entry.key,
                  title: entry.value,
                  radioStyle: RDRadioStyle.circle,
                  showDivider: false,
                  spacing: 4,
                  checkBoxLeftSpace: 0,
                  customSpace: EdgeInsets.all(0),
                  enable: !_formDisableState,
                );
              }).toList(),
              onRadioGroupChange: (ids) {
                if (ids == null) {
                  return;
                }
                _formItemNotifier['gender']?.upDataForm(ids);
              },
            ),
          ),
          RDFormItem(
            label: '生日',
            name: 'birth',
            labelWidth: 82.0,
            type: RDFormItemType.dateTimePicker,
            contentAlign: TextAlign.left,
            tipAlign: TextAlign.left,
            formItemNotifier: _formItemNotifier['birth'],
            hintText: '请输入内容',
            select: _selected_1,
            selectFn: (BuildContext context) {
              if (_formDisableState) {
                return;
              }
              RDPicker.showDatePicker(context, title: '选择时间',
                  onConfirm: (selected) {
                setState(() {
                  _selected_1 =
                      '${selected['year'].toString().padLeft(4, '0')}-${selected['month'].toString().padLeft(2, '0')}-${selected['day'].toString().padLeft(2, '0')}';
                  _formItemNotifier['birth']?.upDataForm(_selected_1);
                });
                Navigator.of(context).pop();
              },
                  dateStart: [1999, 01, 01],
                  dateEnd: [2050, 12, 31],
                  initialDate: [2012, 1, 1]);
            },
          ),
          RDFormItem(
            label: '籍贯',
            name: 'place',
            type: RDFormItemType.cascader,
            contentAlign: TextAlign.left,
            tipAlign: TextAlign.left,
            labelWidth: 82.0,
            hintText: '请输入内容',
            select: _selected_2,
            formItemNotifier: _formItemNotifier['place'],
            selectFn: (BuildContext context) {
              if (_formDisableState) {
                return;
              }
              RDCascader.showMultiCascader(context,
                  title: '选择地址',
                  data: _data,
                  initialData: _initLocalData,
                  theme: 'step',
                  onChange: (List<MultiCascaderListModel> selectData) {
                setState(() {
                  var result = [];
                  var len = selectData.length;
                  _initLocalData = selectData[len - 1].value!;
                  selectData.forEach((element) {
                    result.add(element.label);
                  });
                  _selected_2 = result.join('/');
                  _formItemNotifier['place']?.upDataForm(_selected_2);
                });
              }, onClose: () {
                Navigator.of(context).pop();
              });
            },
          ),
          RDFormItem(
              label: '年限',
              name: 'age',
              labelWidth: 82.0,
              type: RDFormItemType.stepper,
              formItemNotifier: _formItemNotifier['age'],
              child: Padding(
                padding: const EdgeInsets.only(right: 18),
                child: RDStepper(
                  theme: RDStepperTheme.filled,
                  disabled: _formDisableState,
                  eventController: _stepController!,
                  value: int.parse(_formData['age']),
                  onChange: (value) {
                    _formItemNotifier['age']?.upDataForm('${value}');
                  },
                ),
              )),
          RDFormItem(
            label: '自我评价',
            name: 'description',
            tipAlign: TextAlign.left,
            type: RDFormItemType.rate,
            labelWidth: 82.0,
            formItemNotifier: _formItemNotifier['description'],
            child: Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: const EdgeInsets.only(right: 18),
                  child: RDRate(
                    count: 5,
                    value: double.parse(_formData['description']),
                    allowHalf: false,
                    disabled: _formDisableState,
                    onChange: (value) {
                      setState(() {
                        _formData['description'] = '${value}';
                      });
                      _formItemNotifier['description']?.upDataForm('${value}');
                    },
                  )),
            ),
          ),
          RDFormItem(
              label: '个人简介',
              labelWidth: 82.0,
              name: 'resume',
              type: RDFormItemType.textarea,
              formItemNotifier: _formItemNotifier['resume'],
              child: Padding(
                padding:
                    EdgeInsets.only(top: _isFormHorizontal ? 0 : 8, bottom: 4),
                child: RDTextarea(
                  backgroundColor: Colors.red,
                  hintText: '请输入个人简介',
                  maxLength: 500,
                  indicator: true,
                  readOnly: _formDisableState,
                  layout: RDTextareaLayout.vertical,
                  controller: _controller[2],
                  showBottomDivider: false,
                  onChanged: (value) {
                    _formItemNotifier['resume']?.upDataForm(value);
                  },
                ),
              )),
          RDFormItem(
              label: '上传图片',
              name: 'photo',
              labelWidth: 82.0,
              type: RDFormItemType.upLoadImg,
              formItemNotifier: _formItemNotifier['photo'],
              child: Padding(
                padding: EdgeInsets.only(top: 4, bottom: 4),
                child: RDUpload(
                  files: files,
                  multiple: true,
                  max: 6,
                  onError: print,
                  onValidate: print,
                  disabled: _formDisableState,
                  onChange: ((imgList, type) {
                    if (_formDisableState) {
                      return;
                    }
                    files = _onValueChanged(files ?? [], imgList, type);
                    List imgs =
                        files.map((e) => e.remotePath ?? e.assetPath).toList();
                    setState(() {
                      _formItemNotifier['photo'].upDataForm(imgs.join(','));
                    });
                  }),
                ),
              ))
        ],
        btnGroup: [
          Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                      child: RDButton(
                    text: '重置',
                    size: RDButtonSize.large,
                    type: RDButtonType.fill,
                    theme: RDButtonTheme.light,
                    shape: RDButtonShape.rectangle,
                    disabled: _formDisableState,
                    onTap: () {
                      //用户名称
                      _controller[0].clear();
                      //密码
                      _controller[1].clear();
                      // 性别
                      _genderCheckboxGroupController.toggle('', false);
                      //个人简介
                      _controller[2].clear();
                      //生日
                      _selected_1 = '';
                      //籍贯
                      _selected_2 = '';
                      //年限
                      _stepController.add(RDStepperEventType.cleanValue);
                      //上传图片
                      files.clear();
                      _formData = {
                        'name': '',
                        'password': '',
                        'gender': '',
                        'birth': '',
                        'place': '',
                        'age': '0',
                        'description': '2',
                        'resume': '',
                        'photo': ''
                      };
                      _formData.forEach((key, value) {
                        _formItemNotifier[key].upDataForm(value);
                      });
                      _formController.reset(_formData);
                      setState(() {});
                    },
                  )),
                  const SizedBox(
                    width: 20,
                  ),
                  Expanded(
                      child: RDButton(
                          text: '提交',
                          size: RDButtonSize.large,
                          type: RDButtonType.fill,
                          theme: RDButtonTheme.primary,
                          shape: RDButtonShape.rectangle,
                          onTap: _onSubmit,
                          disabled: _formDisableState)),
                ],
              ))
        ]);
  }</pre>

</td-code-block>
                



          
<td-code-block panel="Dart">

  <pre slot="Dart" lang="javascript">
  Widget _buildForm(BuildContext context) {
    final theme = RDTheme.of(context);
    return RDForm(
        formController: _formController,
        disabled: _formDisableState,
        data: _formData,
        isHorizontal: _isFormHorizontal,
        rules: _validationRules,
        formContentAlign: TextAlign.left,
        requiredMark: true,

        /// 确定整个表单是否展示提示信息
        formShowErrorMessage: true,
        onSubmit: onSubmit,
        items: [
          RDFormItem(
            label: '用户名',
            name: 'name',
            type: RDFormItemType.input,
            help: '请输入用户名',
            labelWidth: 82.0,
            formItemNotifier: _formItemNotifier['name'],

            /// 控制单个 item 是否展示错误提醒
            showErrorMessage: true,
            requiredMark: true,
            child: RDInput(
                leftContentSpace: 0,
                inputDecoration: InputDecoration(
                  hintText: '请输入用户名',
                  border: InputBorder.none,
                  hintStyle: TextStyle(
                    color: RDTheme.of(context).textColorPlaceholder,
                  ),
                ),
                controller: _controller[0],
                additionInfoColor: RDTheme.of(context).errorColor6,
                showBottomDivider: false,
                readOnly: _formDisableState,
                onChanged: (val) {
                  _formItemNotifier['name']?.upDataForm(val);
                },
                onClearTap: () {
                  _controller[0].clear();
                  _formItemNotifier['name']?.upDataForm('');
                }),
          ),
          RDFormItem(
            label: '密码',
            name: 'password',
            type: RDFormItemType.input,
            labelWidth: 82.0,
            formItemNotifier: _formItemNotifier['password'],
            showErrorMessage: true,
            child: RDInput(
                leftContentSpace: 0,
                inputDecoration: InputDecoration(
                  hintText: '请输入密码',
                  border: InputBorder.none,
                  hintStyle: TextStyle(
                    color: RDTheme.of(context).textColorPlaceholder,
                  ),
                ),
                type: RDInputType.normal,
                controller: _controller[1],
                obscureText: !browseOn,
                needClear: false,
                readOnly: _formDisableState,
                showBottomDivider: false,
                onChanged: (val) {
                  _formItemNotifier['password']?.upDataForm(val);
                },
                onClearTap: () {
                  _controller[1].clear();
                  _formItemNotifier['password']?.upDataForm('');
                }),
          ),
          RDFormItem(
            label: '性别',
            name: 'gender',
            type: RDFormItemType.radios,
            labelWidth: 82.0,
            showErrorMessage: true,
            formItemNotifier: _formItemNotifier['gender'],
            child: RDRadioGroup(
              spacing: 0,
              direction: Axis.horizontal,
              controller: _genderCheckboxGroupController,
              directionalTdRadios: _radios.entries.map((entry) {
                return RDRadio(
                  id: entry.key,
                  title: entry.value,
                  radioStyle: RDRadioStyle.circle,
                  showDivider: false,
                  spacing: 4,
                  checkBoxLeftSpace: 0,
                  customSpace: EdgeInsets.all(0),
                  enable: !_formDisableState,
                );
              }).toList(),
              onRadioGroupChange: (ids) {
                if (ids == null) {
                  return;
                }
                _formItemNotifier['gender']?.upDataForm(ids);
              },
            ),
          ),
          RDFormItem(
            label: '生日',
            name: 'birth',
            labelWidth: 82.0,
            type: RDFormItemType.dateTimePicker,
            contentAlign: TextAlign.left,
            tipAlign: TextAlign.left,
            formItemNotifier: _formItemNotifier['birth'],
            hintText: '请输入内容',
            select: _selected_1,
            selectFn: (BuildContext context) {
              if (_formDisableState) {
                return;
              }
              RDPicker.showDatePicker(context, title: '选择时间',
                  onConfirm: (selected) {
                setState(() {
                  _selected_1 =
                      '${selected['year'].toString().padLeft(4, '0')}-${selected['month'].toString().padLeft(2, '0')}-${selected['day'].toString().padLeft(2, '0')}';
                  _formItemNotifier['birth']?.upDataForm(_selected_1);
                });
                Navigator.of(context).pop();
              },
                  dateStart: [1999, 01, 01],
                  dateEnd: [2050, 12, 31],
                  initialDate: [2012, 1, 1]);
            },
          ),
          RDFormItem(
            label: '籍贯',
            name: 'place',
            type: RDFormItemType.cascader,
            contentAlign: TextAlign.left,
            tipAlign: TextAlign.left,
            labelWidth: 82.0,
            hintText: '请输入内容',
            select: _selected_2,
            formItemNotifier: _formItemNotifier['place'],
            selectFn: (BuildContext context) {
              if (_formDisableState) {
                return;
              }
              RDCascader.showMultiCascader(context,
                  title: '选择地址',
                  data: _data,
                  initialData: _initLocalData,
                  theme: 'step',
                  onChange: (List<MultiCascaderListModel> selectData) {
                setState(() {
                  var result = [];
                  var len = selectData.length;
                  _initLocalData = selectData[len - 1].value!;
                  selectData.forEach((element) {
                    result.add(element.label);
                  });
                  _selected_2 = result.join('/');
                  _formItemNotifier['place']?.upDataForm(_selected_2);
                });
              }, onClose: () {
                Navigator.of(context).pop();
              });
            },
          ),
          RDFormItem(
              label: '年限',
              name: 'age',
              labelWidth: 82.0,
              type: RDFormItemType.stepper,
              formItemNotifier: _formItemNotifier['age'],
              child: Padding(
                padding: const EdgeInsets.only(right: 18),
                child: RDStepper(
                  theme: RDStepperTheme.filled,
                  disabled: _formDisableState,
                  eventController: _stepController!,
                  value: int.parse(_formData['age']),
                  onChange: (value) {
                    _formItemNotifier['age']?.upDataForm('${value}');
                  },
                ),
              )),
          RDFormItem(
            label: '自我评价',
            name: 'description',
            tipAlign: TextAlign.left,
            type: RDFormItemType.rate,
            labelWidth: 82.0,
            formItemNotifier: _formItemNotifier['description'],
            child: Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: const EdgeInsets.only(right: 18),
                  child: RDRate(
                    count: 5,
                    value: double.parse(_formData['description']),
                    allowHalf: false,
                    disabled: _formDisableState,
                    onChange: (value) {
                      setState(() {
                        _formData['description'] = '${value}';
                      });
                      _formItemNotifier['description']?.upDataForm('${value}');
                    },
                  )),
            ),
          ),
          RDFormItem(
              label: '个人简介',
              labelWidth: 82.0,
              name: 'resume',
              type: RDFormItemType.textarea,
              formItemNotifier: _formItemNotifier['resume'],
              child: Padding(
                padding:
                    EdgeInsets.only(top: _isFormHorizontal ? 0 : 8, bottom: 4),
                child: RDTextarea(
                  backgroundColor: Colors.red,
                  hintText: '请输入个人简介',
                  maxLength: 500,
                  indicator: true,
                  readOnly: _formDisableState,
                  layout: RDTextareaLayout.vertical,
                  controller: _controller[2],
                  showBottomDivider: false,
                  onChanged: (value) {
                    _formItemNotifier['resume']?.upDataForm(value);
                  },
                ),
              )),
          RDFormItem(
              label: '上传图片',
              name: 'photo',
              labelWidth: 82.0,
              type: RDFormItemType.upLoadImg,
              formItemNotifier: _formItemNotifier['photo'],
              child: Padding(
                padding: EdgeInsets.only(top: 4, bottom: 4),
                child: RDUpload(
                  files: files,
                  multiple: true,
                  max: 6,
                  onError: print,
                  onValidate: print,
                  disabled: _formDisableState,
                  onChange: ((imgList, type) {
                    if (_formDisableState) {
                      return;
                    }
                    files = _onValueChanged(files ?? [], imgList, type);
                    List imgs =
                        files.map((e) => e.remotePath ?? e.assetPath).toList();
                    setState(() {
                      _formItemNotifier['photo'].upDataForm(imgs.join(','));
                    });
                  }),
                ),
              ))
        ],
        btnGroup: [
          Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                      child: RDButton(
                    text: '重置',
                    size: RDButtonSize.large,
                    type: RDButtonType.fill,
                    theme: RDButtonTheme.light,
                    shape: RDButtonShape.rectangle,
                    disabled: _formDisableState,
                    onTap: () {
                      //用户名称
                      _controller[0].clear();
                      //密码
                      _controller[1].clear();
                      // 性别
                      _genderCheckboxGroupController.toggle('', false);
                      //个人简介
                      _controller[2].clear();
                      //生日
                      _selected_1 = '';
                      //籍贯
                      _selected_2 = '';
                      //年限
                      _stepController.add(RDStepperEventType.cleanValue);
                      //上传图片
                      files.clear();
                      _formData = {
                        'name': '',
                        'password': '',
                        'gender': '',
                        'birth': '',
                        'place': '',
                        'age': '0',
                        'description': '2',
                        'resume': '',
                        'photo': ''
                      };
                      _formData.forEach((key, value) {
                        _formItemNotifier[key].upDataForm(value);
                      });
                      _formController.reset(_formData);
                      setState(() {});
                    },
                  )),
                  const SizedBox(
                    width: 20,
                  ),
                  Expanded(
                      child: RDButton(
                          text: '提交',
                          size: RDButtonSize.large,
                          type: RDButtonType.fill,
                          theme: RDButtonTheme.primary,
                          shape: RDButtonShape.rectangle,
                          onTap: _onSubmit,
                          disabled: _formDisableState)),
                ],
              ))
        ]);
  }</pre>

</td-code-block>
                


## API
### RDFormItem
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| additionInfo | String? | - | RDInput的辅助信息 |
| backgroundColor | Color? | - | 背景色 |
| child | Widget? | - | 表单子组件 |
| contentAlign | TextAlign? | - | 表单显示内容对齐方式： |
| formItemNotifier |  | - |  |
| formRules | List<RDFormValidation>? | - | 整个表单的校验规则 |
| help | String? | - | RDInput 默认显示文字 |
| hintText | null | '' | 提示内容 |
| indicator | bool? | - | RDTextarea 的属性，指示器 |
| itemRule | List? | - | 表单项验证规则 |
| key |  | - |  |
| label | String? | - | 表单项标签左侧展示的内容 |
| labelAlign | TextAlign? | - | TODO: item 标签对齐方式 |
| labelWidget | Widget? | - | 自定义标签 |
| labelWidth | double? | - | 标签宽度，如果提供则覆盖Form的labelWidth |
| name | String? | - | 表单字段名称 |
| radios |  | - |  |
| requiredMark | bool? | true | 是否显示必填标记（*） |
| select | String | '' | 选择器 适用于日期选择器等 |
| selectFn | Function? | - | 选择器方法 适用于日期选择器等 |
| showErrorMessage | bool | true | 是否显示错误信息 |
| tipAlign | TextAlign? | - | 组件提示内容对齐方式 |
| type | RDFormItemType | - | 表格单元需要使用的组件类型 |

```
```
 ### RDForm
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| btnGroup | List<Widget>? | - | 表单按钮组 |
| colon | bool? | false | 是否在表单标签字段右侧显示冒号 |
| data | Map<String, dynamic> | - | 表单数据 |
| disabled | bool | false | 是否禁用整个表单 |
| errorMessage | Object? | - | 表单信息错误信息配置 |
| formContentAlign | TextAlign | TextAlign.left | 表单内容对齐方式: 左对齐、右对齐、居中对齐 |
| formController | FormController? | - | 表单控制器 |
| formLabelAlign | TextAlign? | TextAlign.left | 表单字段标签的对齐方式： |
| formShowErrorMessage | bool? | true | 校验不通过时，是否显示错误提示信息，统一控制全部表单项 |
| isHorizontal | bool | true | 表单排列方式是否为 水平方向 |
| items | List<RDFormItem> | - | 表单内容 items |
| key |  | - |  |
| labelWidth | double? | 20.0 | 可以整体设置 label 标签宽度 |
| onReset | Function? | - | 表单重置时触发 |
| onSubmit | Function | - | 表单提交时触发 |
| preventSubmitDefault | bool? | true | 是否阻止表单提交默认事件（表单提交默认事件会刷新页面） |
| requiredMark | bool? | true | 是否显示必填符号（*），默认显示 |
| rules | Map<String, RDFormValidation> | - | 整个表单字段校验规则 |
| scrollToFirstError | String? | - | 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。 |
| submitWithWarningMessage | bool? | false | 【讨论中】当校验结果只有告警信息时，是否触发 submit 提交事件 |

```
```
 ### RDFormValidation
#### 默认构造方法

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| errorMessage | String | - | 错误提示信息 |
| type | RDFormItemType | - | 校验对象的类型 |
| validate | String? Function(dynamic) | - | 校验方法 |


  