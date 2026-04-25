import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';
import 'package:rdesign_flutter/src/theme/tokens/rdesign_theme_tokens.dart'
    as generated_theme_tokens;

void main() {
  group('RDThemeRegistry', () {
    final generatedIds = generated_theme_tokens.rdThemeTokenSpecs
        .map((themeSpec) => themeSpec.id)
        .toList();

    test('预注册 Figma 同步生成主题', () {
      expect(generatedIds, contains(RDProject.defaultTheme.id));
      expect(RDThemeRegistry.registeredIds, containsAll(generatedIds));
      expect(RDThemeRegistry.registeredIds, isNot(contains('meisyd')));
      expect(RDThemeRegistry.registeredIds, isNot(contains('mrjbeauty')));
    });

    test('get 返回已注册的 Figma 同步主题', () {
      for (final id in generatedIds) {
        expect(RDThemeRegistry.get(id), isNotNull, reason: 'themeId=$id');
      }
    });

    test('registeredProjectIds 按生成包顺序返回 UI 可用主题列表', () {
      expect(
        RDThemeRegistry.registeredProjectIds.take(generatedIds.length),
        orderedEquals(generatedIds),
      );
    });

    test('setup 后 currentTheme 指向当前项目主题', () {
      RDThemeRegistry.isDarkMode = false;

      RDThemeRegistry.setup(RDProject.sl);
      expect(
        RDThemeRegistry.currentTheme,
        same(RDThemeRegistry.get(RDProject.sl.id)),
      );

      RDThemeRegistry.setup(RDProject.mrj);
      expect(
        RDThemeRegistry.currentTheme,
        same(RDThemeRegistry.get(RDProject.mrj.id)),
      );

      RDThemeRegistry.isDarkMode = null;
    });

    test('setup defaultTheme 后 currentTheme 使用 Figma default 主题', () {
      RDThemeRegistry.isDarkMode = false;
      RDThemeRegistry.setup(RDProject.defaultTheme);

      expect(
        RDThemeRegistry.currentTheme,
        same(RDThemeRegistry.get(RDProject.defaultTheme.id)),
      );

      RDThemeRegistry.isDarkMode = null;
    });

    test('get 未注册的 projectId 返回 null', () {
      expect(RDThemeRegistry.get('unknown_project_xyz'), isNull);
    });

    test('register 后 get 返回同一对象', () {
      final testData = TDTheme.defaultData();
      RDThemeRegistry.register('test_project', testData);
      expect(RDThemeRegistry.get('test_project'), same(testData));
    });

    test('registerFromJson 可注册 Figma 同步生成主题', () {
      const projectId = 'generated_test';
      const darkProjectId = 'generated_testDark';
      final themeData = RDThemeRegistry.registerFromJson(
        projectId,
        generated_theme_tokens.rdDefaultLightJson
            .replaceFirst('"default"', '"$projectId"'),
        generated_theme_tokens.rdDefaultDarkJson
            .replaceFirst('"defaultDark"', '"$darkProjectId"'),
        darkName: darkProjectId,
      );

      expect(RDThemeRegistry.get(projectId), same(themeData));
      expect(themeData.dark, isNotNull);
      expect(
        themeData.brandNormalColor,
        isNot(equals(TDTheme.defaultData().brandNormalColor)),
      );
    });

    test('覆盖注册后 get 返回最新值', () {
      final first = TDTheme.defaultData();
      final second = TDTheme.defaultData();
      RDThemeRegistry.register('overwrite_test', first);
      RDThemeRegistry.register('overwrite_test', second);
      expect(RDThemeRegistry.get('overwrite_test'), same(second));
    });

    test('Figma default 和 mrj 品牌色互不相同', () {
      final defaultTheme = RDThemeRegistry.get(RDProject.defaultTheme.id)!;
      final mrj = RDThemeRegistry.get(RDProject.mrj.id)!;
      expect(
          defaultTheme.brandNormalColor, isNot(equals(mrj.brandNormalColor)));
    });

    test('Figma 同步主题 dark 主题不为 null', () {
      for (final id in generatedIds) {
        expect(RDThemeRegistry.get(id)!.dark, isNotNull, reason: 'themeId=$id');
      }
    });

    test('Property 1 — 注册后可查询', () {
      final random = Random(42);
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 100; i++) {
        final id =
            List.generate(8, (_) => chars[random.nextInt(chars.length)]).join();
        final data = TDTheme.defaultData();
        RDThemeRegistry.register(id, data);
        expect(RDThemeRegistry.get(id), same(data),
            reason: 'projectId=$id 注册后应可查询到同一对象');
      }
    });

    test('Property 2 — 覆盖注册生效', () {
      final random = Random(99);
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      for (var i = 0; i < 100; i++) {
        final id =
            'prop2_${List.generate(6, (_) => chars[random.nextInt(chars.length)]).join()}';
        final first = TDTheme.defaultData();
        final second = TDTheme.defaultData();
        RDThemeRegistry.register(id, first);
        RDThemeRegistry.register(id, second);
        expect(RDThemeRegistry.get(id), same(second),
            reason: 'projectId=$id 第二次注册应覆盖第一次');
      }
    });
  });
}
