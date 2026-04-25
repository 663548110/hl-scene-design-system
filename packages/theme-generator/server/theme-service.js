const fs = require('fs');
const path = require('path');
const { parseCssVariables, extractPalette, extractGrayPalette, extractFontColors, varRefToAlias } = require('./css-parser');
const themeStore = require('./theme-store');

const CSS_BASE = path.join(__dirname, '..', 'src', 'common', 'themes', 'built-in', 'css');

/**
 * 主题注册表
 * id 格式: {platform}-{themeName}
 */
const THEMES = [
  { id: 'web-TDesign', name: 'TDesign Web', platform: 'web', dir: 'TDesign', brandColor: '#0052D9' },
];

async function getThemeList(platform) {
  // 内置主题（排在前面），按 platform 过滤
  const builtIn = THEMES
    .filter(t => !platform || t.platform === platform)
    .map(t => {
      const cssDir = path.join(CSS_BASE, t.platform, t.dir);
      let updatedAt = null;
      try {
        const stat = fs.statSync(path.join(cssDir, 'light.css'));
        updatedAt = stat.mtime.toISOString();
      } catch (e) { /* ignore */ }
      return { id: t.id, name: t.name, type: 'built-in', platform: t.platform, brandColor: t.brandColor, updatedAt };
    });

  // 自定义主题（排在后面）
  const custom = await themeStore.listCustomThemes(platform);

  return [...builtIn, ...custom];
}

async function getThemeVariables(themeId) {
  // 自定义主题：从 ThemeStore 获取 variables
  if (themeStore.isCustomTheme(themeId)) {
    const custom = await themeStore.getCustomTheme(themeId);
    return custom ? custom.variables : null;
  }

  // 内置主题：从 CSS 文件解析
  const theme = THEMES.find(t => t.id === themeId);
  if (!theme) return null;

  const cssDir = path.join(CSS_BASE, theme.platform, theme.dir);
  const lightCss = fs.readFileSync(path.join(cssDir, 'light.css'), 'utf-8');
  const darkCss = fs.readFileSync(path.join(cssDir, 'dark.css'), 'utf-8');

  const lightVars = parseCssVariables(lightCss);
  const darkVars = parseCssVariables(darkCss);

  const color = buildColorLayer(lightVars, darkVars);
  const basic = buildBasicLayer(lightVars, darkVars);
  const component = buildComponentLayer(lightVars, darkVars);

  return { color, basic, component };
}

/**
 * 构建 color 层
 * 包含: brand/error/warning/success 各 10 级色板 + gray 14 级 + font white/gray 各 4 级
 */
function buildColorLayer(lightVars, darkVars) {
  const color = {};

  // 色板: brand, error, warning, success
  ['brand', 'error', 'warning', 'success'].forEach(palette => {
    color[palette] = {
      light: extractPalette(lightVars, palette),
      dark: extractPalette(darkVars, palette),
    };
  });

  // gray 色板 (14 级)
  color.gray = {
    light: extractGrayPalette(lightVars),
    dark: extractGrayPalette(darkVars),
  };

  // font 色组
  const lightFont = extractFontColors(lightVars);
  const darkFont = extractFontColors(darkVars);
  color.font = {
    white: { light: lightFont.white, dark: darkFont.white },
    gray: { light: lightFont.gray, dark: darkFont.gray },
  };

  return color;
}

/**
 * 构建 basic 层
 * 语义 token: brand-color, bg-color-*, text-color-*, border-*, mask-*, etc.
 * 值为 $color.xxx.N 别名引用 或 直接颜色值
 */
function buildBasicLayer(lightVars, darkVars) {
  const basic = {};

  // 定义需要提取的语义 token 前缀
  const semanticPrefixes = [
    'brand-color',
    'warning-color',
    'error-color',
    'success-color',
    'bg-color',
    'text-color',
    'border-level',
    'component-stroke',
    'component-border',
    'mask',
  ];

  // 收集所有语义 token (排除色板 xxx-color-{1-10} 和 font/gray 基础色)
  const isBasicToken = (key) => {
    // 排除色板: --td-{palette}-color-{N}
    if (/^--td-(brand|error|warning|success|gray)-color-\d+$/.test(key)) return false;
    // 排除 font 基础色
    if (/^--td-font-(white|gray)-\d+$/.test(key)) return false;
    // 排除 shadow/scrollbar/table/font-family/font-size/radius 等非颜色 token
    if (/^--td-(shadow|scrollbar|scroll-track|table-shadow|font-family|font-size|radius)/.test(key)) return false;
    // 匹配语义前缀
    return semanticPrefixes.some(prefix => key.indexOf('--td-' + prefix) === 0);
  };

  // 合并 light 和 dark 的 key
  const allKeys = new Set([...Object.keys(lightVars), ...Object.keys(darkVars)]);

  allKeys.forEach(key => {
    if (!isBasicToken(key)) return;

    const lightVal = lightVars[key];
    const darkVal = darkVars[key];
    if (!lightVal && !darkVal) return;

    // 转换 key: --td-brand-color -> brand/color, --td-bg-color-page -> bg/color/page
    const tokenName = cssVarToTokenName(key);

    var lightResolved = lightVal ? resolveBasicValue(lightVal, lightVars) : null;
    var darkResolved = darkVal ? resolveBasicValue(darkVal, darkVars) : null;

    // 如果某一侧缺失，跳过该 token（避免 fallback 品红色）
    if (!lightResolved || !darkResolved) return;

    basic[tokenName] = {
      light: lightResolved,
      dark: darkResolved,
    };
  });

  return basic;
}

/**
 * 将 CSS 变量名转为 token 路径名
 * --td-brand-color -> brand/color
 * --td-bg-color-page -> bg/color/page
 * --td-text-color-primary -> text/color/primary
 */
function cssVarToTokenName(cssVar) {
  // 去掉 --td- 前缀
  let name = cssVar.replace(/^--td-/, '');
  // 用 / 替换 -，但要注意 "color" 这个词的特殊处理
  // 策略: 按 - 分割，用 / 连接
  return name.replace(/-/g, '/');
}

/**
 * 解析 basic 层的值
 * var(--td-xxx) -> $color.xxx.N 别名
 * 直接值 -> 保持原样
 */
function resolveBasicValue(value, vars) {
  if (!value) return '#ff00ff';

  // 如果是 var() 引用
  if (value.indexOf('var(') === 0) {
    const alias = varRefToAlias(value, vars);
    if (alias) return alias;
    // 无法解析为别名，尝试解析实际值
    const m = value.match(/^var\(--(td-[\w-]+)\)$/);
    if (m) {
      const resolved = vars['--' + m[1]];
      if (resolved) return resolved;
    }
  }

  return value;
}

/**
 * 构建 component 层
 * 目前 CSS 中没有明确的组件级 token，
 * 所以 component 层暂时为空对象，后续可扩展
 * 
 * 注意: TDesign CSS 的语义 token 已经在 basic 层覆盖了
 * 组件级 token 需要在 rdesign-theme-generator 前端配置后才会有
 */
function buildComponentLayer(lightVars, darkVars) {
  // 目前 CSS 中没有独立的组件级 token
  // 返回空对象，Figma 插件会创建空的 component 集合
  // 后续可以在这里添加组件级 token 的映射逻辑
  return {};
}

module.exports = { getThemeList, getThemeVariables, THEMES };
