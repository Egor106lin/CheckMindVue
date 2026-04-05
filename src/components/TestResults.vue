<template>
  <div class="card">
    <div class="card-body">
      <div class="row align-items-center mb-3">
        <div class="col-10 col-md-11">
          <h3 class="card-title mb-0">{{ $t('components.testResults.title') }}</h3>
        </div>
        <div class="col-2 col-md-1 text-end">
          <button class="btn btn-light rounded-circle" @click="$emit('close')">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      <div class="d-none d-md-block table-responsive">
        <ElTable :data="results" class="rounded-5" style="width: 100%">
          <ElTableColumn prop="name" :label="$t('components.testResults.name')" sortable />
          <ElTableColumn prop="points" :label="$t('components.testResults.points')" sortable />
          <ElTableColumn prop="time" :label="$t('components.testResults.time')" sortable />
        </ElTable>
      </div>
      <div class="d-md-none results-mobile-list">
        <div v-for="(result, index) in results" :key="index" class="result-card">
          <div class="result-header">
            <span class="result-number">#{{ index + 1 }}</span>
          </div>
          <div class="result-name"><strong>{{ result.name }}</strong></div>
          <div class="result-details">
            <span class="badge bg-primary me-2">{{ $t('components.testResults.points') }}: {{ result.points }}</span>
            <span class="badge bg-secondary">{{ $t('components.testResults.time') }}: {{ result.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElTable, ElTableColumn } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { defineEmits, defineProps } from 'vue'

const $t = useI18n().t;

defineProps({
    results: {
        type: Array,
        required: true
    }
})

defineEmits(['close'])
</script>

<style lang="css" scoped>
.card {
  border: none !important;
  border-radius: 20px;
}

.btn-light {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dee2e6;
}

:deep(.el-table) {
  --el-table-border-color: #dee2e6;
  --el-table-header-bg-color: #f8f9fa;
  --el-table-text-color: #495057;
  border-radius: 12px;
  overflow: hidden;
}

.results-mobile-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 4px;
}

.result-card {
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.result-number {
  color: #6c757d;
  font-weight: 600;
}

.result-name {
  font-size: 1.1rem;
  margin-bottom: 12px;
  word-break: break-word;
}

.result-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 768px) {
  .card {
    border-radius: 16px;
  }
}

@media (max-width: 576px) {
  .card {
    border-radius: 14px;
  }
  h3 {
    font-size: 1.3rem;
  }
  .result-card {
    padding: 12px;
  }
  .result-name {
    font-size: 1rem;
  }
}
</style>