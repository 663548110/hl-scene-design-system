/// 客户选择器弹窗内容（纯 UI 组件）
library;

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

import 'rd_customer_picker_types.dart';
import 'rd_customer_picker_utils.dart' as picker_utils;

class RDCustomerPickerSheet extends StatefulWidget {
  final String title;
  final List<RDCustomerTab> tabs;
  final bool showTabs;
  final String searchPlaceholder;
  final String? emptyText;
  final bool maskPhone;
  final RDCustomerFetcher fetcher;
  final RDCustomerSelectCallback? onSelect;

  /// 右上角"新建/接收"按钮文案，为 null 时不显示按钮
  final String? createButtonText;

  /// 点击"新建/接收"按钮的回调，由宿主实现
  final VoidCallback? onCreateCustomer;

  const RDCustomerPickerSheet({
    super.key,
    this.title = '选择客户',
    this.tabs = const [RDCustomerTab(name: '历史选择'), RDCustomerTab(name: '最近新增')],
    this.showTabs = true,
    this.searchPlaceholder = '请输入搜索内容',
    this.emptyText,
    this.maskPhone = true,
    required this.fetcher,
    this.onSelect,
    this.createButtonText,
    this.onCreateCustomer,
  });

  @override
  State<RDCustomerPickerSheet> createState() => _RDCustomerPickerSheetState();
}

class _RDCustomerPickerSheetState extends State<RDCustomerPickerSheet> {
  final _scrollController = ScrollController();
  final _searchController = TextEditingController();
  final List<RDCustomerItem> _list = [];

  int _tabIndex = 0;
  int _pageNo = 1;
  int _totalPage = 0;
  bool _loading = false;
  bool _selecting = false;
  String _keyword = '';
  int _debounceVersion = 0;

  @override
  void initState() {
    super.initState();
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
    _debounceVersion++;
    final version = _debounceVersion;
    Future.delayed(const Duration(milliseconds: 300), () {
      if (_debounceVersion == version) _resetAndFetch();
    });
  }

  void _onTabChanged(int index) {
    if (_tabIndex == index) return;
    _tabIndex = index;
    _resetAndFetch();
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
        tabIndex: _tabIndex,
        keyword: _keyword,
        pageNo: _pageNo,
        pageSize: 20,
      );
      if (!mounted) return;
      setState(() {
        _list.addAll(result.list);
        _totalPage = result.totalPage;
        _pageNo++;
        _loading = false;
      });
    } catch (e, s) {
      debugPrint('RDCustomerPickerSheet fetch error: $e\n$s');
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _select(RDCustomerItem item) async {
    if (_selecting) return;
    _selecting = true;
    try {
      await widget.onSelect?.call(item);
    } finally {
      _selecting = false;
    }
    if (mounted) Navigator.of(context, rootNavigator: true).pop(item);
  }

  @override
  Widget build(BuildContext context) {
    final theme = TDTheme.of(context);
    return CupertinoPageScaffold(
      backgroundColor: theme.whiteColor1,
      navigationBar: CupertinoNavigationBar(
        middle: Text(widget.title),
        leading: CupertinoButton(
          padding: EdgeInsets.zero,
          onPressed: () => Navigator.of(context, rootNavigator: true).pop(),
          child: const Text('取消'),
        ),
        trailing: widget.createButtonText != null
            ? CupertinoButton(
                padding: EdgeInsets.zero,
                onPressed: widget.onCreateCustomer,
                child: Text(
                  widget.createButtonText!,
                  style: TextStyle(color: theme.brandNormalColor),
                ),
              )
            : null,
        backgroundColor: theme.whiteColor1,
        border: null,
      ),
      child: Material(
        color: Colors.transparent,
        child: SafeArea(
          child: Column(
            children: [
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: CupertinoSearchTextField(
                  controller: _searchController,
                  placeholder: widget.searchPlaceholder,
                ),
              ),
              if (widget.showTabs &&
                  _keyword.isEmpty &&
                  widget.tabs.length > 1)
                _buildTabs(theme),
              Expanded(child: _buildList(theme)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTabs(TDThemeData theme) {
    return SizedBox(
      height: 40,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(
          children: List.generate(widget.tabs.length, (i) {
            final selected = i == _tabIndex;
            return GestureDetector(
              onTap: () => _onTabChanged(i),
              child: Padding(
                padding: const EdgeInsets.only(right: 20),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      widget.tabs[i].name,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight:
                            selected ? FontWeight.w600 : FontWeight.normal,
                        color: selected
                            ? theme.brandNormalColor
                            : theme.fontGyColor1,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Container(
                      height: 2,
                      width: 20,
                      decoration: BoxDecoration(
                        color: selected
                            ? theme.brandNormalColor
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(1),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
      ),
    );
  }

  Widget _buildList(TDThemeData theme) {
    if (_list.isEmpty && !_loading) {
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
      itemCount: _list.length + (_loading ? 1 : 0),
      itemBuilder: (context, index) {
        if (index == _list.length) {
          return const Padding(
            padding: EdgeInsets.all(16),
            child: Center(child: CupertinoActivityIndicator()),
          );
        }
        return _buildItem(_list[index], theme);
      },
    );
  }

  Widget _buildItem(RDCustomerItem item, TDThemeData theme) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => _select(item),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(
          children: [
            // 头像
            ClipOval(
              child: Container(
                width: 40,
                height: 40,
                color: theme.grayColor3,
                child: item.avatar != null && item.avatar!.isNotEmpty
                    ? Image.network(item.avatar!,
                        width: 40, height: 40, fit: BoxFit.cover)
                    : Center(
                        child: Text(
                          item.name.isNotEmpty ? item.name[0] : '?',
                          style: TextStyle(
                              fontSize: 16, color: theme.fontGyColor2),
                        ),
                      ),
              ),
            ),
            const SizedBox(width: 12),
            // 信息
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 14),
                decoration: BoxDecoration(
                  border: Border(
                    bottom:
                        BorderSide(color: theme.grayColor3, width: 0.5),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Flexible(
                          child: _highlightText(
                            item.name,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: theme.fontGyColor1,
                            ),
                            highlightColor: theme.brandNormalColor,
                          ),
                        ),
                        if (item.type == 2) ...[
                          const SizedBox(width: 4),
                          RDTag(
                            '散',
                            size: RDTagSize.small,
                            style: RDTagStyle(
                              textColor: theme.brandNormalColor,
                              backgroundColor: theme.brandLightColor,
                            ),
                          ),
                        ],
                      ],
                    ),
                    if (item.phone != null &&
                        item.phone!.isNotEmpty &&
                        item.type != 2) ...[
                      const SizedBox(height: 2),
                      _highlightText(
                        widget.maskPhone
                            ? picker_utils.maskPhone(item.phone!)
                            : item.phone!,
                        style: TextStyle(
                            fontSize: 13, color: theme.fontGyColor3),
                        highlightColor: theme.brandNormalColor,
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _highlightText(
    String text, {
    required TextStyle style,
    required Color highlightColor,
  }) {
    if (_keyword.isEmpty) {
      return Text(text,
          style: style, maxLines: 1, overflow: TextOverflow.ellipsis);
    }

    final lowerText = text.toLowerCase();
    final lowerKeyword = _keyword.toLowerCase();
    final spans = <TextSpan>[];
    var start = 0;

    while (true) {
      final index = lowerText.indexOf(lowerKeyword, start);
      if (index == -1) {
        spans.add(TextSpan(text: text.substring(start)));
        break;
      }
      if (index > start) {
        spans.add(TextSpan(text: text.substring(start, index)));
      }
      spans.add(TextSpan(
        text: text.substring(index, index + _keyword.length),
        style: TextStyle(color: highlightColor),
      ));
      start = index + _keyword.length;
    }

    return RichText(
      text: TextSpan(style: style, children: spans),
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }
}
