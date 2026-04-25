const { test, expect } = require('@playwright/test');
const { cleanupCustomThemes, enterEditMode, openSaveDialog, getThemeList } = require('./helpers');

test.describe('保存主题完整流程', () => {
  test.beforeEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('进入编辑模式 → 点击保存 → 输入名称 → 确认 → 成功提示出现且对话框关闭', async ({ page }) => {
    await page.goto('/');

    // 等待保存按钮可见（进入编辑模式）
    await enterEditMode(page);

    // 点击保存按钮，验证对话框弹出
    await openSaveDialog(page);
    await expect(page.locator('.t-dialog')).toBeVisible();

    // 在输入框中输入主题名称
    await page.locator('.t-dialog .t-input__inner').fill('E2E 测试主题');

    // 点击确认按钮
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();

    // 验证成功提示出现
    await expect(page.locator('.t-message')).toBeVisible({ timeout: 5000 });

    // 验证对话框已关闭
    await expect(page.locator('.t-dialog')).not.toBeVisible({ timeout: 5000 });
  });

  test('保存成功后通过 API 验证新主题出现在列表中', async ({ page, request }) => {
    await page.goto('/');

    await enterEditMode(page);
    await openSaveDialog(page);

    const themeName = 'API验证主题';
    await page.locator('.t-dialog .t-input__inner').fill(themeName);
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();

    // 等待成功提示出现，确认保存完成
    await expect(page.locator('.t-message')).toBeVisible({ timeout: 5000 });

    // 通过 GET /api/themes 验证新主题出现在列表中
    const themes = await getThemeList(request);
    const saved = themes.find(t => t.name === themeName);
    expect(saved).toBeTruthy();
    expect(saved.type).toBe('custom');
    expect(saved.id).toBeTruthy();
  });
});

test.describe('保存主题表单校验', () => {
  test.beforeEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('不输入名称直接点击确认 → 对话框保持打开 + 显示校验错误提示', async ({ page }) => {
    await page.goto('/');
    await enterEditMode(page);
    await openSaveDialog(page);

    // 不输入任何内容，直接点击确认
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();

    // 验证对话框保持打开
    await expect(page.locator('.t-dialog')).toBeVisible();

    // 验证校验错误提示出现
    await expect(page.locator('.t-dialog').getByText('请输入主题名称')).toBeVisible();
  });

  test('输入纯空白字符后点击确认 → 对话框保持打开 + 显示校验错误提示', async ({ page }) => {
    await page.goto('/');
    await enterEditMode(page);
    await openSaveDialog(page);

    // 输入纯空白字符
    await page.locator('.t-dialog .t-input__inner').fill('   ');

    // 点击确认
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();

    // 验证对话框保持打开
    await expect(page.locator('.t-dialog')).toBeVisible();

    // 验证校验错误提示出现
    await expect(page.locator('.t-dialog').getByText('请输入主题名称')).toBeVisible();
  });

  test('校验失败后输入有效名称重新提交 → 校验错误消失 + 保存成功', async ({ page }) => {
    await page.goto('/');
    await enterEditMode(page);
    await openSaveDialog(page);

    // 先触发校验错误
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();
    await expect(page.locator('.t-dialog').getByText('请输入主题名称')).toBeVisible();

    // 输入有效名称（input 的 @change 会清除错误）
    await page.locator('.t-dialog .t-input__inner').fill('校验恢复主题');

    // 触发 change 事件（fill 后 blur 或再次聚焦可触发）
    await page.locator('.t-dialog .t-input__inner').press('Tab');

    // 验证校验错误消失
    await expect(page.locator('.t-dialog').getByText('请输入主题名称')).not.toBeVisible({ timeout: 3000 });

    // 重新点击确认
    await page.locator('.t-dialog__footer .t-button--theme-primary').click();

    // 验证保存成功：成功提示出现
    await expect(page.locator('.t-message')).toBeVisible({ timeout: 5000 });

    // 验证对话框关闭
    await expect(page.locator('.t-dialog')).not.toBeVisible({ timeout: 5000 });
  });
});

