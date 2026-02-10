<template>
    <PageHeader />
    <div class="container mt-3 px-md-3 px-2">
        <div v-if="!loading" class="card zone card-body">
            <div class="row mb-3">
                <div class="col-12">
                    <h2 class="card-title h4 h2-md">{{ $t('components.acceptInvite.title') }}</h2>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card-text">
                        <div class="mb-3">
                            <p class="mb-1 text-muted small">{{ $t('components.acceptInvite.youWereInvited') }}</p>
                            <p class="fs-5 fw-bold mb-0">{{ groupData.title }}</p>
                        </div>
                        
                        <div class="mb-3">
                            <p class="mb-1 text-muted small">{{ $t('components.acceptInvite.invitedBy') }}</p>
                            <p class="fs-5 fw-bold mb-0">{{ groupData.name }}</p>
                            <p class="text-body-secondary mb-0">{{ $t('components.acceptInvite.email') }} {{ groupData.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary w-100" @click="router.push('/')">
                        {{ $t('components.acceptInvite.home') }}
                    </button>
                </div>
            </div>
        </div>
        
        <div v-else-if="loading" class="card zone card-body">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <h2 class="card-title mt-3 h4 h2-md">Ожидание данных...</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PageHeader from './PageHeader.vue';
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue';
import router from '@/router/routes';
import { useI18n } from 'vue-i18n';
import { showError } from '@/utils/notifications'


const $t = useI18n().t
const store = useStore()
const groupData = ref()
const loading = ref(true)

onMounted(async () => {
    try {
        await store.dispatch('acceptInvite', router.currentRoute.value.query.token)
        groupData.value= store.getters['getGroupData']
        loading.value = false
    } catch(error) {
        showError($t('toasts.error.unknownProblem'))
    }
})

</script>

<style lang="css" scoped>
.zone {
    border-radius: 20px;
    box-shadow: 10px 5px 5px #858383;
}

.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.h2-md {
    font-size: 1.75rem;
}

.btn-primary {
    border-radius: 15px;
    background-color: #3846D3;
    border: none;
    padding: 12px 24px;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .zone {
        box-shadow: 5px 3px 3px #858383;
        border-radius: 16px;
    }
    
    .card {
        border-radius: 16px;
    }
    
    .btn-primary {
        min-height: 48px;
        padding: 14px 20px;
        font-size: 1rem;
    }
    
    .h2-md {
        font-size: 1.5rem;
    }
    
    .fs-5 {
        font-size: 1.1rem !important;
    }
    
    .text-body-secondary {
        font-size: 0.95rem;
    }
}

@media (max-width: 576px) {
    .card {
        border-radius: 14px;
    }
    
    .zone {
        border-radius: 14px;
    }
    
    h2 {
        font-size: 1.3rem;
    }
    
    .btn-primary {
        min-height: 52px;
        padding: 16px 20px;
        font-size: 1.1rem;
    }
    
    .fs-5 {
        font-size: 1.05rem !important;
    }
    
    .text-body-secondary {
        font-size: 0.9rem;
    }
}
</style>