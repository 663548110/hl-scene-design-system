/**
 *  TODO 保证根目录下的 README_zh_CN.md 和 README.md 都能正确同步到其他位置
 * 
 *  集成在 release ci 上,在发版前（使用 tdesign-bot push 文档代码）
 * 
 *  1. 需要将根目录 README_zh_CN.md 复制到 rdesign-component/README_zh_CN.md
 *  2. 需要将根目录 README.md 复制到 rdesign-component/README.md
 *  3. 需要将根目录 README_zh_CN 复制到 rdesign-site/site/docs/getting-started.md
 *  
 *  集成在 rdesign-site 的 pnpm i 后
 *  1. 需要在 rdesign-site pnpm i 后,将根目录 README_zh_CN.md 复制到 rdesign-site/site/docs/getting-started.md
 */

const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(__dirname, '../../README_zh_CN.md');
const targetPath = path.resolve(__dirname, '../site/docs/getting-started.md');

// RDesign: getting-started.md 已独立维护，不再从 README_zh_CN.md 覆盖
if (!fs.existsSync(targetPath)) {
  fs.copyFileSync(sourcePath, targetPath);
  console.log('✅ README_zh_CN.md 已复制到 site/docs/getting-started.md');
} else {
  console.log('ℹ️  site/docs/getting-started.md 已存在，跳过覆盖');
}
