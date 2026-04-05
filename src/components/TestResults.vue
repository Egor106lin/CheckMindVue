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
            <div class="row mb-3 g-2">
                <div class="col-12 col-sm-6">
                    <div class="bg-light rounded-3 p-2 text-center">
                        <small class="text-muted">{{ $t('components.testResults.averageScore') }}</small>
                        <h4 class="mb-0">{{ averageScore.toFixed(1) }}</h4>
                    </div>
                </div>
                <div class="col-12 col-sm-6">
                    <div class="bg-light rounded-3 p-2 text-center">
                        <small class="text-muted">{{ $t('components.testResults.medianScore') }}</small>
                        <h4 class="mb-0">{{ medianScore.toFixed(1) }}</h4>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <div class="input-group search-group">
                        <span class="input-group-text bg-white">
                            <i class="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('components.testResults.searchPlaceholder')"
                            v-model="searchQuery"
                        />
                        <button v-if="searchQuery" class="btn btn-outline-secondary" @click="searchQuery = ''">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="d-none d-md-block table-responsive">
                <ElTable :data="filteredResults" class="rounded-5" style="width: 100%">
                    <ElTableColumn prop="name" :label="$t('components.testResults.name')" sortable />
                    <ElTableColumn prop="points" :label="$t('components.testResults.points')" sortable />
                    <ElTableColumn prop="time" :label="$t('components.testResults.time')" sortable />
                    <template #empty>
                        <div class="empty-table">
                            <i class="bi bi-inbox fs-1 text-muted"></i>
                            <p class="mt-2 mb-0 text-muted">{{ $t('components.testResults.noData') }}</p>
                        </div>
                    </template>
                </ElTable>
            </div>
            <div class="d-md-none results-mobile-list">
                <div v-if="filteredResults.length === 0" class="text-center text-muted py-4">
                    {{ $t('components.testResults.noResults') }}
                </div>
                <div v-for="(result, index) in filteredResults" :key="index" class="result-card">
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
import { defineEmits, defineProps, computed, ref } from 'vue'

const $t = useI18n().t;

const props = defineProps({
    results: {
        type: Array,
        required: true
    }
})

defineEmits(['close'])

const searchQuery = ref('')

const filteredResults = computed(() => {
    if (!searchQuery.value.trim()) return props.results
    const query = searchQuery.value.trim().toLowerCase()
    return props.results.filter(r => r.name?.toLowerCase().includes(query))
})

const averageScore = computed(() => {
    if (!filteredResults.value.length) return 0
    const sum = filteredResults.value.reduce((acc, r) => acc + (r.points || 0), 0)
    return sum / filteredResults.value.length
})

const medianScore = computed(() => {
    const scores = filteredResults.value.map(r => r.points || 0).sort((a, b) => a - b)
    const len = scores.length
    if (len === 0) return 0
    const mid = Math.floor(len / 2)
    if (len % 2 === 0) {
        return (scores[mid - 1] + scores[mid]) / 2
    } else {
        return scores[mid]
    }
})
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

.search-group {
    display: flex;
    align-items: stretch;
}

.search-group .input-group-text {
    border-radius: 20px 0 0 20px;
    border: 2px solid #f3f3f3;
    border-right: none;
    background-color: white;
}

.search-group .form-control {
    border: 2px solid #f3f3f3;
    border-left: none;
    border-right: none;
    border-radius: 0;
    flex: 1;
}

.search-group:not(:has(.btn-outline-secondary)) .form-control {
    border-radius: 0 20px 20px 0;
    border-right: 2px solid #f3f3f3;
}

.search-group .form-control:focus {
    border-color: #3846D3;
    box-shadow: none;
    position: relative;
    z-index: 2;
}

.search-group .btn-outline-secondary {
    border-radius: 0 20px 20px 0;
    border: 2px solid #f3f3f3;
    border-left: none;
    background-color: white;
    color: #6c757d;
}

.search-group .btn-outline-secondary:hover {
    background-color: #f8f9fa;
    border-color: #f3f3f3;
    color: #3846D3;
}

.bg-light {
    background-color: #f8f9fa !important;
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