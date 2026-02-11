<template>
    <PageHeader />
    <div class="container mt-3 px-md-3 px-2">
        <div class="row">
            <div class="col-12">
                <div class="card zone">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h3 class="card-title">{{ $t('components.groupsManagement.newGroup.create.title') }}</h3>
                                <div class="input-group mt-3">
                                    <input
                                        class="form-control"
                                        v-model="groupToCreate"
                                        :placeholder="$t('components.groupsManagement.newGroup.create.placeholder')" />
                                    <button
                                        class="btn btn-primary"
                                        :disabled="groupToCreate == undefined || groupToCreate == ''"
                                        @click="createGroup(groupToCreate)"
                                    >
                                        <i class="bi bi-forward"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="someGroupsAdmin" class="card zone mt-3">
                    <div class="card-body">
                        <h3 class="card-title mb-3">{{ $t('components.groupsManagement.adminGroups.title') }}</h3>
                        
                        <div class="d-none d-md-block">
                            <el-table
                                :data="adminGroupsData"
                                style="width: 100%"
                                :header-cell-style="{ backgroundColor: '#f8f9fa', color: '#495057' }"
                            >
                                <el-table-column
                                    prop="number"
                                    :label="$t('components.groupsManagement.columns.№')"
                                    width="80"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    prop="owner"
                                    :label="$t('components.groupsManagement.columns.owner')"
                                    min-width="120"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    :label="$t('components.groupsManagement.columns.members')"
                                    min-width="140"
                                >
                                    <template #default="scope">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <span>{{ scope.row.size }}</span>
                                            <button 
                                                class="btn btn-sm btn-outline-primary ms-2"
                                                @click="openMembersManager(scope.row, true)"
                                            >
                                                <i class="bi bi-people"></i>
                                            </button>
                                        </div>
                                    </template>
                                </el-table-column>
                                
                                <el-table-column
                                    prop="name"
                                    :label="$t('components.groupsManagement.columns.name')"
                                    min-width="180"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    prop="id"
                                    :label="$t('components.groupsManagement.columns.ID')"
                                    min-width="120"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    :label="$t('components.groupsManagement.columns.actions')"
                                    min-width="220"
                                >
                                    <template #default="scope">
                                        <div class="d-flex flex-wrap gap-1">
                                            <button 
                                                class="btn btn-sm btn-primary"
                                                @click="generateInviteLink(scope.row.id)"
                                                :title="$t('components.groupsManagement.actions.link')"
                                            >
                                                <i class="bi bi-link-45deg"></i>
                                            </button>
                                            <button 
                                                class="btn btn-sm btn-primary"
                                                @click="generateInviteQRCode(scope.row.id)"
                                                :title="$t('components.groupsManagement.actions.qr')"
                                            >
                                                <i class="bi bi-qr-code"></i>
                                            </button>
                                            <button 
                                                class="btn btn-sm btn-outline-danger"
                                                @click="leaveGroup(scope.row.id)"
                                                :title="$t('components.groupsManagement.actions.leave')"
                                            >
                                                <i class="bi bi-box-arrow-right"></i>
                                            </button>
                                            <button 
                                                class="btn btn-sm btn-danger"
                                                @click="deleteGroup(scope.row.id)"
                                                :title="$t('components.groupsManagement.actions.delete')"
                                            >
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        
                        <div class="d-md-none">
                            <div 
                                v-for="group in adminGroupsData" 
                                :key="group.id"
                                class="card mb-3"
                            >
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <h5 class="card-title mb-0">{{ group.name }}</h5>
                                        <span class="badge bg-primary">#{{ group.number }}</span>
                                    </div>
                                    
                                    <div class="mb-2">
                                        <small class="text-muted">{{ $t('components.groupsManagement.columns.owner') }}:</small>
                                        <p class="mb-1">{{ group.owner }}</p>
                                    </div>
                                    
                                    <div class="mb-2">
                                        <small class="text-muted">{{ $t('components.groupsManagement.columns.members') }}:</small>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span>{{ group.size }}</span>
                                            <button 
                                                class="btn btn-sm btn-outline-primary"
                                                @click="openMembersManager(group, true)"
                                            >
                                                <i class="bi bi-people"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <small class="text-muted">{{ $t('components.groupsManagement.columns.ID') }}:</small>
                                        <p class="mb-0 font-monospace small">{{ group.id }}</p>
                                    </div>
                                    
                                    <div class="d-flex flex-wrap gap-1">
                                        <button 
                                            class="btn btn-sm btn-primary flex-fill"
                                            @click="generateInviteLink(group.id)"
                                        >
                                            <i class="bi bi-link-45deg me-1"></i>
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-primary flex-fill"
                                            @click="generateInviteQRCode(group.id)"
                                        >
                                            <i class="bi bi-qr-code me-1"></i>
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-outline-danger flex-fill"
                                            @click="leaveGroup(group.id)"
                                        >
                                            <i class="bi bi-box-arrow-right me-1"></i>
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-danger flex-fill"
                                            @click="deleteGroup(group.id)"
                                        >
                                            <i class="bi bi-trash me-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="someGroupsUser" class="card zone mt-3">
                    <div class="card-body">
                        <h3 class="card-title mb-3">{{ $t('components.groupsManagement.userGroups.title') }}</h3>
                        
                        <div class="d-none d-md-block">
                            <el-table
                                :data="userGroupsData"
                                style="width: 100%"
                                :header-cell-style="{ backgroundColor: '#f8f9fa', color: '#495057' }"
                            >
                                <el-table-column
                                    prop="number"
                                    :label="$t('components.groupsManagement.columns.№')"
                                    width="80"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    prop="owner"
                                    :label="$t('components.groupsManagement.columns.owner')"
                                    min-width="120"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    :label="$t('components.groupsManagement.columns.members')"
                                    min-width="140"
                                >
                                    <template #default="scope">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <span>{{ scope.row.size }}</span>
                                            <button 
                                                class="btn btn-sm btn-outline-primary ms-2"
                                                @click="openMembersManager(scope.row, false)"
                                            >
                                                <i class="bi bi-people"></i>
                                            </button>
                                        </div>
                                    </template>
                                </el-table-column>
                                
                                <el-table-column
                                    prop="name"
                                    :label="$t('components.groupsManagement.columns.name')"
                                    min-width="180"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    prop="id"
                                    :label="$t('components.groupsManagement.columns.ID')"
                                    min-width="120"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                    :label="$t('components.groupsManagement.columns.actions')"
                                    min-width="100"
                                >
                                    <template #default="scope">
                                        <button 
                                            class="btn btn-sm btn-outline-danger"
                                            @click="leaveGroup(scope.row.id)"
                                        >
                                            <i class="bi bi-box-arrow-right"></i>
                                        </button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        
                        <div class="d-md-none">
                            <div 
                                v-for="group in userGroupsData" 
                                :key="group.id"
                                class="card mb-3"
                            >
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <h5 class="card-title mb-0">{{ group.name }}</h5>
                                        <span class="badge bg-primary">#{{ group.number }}</span>
                                    </div>
                                    
                                    <div class="mb-2">
                                        <small class="text-muted">{{ $t('components.groupsManagement.columns.owner') }}:</small>
                                        <p class="mb-1">{{ group.owner }}</p>
                                    </div>
                                    
                                    <div class="mb-2">
                                        <small class="text-muted">{{ $t('components.groupsManagement.columns.members') }}:</small>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span>{{ group.size }}</span>
                                            <button 
                                                class="btn btn-sm btn-outline-primary"
                                                @click="openMembersManager(group, false)"
                                            >
                                                <i class="bi bi-people"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <small class="text-muted">{{ $t('components.groupsManagement.columns.ID') }}:</small>
                                        <p class="mb-0 font-monospace small">{{ group.id }}</p>
                                    </div>
                                    
                                    <div class="d-flex">
                                        <button 
                                            class="btn btn-outline-danger w-100"
                                            @click="leaveGroup(group.id)"
                                        >
                                            <i class="bi bi-box-arrow-right me-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isUserManagementOpened" class="modal-overlay" @click.self="isUserManagementOpened = false">
            <div class="modal-content">
                <MembersManagement
                    :groupName="membersOfGroupToWatchData.groupName"
                    :isAdmin="membersOfGroupToWatchData.isAdmin"
                    @cancel="isUserManagementOpened = false"
                />
            </div>
        </div>
        <QRCodeComponent
            v-model="openQR"
            :qrCodeUrl="qrCodeUrl"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showSuccess, showError } from '@/utils/notifications'
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import QRCode from 'qrcode'
import PageHeader from './PageHeader.vue';
import MembersManagement from './MembersManagement.vue';
import QRCodeComponent from './QRCode.vue';

const someGroupsAdmin = ref(false)
const someGroupsUser = ref(false)
const $t = useI18n().t
const store = useStore()
const isUserManagementOpened = ref(false)
const inviteUrl = ref('')
const qrCodeUrl = ref('')
const openQR = ref(false)
const groupToCreate = ref('')
const status = ref()
const message = ref()
const membersOfGroupToWatchData = ref({
    groupName: '',
    isAdmin: '',
})

const userGroupsData = ref([])
const adminGroupsData = ref([])

async function getGroupsData() {
    try {
        await store.dispatch('getGroupsData').then(() => {
            userGroupsData.value = store.getters.getUserGroupsData
            adminGroupsData.value = store.getters.getAdminGroupsData
        })
        userGroupsData.value.forEach((group, index) => {
            group.number = index + 1
        })
        adminGroupsData.value.forEach((group, index) => {
            group.number = index + 1
        })
    } catch (error) {
        console.error('Ошибка:', error)
    }
    if (adminGroupsData.value.length == 0) {
        someGroupsAdmin.value = false
    } else {
        someGroupsAdmin.value = true
    }
    if (userGroupsData.value.length == 0) {
        someGroupsUser.value = false
    } else {
        someGroupsUser.value = true
    }
}

onMounted(() => {
    getGroupsData()
})

function openMembersManager(groupData, isAdmin) {
    isUserManagementOpened.value = true
    membersOfGroupToWatchData.value.groupName = groupData.name
    membersOfGroupToWatchData.value.isAdmin = isAdmin
}

async function generateInviteQRCode(id) {
    try {
        await store.dispatch('getInviteUrl', id)
        inviteUrl.value = store.getters['getInviteUrl']
        QRCode.toDataURL(inviteUrl.value).then(generatedQrDataUrl => {
            qrCodeUrl.value = generatedQrDataUrl
        })
        openQR.value = true
    } catch (error) {
        openQR.value = false
        showError($t('toasts.error.unknownProblem'))
    }
}

async function generateInviteLink(id) {
    try {
        await store.dispatch('getInviteUrl', id)
        inviteUrl.value = store.getters['getInviteUrl']
        copyToClipboard()
    } catch (error) {
        showError($t('toasts.error.unknownProblem'))
    }
}

function copyToClipboard() {
    navigator.clipboard.writeText(inviteUrl.value)
    showSuccess($t('toasts.success.linkCopied'))
}

function deleteGroup(id) {
    try {
        store.dispatch('deleteGroup', id)
        showSuccess($t('toasts.success.groupDeleted'))
    } catch(error) {
        console.log(error)
        showError($t('toasts.error.groupDeletedError'))
    } finally {
        getGroupsData()
    }
}

function leaveGroup(id) {
    try {
        store.dispatch('leaveGroup', id).then(() => {
            if (store.getters['getCanLeaveGroup']) {
                // Покинуть группу
            } else {
                // Не покидать группу
            }
        })
    } catch(error) {
        // Не удалось покинуть группу
    }
}

async function createGroup(title) {
    status.value = ''
    message.value = ''
    try {
        await store.dispatch('createGroup', title)
        groupToCreate.value = ''
        status.value = store.getters['getStatus']
        message.value = store.getters['getMessage']
        showSuccess($t('toasts.success.groupCreated'))
    } catch(error) {
        showError($t('toasts.error.unknownError'))
    } finally {
        getGroupsData()
    }
}
</script>

<style lang="css" scoped>
.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.btn-primary {
    border-radius: 15px;
    background-color: #3846D3;
    border: none;
}

.btn-outline-primary {
    border-radius: 15px;
    border: 2px solid #3846D3;
    color: #3846D3;
    background-color: transparent;
}

.btn-outline-primary:hover {
    background-color: #3846D3;
    color: white;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}

.btn-outline-danger {
    border-radius: 15px;
    border: 2px solid #d33838;
    color: #d33838;
    background-color: transparent;
}

.btn-outline-danger:hover {
    background-color: #d33838;
    color: white;
}

.form-control:focus {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.form-control {
    outline: none !important;
    box-shadow: none !important;
    border-radius: 20px;
    border: 2px solid #f3f3f3;
}

.zone {
    box-shadow: 10px 5px 5px #858383;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal-content {
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(.el-table) {
    --el-table-border-color: #dee2e6;
    --el-table-header-bg-color: #f8f9fa;
    --el-table-text-color: #495057;
    --el-table-row-hover-bg-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
}

:deep(.el-table__header) {
    background-color: #f8f9fa;
}

:deep(.el-table__cell) {
    padding: 12px 0;
    vertical-align: middle;
}

:deep(.el-table th.el-table__cell) {
    background-color: #f8f9fa;
    font-weight: 600;
}

@media (max-width: 768px) {
    .zone {
        box-shadow: 5px 3px 3px #858383;
    }
    
    .card {
        border-radius: 15px;
    }
    
    .btn-primary, .btn-outline-primary, .btn-danger, .btn-outline-danger {
        min-height: 44px;
        padding: 8px 12px;
    }
    
    .btn-sm {
        min-height: 36px;
        padding: 6px 10px;
    }
    
    .modal-overlay {
        padding: 10px;
    }
    
    .modal-content {
        max-height: 95vh;
        border-radius: 15px;
    }
}

@media (max-width: 576px) {
    .modal-content {
        max-height: 98vh;
        border-radius: 12px;
    }
}
</style>