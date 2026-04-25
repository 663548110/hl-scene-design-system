import 'package:flutter/material.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';

/// RD 多项目主题示例页
///
/// 演示：
/// - RDThemeRegistry.setup 启动时注册项目
/// - RDColors.of(context) 读取当前主题颜色
/// - 深色/浅色模式切换
/// - RDThemeProvider 局部子树覆盖
class RDThemePage extends StatefulWidget {
  const RDThemePage({super.key});

  @override
  State<RDThemePage> createState() => _RDThemePageState();
}

class _RDThemePageState extends State<RDThemePage> {
  late final List<String> _projectIds;
  late String _currentProject;
  bool? _darkModeOverride;

  @override
  void initState() {
    super.initState();
    _projectIds = RDThemeRegistry.registeredProjectIds;
    _currentProject = _resolveInitialProject(_projectIds);
    if (_currentProject.isNotEmpty) {
      RDThemeRegistry.setup(_currentProject);
    }
  }

  String _resolveInitialProject(List<String> projectIds) {
    if (projectIds.contains(RDProject.defaultTheme.id)) {
      return RDProject.defaultTheme.id;
    }
    return projectIds.isEmpty ? '' : projectIds.first;
  }

  void _switchProject(String projectId) {
    RDThemeRegistry.setup(projectId);
    setState(() => _currentProject = projectId);
  }

  void _switchDarkMode(bool? value) {
    RDThemeRegistry.isDarkMode = value;
    setState(() => _darkModeOverride = value);
  }

  @override
  Widget build(BuildContext context) {
    return TDTheme(
      data: RDThemeRegistry.currentTheme,
      child: Builder(
        builder: (context) {
          final c = RDColors.of(context);

          return Scaffold(
            appBar: AppBar(
              title: const Text('RD 多项目主题'),
              backgroundColor: c.brand,
              foregroundColor: Colors.white,
            ),
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // ── 项目切换 ──────────────────────────────────
                  _sectionTitle('项目切换', c),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 12,
                    runSpacing: 8,
                    children: _projectIds
                        .map(
                          (projectId) => _projectButton(
                            projectId,
                            _currentProject == projectId,
                            c,
                            () => _switchProject(projectId),
                          ),
                        )
                        .toList(),
                  ),
                  const SizedBox(height: 4),
                  Text('当前项目：$_currentProject',
                      style: TextStyle(color: c.textSecondary, fontSize: 12)),
                  Text('主题来源：RDThemeRegistry.registeredProjectIds',
                      style: TextStyle(color: c.textSecondary, fontSize: 12)),

                  const SizedBox(height: 24),

                  // ── 深色模式切换 ──────────────────────────────
                  _sectionTitle('深色模式', c),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      _modeButton('跟随系统', _darkModeOverride == null, c,
                          () => _switchDarkMode(null)),
                      const SizedBox(width: 8),
                      _modeButton('浅色', _darkModeOverride == false, c,
                          () => _switchDarkMode(false)),
                      const SizedBox(width: 8),
                      _modeButton('深色', _darkModeOverride == true, c,
                          () => _switchDarkMode(true)),
                    ],
                  ),

                  const SizedBox(height: 24),

                  // ── 品牌色色阶 ────────────────────────────────
                  _sectionTitle('品牌色色阶（brand1–10）', c),
                  const SizedBox(height: 8),
                  _buildPalette(c),

                  const SizedBox(height: 24),

                  // ── 语义色 ────────────────────────────────────
                  _sectionTitle('语义色', c),
                  const SizedBox(height: 8),
                  _buildSemanticColors(c),

                  const SizedBox(height: 24),

                  // ── RDThemeProvider 局部覆盖 ──────────────────
                  _sectionTitle('RDThemeProvider 局部子树覆盖', c),
                  const SizedBox(height: 8),
                  _buildLocalOverride(),

                  const SizedBox(height: 24),

                  // ── 使用说明 ──────────────────────────────────
                  _sectionTitle('使用方式', c),
                  const SizedBox(height: 8),
                  _buildUsageCard(c),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  // ── 品牌色色阶 ──────────────────────────────────────────────────────────────

  Widget _buildPalette(RDColors c) {
    final colors = <Color>[
      c.brand1,
      c.brand2,
      c.brand3,
      c.brand4,
      c.brand5,
      c.brand6,
      c.brand7,
      c.brand8,
      c.brand9,
      c.brand10,
    ];
    return Row(
      children: List.generate(colors.length, (i) {
        return Expanded(
          child: Column(
            children: [
              Container(height: 36, color: colors[i]),
              const SizedBox(height: 4),
              Text('${i + 1}', style: const TextStyle(fontSize: 10)),
            ],
          ),
        );
      }),
    );
  }

  // ── 语义色 ──────────────────────────────────────────────────────────────────

  Widget _buildSemanticColors(RDColors c) {
    final items = <MapEntry<String, Color>>[
      MapEntry('brand', c.brand),
      MapEntry('brandHover', c.brandHover),
      MapEntry('brandActive', c.brandActive),
      MapEntry('brandDisabled', c.brandDisabled),
      MapEntry('brandLight', c.brandLight),
      MapEntry('success', c.success),
      MapEntry('warning', c.warning),
      MapEntry('error', c.error),
      MapEntry('textPrimary', c.textPrimary),
      MapEntry('textSecondary', c.textSecondary),
      MapEntry('bgPage', c.bgPage),
      MapEntry('bgContainer', c.bgContainer),
      MapEntry('border', c.border),
    ];
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: items.map((e) {
        final isLight = e.value.computeLuminance() > 0.5;
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: BoxDecoration(
            color: e.value,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: c.border),
          ),
          child: Text(
            e.key,
            style: TextStyle(
              fontSize: 11,
              color: isLight ? Colors.black87 : Colors.white,
            ),
          ),
        );
      }).toList(),
    );
  }

  // ── RDThemeProvider 局部覆盖 ────────────────────────────────────────────────

  Widget _buildLocalOverride() {
    return Row(
      children: [
        Expanded(
          child: RDThemeProvider(
            projectId: RDProject.defaultTheme.id,
            child: Builder(builder: (ctx) {
              final color = TDTheme.of(ctx).brandNormalColor;
              return Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Text(
                  'default 局部',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.w600),
                  textAlign: TextAlign.center,
                ),
              );
            }),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: RDThemeProvider(
            projectId: RDProject.mrj.id,
            child: Builder(builder: (ctx) {
              final color = TDTheme.of(ctx).brandNormalColor;
              return Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Text(
                  'mrj 局部',
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.w600),
                  textAlign: TextAlign.center,
                ),
              );
            }),
          ),
        ),
      ],
    );
  }

  // ── 使用说明 ────────────────────────────────────────────────────────────────

  Widget _buildUsageCard(RDColors c) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: c.bgPage,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: c.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('// 1. main.dart 启动时注册一次',
              style: TextStyle(color: c.textSecondary, fontSize: 12)),
          Text('RDThemeRegistry.setup(RDProject.sl);',
              style: TextStyle(color: c.brand, fontSize: 12)),
          const SizedBox(height: 8),
          Text('// 2. build 方法里取颜色',
              style: TextStyle(color: c.textSecondary, fontSize: 12)),
          Text('final c = RDColors.of(context);',
              style: TextStyle(color: c.brand, fontSize: 12)),
          Text('Container(color: c.brand)',
              style: TextStyle(color: c.brand, fontSize: 12)),
          const SizedBox(height: 8),
          Text('// 3. 深色模式切换',
              style: TextStyle(color: c.textSecondary, fontSize: 12)),
          Text('RDThemeRegistry.isDarkMode = true;   // 强制深色',
              style: TextStyle(color: c.brand, fontSize: 12)),
          Text('RDThemeRegistry.isDarkMode = false;  // 强制浅色',
              style: TextStyle(color: c.brand, fontSize: 12)),
          Text('RDThemeRegistry.isDarkMode = null;   // 跟随系统',
              style: TextStyle(color: c.brand, fontSize: 12)),
          const SizedBox(height: 8),
          Text('// 4. 局部子树覆盖',
              style: TextStyle(color: c.textSecondary, fontSize: 12)),
          Text("RDThemeProvider(projectId: 'mrj', child: ...)",
              style: TextStyle(color: c.brand, fontSize: 12)),
        ],
      ),
    );
  }

  // ── 辅助 ────────────────────────────────────────────────────────────────────

  Widget _sectionTitle(String title, RDColors c) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: c.textPrimary,
      ),
    );
  }

  Widget _projectButton(
      String label, bool selected, RDColors c, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: selected ? c.brand : c.bgPage,
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: selected ? c.brand : c.border),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? Colors.white : c.textPrimary,
            fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Widget _modeButton(
      String label, bool selected, RDColors c, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? c.brand : c.bgPage,
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: selected ? c.brand : c.border),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? Colors.white : c.textPrimary,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}
