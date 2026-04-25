<template>
  <t-dialog
    :visible="visible"
    :header="dialogTitle"
    :width="360"
    :confirm-btn="confirmBtn"
    @confirm="handleConfirm"
    @close="handleClose"
    @cancel="handleClose"
  >
    <t-input
      v-model="themeName"
      :placeholder="isEn ? 'Enter theme name' : '请输入主题名称'"
      :maxlength="30"
      clearable
    />
  </t-dialog>
</template>

<script>
import { Dialog as TDialog, Input as TInput } from 'tdesign-vue';
import { langMixin } from '@/common/i18n';
import { themeStore } from '@/common/themes';

export default {
  name: 'SaveThemeDialog',
  mixins: [langMixin],
  components: { TDialog, TInput },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // 是否为编辑模式，由父组件传入
    editMode: {
      type: Boolean,
      default: false,
    },
    // 编辑模式下的主题 id
    themeId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      themeName: '',
      loading: false,
      // 内部编辑模式状态，PUT 403 时可回退为 false
      internalEditMode: false,
    };
  },
  watch: {
    visible(v) {
      if (v) {
        // 打开时同步外部 editMode 到内部状态
        this.internalEditMode = this.editMode;
        // 打开时预填当前主题名称
        const currentName = themeStore.theme.name || '';
        this.themeName = (currentName === 'TDesign' || currentName === 'Default') ? '' : currentName;
      }
    },
  },
  computed: {
    // 对话框标题：编辑模式显示"编辑主题"，新增模式显示"保存主题"
    dialogTitle() {
      if (this.internalEditMode) {
        return this.isEn ? 'Edit Theme' : '编辑主题';
      }
      return this.isEn ? 'Save Theme' : '保存主题';
    },
    confirmBtn() {
      return {
        content: this.isEn ? 'Save' : '保存',
        theme: 'primary',
        loading: this.loading,
      };
    },
  },
  methods: {
    async handleConfirm() {
      const name = this.themeName.trim();
      if (!name) return;

      this.loading = true;
      try {
        const light = document.getElementById('custom-theme')?.textContent || '';
        const dark = document.getElementById('custom-theme-dark')?.textContent || '';
        const extra = document.getElementById('custom-theme-extra')?.textContent || '';

        const payload = {
          name,
          platform: themeStore.device || 'web',
          variables: { light, dark, extra },
          brandColor: themeStore.brandColor,
        };

        let res;
        if (this.internalEditMode && this.themeId) {
          // 编辑模式：调用 PUT 更新主题
          res = await fetch(`/api/themes/${this.themeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          // PUT 403：内置主题不可修改，回退到新增模式
          if (res.status === 403) {
            this.internalEditMode = false;
            console.error('内置主题不可修改，已回退到新增模式');
            return;
          }
        } else {
          // 新增模式：调用 POST 创建主题
          res = await fetch('/api/themes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Save failed');
        }

        const data = await res.json();

        // 更新当前主题名称
        themeStore.theme.name = name;
        themeStore.theme.enName = name;
        await themeStore.fetchApiThemes();
        // 保存成功后 emit saved 事件，携带主题 id
        this.$emit('saved', data.id);
        this.handleClose();
        this.themeName = '';
      } catch (err) {
        // 网络错误/服务端错误：记录日志，保持对话框打开
        console.error('保存主题失败:', err.message);
      } finally {
        this.loading = false;
      }
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
  },
};
</script>
