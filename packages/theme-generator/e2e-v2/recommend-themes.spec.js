const { test, expect } = require('@playwright/test');
const { cleanupCustomThemes } = require('./helpers/api');
const { FloatDockPage } = require('./pages/FloatDockPage');
const { RecommendThemesPage } = require('./pages/RecommendThemesPage');

test.describe('推荐主题列表交互测试', () => {
  let floatDock;
  let recommend;

  test.beforeEach(async ({ page, request }) => {
    await cleanupCustomThemes(request);
    await page.goto('/');
    floatDock = new FloatDockPage(page);
    recommend = new RecommendThemesPage(page);
    await floatDock.clickThemeTab();
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('推荐主题面板展开后色块列表正确渲染且数量 > 0', async () => {
    const count = await recommend.getThemeCount();
    expect(count).toBeGreaterThan(0);
  });

  test('点击色块后标记为激活状态', async () => {
    await recommend.selectTheme(0);
    await expect(recommend.activeTheme).toBeVisible();
  });

  test('新增主题入口色块可见', async () => {
    await expect(recommend.addThemeBtn).toBeVisible();
  });

  test('点击新增主题色块打开 SaveThemeDialog', async ({ page }) => {
    await recommend.clickAddTheme();
    await expect(page.locator('.t-dialog__ctx').nth(1)).toBeVisible();
  });
});
