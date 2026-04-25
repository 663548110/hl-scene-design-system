const { test, expect } = require('@playwright/test');
const {
  cleanupCustomThemes,
  createThemeViaAPI,
  getThemeList,
  getThemeVariables,
  updateThemeViaAPI,
  deleteThemeViaAPI,
} = require('./helpers/api');

const API_BASE = 'http://localhost:3200';

const testVariables = { light: '--brand-color: #0052D9;', dark: '', extra: '' };

test.describe('API CRUD 生命周期测试', () => {
  test.beforeEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('POST 创建主题：返回 201，响应体包含 id、name、variables', async ({ request }) => {
    const res = await request.post(`${API_BASE}/api/themes`, {
      data: { name: 'CRUD测试主题', variables: testVariables, platform: 'web' },
    });
    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body.id).toMatch(/^custom-/);
    expect(body.name).toBe('CRUD测试主题');
    expect(body.variables).toBeDefined();
  });

  test('GET 列表包含新创建的主题', async ({ request }) => {
    const created = await createThemeViaAPI(request, {
      name: '列表测试主题',
      variables: testVariables,
    });
    const themes = await getThemeList(request);
    const found = themes.find(t => t.id === created.id);
    expect(found).toBeTruthy();
    expect(found.name).toBe('列表测试主题');
  });

  test('GET 变量：返回 200，variables 与创建时深度相等', async ({ request }) => {
    const created = await createThemeViaAPI(request, {
      name: '变量测试主题',
      variables: testVariables,
    });
    const { status, body } = await getThemeVariables(request, created.id);
    expect(status).toBe(200);
    expect(body).toEqual(testVariables);
  });

  test('PUT 更新主题：返回 200，name/variables 反映更新，id 不变', async ({ request }) => {
    const created = await createThemeViaAPI(request, {
      name: '更新前主题',
      variables: testVariables,
    });
    const updatedVars = { light: '--brand-color: #FF0000;', dark: '', extra: '' };
    const { status, body } = await updateThemeViaAPI(request, created.id, {
      name: '更新后主题',
      variables: updatedVars,
    });
    expect(status).toBe(200);
    expect(body.name).toBe('更新后主题');
    expect(body.id).toBe(created.id);

    const { body: readBody } = await getThemeVariables(request, created.id);
    expect(readBody).toEqual(updatedVars);
  });

  test('DELETE 删除主题：返回 204', async ({ request }) => {
    const created = await createThemeViaAPI(request, {
      name: '删除测试主题',
      variables: testVariables,
    });
    const { status } = await deleteThemeViaAPI(request, created.id);
    expect(status).toBe(204);
  });

  test('删除后 GET 列表不包含该主题，GET 变量返回 404', async ({ request }) => {
    const created = await createThemeViaAPI(request, {
      name: '删除验证主题',
      variables: testVariables,
    });
    await deleteThemeViaAPI(request, created.id);

    const themes = await getThemeList(request);
    expect(themes.find(t => t.id === created.id)).toBeFalsy();

    const { status } = await getThemeVariables(request, created.id);
    expect(status).toBe(404);
  });

  test('PUT 内置主题返回 403', async ({ request }) => {
    const themes = await getThemeList(request);
    const builtIn = themes.find(t => t.type === 'built-in');
    expect(builtIn).toBeTruthy();

    const { status } = await updateThemeViaAPI(request, builtIn.id, { name: 'hacked' });
    expect(status).toBe(403);
  });

  test('DELETE 内置主题返回 403', async ({ request }) => {
    const themes = await getThemeList(request);
    const builtIn = themes.find(t => t.type === 'built-in');
    expect(builtIn).toBeTruthy();

    const { status } = await deleteThemeViaAPI(request, builtIn.id);
    expect(status).toBe(403);
  });

  test('POST 缺少必填字段返回 400', async ({ request }) => {
    const res = await request.post(`${API_BASE}/api/themes`, {
      data: { name: '缺少variables' },
    });
    expect(res.status()).toBe(400);
  });

  test('GET 不存在的主题变量返回 404', async ({ request }) => {
    const { status } = await getThemeVariables(request, 'nonexistent-id-12345');
    expect(status).toBe(404);
  });
});
