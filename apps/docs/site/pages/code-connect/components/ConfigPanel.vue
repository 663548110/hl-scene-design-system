<template>
  <div class="config-panel">
    <h3 class="config-panel__title">Figma 配置</h3>
    <div class="config-panel__body">
      <div class="config-panel__field">
        <label class="config-panel__label" for="figmaUrl">Figma 链接</label>
        <input
          id="figmaUrl"
          v-model="figmaUrl"
          class="config-panel__input"
          :class="{ 'config-panel__input--error': figmaUrlError }"
          type="text"
          placeholder="粘贴 Figma 文件链接，如 https://www.figma.com/design/xxxxx/..."
          @input="parseFigmaUrl"
        />
        <p v-if="figmaUrlError" class="config-panel__hint config-panel__hint--error">{{ figmaUrlError }}</p>
        <p v-else-if="formData.fileKey" class="config-panel__hint">File Key: {{ formData.fileKey }}</p>
      </div>
      <div class="config-panel__field">
        <label class="config-panel__label" for="pat">Personal Access Token</label>
        <input
          id="pat"
          v-model="formData.pat"
          class="config-panel__input"
          type="password"
          :placeholder="hasPat ? 'PAT 已配置，留空则不修改' : '请输入 Figma PAT'"
          @focus="handlePatFocus"
        />
      </div>
      <div class="config-panel__actions">
        <button
          class="config-panel__btn"
          :disabled="saving"
          @click="handleSave"
        >
          {{ saving ? '保存中...' : '保存配置' }}
        </button>
        <span v-if="hasPat" class="config-panel__status">✓ PAT 已配置</span>
      </div>
    </div>
    <p v-if="loadError" class="config-panel__error">{{ loadError }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      formData: { fileKey: '', pat: '' },
      figmaUrl: '',
      figmaUrlError: '',
      saving: false,
      loadError: '',
      hasPat: false,
    };
  },

  mounted() {
    this.loadConfig();
  },

  methods: {
    /**
     * 从 Figma URL 中提取 file_key
     * 支持格式：
     *   https://www.figma.com/design/{fileKey}/...
     *   https://www.figma.com/file/{fileKey}/...
     *   裸 fileKey（兼容直接粘贴）
     */
    parseFigmaUrl() {
      const input = this.figmaUrl.trim();
      if (!input) {
        this.formData.fileKey = '';
        this.figmaUrlError = '';
        return;
      }
      // 尝试从 URL 提取
      const match = input.match(/figma\.com\/(?:design|file)\/([a-zA-Z0-9]+)/);
      if (match) {
        this.formData.fileKey = match[1];
        this.figmaUrlError = '';
        return;
      }
      // 兼容直接粘贴裸 fileKey（纯字母数字）
      if (/^[a-zA-Z0-9]+$/.test(input)) {
        this.formData.fileKey = input;
        this.figmaUrlError = '';
        return;
      }
      this.formData.fileKey = '';
      this.figmaUrlError = '无法识别 Figma 链接，请粘贴完整的 Figma 文件 URL';
    },

    async loadConfig() {
      try {
        const res = await fetch('/api/config');
        if (!res.ok) throw new Error(`请求失败: ${res.status}`);
        const data = await res.json();
        this.formData.fileKey = data.fileKey || '';
        // 用已保存的 fileKey 反向构造展示 URL
        if (data.fileKey) {
          this.figmaUrl = `https://www.figma.com/design/${data.fileKey}`;
        }
        this.formData.pat = '';
        this.hasPat = !!data.hasPat;
        this.loadError = '';
      } catch (e) {
        this.loadError = '加载配置失败，请稍后重试';
        console.error('加载配置失败:', e);
      }
    },

    handlePatFocus() {
      if (this.formData.pat === '') return;
    },

    async handleSave() {
      if (this.figmaUrlError) {
        this.showToast('请先修正 Figma 链接', 'error');
        return;
      }
      this.saving = true;
      try {
        const body = { fileKey: this.formData.fileKey };
        if (this.formData.pat) {
          body.pat = this.formData.pat;
        }
        const res = await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`保存失败: ${res.status}`);
        this.showToast('配置已保存', 'success');
        // 保存成功后刷新状态
        if (this.formData.pat) {
          this.hasPat = true;
          this.formData.pat = '';
        }
      } catch (e) {
        this.showToast('保存配置失败，请重试', 'error');
        console.error('保存配置失败:', e);
      } finally {
        this.saving = false;
      }
    },

    showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `config-toast config-toast--${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add('config-toast--visible'), 10);
      setTimeout(() => {
        toast.classList.remove('config-toast--visible');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2500);
    },
  },
});
</script>

<style scoped>
.config-panel {
  background: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  padding: 20px 24px;
}

.config-panel__title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.config-panel__field {
  margin-bottom: 16px;
}

.config-panel__label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #555;
}

.config-panel__input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.config-panel__input:focus {
  border-color: #0052d9;
}

.config-panel__input--error {
  border-color: #d54941;
}

.config-panel__input::placeholder {
  color: #bbb;
}

.config-panel__hint {
  margin: 4px 0 0;
  font-size: 12px;
  color: #999;
}

.config-panel__hint--error {
  color: #d54941;
}

.config-panel__actions {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.config-panel__btn {
  padding: 8px 24px;
  font-size: 14px;
  color: #fff;
  background: #0052d9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.config-panel__btn:hover {
  opacity: 0.85;
}

.config-panel__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.config-panel__status {
  font-size: 13px;
  color: #2ba471;
}

.config-panel__error {
  margin-top: 12px;
  font-size: 13px;
  color: #d54941;
}
</style>

<style>
.config-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 9999;
  pointer-events: none;
}

.config-toast--success {
  background: #2ba471;
}

.config-toast--error {
  background: #d54941;
}

.config-toast--visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
