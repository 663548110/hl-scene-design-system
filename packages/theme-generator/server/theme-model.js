const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  themeId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    enum: ['web', 'mobile'],
    default: 'web',
    index: true,
  },
  variables: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  // 品牌色，用于主题列表色块展示
  brandColor: {
    type: String,
    default: '#0052D9',
  },
}, {
  timestamps: true,
  collection: 'themes',
});

// 复合索引：按平台查询 + 按更新时间排序
themeSchema.index({ platform: 1, updatedAt: -1 });

module.exports = mongoose.model('Theme', themeSchema);
