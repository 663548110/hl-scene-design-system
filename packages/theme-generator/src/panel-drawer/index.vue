<template>
  <t-drawer
    size="348px"
    :visible.sync="visible"
    :header="false"
    :closeBtn="false"
    :preventScrollThrough="false"
    :footer="false"
    showInAttachedElement
  >
    <div class="panel-drawer__body">
      <div class="panel-drawer__content">
        <sticky-theme-display @edit-name="handleEditName" />
        <div style="display: flex">
          <switch-tabs :activeTabIdx="activeTabIdx" @changeActiveTab="changeActiveTab" />
          <color-panel :key="`${$refreshId}-color`" v-show="activeTabIdx === ACTIVE_TAB_MAP.color" />
          <font-panel :key="`${$refreshId}-font`" v-show="activeTabIdx === ACTIVE_TAB_MAP.font" />
          <radius-panel :key="`${$refreshId}-radius`" v-show="activeTabIdx === ACTIVE_TAB_MAP.radius" />
          <shadow-panel :key="`${$refreshId}-shadow`" v-show="activeTabIdx === ACTIVE_TAB_MAP.shadow" />
          <size-panel :key="`${$refreshId}-size`" v-show="activeTabIdx === ACTIVE_TAB_MAP.size" />
        </div>
      </div>
      <div class="panel-drawer__footer">
        <t-button theme="primary" block @click="handleSaveTheme">
          {{ saveButtonText }}
        </t-button>
        <t-button variant="base" block @click="handleReset" style="margin-top: 8px">
          {{ isEn ? 'Reset' : '重置' }}
        </t-button>
      </div>
    </div>
    <save-theme-dialog
      :visible.sync="showSaveDialog"
      :edit-mode="isCustomTheme"
      :theme-id="themeStore.theme.id || ''"
      @saved="handleThemeSaved"
    />
  </t-drawer>
</template>

<script>
import { Drawer as TDrawer, Button as TButton } from 'tdesign-vue';

import { langMixin } from '@/common/i18n';
import { themeStore } from '@/common/themes';
import { handleAttach } from '@/common/utils';
import SaveThemeDialog from '@/common/components/SaveThemeDialog.vue';

import ColorPanel from '../color-panel';
import FontPanel from '../font-panel';
import RadiusPanel from '../radius-panel';
import ShadowPanel from '../shadow-panel';
import SizePanel from '../size-panel';

import StickyThemeDisplay from './components/StickyThemeDisplay';
import SwitchTabs from './components/SwitchTabs';

const ACTIVE_TAB_MAP = {
  color: 0,
  font: 1,
  radius: 2,
  shadow: 3,
  size: 4,
};

export default {
  name: 'PanelDrawer',
  components: {
    TDrawer,
    TButton,
    SwitchTabs,
    StickyThemeDisplay,
    ColorPanel,
    FontPanel,
    RadiusPanel,
    ShadowPanel,
    SizePanel,
    SaveThemeDialog,
  },
  mixins: [langMixin],
  props: {
    showSetting: {
      type: [String, Boolean],
    },
    theme: {
      type: [Object, String],
    },
    drawerVisible: {
      type: [String, Number, Boolean],
    },
  },
  data() {
    return {
      ACTIVE_TAB_MAP,
      isHeaderShow: true,
      activeTabIdx: ACTIVE_TAB_MAP.color,
      visible: false,
      showSaveDialog: false,
    };
  },
  computed: {
    $refreshId() {
      return themeStore.refreshId;
    },
    // 当前主题是否为可编辑的自定义主题
    isCustomTheme() {
      return themeStore.isCurrentCustomTheme;
    },
    // 保存按钮动态文案：自定义主题显示"更新主题"，否则显示"保存主题"
    saveButtonText() {
      if (this.isCustomTheme) {
        return this.isEn ? 'Update Theme' : '更新主题';
      }
      return this.isEn ? 'Save Theme' : '保存主题';
    },
    // 暴露 themeStore 给模板使用
    themeStore() {
      return themeStore;
    },
  },
  watch: {
    drawerVisible(v) {
      if ((typeof v === 'string' && v === 'false') || v === false) {
        this.visible = false;
        return;
      }
      this.visible = true;
    },
    visible(v) {
      this.$emit('panel-drawer-visible', v);
    },
  },
  methods: {
    handleAttach,
    changeActiveTab(tab) {
      this.activeTabIdx = tab;
    },
    async handleSaveTheme() {
      // 自定义主题：直接调用 PUT 更新，不弹对话框
      if (this.isCustomTheme) {
        try {
          const light = document.getElementById('custom-theme')?.textContent || '';
          const dark = document.getElementById('custom-theme-dark')?.textContent || '';
          const extra = document.getElementById('custom-theme-extra')?.textContent || '';

          const res = await fetch(`/api/themes/${themeStore.theme.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: themeStore.theme.name,
              variables: { light, dark, extra },
              brandColor: themeStore.brandColor,
            }),
          });

          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Update failed');
          }

          await themeStore.fetchApiThemes();
          // 同步品牌色到当前主题，确保列表色块显示正确
          themeStore.theme.value = themeStore.brandColor;
          this.$root.$emit('theme-saved');
        } catch (err) {
          console.error('更新主题失败:', err.message);
        }
        return;
      }

      // 内置/无 id 主题：弹出 SaveThemeDialog（新增模式）
      this.showSaveDialog = true;
    },
    handleEditName() {
      this.showSaveDialog = true;
    },
    handleReset() {
      themeStore.resetTheme();
    },
    handleThemeSaved(id) {
      // 将新主题 id/type/value 回写到 ThemeStore，使后续保存进入编辑模式
      if (id) {
        themeStore.theme.id = id;
        themeStore.theme.type = 'custom';
        themeStore.theme.value = themeStore.brandColor;
      }
      this.$root.$emit('theme-saved');
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .t-drawer__mask {
  background: none;
}

/deep/ .t-drawer__content-wrapper {
  box-shadow: var(--shadow-2);
  border-radius: 12px 0 0 0;
  position: fixed;
  .t-drawer__body {
    padding: 0;
    background: var(--bg-color-theme-transparent);
    backdrop-filter: blur(10px);
  }
}

/deep/ .t-popup__content {
  font-size: 14px;
  box-shadow: var(--shadow-2), var(--shadow-inset-top), var(--shadow-inset-right), var(--shadow-inset-bottom),
    var(--shadow-inset-left);
}

/deep/ .t-popup__content:not(.t-tooltip) {
  background: var(--bg-color-container);
}

/deep/ .t-popup[data-popper-placement='bottom-end'] .t-popup__arrow {
  left: calc(100% - 16px * 2);
}

/deep/ .t-popup[data-popper-placement='bottom-start'] .t-popup__arrow {
  left: 20px;
}

/deep/ .t-popup__content:not(.t-tooltip) .t-popup__arrow:before {
  background: var(--bg-color-container);
}

/deep/ .t-select__list {
  padding: 0;
}

/deep/ .t-button--variant-text:hover {
  background: var(--bg-color-container-hover);
}

/deep/ .t-input {
  padding-left: 4px !important;
}

.panel-drawer__body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-drawer__content {
  flex: 1;
  overflow: hidden;
}

.panel-drawer__footer {
  flex-shrink: 0;
  padding: 12px 16px;
  border-top: 1px solid var(--theme-component-border);
  background: var(--bg-color-theme-transparent);
  backdrop-filter: blur(10px);
}
</style>
