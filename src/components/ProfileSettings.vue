<template>
    <PageHeader />
    <div class="container w-50 mt-3">
        <div v-if="loading">
            <p>одну минуту...</p>
        </div>
        <div v-if="!loading">
            <div class="row">
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="row">
                                <div class="col-9">
                                    <div class="row flex-row-reverse">
                                        <div class="col-md-auto">
                                            <div class="dropdown dropstart">
                                                <button
                                                    class="btn btn-primary dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i class="bi bi-translate"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                <li>
                                                    <button 
                                                    class="dropdown-item" 
                                                    type="button"
                                                    @click="selectedLocale = 'ru-RU'; changeLanguage()"
                                                    >
                                                    Ru
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                    class="dropdown-item" 
                                                    type="button"
                                                    @click="selectedLocale = 'en-EN'; changeLanguage()"
                                                    >
                                                    En
                                                    </button>
                                                </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <h5 class="card-title">
                                                <b>{{ $t('components.profileSettings.userActions.title') }}</b>
                                            </h5>
                                        </div>
                                    </div>
                                    <p class="card-text">{{ $t('components.profileSettings.userActions.name') }}: {{ userData.name }}</p>
                                    <p class="card-text">Синхронизирован с {{ userData.provider}}</p>
                                    <p class="card-text">Email: {{ userData.email }}</p>
                                    <div class="row">
                                        <div class="col">
                                            <router-link to="/login">
                                                <button name="change_name" class="mt-auto btn btn-danger w-100">
                                                    {{ $t('components.profileSettings.userActions.logout') }}
                                                    <i class="bi bi-box-arrow-right"></i>
                                                </button>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <img :src="userData.avatar_url" class="avatar" height="192px" width="192px"/>
                                </div>
                            </div>
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
const $t = useI18n().t
const userData = ref()
const loading = ref(true)

async function loadData() {
    try {
        await store.dispatch('getUserData')
        userData.value = store.getters['getUserData']
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const locale = useI18n().locale

const selectedLocale = ref(locale.value)

const changeLanguage = () => {
    locale.value = selectedLocale.value
    localStorage.setItem('locale', selectedLocale.value)
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

.avatar {
    border-radius: 20px;
    border: none;
}
</style>