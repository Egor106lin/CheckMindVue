<template>
    <PageHeader />
    <div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h3 class="card-title">{{ $t('components.groupsManagement.newGroup.create.title') }}</h3>
                        <div class="input-group mt-3">
                            <input
                                class="form-control"
                                :placeholder="$t('components.groupsManagement.newGroup.create.placeholder')" />
                            <button class="btn btn-primary">
                                <i class="bi bi-forward"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col">
                        <h3 class="card-title">{{ $t('components.groupsManagement.newGroup.join.title') }}</h3>
                        <div class="input-group mt-3">
                            <input
                                class="form-control"
                                :placeholder="$t('components.groupsManagement.newGroup.create.placeholder')" />
                            <button class="btn btn-primary">
                                <i class="bi bi-forward"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="someGroupsAdmin" class="card mt-3">
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
                    <div class="row">
                        <div class="col-1">
                            <p>{{ group.number }}</p>
                        </div>
                        <div class="col-2">
                            <p>{{ group.owner }}</p>
                        </div>
                        <div class="col-2">
                            <div class="row">
                                <div class="col-6">
                                    <p>{{ group.group_size }}</p>
                                </div>
                                <div class="col-md-auto mt-0">
                                    <button class="btn btn-secondary-sm mt-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="bi bi-caret-down"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <p>{{ group.name }}</p>
                        </div>
                        <div class="col-2">
                            <p>{{ group.ID }}</p>
                        </div>
                        <div class="col-2">
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
                    <div class="collapse" id="collapseExample">
                        <MembersManagement />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="someGroupsUser" class="card mt-3">
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
                    <div class="row">
                        <div class="col-1">
                            <p>{{ group.number }}</p>
                        </div>
                        <div class="col-2">
                            <p>{{ group.owner }}</p>
                        </div>
                        <div class="col-2">
                            <div class="row">
                                <div class="col-6">
                                    <p>{{ group.group_size }}</p>
                                </div>
                                <div class="col-md-auto mt-0">
                                    <button class="btn btn-secondary-sm mt-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                        <i class="bi bi-caret-down"></i>
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-3">
                            <p>{{ group.name }}</p>
                        </div>
                        <div class="col-2">
                            <p>{{ group.ID }}</p>
                        </div>
                        <div class="col-2">
                            <div class="row flex-row-rewerse">
                                <div class="btn-group">
                                    <button class="btn btn-primary" @click="leaveGroup(group.ID)">
                                        <i class="bi bi-link-45deg"></i>
                                    </button>
                                    <button class="btn btn-danger" @click="deleteGroup(group.ID)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="collapse" id="collapseExample">
                        <MembersManagement />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import PageHeader from './PageHeader.vue';
import MembersManagement from './MembersManagement.vue';

const someGroupsAdmin = ref(true)
const someGroupsUser = ref(true)
const $t = useI18n().t
const store = useStore()

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
</style>
