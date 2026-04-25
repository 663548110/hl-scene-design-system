<template>
  <td-doc-content ref="tdDocContent" page-status="hidden">
    <div class="code-connect-admin">
      <h2 class="code-connect-admin__title">Code Connect 管理</h2>

      <div v-if="syncResult" class="code-connect-admin__banner">
        <span>
          同步完成：共 {{ syncResult.total }} 个组件，新增 {{ syncResult.created }}，更新 {{ syncResult.updated }}，失败 {{ syncResult.failed }}
        </span>
        <button class="code-connect-admin__banner-close" @click="syncResult = null">✕</button>
      </div>

      <MappingDetail
        v-if="showDetail && selectedMapping"
        :mapping="selectedMapping"
        @close="handleDetailClose"
        @saved="handleDetailSaved"
        @rematch="handleRematch"
      />

      <template v-else>
        <ConfigPanel />
        <MappingTable
          :mappings="mappings"
          :loading="mappingsLoading || syncing"
          :error="mappingsError"
          @sync="handleSync"
          @select="handleSelect"
        />
      </template>
    </div>
  </td-doc-content>
</template>

<script>
import { defineComponent } from 'vue';
import ConfigPanel from './components/ConfigPanel.vue';
import MappingTable from './components/MappingTable.vue';
import MappingDetail from './components/MappingDetail.vue';

export default defineComponent({
  components: { ConfigPanel, MappingTable, MappingDetail },

  data() {
    return {
      mappings: [],
      mappingsLoading: false,
      mappingsError: '',
      syncing: false,
      selectedMapping: null,
      showDetail: false,
      syncResult: null,
    };
  },

  mounted() {
    this.$emit('loaded', () => {
      this.$refs.tdDocContent.pageStatus = 'show';
    });
    this.fetchMappings();
  },

  methods: {
    async fetchMappings() {
      this.mappingsLoading = true;
      this.mappingsError = '';
      try {
        const res = await fetch('/api/mappings');
        if (!res.ok) throw new Error(`请求失败: ${res.status}`);
        const data = await res.json();
        this.mappings = Array.isArray(data) ? data : [];
      } catch (e) {
        this.mappingsError = '加载映射列表失败，请稍后重试';
        console.error('加载映射列表失败:', e);
      } finally {
        this.mappingsLoading = false;
      }
    },

    async handleSync() {
      this.syncing = true;
      this.syncResult = null;
      try {
        const res = await fetch('/api/mappings/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        if (res.status === 400) { this.showToast('请先配置 Figma FileKey 和 PAT', 'error'); return; }
        if (res.status === 502) {
          const data = await res.json().catch(() => ({}));
          this.showToast(data.error || 'Figma API 请求失败', 'error'); return;
        }
        if (!res.ok) { this.showToast('同步失败，请稍后重试', 'error'); return; }
        const data = await res.json();
        this.syncResult = data;
        this.showToast(`同步完成：新增 ${data.created}，更新 ${data.updated}`, 'success');
        await this.fetchMappings();
      } catch (e) {
        if (e.name === 'AbortError' || e.message?.includes('timeout')) {
          this.showToast('同步请求超时，Figma API 可能较慢，请重试', 'error');
        } else {
          this.showToast('同步失败，请检查网络连接', 'error');
        }
        console.error('同步失败:', e);
      } finally {
        this.syncing = false;
      }
    },

    async handleSelect(mapping) {
      try {
        const res = await fetch(`/api/mappings/${encodeURIComponent(mapping.componentName)}`);
        if (!res.ok) throw new Error(`请求失败: ${res.status}`);
        this.selectedMapping = await res.json();
        this.showDetail = true;
      } catch (e) {
        this.showToast('加载组件详情失败', 'error');
        console.error('加载组件详情失败:', e);
      }
    },

    handleDetailClose() {
      this.showDetail = false;
      this.selectedMapping = null;
    },

    async handleDetailSaved() {
      await this.fetchMappings();
    },

    async handleRematch() {
      this.syncing = true;
      try {
        const res = await fetch('/api/mappings/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        if (!res.ok) { this.showToast('重新匹配失败', 'error'); return; }
        this.showToast('重新匹配完成，请重新打开详情查看', 'success');
        this.showDetail = false;
        this.selectedMapping = null;
        await this.fetchMappings();
      } catch (e) {
        this.showToast('重新匹配失败，请重试', 'error');
        console.error('重新匹配失败:', e);
      } finally {
        this.syncing = false;
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
.code-connect-admin {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.code-connect-admin__title {
  margin: 0; font-size: 22px; font-weight: 600; color: #333;
}
.code-connect-admin__banner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; background: #e8f8ef; border: 1px solid #b7ebc8;
  border-radius: 6px; font-size: 14px; color: #2ba471;
}
.code-connect-admin__banner-close {
  background: none; border: none; font-size: 16px; color: #2ba471;
  cursor: pointer; padding: 0 4px; line-height: 1;
}
.code-connect-admin__banner-close:hover { opacity: 0.7; }
</style>
