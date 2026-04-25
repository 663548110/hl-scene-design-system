/// 员工选择器弹窗内容（纯 UI 组件）
library;

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

import 'rd_employee_picker_types.dart';
import 'rd_employee_picker_utils.dart';

class RDEmployeePickerSheet extends StatefulWidget {
  /// 弹窗标题，默认 '选择员工'
  final String title;

  /// 选择器模式
  final RDEmployeePickerMode pickerMode;

  /// 选择模式：单选 / 复选
  final RDSelectionMode selectionMode;

  /// 数据获取回调（必填），由宿主实现
  final RDEmployeeFetcher fetcher;

  /// 选择回调（可选），选中后关闭前执行
  final RDEmployeeSelectCallback? onSelect;

  /// 搜索框占位文案
  final String searchPlaceholder;

  /// 空状态文案
  final String? emptyText;

  /// 复选模式下最大选择人数
  final int max;

  // --- 基础模式参数 ---

  /// 需要过滤不显示的员工 ID 列表
  final List<String> filterIds;

  /// 禁用的员工 key 列表（复选模式下不可取消勾选）
  final List<String> disabledKeys;

  /// 是否显示班次信息
  final bool showWorkShiftInfo;

  // --- 门店筛选模式参数 ---

  /// 是否显示职位筛选标签栏
  final bool positionTagVisible;

  /// 自定义职位筛选标签列表，为空时使用默认标签（全部/顾问/美容师）
  final List<RDPostTag> positionTags;

  /// 是否显示员工所属门店名称
  final bool showShopName;

  /// 重置回调
  final VoidCallback? onReset;

  // --- 预约模式参数 ---

  /// 预约开始时间（ISO 8601 格式）
  final String? startTime;

  /// 预约结束时间（ISO 8601 格式）
  final String? endTime;

  /// 已预约的备选员工 ID 列表
  final List<String> spareIds;

  /// 关闭前回调，返回 false 阻止关闭
  final Future<bool> Function(List<RDEmployeeItem>?)? beforeClose;

  /// 选中未排班员工时的回调，返回是否需要创建排班
  final Future<RDScheduleAction?> Function(List<RDEmployeeItem>)? onUnscheduledSelected;

  // --- 跨组件通信回调 ---

  /// 清除已选美容师回调
  final VoidCallback? onClearBeautician;

  /// 清除已选顾问回调
  final VoidCallback? onClearAdviser;

  /// 初始已选员工 key 列表，弹出时回显选中状态
  final List<String> initialSelectedKeys;

  const RDEmployeePickerSheet({
    super.key,
    this.title = '选择员工',
    this.pickerMode = RDEmployeePickerMode.basic,
    this.selectionMode = RDSelectionMode.single,
    required this.fetcher,
    this.onSelect,
    this.searchPlaceholder = '请输入搜索内容',
    this.emptyText,
    this.max = 99,
    this.filterIds = const [],
    this.disabledKeys = const [],
    this.showWorkShiftInfo = false,
    this.positionTagVisible = true,
    this.positionTags = const [],
    this.showShopName = true,
    this.onReset,
    this.startTime,
    this.endTime,
    this.spareIds = const [],
    this.beforeClose,
    this.onUnscheduledSelected,
    this.onClearBeautician,
    this.onClearAdviser,
    this.initialSelectedKeys = const [],
  });

  @override
  State<RDEmployeePickerSheet> createState() => _RDEmployeePickerSheetState();
}

class _RDEmployeePickerSheetState extends State<RDEmployeePickerSheet> {
  final _scrollController = ScrollController();
  final _searchController = TextEditingController();

  // 基础模式 & 门店筛选模式
  final List<RDEmployeeItem> _list = [];
  // 预约模式（分组）
  List<RDEmployeeGroup> _groups = [];

  // 复选模式已选员工
  final Set<String> _selectedKeys = {};

  int _pageNo = 1;
  int _totalPage = 0;
  bool _loading = false;
  bool _selecting = false;
  String _keyword = '';
  int _debounceVersion = 0;

  // 门店筛选模式当前职位标签 ID（默认全部=1）
  int _currentPostTypeId = 1;

  static const _defaultPositionTags = [
    RDPostTag(id: 1, name: '全部'),
    RDPostTag(id: 2, name: '顾问'),
    RDPostTag(id: 3, name: '美容师'),
  ];

  List<RDPostTag> get _effectivePositionTags =>
      widget.positionTags.isNotEmpty ? widget.positionTags : _defaultPositionTags;

  /// basic 模式下经过关键词过滤和 filterIds 过滤的展示列表
  List<RDEmployeeItem> get _displayList {
    return filterByIds(filterByKeyword(_list, _keyword), widget.filterIds);
  }

  @override
  void initState() {
    super.initState();
    // 回显已选员工
    if (widget.initialSelectedKeys.isNotEmpty) {
      _selectedKeys.addAll(widget.initialSelectedKeys);
    }
    _scrollController.addListener(_onScroll);
    _searchController.addListener(_onSearchChanged);
    _fetchData();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _onScroll() {
    // 仅 shopFilter 模式触发分页
    if (widget.pickerMode != RDEmployeePickerMode.shopFilter) return;
    if (_scrollController.position.pixels >=
            _scrollController.position.maxScrollExtent - 100 &&
        !_loading &&
        _pageNo <= _totalPage) {
      _fetchData();
    }
  }

  void _onSearchChanged() {
    final keyword = _searchController.text;
    if (keyword == _keyword) return;
    _keyword = keyword;

    if (widget.pickerMode == RDEmployeePickerMode.shopFilter) {
      // 门店筛选模式：300ms 防抖后调用 fetcher
      _debounceVersion++;
      final version = _debounceVersion;
      Future.delayed(const Duration(milliseconds: 300), () {
        if (_debounceVersion == version) _resetAndFetch();
      });
    } else {
      // basic / reservation 模式：本地过滤，直接 setState 刷新
      setState(() {});
    }
  }

  void _resetAndFetch() {
    _pageNo = 1;
    _list.clear();
    _fetchData();
  }

  Future<void> _fetchData() async {
    if (_loading) return;
    setState(() => _loading = true);
    try {
      final result = await widget.fetcher(
        keyword: _keyword,
        pageNo: _pageNo,
        pageSize: 20,
        pickerMode: widget.pickerMode,
        postTypeId: _currentPostTypeId,
        startTime: widget.startTime,
        endTime: widget.endTime,
      );
      if (!mounted) return;
      setState(() {
        _processResult(result);
        _loading = false;
      });
    } catch (e, s) {
      debugPrint('RDEmployeePickerSheet fetch error: $e\n$s');
      if (mounted) setState(() => _loading = false);
    }
  }

  void _processResult(RDEmployeePageResult result) {
    if (widget.pickerMode == RDEmployeePickerMode.reservation) {
      _groups = result.groups ?? [];
      _applyTimeConflicts();
    } else {
      _list.addAll(result.list);
      _totalPage = result.totalPage;
      _pageNo++;
    }
  }

  void _applyTimeConflicts() {
    if (widget.startTime == null || widget.endTime == null) return;
    for (final group in _groups) {
      for (final emp in group.list) {
        if (emp.scheduleTimeSlots == null || emp.scheduleTimeSlots!.isEmpty) continue;
        bool hasConflict = false;
        for (final slot in emp.scheduleTimeSlots!) {
          if (!slot.thisReservationFlag &&
              checkTimeConflict(
                widget.startTime!,
                widget.endTime!,
                slot.startTime,
                slot.endTime,
              )) {
            hasConflict = true;
            break;
          }
        }
        emp.disabled = hasConflict;
      }
    }
  }

  Future<void> _select(RDEmployeeItem item) async {
    if (_selecting) return;
    _selecting = true;
    try {
      // 预约模式：检查未排班
      if (widget.pickerMode == RDEmployeePickerMode.reservation) {
        final unscheduled = [item].where((e) => e.schedulingType == null).toList();
        if (unscheduled.isNotEmpty && widget.onUnscheduledSelected != null) {
          try {
            final action = await widget.onUnscheduledSelected!(unscheduled);
            if (action == null || !action.confirm) {
              _selecting = false;
              return;
            }
            await widget.onSelect?.call([item]);
            await _close([item], isScheduling: action.createSchedule);
            return;
          } catch (e) {
            debugPrint('onUnscheduledSelected error: $e');
            _selecting = false;
            return;
          }
        }
      }
      await widget.onSelect?.call([item]);
      await _close([item]);
    } finally {
      _selecting = false;
    }
  }

  Future<void> _confirm() async {
    final selected = _allEmployees
        .where((e) => _selectedKeys.contains(e.key))
        .toList();

    // 预约模式：检查未排班员工
    if (widget.pickerMode == RDEmployeePickerMode.reservation) {
      final unscheduled = selected.where((e) => e.schedulingType == null).toList();
      if (unscheduled.isNotEmpty && widget.onUnscheduledSelected != null) {
        try {
          final action = await widget.onUnscheduledSelected!(unscheduled);
          if (action == null || !action.confirm) return;
          await widget.onSelect?.call(selected);
          await _close(selected, isScheduling: action.createSchedule);
          return;
        } catch (e) {
          debugPrint('onUnscheduledSelected error: $e');
          return;
        }
      }
    }

    // 基础模式：选择为空时触发跨组件通信回调
    if (widget.pickerMode == RDEmployeePickerMode.basic && selected.isEmpty) {
      widget.onClearBeautician?.call();
      widget.onClearAdviser?.call();
    }

    await widget.onSelect?.call(selected);
    await _close(selected);
  }

  Future<void> _close(List<RDEmployeeItem>? result, {bool? isScheduling}) async {
    if (widget.beforeClose != null) {
      try {
        final shouldClose = await widget.beforeClose!(result);
        if (!shouldClose) return;
      } catch (e) {
        debugPrint('beforeClose error: $e');
        return;
      }
    }
    if (mounted) {
      Navigator.of(context, rootNavigator: true).pop(
        result != null
            ? RDEmployeePickerResult(
                selectedItems: result,
                isScheduling: isScheduling,
              )
            : null,
      );
    }
  }

  void _reset() {
    setState(() => _selectedKeys.clear());
    widget.onReset?.call();
  }

  /// 所有员工（用于复选确认时收集）
  List<RDEmployeeItem> get _allEmployees {
    if (widget.pickerMode == RDEmployeePickerMode.reservation) {
      return _groups.expand((g) => g.list).toList();
    }
    return _list;
  }

  // ─────────────────────────────────────────────
  // build
  // ─────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final theme = TDTheme.of(context);
    return CupertinoPageScaffold(
      backgroundColor: theme.whiteColor1,
      navigationBar: CupertinoNavigationBar(
        middle: Text(widget.title),
        leading: CupertinoButton(
          padding: EdgeInsets.zero,
          onPressed: () => _close(null),
          child: const Text('取消'),
        ),
        trailing: widget.selectionMode == RDSelectionMode.multiple
            ? Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    onPressed: _reset,
                    child: Text(
                      '重置',
                      style: TextStyle(color: theme.fontGyColor3),
                    ),
                  ),
                  const SizedBox(width: 8),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    onPressed: _confirm,
                    child: Text(
                      '确认',
                      style: TextStyle(color: theme.brandNormalColor),
                    ),
                  ),
                ],
              )
            : CupertinoButton(
                padding: EdgeInsets.zero,
                onPressed: _reset,
                child: Text(
                  '重置',
                  style: TextStyle(color: theme.fontGyColor3),
                ),
              ),
        backgroundColor: theme.whiteColor1,
        border: null,
      ),
      child: Material(
        color: Colors.transparent,
        child: SafeArea(
          child: Column(
            children: [
              // 搜索框
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: CupertinoSearchTextField(
                  controller: _searchController,
                  placeholder: widget.searchPlaceholder,
                ),
              ),
              // 复选模式已选人数提示
              if (widget.selectionMode == RDSelectionMode.multiple &&
                  _selectedKeys.isNotEmpty)
                _buildSelectedCount(theme),
              // 门店筛选模式：职位标签栏
              if (widget.pickerMode == RDEmployeePickerMode.shopFilter &&
                  widget.positionTagVisible)
                _buildPositionTags(theme),
              // 预约模式：已预约员工提示栏
              if (widget.pickerMode == RDEmployeePickerMode.reservation &&
                  widget.spareIds.isNotEmpty)
                _buildSpareEmpsBar(theme),
              // 列表
              Expanded(child: _buildList(theme)),
            ],
          ),
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────
  // 已选人数提示
  // ─────────────────────────────────────────────

  Widget _buildSelectedCount(TDThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Text(
          '已选 ${_selectedKeys.length} 人（最多 ${widget.max} 人）',
          style: TextStyle(fontSize: 13, color: theme.fontGyColor3),
        ),
      ),
    );
  }

  // ─────────────────────────────────────────────
  // 职位标签栏（门店筛选模式）
  // ─────────────────────────────────────────────

  Widget _buildPositionTags(TDThemeData theme) {
    final tags = _effectivePositionTags;
    return SizedBox(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        itemCount: tags.length,
        itemBuilder: (context, index) {
          final tag = tags[index];
          final selected = tag.id == _currentPostTypeId;
          return GestureDetector(
            onTap: () {
              if (_currentPostTypeId == tag.id) return;
              setState(() => _currentPostTypeId = tag.id);
              _list.clear();
              _pageNo = 1;
              _fetchData();
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      tag.name,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
                        color: selected ? theme.brandNormalColor : theme.fontGyColor1,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Container(
                      height: 2,
                      width: 20,
                      decoration: BoxDecoration(
                        color: selected ? theme.brandNormalColor : Colors.transparent,
                        borderRadius: BorderRadius.circular(1),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  // ─────────────────────────────────────────────
  // 已预约员工提示栏（预约模式）
  // ─────────────────────────────────────────────

  Widget _buildSpareEmpsBar(TDThemeData theme) {
    final spareEmps = _allEmployees
        .where((e) => widget.spareIds.contains(e.id))
        .toList();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: theme.grayColor1,
        border: Border(
          bottom: BorderSide(color: theme.grayColor3, width: 0.5),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Wrap(
              spacing: 6,
              runSpacing: 4,
              children: spareEmps.map((emp) {
                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: theme.brandLightColor,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    emp.name,
                    style: TextStyle(fontSize: 12, color: theme.brandNormalColor),
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: () {
              final selected = autoSelectSpare(_allEmployees, widget.spareIds);
              setState(() {
                _selectedKeys.clear();
                _selectedKeys.addAll(selected.map((e) => e.key));
              });
            },
            child: Text(
              '选择',
              style: TextStyle(
                fontSize: 14,
                color: theme.brandNormalColor,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ─────────────────────────────────────────────
  // 列表构建
  // ─────────────────────────────────────────────

  Widget _buildList(TDThemeData theme) {
    if (widget.pickerMode == RDEmployeePickerMode.reservation) {
      return _buildReservationList(theme);
    }
    return _buildFlatList(theme);
  }

  Widget _buildFlatList(TDThemeData theme) {
    final items = _displayList;
    if (items.isEmpty && !_loading) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.only(top: 100),
          child: Text(
            widget.emptyText ?? '暂无数据',
            style: TextStyle(fontSize: 14, color: theme.fontGyColor3),
          ),
        ),
      );
    }
    return ListView.builder(
      controller: _scrollController,
      itemCount: items.length + (_loading ? 1 : 0),
      itemBuilder: (context, index) {
        if (index == items.length) {
          return const Padding(
            padding: EdgeInsets.all(16),
            child: Center(child: CupertinoActivityIndicator()),
          );
        }
        return _buildItem(items[index], theme);
      },
    );
  }

  Widget _buildReservationList(TDThemeData theme) {
    // 本地关键词过滤
    final filteredGroups = _groups.map((group) {
      return RDEmployeeGroup(
        title: group.title,
        list: filterByKeyword(group.list, _keyword),
      );
    }).where((g) => g.list.isNotEmpty || _groups.any((og) => og.title == g.title && og.list.isEmpty)).toList();

    final bool isEmpty = filteredGroups.every((g) => g.list.isEmpty);

    if (isEmpty && !_loading) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.only(top: 100),
          child: Text(
            widget.emptyText ?? '暂无数据',
            style: TextStyle(fontSize: 14, color: theme.fontGyColor3),
          ),
        ),
      );
    }

    final List<Widget> children = [];
    for (final group in filteredGroups) {
      if (group.list.isEmpty) continue;
      if (group.title.isNotEmpty) {
        children.add(_buildGroupHeader(group.title, theme));
      }
      for (final emp in group.list) {
        children.add(_buildReservationItem(emp, theme));
      }
    }
    if (_loading) {
      children.add(const Padding(
        padding: EdgeInsets.all(16),
        child: Center(child: CupertinoActivityIndicator()),
      ));
    }

    return ListView(
      controller: _scrollController,
      children: children,
    );
  }

  Widget _buildGroupHeader(String title, TDThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: theme.grayColor1,
      child: Text(
        title,
        style: TextStyle(fontSize: 13, color: theme.fontGyColor3),
      ),
    );
  }

  // ─────────────────────────────────────────────
  // 基础员工列表项
  // ─────────────────────────────────────────────

  Widget _buildItem(RDEmployeeItem item, TDThemeData theme) {
    final bool isMultiple = widget.selectionMode == RDSelectionMode.multiple;
    final bool isSelected = _selectedKeys.contains(item.key);
    final bool isDisabledKey = widget.disabledKeys.contains(item.key);

    // 左侧信息区（头像 + 文字）
    Widget infoContent = Row(
      children: [
        _buildAvatar(item, theme),
        const SizedBox(width: 12),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildNameRow(item, theme),
                if (item.phone != null && item.phone!.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  _buildPhoneRow(item, theme),
                ],
                if (widget.showWorkShiftInfo &&
                    widget.pickerMode == RDEmployeePickerMode.basic &&
                    item.classesInfo != null &&
                    item.classesInfo!.isNotEmpty)
                  _buildWorkShiftInfo(item, theme),
              ],
            ),
          ),
        ),
      ],
    );

    // 右侧门店名（shopFilter 模式）
    final bool hasShopName = widget.pickerMode == RDEmployeePickerMode.shopFilter &&
        widget.showShopName &&
        item.shopName != null &&
        item.shopName!.isNotEmpty;

    Widget content = Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Container(
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(color: theme.grayColor3, width: 0.5),
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if (isMultiple) ...[
              Checkbox(
                value: isSelected,
                onChanged: isDisabledKey
                    ? null
                    : (v) {
                        setState(() {
                          if (v == true) {
                            if (_selectedKeys.length < widget.max) {
                              _selectedKeys.add(item.key);
                            }
                          } else {
                            _selectedKeys.remove(item.key);
                          }
                        });
                      },
                activeColor: theme.brandNormalColor,
              ),
              const SizedBox(width: 4),
            ],
            Expanded(child: infoContent),
            if (hasShopName) ...[
              const SizedBox(width: 8),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 120),
                child: Text(
                  item.shopName!,
                  style: TextStyle(fontSize: 12, color: theme.fontGyColor3),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.right,
                ),
              ),
            ],
            // 单选模式：已选中时显示对勾
            if (!isMultiple && isSelected) ...[
              const SizedBox(width: 8),
              Icon(Icons.check, size: 18, color: theme.brandNormalColor),
            ],
          ],
        ),
      ),
    );

    // 调休印章（schedulingType=2 且 showWorkShiftInfo=true）
    if (widget.showWorkShiftInfo &&
        widget.pickerMode == RDEmployeePickerMode.basic &&
        item.schedulingType == 2) {
      content = Stack(
        children: [
          content,
          Positioned(
            right: 16,
            top: 0,
            bottom: 0,
            child: Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  border: Border.all(color: theme.warningNormalColor),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  '调休中',
                  style: TextStyle(
                    fontSize: 11,
                    color: theme.warningNormalColor,
                  ),
                ),
              ),
            ),
          ),
        ],
      );
    }

    if (isMultiple) {
      return content;
    }

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => _select(item),
      child: content,
    );
  }

  Widget _buildAvatar(RDEmployeeItem item, TDThemeData theme) {
    return ClipOval(
      child: Container(
        width: 40,
        height: 40,
        color: theme.grayColor3,
        child: item.avatar != null && item.avatar!.isNotEmpty
            ? Image.network(
                item.avatar!,
                width: 40,
                height: 40,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => _buildAvatarFallback(item, theme),
              )
            : _buildAvatarFallback(item, theme),
      ),
    );
  }

  Widget _buildAvatarFallback(RDEmployeeItem item, TDThemeData theme) {
    return Center(
      child: Text(
        item.name.isNotEmpty ? item.name[0] : '?',
        style: TextStyle(fontSize: 16, color: theme.fontGyColor2),
      ),
    );
  }

  Widget _buildNameRow(RDEmployeeItem item, TDThemeData theme) {
    return Row(
      children: [
        Flexible(
          child: RichText(
            text: TextSpan(
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: theme.fontGyColor1,
              ),
              children: highlightSpans(
                item.name,
                keyword: _keyword,
                highlightColor: theme.brandNormalColor,
              ),
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        if (item.postName != null && item.postName!.isNotEmpty) ...[
          const SizedBox(width: 4),
          Text(
            item.postName!,
            style: TextStyle(fontSize: 13, color: theme.fontGyColor3),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ],
    );
  }

  Widget _buildPhoneRow(RDEmployeeItem item, TDThemeData theme) {
    return Row(
      children: [
        Flexible(
          child: RichText(
            text: TextSpan(
              style: TextStyle(fontSize: 13, color: theme.fontGyColor3),
              children: highlightSpans(
                item.phone!,
                keyword: _keyword,
                highlightColor: theme.brandNormalColor,
              ),
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        // 已离职 tag 在手机号行（与源组件一致）
        if (item.status == 2) ...[
          const SizedBox(width: 4),
          RDTag(
            '已离职',
            size: RDTagSize.small,
            style: RDTagStyle(
              textColor: theme.errorNormalColor,
              backgroundColor: theme.errorLightColor,
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildWorkShiftInfo(RDEmployeeItem item, TDThemeData theme) {
    final infos = item.classesInfo!;
    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: infos.map((info) {
          final timeStr = info.details.map((d) {
            final suffix1 = d.startTimeType == 2 ? '(次日)' : '';
            final suffix2 = d.endTimeType == 2 ? '(次日)' : '';
            return '${d.startTime}$suffix1-${d.endTime}$suffix2';
          }).join(' ');
          return Text(
            '${info.classesName} $timeStr',
            style: TextStyle(fontSize: 12, color: theme.fontGyColor3),
          );
        }).toList(),
      ),
    );
  }

  // ─────────────────────────────────────────────
  // 预约模式员工列表项
  // ─────────────────────────────────────────────

  Widget _buildReservationItem(RDEmployeeItem item, TDThemeData theme) {
    final bool isDisabled = item.disabled;
    final bool isMultiple = widget.selectionMode == RDSelectionMode.multiple;
    final bool isSelected = _selectedKeys.contains(item.key);

    Widget itemContent = Opacity(
      opacity: isDisabled ? 0.4 : 1.0,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (isMultiple) ...[
              Padding(
                padding: const EdgeInsets.only(top: 14),
                child: Checkbox(
                  value: isSelected,
                  onChanged: isDisabled
                      ? null
                      : (v) {
                          setState(() {
                            if (v == true) {
                              if (_selectedKeys.length < widget.max) {
                                _selectedKeys.add(item.key);
                              }
                            } else {
                              _selectedKeys.remove(item.key);
                            }
                          });
                        },
                  activeColor: theme.brandNormalColor,
                ),
              ),
              const SizedBox(width: 4),
            ],
            Padding(
              padding: const EdgeInsets.only(top: 14),
              child: _buildAvatar(item, theme),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 14),
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: theme.grayColor3, width: 0.5),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildNameRow(item, theme),
                    if (item.phone != null && item.phone!.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      _buildPhoneRow(item, theme),
                    ],
                    // 排休标签
                    if (item.schedulingType == 2) ...[
                      const SizedBox(height: 4),
                      RDTag(
                        '排休',
                        size: RDTagSize.small,
                        style: RDTagStyle(
                          textColor: theme.warningNormalColor,
                          backgroundColor: theme.warningLightColor,
                        ),
                      ),
                    ],
                    // 服务占用时间段
                    if (item.scheduleTimeSlots != null &&
                        item.scheduleTimeSlots!.isNotEmpty)
                      _buildScheduleTimeSlots(item, theme),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );

    if (isDisabled || isMultiple) {
      return itemContent;
    }

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => _select(item),
      child: itemContent,
    );
  }

  Widget _buildScheduleTimeSlots(RDEmployeeItem item, TDThemeData theme) {
    final slots = item.scheduleTimeSlots!;
    // 判断是否有本次预约时间段
    final hasThisReservation = slots.any((s) => s.thisReservationFlag);
    final prefix = hasThisReservation ? '本次预约：' : '服务占用：';

    return _ExpandableTimeSlots(
      slots: slots,
      prefix: prefix,
      theme: theme,
      resvStart: widget.startTime,
      resvEnd: widget.endTime,
    );
  }
}

// ─────────────────────────────────────────────
// 可展开时间段组件
// ─────────────────────────────────────────────

class _ExpandableTimeSlots extends StatefulWidget {
  final List<RDScheduleTimeSlot> slots;
  final String prefix;
  final TDThemeData theme;
  final String? resvStart;
  final String? resvEnd;

  const _ExpandableTimeSlots({
    required this.slots,
    required this.prefix,
    required this.theme,
    this.resvStart,
    this.resvEnd,
  });

  @override
  State<_ExpandableTimeSlots> createState() => _ExpandableTimeSlotsState();
}

class _ExpandableTimeSlotsState extends State<_ExpandableTimeSlots> {
  bool _expanded = false;
  static const _maxVisible = 2;

  String _formatTime(String iso) {
    try {
      final dt = DateTime.parse(iso);
      final h = dt.hour.toString().padLeft(2, '0');
      final m = dt.minute.toString().padLeft(2, '0');
      return '$h:$m';
    } catch (_) {
      return iso;
    }
  }

  bool _isConflict(RDScheduleTimeSlot slot) {
    if (slot.thisReservationFlag) return false;
    if (widget.resvStart == null || widget.resvEnd == null) return false;
    return checkTimeConflict(
      widget.resvStart!,
      widget.resvEnd!,
      slot.startTime,
      slot.endTime,
    );
  }

  @override
  Widget build(BuildContext context) {
    final slots = widget.slots;
    final visibleSlots =
        _expanded ? slots : slots.take(_maxVisible).toList();
    final hasMore = slots.length > _maxVisible;

    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.prefix,
                style: TextStyle(
                  fontSize: 12,
                  color: widget.theme.fontGyColor3,
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: visibleSlots.map((slot) {
                    final conflict = _isConflict(slot);
                    final timeText =
                        '${_formatTime(slot.startTime)}-${_formatTime(slot.endTime)}';
                    return Text(
                      timeText,
                      style: TextStyle(
                        fontSize: 12,
                        color: conflict
                            ? widget.theme.errorNormalColor
                            : widget.theme.fontGyColor3,
                      ),
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
          if (hasMore)
            GestureDetector(
              onTap: () => setState(() => _expanded = !_expanded),
              child: Padding(
                padding: const EdgeInsets.only(top: 2),
                child: Text(
                  _expanded ? '收起' : '展开更多',
                  style: TextStyle(
                    fontSize: 12,
                    color: widget.theme.brandNormalColor,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
