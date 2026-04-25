<template>
  <!-- FIXME：这个布局是不合理的...但鉴于 type 目前只有 "官方推荐" 一种，所以暂时如此 -->
  <div class="recommend-theme">
    <div :key="idx" v-for="(type, idx) in recommendedThemes">
      <div class="recommend-theme__title">
        {{ isEn ? type.enTitle : type.title }}
      </div>
      <div class="recommend-theme__flex">
        <div v-for="(theme, themeIdx) in type.options" :key="themeIdx" @click="handleChangeTheme(theme)">
          <div
            class="recommend-theme__flex-theme"
            :style="{
              'background-color': theme.value,
            }"
          >
            <div v-html="theme.subtitle"></div>
            <div v-if="theme.enName === $theme.enName" class="recommend-theme__flex-theme--active">
              <picked-svg />
            </div>
            <!-- 自定义主题显示删除按钮，内置主题不显示 -->
            <div
              v-if="theme.type === 'custom'"
              class="recommend-theme__flex-theme--delete"
              @click.stop="handleDeleteTheme(theme)"
            >
              <delete-icon size="14" />
            </div>
          </div>
          <p
            :style="{
              margin: '4px 0',
              'text-align': 'center',
              'font-size': '12px',
              'line-height': '20px',
            }"
          >
            {{ isEn ? theme.enName : theme.name }}
          </p>
        </div>
        <!-- 新增主题入口：打开编辑抽屉 -->
        <div @click="handleAddTheme">
          <div class="recommend-theme__flex-theme recommend-theme__flex-theme--add">
            <add-icon size="24" />
          </div>
          <p
            :style="{
              margin: '4px 0',
              'text-align': 'center',
              'font-size': '12px',
              'line-height': '20px',
            }"
          >
            {{ isEn ? 'Add Theme' : '新增主题' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { langMixin } from '@/common/i18n';
import { getRecommendThemes, themeStore } from '@/common/themes';
import { AddIcon, DeleteIcon } from 'tdesign-icons-vue';
import { DialogPlugin } from 'tdesign-vue';
import PickedSvg from './PickedSvg.vue';

const DEFAULT_BRAND_COLOR = '#0052D9';

export default {
  name: 'RecommendThemes',
  mixins: [langMixin],
  computed: {
    currentDevice() {
      return themeStore.device;
    },
    recommendedThemes() {
      if (themeStore.apiThemes.length > 0) {
        return this.adaptApiThemes(themeStore.apiThemes);
      }
      return getRecommendThemes(themeStore.device);
    },
    $theme() {
      return themeStore.theme;
    },
  },
  data() {
    return {
      isThemeTabVisible: false,
      isDrawerVisible: false,
    };
  },
  mounted() {
    this.$root.$on('theme-saved', this.handleThemeSaved);
  },
  beforeDestroy() {
    this.$root.$off('theme-saved', this.handleThemeSaved);
  },
  components: {
    PickedSvg,
    AddIcon,
    DeleteIcon,
  },
  methods: {
    handleChangeTheme(theme) {
      themeStore.updateTheme(theme);
      this.$emit('select-theme');
    },
    handleThemeSaved() {
      themeStore.fetchApiThemes();
    },
    handleAddTheme() {
      this.$emit('add-theme');
    },
    // 删除自定义主题：弹出确认对话框，确认后调用 DELETE API
    handleDeleteTheme(theme) {
      const confirmText = this.isEn ? 'Confirm' : '确认';
      const cancelText = this.isEn ? 'Cancel' : '取消';
      const header = this.isEn ? 'Delete Theme' : '删除主题';
      const body = this.isEn
        ? `Are you sure you want to delete "${theme.enName}"?`
        : `确定要删除主题「${theme.name}」吗？`;

      const dialogInstance = DialogPlugin.confirm({
        header,
        body,
        confirmBtn: confirmText,
        cancelBtn: cancelText,
        onConfirm: async () => {
          try {
            const res = await fetch(`/api/themes/${theme.id}`, { method: 'DELETE' });
            if (res.status === 204) {
              // 删除成功：刷新主题列表，若删除的是当前主题则切换默认
              await themeStore.fetchApiThemes();
              if (this.$theme.id === theme.id) {
                themeStore.resetTheme();
              }
            } else if (res.status === 403) {
              // 内置主题不可删除
              console.error('无法删除内置主题:', theme.name);
            } else {
              console.error('删除主题失败:', res.status, res.statusText);
            }
          } catch (err) {
            // 网络错误/服务端错误
            console.error('删除主题请求失败:', err);
          }
          dialogInstance.destroy();
        },
        onClose: () => {
          dialogInstance.destroy();
        },
      });
    },
    adaptApiThemes(themes) {
      const options = themes.map((theme) => ({
        enName: theme.name,
        name: theme.name,
        value: theme.brandColor || DEFAULT_BRAND_COLOR,
        subtitle: '',
        id: theme.id,
        type: theme.type,
      }));
      return [
        {
          title: '全部主题',
          enTitle: 'All Themes',
          options,
        },
      ];
    },
  },
};
</script>

<style lang="less" scoped>
.recommend-theme {
  max-height: 376px;
  border-radius: 32px 32px 0px 0px;

  &__content {
    padding: 0;
    overflow: auto;

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: var(--bg-color-scroll);
      }
    }

    &::-webkit-scrollbar {
      width: 12px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      border: 4px solid transparent;
      background-clip: content-box;
      background-color: transparent;
    }
  }

  &__main {
    padding: 12px 4px 16px 16px;
  }

  &__title {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 14px;
    margin: 8px 0px 0px 12px;
    line-height: 22px;
    display: flex;
    align-items: center;
  }

  &__flex {
    display: flex;
    flex-wrap: wrap;
    margin: 4px -4px;
    cursor: pointer;

    > div {
      margin: 4px;
      padding: 6px 6px 0px 6px;
      color: var(--text-primary);
      background: var(--bg-color-card);
      border-radius: 18px;
      transition: all 0.2s cubic-bezier(0.38, 0, 0.24, 1);

      &:hover {
        scale: 1.05;
      }
    }

    &-theme {
      width: 78px;
      height: 62px;
      padding: 8px 6px;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      &--active {
        position: absolute;
        right: 0px;
        top: 30px;
      }
      &--delete {
        position: absolute;
        right: 2px;
        top: 2px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
      }
      &:hover &--delete {
        opacity: 1;
      }
      &--add {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-color-container-hover);
        border: 1px dashed var(--component-border);
        color: var(--text-placeholder);
      }
    }
  }
}
</style>
