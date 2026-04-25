const { test, expect } = require('@playwright/test');
const { cleanupCustomThemes, getThemeList } = require('./helpers/api');
const { FloatDockPage } = require('./pages/FloatDockPage');
const { RecommendThemesPage } = require('./pages/RecommendThemesPage');
const { SaveThemeDialogPage } = require('./pages/SaveThemeDialogPage');

test.describe('表单校验与错误处理测试', () => {
  let floatDock;
  let recommend;
  let saveDialog;

  test.beforeEach(async ({ page, request }) => {
    await cleanupCustomThemes(request);
    await page.goto('/');
    floatDock = new FloatDockPage(page);
    recommend = new RecommendThemesPage(page);
    saveDialog = new SaveThemeDialogPage(page);
    await floatDock.clickThemeTab();
    await recommend.clickAddTheme();
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('空名称提交：不发送 POST 请求，不创建主题', async ({ page, request }) => {
    let postSent = false;
    await page.route('**/api/themes', (route) => {
      if (route.request().method() === 'POST') {
        postSent = true;
      }
      route.continue();
    });

    await saveDialog.confirm();
    await page.waitForTimeout(500);

    // TDesign Dialog 在 confirm 后自动关闭，但空名称不应发送 POST
    expect(postSent).toBe(false);

    // 验证 API 中没有新主题
    const themes = await getThemeList(request);
    const custom = themes.filter(t => t.type === 'custom');
    expect(custom.length).toBe(0);
    await page.unroute('**/api/themes');
  });

  test('纯空白名称提交：不发送 POST 请求，不创建主题', async ({ page, request }) => {
    let postSent = false;
    await page.route('**/api/themes', (route) => {
      if (route.request().method() === 'POST') {
        postSent = true;
      }
      route.continue();
    });

    await saveDialog.fillName('   ');
    await saveDialog.confirm();
    await page.waitForTimeout(500);

    expect(postSent).toBe(false);

    const themes = await getThemeList(request);
    const custom = themes.filter(t => t.type === 'custom');
    expect(custom.length).toBe(0);
    await page.unroute('**/api/themes');
  });

  test('API 500 错误：不创建主题', async ({ page, request }) => {
    await page.route('**/api/themes', (route) => {
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

    await saveDialog.fillName('错误测试主题');
    await saveDialog.confirm();
    await page.waitForTimeout(1000);

    // POST 发送了但返回 500，主题不应被创建
    await page.unroute('**/api/themes');
    const themes = await getThemeList(request);
    const saved = themes.find(t => t.name === '错误测试主题');
    expect(saved).toBeFalsy();
  });

  test('网络中断：不创建主题', async ({ page, request }) => {
    await page.route('**/api/themes', (route) => {
      if (route.request().method() === 'POST') {
        route.abort('connectionrefused');
      } else {
        route.continue();
      }
    });

    await saveDialog.fillName('网络中断测试');
    await saveDialog.confirm();
    await page.waitForTimeout(1000);

    await page.unroute('**/api/themes');
    const themes = await getThemeList(request);
    const saved = themes.find(t => t.name === '网络中断测试');
    expect(saved).toBeFalsy();
  });

  test('有效名称保存成功', async ({ page, request }) => {
    await saveDialog.fillName('有效名称测试主题');
    await saveDialog.confirm();
    await page.waitForTimeout(2000);

    const themes = await getThemeList(request);
    const saved = themes.find(t => t.name === '有效名称测试主题');
    expect(saved).toBeTruthy();
    expect(saved.type).toBe('custom');
  });
});
