const { test, expect } = require('@playwright/test');
const fc = require('fast-check');
const {
  cleanupCustomThemes,
  createThemeViaAPI,
  getThemeList,
  getThemeVariables,
  updateThemeViaAPI,
  deleteThemeViaAPI,
} = require('./helpers/api');

test.describe('API 属性测试', () => {
  test.beforeEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('fast-check 基础设施验证', async () => {
    // 验证 fast-check 可以正常导入和运行
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 100 }), async (n) => {
        expect(n).toBeGreaterThan(0);
      }),
      { numRuns: 5 }
    );
  });
});
