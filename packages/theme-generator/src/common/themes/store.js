import Vue from 'vue';

import { DEFAULT_THEME_META, TDESIGN_WEB_THEME } from './built-in';
import { clearLocalTheme, getDefaultTheme, getOptionFromLocal, initThemeStyleSheet, initThemeStyleSheetAsync, updateLocalOption } from './core';

function getInitialTheme(device = 'web') {
  const localThemeName = getOptionFromLocal('theme') || DEFAULT_THEME_META.enName;
  const theme = initThemeStyleSheet(localThemeName, device);
  return theme;
}

export const themeStore = Vue.observable({
  device: 'web',
  theme: getInitialTheme('web'),
  brandColor: getOptionFromLocal('color') || DEFAULT_THEME_META.value,
  refreshId: 0, // 用于强制刷新绑定了 key 的组件 UI
  apiThemes: [], // 预加载的 API 主题列表
  apiThemesLoaded: false,
  updateDevice(device) {
    this.device = device;
    this.theme = getInitialTheme(device);
    this.fetchApiThemes();
  },
  async updateTheme(theme) {
    // 保留 API 主题的 id 和 type 字段，确保编辑/删除操作能正确识别目标主题
    this.theme = { ...theme };
    if (theme.id && theme.id.startsWith('custom-')) {
      await initThemeStyleSheetAsync(theme.id, this.device);
    } else {
      initThemeStyleSheet(theme.enName, this.device);
    }
    clearLocalTheme();
    updateLocalOption('theme', theme.enName !== DEFAULT_THEME_META.enName ? theme.enName : null);
    this.updateBrandColor(theme.value);
    this.incrementRefreshId();
  },
  resetTheme() {
    this.updateTheme(getDefaultTheme(this.device));
  },
  updateBrandColor(color) {
    this.brandColor = color;
    document.documentElement.style.setProperty('--brand-main', color);
  },
  incrementRefreshId() {
    this.refreshId++;
  },
  async fetchApiThemes() {
    try {
      const platform = this.device || 'web';
      const res = await fetch(`/api/themes?platform=${platform}`);
      if (!res.ok) throw new Error('API error');
      this.apiThemes = await res.json();
      this.apiThemesLoaded = true;
    } catch (err) {
      console.warn('API 获取主题失败，使用本地数据:', err.message);
      this.apiThemes = [];
      this.apiThemesLoaded = true;
    }
  },
});

// 应用启动时预加载 API 主题
themeStore.fetchApiThemes();

// 判断当前主题是否为可编辑的自定义主题（id 以 'custom-' 开头）
Object.defineProperty(themeStore, 'isCurrentCustomTheme', {
  get() {
    return !!(themeStore.theme.id && themeStore.theme.id.startsWith('custom-'));
  },
  enumerable: true,
});
