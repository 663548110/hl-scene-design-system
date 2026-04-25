const { test, expect } = require('@playwright/test');
const { cleanupCustomThemes, getThemeList } = require('./helpers/api');
const { FloatDockPage } = require('./pages/FloatDockPage');
const { RecommendThemesPage } = require('./pages/RecommendThemesPage');
const { SaveThemeDialogPage } = require('./pages/SaveThemeDialogPage');
const { PanelDrawerPage } = require('./pages/PanelDrawerPage');

test.describe('保存主题完整流程测试', () => {
  test.beforeEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('推荐主题面板路径保存主题', async ({ page, request }) => {
    await page.goto('/');
    const floatDock = new FloatDockPage(page);
    const recommend = new RecommendThemesPage(page);
    const saveDialog = new SaveThemeDialogPage(page);

    await floatDock.clickThemeTab();
    await recommend.clickAddTheme();
    await saveDialog.saveTheme('推荐面板测试主题');

    // dialog 已关闭，通过 API 验证主题已保存
    const themes = await getThemeList(request);
    const saved = themes.find(t => t.name === '推荐面板测试主题');
    expect(saved).toBeTruthy();
    expect(saved.type).toBe('custom');
    expect(saved.id).toMatch(/^custom-/);
  });

  test('PanelDrawer 路径保存主题', async ({ page, request }) => {
    await page.goto('/');
    const floatDock = new FloatDockPage(page);
    const panelDrawer = new PanelDrawerPage(page);
    const saveDialog = new SaveThemeDialogPage(page);

    await floatDock.clickCustomize();
    await panelDrawer.clickSaveTheme();
    await saveDialog.saveTheme('PanelDrawer测试主题');

    const themes = await getThemeList(request);
    const saved = themes.find(t => t.name === 'PanelDrawer测试主题');
    expect(saved).toBeTruthy();
    expect(saved.type).toBe('custom');
  });

  test('保存后推荐主题列表已刷新并包含新主题', async ({ page, request }) => {
    await page.goto('/');
    const floatDock = new FloatDockPage(page);
    const recommend = new RecommendThemesPage(page);
    const saveDialog = new SaveThemeDialogPage(page);

    await floatDock.clickThemeTab();
    const countBefore = await recommend.getThemeCount();

    await recommend.clickAddTheme();
    await saveDialog.saveTheme('刷新列表测试主题');

    // 重新打开推荐面板查看列表是否刷新
    await floatDock.clickThemeTab();
    await page.waitForTimeout(1000);
    const countAfter = await recommend.getThemeCount();
    expect(countAfter).toBeGreaterThan(countBefore);
  });
});
