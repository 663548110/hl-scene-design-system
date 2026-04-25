const { test, expect } = require('@playwright/test');
const { cleanupCustomThemes, enterEditMode, openSaveDialog } = require('./helpers');

test.describe('API 错误处理', () => {
  test.beforeEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('API 返回 500 → 错误提示出现 + 对话框保持打开', async ({ page }) => {
    await page.goto('/');
    await enterEditMode(page);
    await openSaveDialog(page);

    // 仅拦截 POST 请求返回 500，放行 GET 请求（清理需要）
    await page.route('**/api/themes', route => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: '服务器错误' }),
        });
      } else {
        route.continue();
      }
    });

    // 输入主题名称
    await page.locator('.t-dialog .t-input__inner').fill('错误测试主题');

    // 点击确认
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();

    // 验证错误提示出现
    await expect(page.locator('.t-message')).toBeVisible({ timeout: 5000 });

    // 验证对话框保持打开
    await expect(page.locator('.t-dialog')).toBeVisible();

    // 清理路由拦截
    await page.unroute('**/api/themes');
  });

  test('网络错误 → 错误提示出现 + 对话框保持打开', async ({ page }) => {
    await page.goto('/');
    await enterEditMode(page);
    await openSaveDialog(page);

    // 仅拦截 POST 请求模拟网络错误，放行 GET 请求
    await page.route('**/api/themes', route => {
      if (route.request().method() === 'POST') {
        route.abort('connectionrefused');
      } else {
        route.continue();
      }
    });

    // 输入主题名称
    await page.locator('.t-dialog .t-input__inner').fill('网络错误测试主题');

    // 点击确认
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();

    // 验证错误提示出现
    await expect(page.locator('.t-message')).toBeVisible({ timeout: 5000 });

    // 验证对话框保持打开
    await expect(page.locator('.t-dialog')).toBeVisible();

    // 清理路由拦截
    await page.unroute('**/api/themes');
  });
});
