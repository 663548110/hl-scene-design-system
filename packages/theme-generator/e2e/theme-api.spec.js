const { test, expect } = require('@playwright/test');
const { cleanupCustomThemes, createThemeViaAPI, getThemeList, API_BASE } = require('./helpers');

const TEST_VARIABLES = {
  color: { brand: { light: { 1: '#f2f3ff' }, dark: { 1: '#1b2670' } } },
  basic: {},
  component: {},
};

test.describe('主题 CRUD API 生命周期', () => {
  test.beforeEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test.afterEach(async ({ request }) => {
    await cleanupCustomThemes(request);
  });

  test('POST /api/themes 创建主题 → 返回 201 + 包含 id、name、variables', async ({ request }) => {
    const res = await request.post(`${API_BASE}/api/themes`, {
      data: { name: 'CRUD测试主题', variables: TEST_VARIABLES },
    });

    expect(res.status()).toBe(201);

    const theme = await res.json();
    expect(theme.id).toBeTruthy();
    expect(theme.id).toMatch(/^custom-/);
    expect(theme.name).toBe('CRUD测试主题');
    expect(theme.variables).toEqual(TEST_VARIABLES);
  });

  test('GET /api/themes 列表包含新主题且内置主题排在自定义主题之前', async ({ request }) => {
    // 先创建一个自定义主题
    await createThemeViaAPI(request, { name: '排序测试主题', variables: TEST_VARIABLES });

    const themes = await getThemeList(request);

    // 验证列表包含新主题
    const custom = themes.find(t => t.name === '排序测试主题');
    expect(custom).toBeTruthy();
    expect(custom.type).toBe('custom');

    // 验证内置主题排在自定义主题之前
    const lastBuiltInIndex = themes.reduce(
      (max, t, i) => (t.type === 'built-in' ? i : max), -1
    );
    const firstCustomIndex = themes.findIndex(t => t.type === 'custom');

    expect(lastBuiltInIndex).toBeGreaterThanOrEqual(0);
    expect(firstCustomIndex).toBeGreaterThanOrEqual(0);
    expect(lastBuiltInIndex).toBeLessThan(firstCustomIndex);
  });

  test('GET /api/themes/:id/variables 返回数据与创建时一致', async ({ request }) => {
    const created = await createThemeViaAPI(request, { name: '变量查询主题', variables: TEST_VARIABLES });

    const res = await request.get(`${API_BASE}/api/themes/${created.id}/variables`);
    expect(res.status()).toBe(200);

    const variables = await res.json();
    expect(variables).toEqual(TEST_VARIABLES);
  });

  test('PUT /api/themes/:id 更新主题 → 验证字段变更', async ({ request }) => {
    const created = await createThemeViaAPI(request, { name: '更新前名称', variables: TEST_VARIABLES });

    const updatedVariables = {
      color: { brand: { light: { 1: '#ff0000' }, dark: { 1: '#990000' } } },
      basic: {},
      component: {},
    };

    const res = await request.put(`${API_BASE}/api/themes/${created.id}`, {
      data: { name: '更新后名称', variables: updatedVariables },
    });

    expect(res.status()).toBe(200);

    const updated = await res.json();
    expect(updated.name).toBe('更新后名称');
    expect(updated.variables).toEqual(updatedVariables);
    expect(updated.id).toBe(created.id);
  });

  test('DELETE /api/themes/:id 删除主题 → 列表不再包含', async ({ request }) => {
    const created = await createThemeViaAPI(request, { name: '待删除主题', variables: TEST_VARIABLES });

    const deleteRes = await request.delete(`${API_BASE}/api/themes/${created.id}`);
    expect(deleteRes.status()).toBe(204);

    // 验证列表不再包含该主题
    const themes = await getThemeList(request);
    const found = themes.find(t => t.id === created.id);
    expect(found).toBeUndefined();
  });

  test('PUT/DELETE 内置主题 → 返回 403', async ({ request }) => {
    const builtInIds = ['mobile-TDesign', 'web-TDesign', 'web-TCloud'];

    for (const id of builtInIds) {
      const putRes = await request.put(`${API_BASE}/api/themes/${id}`, {
        data: { name: '非法修改', variables: TEST_VARIABLES },
      });
      expect(putRes.status()).toBe(403);

      const deleteRes = await request.delete(`${API_BASE}/api/themes/${id}`);
      expect(deleteRes.status()).toBe(403);
    }
  });
});
