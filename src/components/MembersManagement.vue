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
            <div class="d-none d-md-block table-responsive">
                <ElTable :data="tableData" class="rounded-5">
                    <ElTableColumn prop="number" :label="$t('components.membersManagement.№')" sortable width="80" />
                    <ElTableColumn prop="admin" :label="$t('components.membersManagement.admin')" width="150">
                        <template #default="scope">
                            <div v-if="scope.row.admin">
                                <i class="bi bi-check-lg"></i>
                            </div>
                            <div v-else-if="!scope.row.admin">
                                <i class="bi bi-x-lg"></i>
                            </div>
                        </template>
                    </ElTableColumn>
                    <ElTableColumn prop="name" :label="$t('components.membersManagement.name')" />
                    <ElTableColumn v-if="isAdmin" fixed="right" align="center" prop="actions">
                        <template #default="scope">
                            <div class="d-flex gap-2">
                                <button
                                    v-if="!scope.row.admin && isAdmin && !scope.row.you"
                                    class="btn btn-outline-primary btn-sm"
                                    @click="handleMakeAdmin(scope.row.id)"
                                >
                                    <i class="bi bi-person-check me-1"></i>
                                    {{ $t('components.membersManagement.makeAdmin') }}
                                </button>
                                <button
                                    v-if="!scope.row.you"
                                    class="btn btn-outline-danger btn-sm"
                                    @click="handleDelete(scope.row.id)"
                                >
                                    <i class="bi bi-person-dash"></i>
                                </button>
                            </div>
                        </template>
                    </ElTableColumn>
                </ElTable>
            </div>
            <div class="d-md-none members-mobile-list">
                <div v-for="(member, index) in tableData" :key="index" class="member-card">
                    <div class="member-header">
                        <span class="member-number">#{{ member.number }}</span>
                        <span v-if="member.admin" class="admin-badge">
                            <i class="bi bi-check-lg"></i>
                            {{ $t('components.membersManagement.admin') }}
                        </span>
                    </div>
                    
                    <div class="member-name">
                        <strong>{{ member.name }}</strong>
                    </div>
                    
                    <div v-if="isAdmin" class="member-actions">
                        <button
                            v-if="!member.admin"
                            class="btn btn-outline-primary btn-sm w-100"
                            @click="handleMakeAdmin(member.id)"
                        >
                            <i class="bi bi-person-check me-1"></i>
                            {{ $t('components.membersManagement.makeAdmin') }}
                        </button>
                        <button
                            v-if="!member.you"
                            class="btn btn-outline-danger btn-sm w-100"
                            @click="handleDelete(member.id)"
                        >
                            <i class="bi bi-person-dash me-1"></i>
                            {{ $t('components.membersManagement.delete') }}
                        </button>
                    </div>
                    <div v-else class="member-actions-placeholder"></div>
                </div>
                <div v-if="!tableData?.length" class="text-center text-muted py-4">
                    {{ $t('components.membersManagement.noMembers') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, defineProps, defineEmits } from 'vue'
import { showSuccess, showError } from '@/utils/notifications'
import { ElTable, ElTableColumn } from 'element-plus';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t
const store = useStore()
const tableData = ref()

const props = defineProps({
    groupName: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['cancel'])

onBeforeMount(() => {
    getMembers()
})

async function getMembers() {
    try {
        await store.dispatch('getMembers', {
            groupID: props.groupId,
        })
        const members = store.getters.members
        tableData.value = members.map((member, index) => ({
            ...member,
            number: index + 1
        }))
    } catch (error) {
        showError($t('toasts.error.unknownProblem'))
    }
}

async function handleMakeAdmin(member_id) {
    try {
        await store.dispatch('makeMemberAdmin', {
            userID: member_id,
            groupID: props.groupId
        })
        getMembers()
        const status = store.getters['getStatus']
        status == 'success' ? showSuccess($t('toasts.success.personPromoted')) : showError($t('toasts.error.personPromotedError'))
    } catch (error) {
        showError($t('toasts.error.unknownProblem'))
    }
}

async function handleDelete(member_id) {
    try {
        await store.dispatch('deleteMember', {
            userID: member_id,
            groupID: props.groupId
        })
        getMembers()
        const status = store.getters['getStatus']
        status == 'success' ? showSuccess($t('toasts.success.personDeleted')) : showError($t('toasts.error.personDeletedError'))
    } catch (error) {
        showError($t('toasts.error.unknownProblem'))
    }
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

/* Мобильные стили */
.members-mobile-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 4px;
}

.member-card {
    background-color: white;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.member-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 0.9rem;
}

.member-number {
    color: #6c757d;
    font-weight: 600;
}

.admin-badge {
    background-color: #e7f3ff;
    color: #0d6efd;
    padding: 4px 8px;
    border-radius: 20px;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.member-name {
    font-size: 1.1rem;
    margin-bottom: 12px;
    word-break: break-word;
}

.member-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.member-actions .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 0.95rem;
}

.member-actions-placeholder {
    height: 8px;
}

@media (max-width: 768px) {
    .card {
        border-radius: 16px;
    }
    
    .btn-outline-primary span,
    .btn-outline-danger span {
        display: none;
    }
    
    .btn-outline-primary i,
    .btn-outline-danger i {
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
    
    .member-card {
        padding: 12px;
    }
    
    .member-name {
        font-size: 1rem;
    }
    
    .member-actions .btn {
        font-size: 0.9rem;
        padding: 8px;
    }
}

@media (max-width: 400px) {
    .member-card {
        padding: 10px;
    }
}
</style>