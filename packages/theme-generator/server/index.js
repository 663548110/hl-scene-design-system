const express = require('express');
const cors = require('cors');
const { getThemeList, getThemeVariables, THEMES } = require('./theme-service');
const themeStore = require('./theme-store');
const { connectDB, disconnectDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

// GET /api/themes - 获取主题列表
app.get('/api/themes', async (req, res) => {
  try {
    const list = await getThemeList(req.query.platform);
    res.json(list);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: '数据验证失败: ' + err.message });
    }
    console.error('GET /api/themes 错误:', err.message);
    res.status(500).json({ error: '数据库操作失败' });
  }
});

// GET /api/themes/:id/variables - 获取主题变量
app.get('/api/themes/:id/variables', async (req, res) => {
  try {
    const data = await getThemeVariables(req.params.id);
    if (!data) {
      return res.status(404).json({ error: '主题不存在: ' + req.params.id });
    }
    res.json(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: '数据验证失败: ' + err.message });
    }
    console.error('GET /api/themes/:id/variables 错误:', err.message);
    res.status(500).json({ error: '数据库操作失败' });
  }
});

// POST /api/themes - 创建自定义主题
app.post('/api/themes', async (req, res) => {
  const { name, platform, variables, brandColor } = req.body;

  if (!name) {
    return res.status(400).json({ error: '缺少必填字段: name' });
  }
  if (!variables) {
    return res.status(400).json({ error: '缺少必填字段: variables' });
  }

  try {
    const theme = await themeStore.createCustomTheme({ name, platform, variables, brandColor });
    res.status(201).json(theme);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: '数据验证失败: ' + err.message });
    }
    console.error('POST /api/themes 错误:', err.message);
    res.status(500).json({ error: '数据库操作失败' });
  }
});

// PUT /api/themes/:id - 修改自定义主题
app.put('/api/themes/:id', async (req, res) => {
  const { id } = req.params;

  // 内置主题不可修改
  if (THEMES.some(t => t.id === id)) {
    return res.status(403).json({ error: '内置主题不可修改' });
  }

  // 非自定义主题 → 404
  if (!themeStore.isCustomTheme(id)) {
    return res.status(404).json({ error: '主题不存在: ' + id });
  }

  try {
    const { name, variables, brandColor } = req.body;
    const updated = await themeStore.updateCustomTheme(id, { name, variables, brandColor });
    if (!updated) {
      return res.status(404).json({ error: '主题不存在: ' + id });
    }
    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: '数据验证失败: ' + err.message });
    }
    console.error('PUT /api/themes/:id 错误:', err.message);
    res.status(500).json({ error: '数据库操作失败' });
  }
});

// DELETE /api/themes/:id - 删除自定义主题
app.delete('/api/themes/:id', async (req, res) => {
  const { id } = req.params;

  // 内置主题不可删除
  if (THEMES.some(t => t.id === id)) {
    return res.status(403).json({ error: '内置主题不可删除' });
  }

  // 非自定义主题 → 404
  if (!themeStore.isCustomTheme(id)) {
    return res.status(404).json({ error: '主题不存在: ' + id });
  }

  try {
    const removed = await themeStore.removeCustomTheme(id);
    if (!removed) {
      return res.status(404).json({ error: '主题不存在: ' + id });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: '数据验证失败: ' + err.message });
    }
    console.error('DELETE /api/themes/:id 错误:', err.message);
    res.status(500).json({ error: '数据库操作失败' });
  }
});

// 全局错误处理
app.use((err, _req, res, _next) => {
  console.error('服务器错误:', err.message);
  res.status(500).json({ error: '数据库操作失败' });
});

// 优雅关闭
async function shutdown() {
  console.log('正在关闭服务...');
  await disconnectDB();
  process.exit(0);
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// 启动服务
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log('RDesign Theme API running on http://localhost:' + PORT);
  });
}

// 导出 app 供测试使用
module.exports = app;

// 仅在直接运行时启动监听
if (require.main === module) {
  startServer().catch(err => {
    console.error('启动失败:', err.message);
    process.exit(1);
  });
}
