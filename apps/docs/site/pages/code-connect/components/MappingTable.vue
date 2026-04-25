<template>
  <div class="mapping-table">
    <div class="mapping-table__toolbar">
      <input
        v-model="searchKeyword"
        class="mapping-table__search"
        type="text"
        placeholder="搜索组件名或 Figma 名称"
      />
      <select v-model="platformFilter" class="mapping-table__select">
        <option value="">全部平台</option>
        <option value="web">Web</option>
        <option value="mobile">Mobile</option>
      </select>
      <button
        class="mapping-table__sync-btn"
        :disabled="loading"
        @click="$emit('sync')"
      >
        {{ loading ? '同步中...' : '同步 Figma 组件' }}
      </button>
    </div>

    <div v-if="loading" class="mapping-table__loading">加载中...</div>

    <div v-else-if="error" class="mapping-table__error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="filteredMappings.length === 0" class="mapping-table__empty">
      <p v-if="mappings.length === 0">暂无映射数据，请先同步 Figma 组件</p>
      <p v-else>没有匹配的结果</p>
    </div>

    <table v-else class="mapping-table__table">
      <colgroup>
        <col style="width: 28%" />
        <col style="width: 32%" />
        <col style="width: 10%" />
        <col v-if="hasAnyComponentKey" style="width: 15%" />
        <col style="width: 15%" />
      </colgroup>
      <thead>
        <tr>
          <th>RD 组件名</th>
          <th>Figma 名称</th>
          <th>平台</th>
          <th v-if="hasAnyComponentKey">Component Key</th>
          <th>更新时间</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredMappings"
          :key="item.componentName"
          class="mapping-table__row"
          @click="$emit('select', item)"
        >
          <td class="mapping-table__name">{{ item.componentName }}</td>
          <td class="mapping-table__figma">{{ item.figmaName }}</td>
          <td>
            <span class="mapping-table__platform-tag">{{ item.platform }}</span>
          </td>
          <td v-if="hasAnyComponentKey" class="mapping-table__key">{{ item.componentKey }}</td>
          <td class="mapping-table__date">{{ formatDate(item.updatedAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    mappings: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    error: { type: String, default: '' },
  },

  emits: ['sync', 'select'],

  data() {
    return {
      platformFilter: '',
      searchKeyword: '',
    };
  },

  computed: {
    hasAnyComponentKey() {
      return this.mappings.some((m) => m.componentKey);
    },
    filteredMappings() {
      let list = this.mappings;
      if (this.platformFilter) {
        list = list.filter((m) => m.platform === this.platformFilter);
      }
      if (this.searchKeyword) {
        const kw = this.searchKeyword.toLowerCase();
        list = list.filter(
          (m) =>
            (m.componentName || '').toLowerCase().includes(kw) ||
            (m.figmaName || '').toLowerCase().includes(kw),
        );
      }
      return list;
    },
  },

  methods: {
    formatDate(val) {
      if (!val) return '-';
      return new Date(val).toLocaleString();
    },
  },
});
</script>

<style scoped>
.mapping-table {
  background: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  padding: 16px 20px;
}
.mapping-table__toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
}
.mapping-table__search {
  flex: 1;
  padding: 7px 12px;
  font-size: 13px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.mapping-table__search:focus { border-color: #0052d9; }
.mapping-table__search::placeholder { color: #bbb; }
.mapping-table__select {
  padding: 7px 12px;
  font-size: 13px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  outline: none;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}
.mapping-table__select:focus { border-color: #0052d9; }
.mapping-table__sync-btn {
  padding: 7px 16px;
  font-size: 13px;
  color: #fff;
  background: #0052d9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.mapping-table__sync-btn:hover { opacity: 0.85; }
.mapping-table__sync-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.mapping-table__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  table-layout: fixed;
}
.mapping-table__table th,
.mapping-table__table td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mapping-table__table th {
  font-weight: 600;
  font-size: 12px;
  color: #666;
  background: #fafafa;
  border-bottom: 1px solid #e7e7e7;
}
.mapping-table__row { cursor: pointer; transition: background 0.15s; }
.mapping-table__row:hover { background: #f0f5ff; }
.mapping-table__name { font-weight: 500; color: #333; }
.mapping-table__figma { color: #555; }
.mapping-table__platform-tag {
  display: inline-block;
  padding: 1px 8px;
  font-size: 12px;
  border-radius: 3px;
  background: #f0f0f0;
  color: #666;
}
.mapping-table__key {
  font-family: monospace;
  font-size: 12px;
  color: #888;
}
.mapping-table__date {
  font-size: 12px;
  color: #999;
}
.mapping-table__loading,
.mapping-table__empty,
.mapping-table__error {
  padding: 40px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.mapping-table__error { color: #d54941; }
</style>
