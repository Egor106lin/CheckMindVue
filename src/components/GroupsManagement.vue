<template>
    <PageHeader />
    <div
        class="mt-3"
        :class="isUserManagementOpened ? 'container-fluid' : 'container'"
    >
        <div class="row">
            <div class="col">
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
                            <div class="col">
                                <h3 class="card-title">{{ $t('components.groupsManagement.newGroup.join.title') }}</h3>
                                <div class="input-group mt-3">
                                    <input
                                        class="form-control"
                                        v-model="groupToJoin"
                                        :placeholder="$t('components.groupsManagement.newGroup.create.placeholder')" />
                                    <button
                                        class="btn btn-primary"
                                        :disabled="groupToJoin == undefined || groupToJoin == ''"
                                        @click="joinGroup(groupToJoin)"
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
                        <div class="row">
                            <div class="col-1">
                                <h5>{{ $t('components.groupsManagement.columns.№') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.owner') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.members') }}</h5>
                            </div>
                            <div class="col-3">
                                <h5>{{ $t('components.groupsManagement.columns.name') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.ID') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.actions') }}</h5>
                            </div>
                        </div>
                        <div v-for="group in adminGroupsData" :key="group">
                            <div
                                class="row"
                                :class="isUserManagementOpened ? 'fs-6' : 'fs-5'"
                            >
                                <div class="col-1 table-element">
                                    <p>{{ group.number }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <p>{{ group.owner }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <div class="row">
                                        <div class="col-6">
                                            <p>{{ group.group_size }}</p>
                                        </div>
                                        <div class="col-md-auto pt-0 pb-0">
                                            <button class="btn btn-secondary-sm pt-0 pb-0" @click="openMembersManager(group, true)">
                                                <i class="bi bi-caret-down"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 table-element">
                                    <p>{{ group.name }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <p>{{ group.ID }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <div class="row flex-row-rewerse">
                                        <div class="btn-group">
                                            <button class="btn btn-primary" @click="leaveGroup(group.ID)">
                                                <i class="bi bi-link-45deg"></i>
                                            </button>
                                            <button class="btn btn-danger" @click="leaveGroup(group.ID)">
                                                <i class="bi bi-box-arrow-right"></i>
                                            </button>
                                            <button class="btn btn-danger" @click="deleteGroup(group.ID)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="someGroupsUser" class="card zone mt-3">
                    <div class="card-body">
                        <h3 class="card-title mb-3">{{ $t('components.groupsManagement.userGroups.title') }}</h3>
                        <div class="row">
                            <div class="col-1">
                                <h5>{{ $t('components.groupsManagement.columns.№') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.owner') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.members') }}</h5>
                            </div>
                            <div class="col-3">
                                <h5>{{ $t('components.groupsManagement.columns.name') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.ID') }}</h5>
                            </div>
                            <div class="col-2">
                                <h5>{{ $t('components.groupsManagement.columns.actions') }}</h5>
                            </div>
                        </div>
                        <div v-for="group in userGroupsData" :key="group">
                            <div 
                                class="row row-table"
                                :class="isUserManagementOpened ? 'fs-6' : 'fs-5'"
                            >
                                <div class="col-1 table-element">
                                    <p>{{ group.number }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <p>{{ group.owner }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <div class="row">
                                        <div class="col-6">
                                            <p>{{ group.group_size }}</p>
                                        </div>
                                        <div class="col-md-auto pt-0 pb-0">
                                            <button
                                                class="btn btn-secondary-sm pt-0 pb-0"
                                                @click="openMembersManager(group, false)"
                                            >
                                                <i class="bi bi-caret-down"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 table-element">
                                    <p>{{ group.name }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <p>{{ group.ID }}</p>
                                </div>
                                <div class="col-2 table-element">
                                    <div class="row flex-row-rewerse">
                                        <div class="btn-group">
                                            <button class="btn btn-primary" @click="leaveGroup(group.ID)">
                                                <i class="bi bi-link-45deg"></i>
                                            </button>
                                            <button class="btn btn-danger" @click="deleteGroup(group.ID)">
                                                <i class="bi bi-box-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="col"
                v-if="isUserManagementOpened"
            >
                <MembersManagement
                    :groupName="membersOfGroupToWatchData.groupName"
                    :isAdmin="membersOfGroupToWatchData.isAdmin"
                    @cancel="isUserManagementOpened = false"
                />
            </div>
        </div>
        <div class="toast-container position-fixed top-0 end-0 p-3">
            <BToast
                v-model="isToastActive"
                :title="status == 'success' ? 'Успешно' : 'Ошибка'"
                :variant="status"
                solid
            >
                {{ message }}
            </BToast>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BToast } from 'bootstrap-vue-next';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import PageHeader from './PageHeader.vue';
import MembersManagement from './MembersManagement.vue';

const someGroupsAdmin = ref(true)
const someGroupsUser = ref(true)
const isToastActive = ref(false)
const $t = useI18n().t
const store = useStore()
const isUserManagementOpened = ref(false)
const groupToCreate = ref('')
const groupToJoin = ref('')
const status = ref()
const message = ref()
const membersOfGroupToWatchData = ref({
    groupName: '',
    isAdmin: '',
})

const userGroupsData = ref()
const adminGroupsData = ref()

function getGroupsData() {
    try {
        store.dispatch('getGroupsData').then(() => {
            userGroupsData.value = store.getters['getGroupsData']
            adminGroupsData.value = store.getters['getGroupsData']
        })
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

onMounted(() => {
    getGroupsData()
})

function openMembersManager(groupData, isAdmin) {
    isUserManagementOpened.value = true
    if (isUserManagementOpened.value) {
        membersOfGroupToWatchData.value.groupName = groupData.name
        membersOfGroupToWatchData.value.isAdmin = isAdmin
    } else {
        membersOfGroupToWatchData.value = {
            groupName: '',
            isAdmin: '',
        }
    }
}

function deleteGroup(id) {
    try {
        store.dispatch('deleteGroup', id).then(() => {
            if (store.getters['getCanDeleteGroup']) {
                // Удалить группу
            } else {
                // Не удалять группу
            }
        })
    } catch(error) {
        // Не удалось удалить группу
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
    } catch(error) {
        // Не удалось создать группу
    } finally {
        changeToastVisible()
    }
}

async function joinGroup(id) {
    status.value = ''
    message.value = ''
    try {
        await store.dispatch('joinGroup', id)
        groupToJoin.value = ''
        status.value = store.getters['getStatus']
        message.value = store.getters['getMessage']
    } catch(error) {
        // Не удалось присоединиться к группе
    } finally {
        changeToastVisible()
    }
}

function changeToastVisible() {
    if (status.value != undefined && message.value != undefined) {
        isToastActive.value = true
        setTimeout(() => {
            isToastActive.value = false
        }, 3000)
    }
    if (!isToastActive.value) {
        status.value = ''
        message.value = ''
    }
}

</script>

<style lang="css" scoped>
.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.table-element {
    align-self: center;
}

.btn-primary {
    border-radius: 15px;
    background-color: #3846D3;
    border: none;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}

.btn-secondary {
    border-radius: 5px;
    border: 2px solid #3846D3;
    background-color: #ffffff;
    color: #3846D3;
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
    box-shadow: 10px 5px 5px #d1d1d1;
}
</style>
