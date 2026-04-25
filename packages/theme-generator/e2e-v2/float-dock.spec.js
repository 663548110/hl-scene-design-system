const { test, expect } = require('@playwright/test');
const { cleanupCustomThemes } = require('./helpers/api');
const { FloatDockPage } = require('./pages/FloatDockPage');

test.describe('FloatDock 交互测试', () => {
  let floatDock;

  test.beforeEach(async ({ page, request }) => {
    await cleanupCustomThemes(request);
    await page.goto('/');
    floatDock = new FloatDockPage(page);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('页面加载后 dock 容器可见', async () => {
    await expect(floatDock.dock).toBeVisible();
  });

  test('点击主题按钮展开推荐主题面板', async ({ page }) => {
    await floatDock.clickThemeTab();
    await expect(page.locator('.recommend-theme')).toBeVisible();
  });

  test('点击自定义按钮打开 PanelDrawer 抽屉', async ({ page }) => {
    await floatDock.clickCustomize();
    await expect(page.locator('.t-drawer')).toBeVisible();
  });

  test('点击重置按钮并确认 popconfirm 后重置主题', async ({ page }) => {
    // 先选择一个主题使状态变化，然后重置
    await floatDock.clickThemeTab();
    await floatDock.clickReset();
    // 重置操作应完成且无错误，dock 仍然可见
    await expect(floatDock.dock).toBeVisible();
  });
});
