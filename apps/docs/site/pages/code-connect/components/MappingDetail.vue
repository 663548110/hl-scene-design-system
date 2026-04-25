<template>
  <div class="mapping-detail">
    <!-- Header -->
    <div class="mapping-detail__header">
      <button class="mapping-detail__back" @click="$emit('close')">← 返回列表</button>
      <h3 class="mapping-detail__title">{{ mapping.componentName }}</h3>
      <span v-if="mapping.figmaName" class="mapping-detail__figma-name">Figma: {{ mapping.figmaName }}</span>
    </div>

    <!-- Variants Section -->
    <div v-if="variantDimensions.length > 0" class="mapping-detail__section">
      <h4 class="mapping-detail__section-title">变体维度</h4>
      <div class="mapping-detail__variants">
        <div v-for="dim in variantDimensions" :key="dim.name" class="mapping-detail__variant-dim">
          <span class="mapping-detail__dim-name">{{ dim.name }}</span>
          <span class="mapping-detail__dim-values">{{ dim.values.join(', ') }}</span>
        </div>
      </div>
    </div>

    <!-- Props Mapping Table -->
    <div class="mapping-detail__section">
      <h4 class="mapping-detail__section-title">Props 映射</h4>
      <div v-if="propEntries.length === 0" class="mapping-detail__empty">暂无 Props 映射数据</div>
      <table v-else class="mapping-detail__table">
        <thead>
          <tr>
            <th>Figma 属性</th>
            <th>Flutter Prop</th>
            <th>值映射</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in propEntries" :key="entry.figmaProp">
            <td class="mapping-detail__cell-figma">{{ entry.figmaProp }}</td>
            <td>
              <input
                v-model="editableMapping[entry.figmaProp].prop"
                class="mapping-detail__input"
                type="text"
                placeholder="Flutter prop 名"
              />
              <input
                v-model="editableMapping[entry.figmaProp].enumClass"
                class="mapping-detail__input mapping-detail__input--small"
                type="text"
                placeholder="枚举类名（可选）"
              />
            </td>
            <td>
              <div class="mapping-detail__value-mappings">
                <div
                  v-for="(flutterVal, figmaVal) in editableMapping[entry.figmaProp].values"
                  :key="figmaVal"
                  class="mapping-detail__value-row"
                >
                  <span class="mapping-detail__value-from">{{ figmaVal }}</span>
                  <span class="mapping-detail__value-arrow">→</span>
                  <input
                    :value="flutterVal"
                    class="mapping-detail__value-input"
                    type="text"
                    @input="updateValueMapping(entry.figmaProp, figmaVal, $event.target.value)"
                  />
                </div>
                <div v-if="Object.keys(editableMapping[entry.figmaProp].values).length === 0" class="mapping-detail__no-values">
                  无值映射
                </div>
              </div>
            </td>
            <td>
              <span :class="statusClass(editableMapping[entry.figmaProp].status)">
                {{ statusLabel(editableMapping[entry.figmaProp].status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Actions -->
    <div class="mapping-detail__actions">
      <button class="mapping-detail__btn mapping-detail__btn--primary" :disabled="saving" @click="handleSave">
        {{ saving ? '保存中...' : '保存' }}
      </button>
      <button class="mapping-detail__btn mapping-detail__btn--secondary" @click="$emit('rematch')">
        重新自动匹配
      </button>
    </div>
    <p v-if="saveError" class="mapping-detail__error">{{ saveError }}</p>

    <!-- Flutter Code Snippet Preview -->
    <div class="mapping-detail__section">
      <h4 class="mapping-detail__section-title">Flutter 代码预览</h4>
      <pre class="mapping-detail__code">{{ flutterSnippet }}</pre>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    mapping: { type: Object, required: true },
  },

  emits: ['close', 'saved', 'rematch'],

  data() {
    return {
      saving: false,
      saveError: '',
      editableMapping: {},
    };
  },

  computed: {
    variantDimensions() {
      const variants = this.mapping.variants;
      if (!variants || typeof variants !== 'object') return [];
      return Object.entries(variants).map(([name, values]) => ({
        name,
        values: Array.isArray(values) ? values : [values],
      }));
    },

    propEntries() {
      return Object.keys(this.editableMapping).map((figmaProp) => ({ figmaProp }));
    },

    flutterSnippet() {
      return this.generateFlutterSnippet(
        this.mapping.componentName,
        this.editableMapping,
        this.mapping.defaultVariant,
      );
    },
  },

  watch: {
    mapping: {
      handler() { this.resetEditable(); },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    resetEditable() {
      const pm = this.mapping.propsMapping || {};
      const result = {};
      for (const [figmaProp, entry] of Object.entries(pm)) {
        result[figmaProp] = {
          prop: entry.prop || '',
          enumClass: entry.enumClass || '',
          values: { ...entry.values },
          status: entry.status || 'unmatched',
        };
      }
      this.editableMapping = result;
    },

    updateValueMapping(figmaProp, figmaVal, newFlutterVal) {
      if (this.editableMapping[figmaProp]) {
        this.editableMapping[figmaProp].values[figmaVal] = newFlutterVal;
      }
    },

    statusClass(status) {
      return {
        'mapping-detail__status': true,
        'mapping-detail__status--matched': status === 'matched',
        'mapping-detail__status--unmatched': status === 'unmatched',
        'mapping-detail__status--skipped': status === 'skipped',
      };
    },

    statusLabel(status) {
      const labels = { matched: '已匹配', unmatched: '未匹配', skipped: '已跳过' };
      return labels[status] || status;
    },

    generateFlutterSnippet(componentName, propsMap, defaultVariant) {
      const widgetName = componentName || 'RDWidget';
      const lines = [];
      for (const [figmaProp, entry] of Object.entries(propsMap)) {
        if (entry.status !== 'matched' || !entry.prop) continue;
        const defaultFigmaVal = defaultVariant?.[figmaProp];
        const flutterVal = defaultFigmaVal != null
          ? entry.values[defaultFigmaVal]
          : Object.values(entry.values)[0];
        if (flutterVal === undefined || flutterVal === null) continue;
        if (entry.enumClass) {
          lines.push(`  ${entry.prop}: ${entry.enumClass}.${flutterVal},`);
        } else {
          lines.push(`  ${entry.prop}: ${flutterVal},`);
        }
      }
      if (lines.length === 0) return `${widgetName}()`;
      return `${widgetName}(\n${lines.join('\n')}\n)`;
    },

    async handleSave() {
      this.saving = true;
      this.saveError = '';
      try {
        const body = { propsMapping: {} };
        for (const [figmaProp, entry] of Object.entries(this.editableMapping)) {
          body.propsMapping[figmaProp] = {
            prop: entry.prop || null,
            enumClass: entry.enumClass || null,
            values: { ...entry.values },
            status: entry.status,
          };
        }
        const res = await fetch(`/api/mappings/${encodeURIComponent(this.mapping.componentName)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`保存失败: ${res.status}`);
        this.$emit('saved');
        this.showToast('映射已保存', 'success');
      } catch (e) {
        this.saveError = '保存失败，请重试';
        this.showToast('保存失败，请重试', 'error');
        console.error('保存映射失败:', e);
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
.mapping-detail {
  background: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  padding: 20px 24px;
}
.mapping-detail__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.mapping-detail__back {
  padding: 6px 12px;
  font-size: 13px;
  color: #0052d9;
  background: none;
  border: 1px solid #0052d9;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.mapping-detail__back:hover { background: #f0f5ff; }
.mapping-detail__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.mapping-detail__figma-name { font-size: 13px; color: #888; }
.mapping-detail__section { margin-bottom: 24px; }
.mapping-detail__section-title {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: #444;
}
.mapping-detail__variants { display: flex; flex-wrap: wrap; gap: 10px; }
.mapping-detail__variant-dim {
  background: #f5f7fa;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 13px;
}
.mapping-detail__dim-name { font-weight: 600; color: #333; margin-right: 6px; }
.mapping-detail__dim-values { color: #666; }
.mapping-detail__empty { padding: 24px 0; text-align: center; color: #999; font-size: 14px; }
.mapping-detail__table { width: 100%; border-collapse: collapse; font-size: 14px; }
.mapping-detail__table th,
.mapping-detail__table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}
.mapping-detail__table th { font-weight: 600; color: #555; background: #f9f9f9; }
.mapping-detail__cell-figma { font-family: monospace; font-size: 13px; color: #333; white-space: nowrap; }
.mapping-detail__input {
  width: 100%;
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.mapping-detail__input:focus { border-color: #0052d9; }
.mapping-detail__input--small { margin-top: 6px; font-size: 12px; color: #666; }
.mapping-detail__input::placeholder { color: #bbb; }
.mapping-detail__value-mappings { display: flex; flex-direction: column; gap: 4px; }
.mapping-detail__value-row { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.mapping-detail__value-from { font-family: monospace; color: #555; white-space: nowrap; min-width: 60px; }
.mapping-detail__value-arrow { color: #999; flex-shrink: 0; }
.mapping-detail__value-input {
  padding: 4px 8px;
  font-size: 13px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  outline: none;
  min-width: 80px;
  transition: border-color 0.2s;
}
.mapping-detail__value-input:focus { border-color: #0052d9; }
.mapping-detail__no-values { color: #bbb; font-size: 12px; font-style: italic; }
.mapping-detail__status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}
.mapping-detail__status--matched { background: #e8f8ef; color: #2ba471; }
.mapping-detail__status--unmatched { background: #fff1f0; color: #d54941; }
.mapping-detail__status--skipped { background: #f5f5f5; color: #999; }
.mapping-detail__actions { display: flex; gap: 12px; margin-bottom: 16px; }
.mapping-detail__btn {
  padding: 8px 24px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.mapping-detail__btn:hover { opacity: 0.85; }
.mapping-detail__btn:disabled { opacity: 0.5; cursor: not-allowed; }
.mapping-detail__btn--primary { color: #fff; background: #0052d9; }
.mapping-detail__btn--secondary { color: #0052d9; background: #fff; border: 1px solid #0052d9; }
.mapping-detail__error { margin-top: 8px; font-size: 13px; color: #d54941; }
.mapping-detail__code {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 16px 20px;
  border-radius: 6px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  margin: 0;
}
</style>
