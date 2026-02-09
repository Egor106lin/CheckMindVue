<template>
    <div class="card">
        <div class="card-body">
            <div class="row align-items-center mb-3">
                <div class="col-10 col-md-11">
                    <h3 class="card-title mb-0">{{ $t('components.membersManagement.title') }} "{{ groupName }}"</h3>
                </div>
                <div class="col-2 col-md-1 text-end">
                    <button class="btn btn-light rounded-circle" @click="emit('cancel')">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <ElTable :data="tableData" class="rounded-5">
                    <ElTableColumn prop="number" :label="$t('components.membersManagement.№')" sortable width="80" />
                    <ElTableColumn prop="admin" :label="$t('components.membersManagement.admin')" width="150">
                        <template #default="scope">
                            <div v-if="scope.row.admin">
                                <i class="bi bi-check-lg text-success"></i>
                            </div>
                        </template>
                    </ElTableColumn>
                    <ElTableColumn prop="name" :label="$t('components.membersManagement.name')" />
                    <ElTableColumn v-if="isAdmin" fixed="right" align="center" prop="actions" width="200">
                        <template #default="scope">
                            <div class="d-flex gap-2">
                                <button
                                    v-if="!scope.row.admin && isAdmin"
                                    class="btn btn-outline-primary btn-sm"
                                    @click="handleMakeAdmin(scope.row)"
                                >
                                    <i class="bi bi-person-check me-1"></i>
                                    {{ $t('components.membersManagement.makeAdmin') }}
                                </button>
                                <button
                                    class="btn btn-outline-danger btn-sm"
                                    @click="handleDelete(scope.row)"
                                >
                                    <i class="bi bi-person-dash"></i>
                                </button>
                            </div>
                        </template>
                    </ElTableColumn>
                </ElTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, defineProps, defineEmits } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t
const store = useStore()
const tableData = ref()

// eslint-disable-next-line
const props = defineProps({
    groupName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['cancel'])

onBeforeMount(async () => {
    try {
        await store.dispatch('getMembers', {
            groupID: 43,
        })
        tableData.value = store.getters.members
    } catch (error) {
        console.error('Ошибка:', error)
    }
})

function handleMakeAdmin(member) {
    console.log('Make admin:', member)
}

function handleDelete(member) {
    console.log('Delete member:', member)
}
</script>

<style lang="css" scoped>
.card {
    border: none !important;
    border-radius: 20px;
}

.btn-outline-primary {
    border-radius: 12px;
    border: 2px solid #3846D3;
    color: #3846D3;
}

.btn-outline-primary:hover {
    background-color: #3846D3;
    color: white;
}

.btn-outline-danger {
    border-radius: 12px;
    border: 2px solid #dc3545;
    color: #dc3545;
}

.btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
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

@media (max-width: 768px) {
    .card {
        border-radius: 16px;
    }
    
    .btn-outline-primary span {
        display: none;
    }
    
    .btn-outline-primary i {
        margin-right: 0 !important;
    }
}

@media (max-width: 576px) {
    .card {
        border-radius: 14px;
    }
    
    h3 {
        font-size: 1.3rem;
    }
}
</style>