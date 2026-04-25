const crypto = require('crypto');
const Theme = require('./theme-model');

/**
 * 生成自定义主题 ID
 * 格式: custom-{timestamp}-{random6}
 */
function generateId() {
  const timestamp = Date.now();
  const random = crypto.randomBytes(3).toString('hex');
  return `custom-${timestamp}-${random}`;
}

/**
 * 从 variables 对象的 CSS 文本中提取品牌色（--td-brand-color-7 的值）
 * @param {{ light?: string, dark?: string, extra?: string } | null | undefined} variables
 * @returns {string | null} 提取到的颜色值，或 null
 */
function extractBrandColorFromVariables(variables) {
  if (!variables) return null;
  const regex = /--td-brand-color-7\s*:\s*([^;]+);/;
  const sources = [variables.light, variables.dark];
  for (const src of sources) {
    if (typeof src === 'string' && src.length > 0) {
      const match = src.match(regex);
      if (match) {
        return match[1].trim();
      }
    }
  }
  return null;
}


/**
 * 将 Mongoose 文档映射为 API 返回的主题摘要对象
 */
function toSummary(doc) {
  return {
    id: doc.themeId,
    name: doc.name,
    platform: doc.platform,
    type: 'custom',
    brandColor: doc.brandColor || extractBrandColorFromVariables(doc.variables) || '#0052D9',
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

/**
 * 将 Mongoose 文档映射为 API 返回的主题完整对象
 */
function toDetail(doc) {
  return {
    id: doc.themeId,
    name: doc.name,
    platform: doc.platform,
    variables: doc.variables,
    brandColor: doc.brandColor || extractBrandColorFromVariables(doc.variables) || '#0052D9',
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

/**
 * 获取所有自定义主题的摘要列表
 * @param {string} [platform] - 可选平台过滤
 * @returns {Promise<Array<{ id, name, platform, type, createdAt, updatedAt }>>}
 */
async function listCustomThemes(platform) {
  const filter = {};
  if (platform) {
    filter.platform = platform;
  }
  const docs = await Theme.find(filter).sort({ updatedAt: -1 });
  return docs.map(toSummary);
}

/**
 * 根据 id 获取自定义主题完整数据
 * @param {string} id - 主题 themeId
 * @returns {Promise<Object|null>}
 */
async function getCustomTheme(id) {
  const doc = await Theme.findOne({ themeId: id });
  return doc ? toDetail(doc) : null;
}

/**
 * 创建自定义主题
 * @param {{ name: string, platform?: string, variables: object }} data
 * @returns {Promise<Object>} 创建的主题对象
 */
async function createCustomTheme({ name, platform, variables, brandColor }) {
  const themeId = generateId();
  const theme = new Theme({
    themeId,
    name,
    platform: platform || 'web',
    variables,
    brandColor: brandColor || extractBrandColorFromVariables(variables) || '#0052D9',
  });
  const saved = await theme.save();
  return toDetail(saved);
}

/**
 * 更新自定义主题
 * @param {string} id - 主题 themeId
 * @param {{ name?: string, variables?: object }} updates
 * @returns {Promise<Object|null>}
 */
async function updateCustomTheme(id, { name, variables, brandColor }) {
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (variables !== undefined) updateFields.variables = variables;
  if (brandColor !== undefined) updateFields.brandColor = brandColor;

  const doc = await Theme.findOneAndUpdate(
    { themeId: id },
    updateFields,
    { new: true }
  );
  return doc ? toDetail(doc) : null;
}

/**
 * 删除自定义主题
 * @param {string} id - 主题 themeId
 * @returns {Promise<boolean>}
 */
async function removeCustomTheme(id) {
  const doc = await Theme.findOneAndDelete({ themeId: id });
  return doc !== null;
}

/**
 * 判断 id 是否为自定义主题
 * @param {string} id
 * @returns {boolean}
 */
function isCustomTheme(id) {
  return typeof id === 'string' && id.startsWith('custom-');
}

module.exports = {
  generateId,
  extractBrandColorFromVariables,
  toSummary,
  toDetail,
  listCustomThemes,
  getCustomTheme,
  createCustomTheme,
  updateCustomTheme,
  removeCustomTheme,
  isCustomTheme,
};
