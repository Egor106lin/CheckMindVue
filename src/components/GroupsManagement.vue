<template>
    <PageHeader />
    <div class="container">
        <div v-if="someGroupsAdmin" class="card mt-5">
            <div class="card-body">
                <h3 class="card-title mb-3">{{ $t('components.groupsManagement.adminGroups.title') }}</h3>
                <div class="row">
                    <div class="col-1">
                        <h5>№</h5>
                    </div>
                    <div class="col-2">
                        <h5>Владелец</h5>
                    </div>
                    <div class="col-2">
                        <h5>Участники</h5>
                    </div>
                    <div class="col-3">
                        <h5>Название</h5>
                    </div>
                    <div class="col-2">
                        <h5>ID</h5>
                    </div>
                    <div class="col-2"></div>
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
                            <p>{{ group.group_size }}</p>
                        </div>
                        <div class="col-3">
                            <p>{{ group.name }}</p>
                        </div>
                        <div class="col-2">
                            <p>{{ group.ID }}</p>
                        </div>
                        <div class="col-2">
                            <div class="row flex-row-reverse">
                                <div class="col">
                                    <button class="btn btn-danger">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-danger">
                                        <i class="bi bi-box-arrow-in-left"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="someGroupsUser" class="card mt-5">
            <div class="card-body">
                <h3 class="card-title mb-3">{{ $t('components.groupsManagement.userGroups.title') }}</h3>
                <div class="row">
                    <div class="col-1">
                        <h5>№</h5>
                    </div>
                    <div class="col-2">
                        <h5>Владелец</h5>
                    </div>
                    <div class="col-2">
                        <h5>Участники</h5>
                    </div>
                    <div class="col-3">
                        <h5>Название</h5>
                    </div>
                    <div class="col-3">
                        <h5>ID</h5>
                    </div>
                    <div class="col-1"></div>
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
                            <p>{{ group.group_size }}</p>
                        </div>
                        <div class="col-3">
                            <p>{{ group.name }}</p>
                        </div>
                        <div class="col-3">
                            <p>{{ group.ID }}</p>
                        </div>
                        <div class="col-1">
                            <button class="btn btn-danger">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
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

const someGroupsAdmin = ref(true)
const someGroupsUser = ref(true)
const $t = useI18n().t
const store = useStore()

const userGroupsData = ref()
const adminGroupsData = ref()

function getGroupsData() {
    try {
        store.dispatch('getGroupsData').then( () => {
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
</style>
