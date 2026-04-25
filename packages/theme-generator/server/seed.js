/**
 * 种子数据迁移脚本
 * 将 TDesign Mobile 和 TCloud Web 主题从 built-in CSS 文件迁移到 MongoDB
 *
 * 运行: node server/seed.js
 *
 * 幂等：已存在的 themeId 会跳过，不会重复插入
 */
const fs = require('fs');
const path = require('path');
const { connectDB, disconnectDB } = require('./db');
const Theme = require('./theme-model');

const CSS_BASE = path.join(__dirname, '..', 'src', 'common', 'themes', 'built-in', 'css');

/**
 * 需要迁移到 MongoDB 的主题定义
 * platform + dir 用于定位 CSS 文件目录
 */
const SEED_THEMES = [
  { themeId: 'mobile-TDesign', name: 'TDesign Mobile', platform: 'mobile', dir: 'TDesign' },
  { themeId: 'web-TCloud', name: 'TCloud Web', platform: 'web', dir: 'TCloud' },
];

/**
 * 从 CSS 目录读取 light/dark/extra 三套变量文本
 * @param {string} cssDir - CSS 文件所在目录
 * @returns {{ light: string, dark: string, extra: string }}
 */
function readCssVariables(cssDir) {
  const light = fs.readFileSync(path.join(cssDir, 'light.css'), 'utf-8');
  const dark = fs.readFileSync(path.join(cssDir, 'dark.css'), 'utf-8');

  let extra = '';
  const extraPath = path.join(cssDir, 'extra.css');
  if (fs.existsSync(extraPath)) {
    extra = fs.readFileSync(extraPath, 'utf-8');
  }

  return { light, dark, extra };
}

/**
 * 执行种子数据迁移
 */
async function seed() {
  await connectDB();

  for (const t of SEED_THEMES) {
    // 幂等检查：已存在则跳过
    const existing = await Theme.findOne({ themeId: t.themeId });
    if (existing) {
      console.log(`跳过: ${t.themeId} 已存在`);
      continue;
    }

    // 读取 CSS 文件
    const cssDir = path.join(CSS_BASE, t.platform, t.dir);
    const variables = readCssVariables(cssDir);

    // 写入 MongoDB
    await Theme.create({
      themeId: t.themeId,
      name: t.name,
      platform: t.platform,
      variables,
    });

    console.log(`已创建: ${t.themeId} (${t.name})`);
  }

  await disconnectDB();
  console.log('种子数据迁移完成');
}

seed().catch((err) => {
  console.error('种子数据迁移失败:', err.message);
  process.exit(1);
});
