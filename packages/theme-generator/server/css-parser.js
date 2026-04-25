/**
 * CSS 变量解析器
 * 将 TDesign CSS 变量文件解析为结构化对象
 */

/**
 * 解析 CSS 文件内容，提取所有 --td-* 变量
 * @param {string} css - CSS 文件内容
 * @returns {Object} { varName: value } 映射
 */
function parseCssVariables(css) {
  const vars = {};
  // 匹配 --td-xxx: value;
  const re = /--(td-[\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    vars['--' + m[1]] = m[2].trim();
  }
  return vars;
}

/**
 * 从变量映射中提取色板数组 (brand/error/warning/success)
 * @param {Object} vars - CSS 变量映射
 * @param {string} palette - 色板名称 (brand/error/warning/success)
 * @returns {string[]} 10 个颜色值的数组
 */
function extractPalette(vars, palette) {
  const colors = [];
  for (let i = 1; i <= 10; i++) {
    const key = '--td-' + palette + '-color-' + i;
    colors.push(vars[key] || '#ff00ff');
  }
  return colors;
}

/**
 * 提取 gray 色板 (14 级)
 */
function extractGrayPalette(vars) {
  const colors = [];
  for (let i = 1; i <= 14; i++) {
    const key = '--td-gray-color-' + i;
    colors.push(vars[key] || '#ff00ff');
  }
  return colors;
}

/**
 * 提取 font 色组 (white 4级, gray 4级)
 */
function extractFontColors(vars) {
  const white = [], gray = [];
  for (let i = 1; i <= 4; i++) {
    white.push(vars['--td-font-white-' + i] || '#ff00ff');
    gray.push(vars['--td-font-gray-' + i] || '#ff00ff');
  }
  return { white, gray };
}

/**
 * 将 var(--td-xxx-color-N) 引用转为 $color.xxx.N 别名格式
 */
function varRefToAlias(value, vars) {
  // 匹配 var(--td-xxx)
  const m = value.match(/^var\(--(td-[\w-]+)\)$/);
  if (!m) return null;

  const varName = '--' + m[1];
  const fullName = m[1]; // e.g. td-brand-color-7

  // 色板引用: td-{palette}-color-{N}
  const paletteMatch = fullName.match(/^td-(brand|error|warning|success)-color-(\d+)$/);
  if (paletteMatch) {
    return '$color.' + paletteMatch[1] + '.' + paletteMatch[2];
  }

  // gray 色板引用: td-gray-color-{N}
  const grayMatch = fullName.match(/^td-gray-color-(\d+)$/);
  if (grayMatch) {
    return '$color.gray.' + grayMatch[1];
  }

  // font 引用: td-font-{white|gray}-{N}
  const fontMatch = fullName.match(/^td-font-(white|gray)-(\d+)$/);
  if (fontMatch) {
    return '$color.font/' + fontMatch[1] + '.' + fontMatch[2];
  }

  // 语义色引用: td-brand-color -> 需要查找实际值
  const semanticMatch = fullName.match(/^td-(brand|error|warning|success)-color$/);
  if (semanticMatch) {
    // 这是一个语义别名，引用的是另一个 var()
    const resolved = vars[varName];
    if (resolved && resolved.indexOf('var(') === 0) {
      return varRefToAlias(resolved, vars);
    }
  }

  return null;
}

module.exports = {
  parseCssVariables,
  extractPalette,
  extractGrayPalette,
  extractFontColors,
  varRefToAlias,
};
