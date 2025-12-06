<template>
    <PageHeader />
    <div class="container w-50">
        <button @click="user = !user">Переключатель</button>
        <div v-if="loading">
            <p>одну минуту...</p>
        </div>
        <div v-if="!loading">
            <div class="row">
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title"><b>{{ $t('components.profileSettings.userActions.title') }}</b></h5>
                            <p class="card-text">{{ $t('components.profileSettings.userActions.name') }}: {{ userData.name }}</p>
                            <p class="card-text">Синхронизирован с {{ userData.provider}}</p>
                            <div class="row">
                                <div class="col">
                                    <router-link to="/login">
                                        <button name="change_name" class="mt-auto btn btn-danger w-100">{{ $t('components.profileSettings.userActions.logout') }}</button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title"><b>{{ $t('components.profileSettings.userActions.userManagement') }}</b></h5>
                            <p class="card-text">{{ $t('components.profileSettings.userActions.role') }}: {{user ? "Пользователь" : "Администратор"}}</p>
                            <div class="row">
                                <div class="col">
                                    <button name="change_avatar" class="mt-auto btn btn-primary w-100">{{ $t('components.profileSettings.userActions.changePhoto') }}</button>
                                    <hr>
                                    <button name="change_name" class="mt-auto btn btn-primary w-100">{{ $t('components.profileSettings.userActions.changeName') }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <div v-if="user" class="card">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title"><b>{{ $t('components.profileSettings.groupsActions.title') }}</b></h5>
                            <p class="card-text">{{ $t('components.profileSettings.groupsActions.joinGroup') }}</p>
                            <div class="row">
                                <div class="col">
                                    <input class="form-control w-100" type="text" :placeholder="$t('components.profileSettings.groupsActions.groupId')">
                                </div>
                                <div class="col">
                                    <router-link to="/groups">
                                        <button name="join_group" class="mt-auto btn btn-primary w-100">{{ $t('components.profileSettings.groupsActions.join') }}</button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card">
                        <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><b>{{ $t('components.profileSettings.groupsActions.title') }}</b></h5>
                        <p class="card-text">{{ $t('components.profileSettings.groupsActions.createNewGroup') }}</p>
                        <p v-if="created_group"><b>{{ $t('components.profileSettings.groupsActions.groupId') }}</b>1234567890</p>
                            <div class="row">
                                <div class="col">
                                    <input class="form-control w-100" type="number" :placeholder="$t('components.profileSettings.groupsActions.usersQuanity')">
                                </div>
                                <div class="col">
                                    <router-link to="/groups">
                                        <button @click="created_group = !created_group" name="create_group" class="mt-auto btn btn-primary w-100">{{ $t('components.profileSettings.groupsActions.create') }}</button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><b>{{ $t('components.profileSettings.guide.title') }}</b></h5>
                        <p class="card-text">{{ $t('components.profileSettings.guide.rule1') }}</p>
                        <p class="card-text">{{ $t('components.profileSettings.guide.rule2') }}</p>
                        <p class="card-text">{{ $t('components.profileSettings.guide.rule3') }}</p>
                        <p class="card-text">{{ $t('components.profileSettings.guide.rule4') }}</p>
                        <router-link v-if="!user" to="/create_tests">
                            <button name="create_tests_link" class="mt-auto btn btn-primary w-100">{{ $t('components.profileSettings.guide.btnCreateTests') }}</button>
                        </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import PageHeader from './PageHeader.vue';
import { useStore } from 'vuex';

const store = useStore()
const user = ref(true)
const created_group = ref(false)
const $t = useI18n().t
const userData = ref()
const loading = ref(true)

async function loadData() {
    try {
        await store.dispatch('getUserData')
        userData.value = store.getters['getUserData']
        console.log(userData.value)
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadData()
})
</script>

<style lang="css" scoped>
.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
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

.btn-primary {
    background-color: #3846D3;
    border-radius: 15px;
    border: none;
}

.btn-secondary {
    background-color: #232b86;
    border-radius: 15px;
    border: none;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}
</style>