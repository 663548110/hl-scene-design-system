const API_BASE = 'http://localhost:3200';

/**
 * 清理所有自定义主题（通过 API）
 * @param {import('@playwright/test').APIRequestContext} request
 */
async function cleanupCustomThemes(request) {
  const res = await request.get(`${API_BASE}/api/themes`);
  const themes = await res.json();
  for (const theme of themes) {
    if (theme.type === 'custom') {
      await request.delete(`${API_BASE}/api/themes/${theme.id}`);
    }
  }
}

/**
 * 通过 API 创建一个自定义主题，返回主题对象
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {{ name: string, variables: object }} data
 */
async function createThemeViaAPI(request, { name, variables }) {
  const res = await request.post(`${API_BASE}/api/themes`, {
    data: { name, variables },
  });
  return res.json();
}

/**
 * 获取主题列表
 * @param {import('@playwright/test').APIRequestContext} request
 */
async function getThemeList(request) {
  const res = await request.get(`${API_BASE}/api/themes`);
  return res.json();
}

/**
 * 进入编辑模式 — 在独立 App.vue 中保存按钮始终可见，等待其出现即可
 * @param {import('@playwright/test').Page} page
 */
async function enterEditMode(page) {
  await page.waitForSelector('.save-btn', { state: 'visible' });
}

/**
 * 打开保存对话框
 * @param {import('@playwright/test').Page} page
 */
async function openSaveDialog(page) {
  await page.click('.save-btn');
  await page.waitForSelector('.t-dialog', { state: 'visible' });
}

module.exports = {
  API_BASE,
  cleanupCustomThemes,
  createThemeViaAPI,
  getThemeList,
  enterEditMode,
  openSaveDialog,
};
