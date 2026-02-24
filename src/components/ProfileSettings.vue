<template>
    <PageHeader />
    <div class="container mt-3">
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
            <p class="mt-2">Загрузка...</p>
        </div>
        
        <div v-else class="row">
            <div class="col">
                <div class="card zone">
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h3 class="card-title">
                                        <i class="bi bi-person-circle me-2"></i>
                                        {{ $t('components.profileSettings.title') }}
                                    </h3>
                                    <div class="dropdown">
                                        <button
                                            class="btn btn-primary dropdown-toggle d-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i class="bi bi-translate me-1"></i>
                                            <span>{{ getLanguageName(selectedLocale) }}</span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end">
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
                                                    @click="selectedLocale = 'en-US'; changeLanguage()"
                                                >
                                                    En
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8 order-2 order-md-1">
                                <div class="row mb-3">
                                    <div class="col-4">
                                        <p class="mb-0 text-muted">{{ $t('components.profileSettings.userActions.name') }}</p>
                                    </div>
                                    <div class="col-8">
                                        <p class="mb-0 fw-bold">{{ userData.name }}</p>
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-4">
                                        <p class="mb-0 text-muted">{{ $t('components.profileSettings.userActions.email') }}</p>
                                    </div>
                                    <div class="col-8">
                                        <p class="mb-0">{{ userData.email }}</p>
                                    </div>
                                </div>
                                
                                <div class="row mb-4">
                                    <div class="col-4">
                                        <p class="mb-0 text-muted">{{ $t('components.profileSettings.userActions.sync') }}</p>
                                    </div>
                                    <div class="col-8">
                                        <span class="badge" :class="providerBadgeClass">
                                            {{ userData.provider }}
                                        </span>
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col">
                                        <div class="d-flex flex-wrap gap-2">
                                            <button 
                                                class="btn btn-danger d-flex align-items-center"
                                                @click="logout"
                                            >
                                                <i class="bi bi-box-arrow-right me-2"></i>
                                                {{ $t('components.profileSettings.userActions.logout') }}
                                            </button>
                                            <button 
                                                class="btn btn-light d-flex align-items-center"
                                                @click="deleteAccount"
                                            >
                                                <i class="bi bi-person-x me-2"></i>
                                                {{ $t('components.profileSettings.userActions.deleteAccount') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-4 order-1 order-md-2 text-center">
                                <img 
                                    :src="userData.avatar_url" 
                                    :alt="userData.name"
                                    class="avatar img-fluid rounded-5"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalConfirmDeleteAccount
            v-model="isModalVisible"
            :username="userData?.name"
            :email="userData?.email"
            @confirm="handleConfirmDelete"
            @cancel="handleCancel"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import PageHeader from './PageHeader.vue';
import { useStore } from 'vuex';
import ModalConfirmDeleteAccount from './ModalConfirmDeleteAccount.vue';
import router from '@/router/routes';
import { showError } from '@/utils/notifications';

const store = useStore()
const $t = useI18n().t
const locale = useI18n().locale
const userData = ref(null)
const loading = ref(true)
const isModalVisible = ref(false)
const selectedLocale = ref(useI18n().locale)

const providerBadgeClass = computed(() => {
    const provider = userData.value?.provider?.toLowerCase()
    const classes = {
        'google': 'bg-danger',
        'github': 'bg-dark',
        'facebook': 'bg-primary',
        'email': 'bg-secondary'
    }
    return `badge ${classes[provider] || 'bg-secondary'}`
})

async function loadData() {
    try {
        await store.dispatch('getUserData')
        userData.value = store.getters['getUserData']
    } catch(error) {
        console.error('Ошибка загрузки данных:', error)
    } finally {
        loading.value = false
    }
}

function getLanguageName(code) {
    const languages = {
        'ru-RU': 'Ru',
        'en-US': 'En'
    }
    return languages[code] || code
}

function changeLanguage() {
    locale.value = selectedLocale.value
    localStorage.setItem('locale', selectedLocale.value)
}

function logout() {
    const currentLocale = localStorage.getItem('locale')
    store.dispatch('leave')
    router.push('/login')
    localStorage.clear()
    localStorage.setItem('locale', currentLocale)
}

function deleteAccount() {
    isModalVisible.value = true
}

async function handleConfirmDelete() {
    await store.dispatch('deleteAccount')
    const status = store.getters.getStatus
    if (status == 'success') {
        localStorage.clear()
        router.push('/login')
    } else {
        showError($t('toasts.error.accountDeletedError'))
    }
    isModalVisible.value = false
}

function handleCancel() {
    isModalVisible.value = false
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

.zone {
    border-radius: 20px;
    box-shadow: 10px 5px 5px #858383;
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

.btn-light {
    border-radius: 15px;
    border: none;
}

.avatar {
    width: 100%;
    max-width: 192px;
    height: auto;
    border-radius: 15px;
}

.badge {
    padding: 6px 12px;
    border-radius: 10px;
    font-size: 0.9rem;
}

.dropdown-menu {
    border-radius: 15px;
}

@media (max-width: 768px) {
    .container {
        padding-left: 12px;
        padding-right: 12px;
    }
    
    .zone {
        box-shadow: 5px 3px 3px #858383;
    }
    
    .card {
        border-radius: 15px;
    }
    
    .btn-primary, .btn-danger, .btn-light {
        min-height: 44px;
        padding: 8px 16px;
    }
    
    .avatar {
        max-width: 150px;
    }
}

@media (max-width: 576px) {
    .card {
        border-radius: 12px;
    }
    
    .zone {
        border-radius: 15px;
    }
    
    h3 {
        font-size: 1.3rem;
    }
    
    .row.mb-3 .col-4,
    .row.mb-3 .col-8 {
        width: 100%;
        text-align: left;
    }
    
    .row.mb-3 .col-4 {
        margin-bottom: 4px;
    }
    
    .row.mb-3 {
        margin-bottom: 15px !important;
    }
    
    .d-flex.flex-wrap.gap-2 {
        gap: 10px !important;
    }
    
    @media (max-width: 400px) {
        .avatar {
            max-width: 120px;
        }
    }
}
</style>