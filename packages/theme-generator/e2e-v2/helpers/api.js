const API_BASE = 'http://localhost:3200';

async function cleanupCustomThemes(request) {
  const res = await request.get(`${API_BASE}/api/themes`);
  const themes = await res.json();
  if (!Array.isArray(themes)) return;
  for (const theme of themes) {
    if (theme.type === 'custom') {
      await request.delete(`${API_BASE}/api/themes/${theme.id}`);
    }
  }
}

async function createThemeViaAPI(request, { name, variables, platform }) {
  const res = await request.post(`${API_BASE}/api/themes`, {
    data: { name, variables, platform },
  });
  return res.json();
}

async function getThemeList(request, platform) {
  const url = platform
    ? `${API_BASE}/api/themes?platform=${platform}`
    : `${API_BASE}/api/themes`;
  const res = await request.get(url);
  return res.json();
}

async function getThemeVariables(request, id) {
  const res = await request.get(`${API_BASE}/api/themes/${id}/variables`);
  return { status: res.status(), body: await res.json() };
}

async function updateThemeViaAPI(request, id, data) {
  const res = await request.put(`${API_BASE}/api/themes/${id}`, { data });
  return { status: res.status(), body: await res.json() };
}

async function deleteThemeViaAPI(request, id) {
  const res = await request.delete(`${API_BASE}/api/themes/${id}`);
  return { status: res.status() };
}

module.exports = {
  cleanupCustomThemes,
  createThemeViaAPI,
  getThemeList,
  getThemeVariables,
  updateThemeViaAPI,
  deleteThemeViaAPI,
};
