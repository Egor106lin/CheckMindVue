<template>
    <PageHeader />
    <div class="container">
        <div v-if="!loading" class="card card-body mt-3">
            <h2 class="card-title">{{ $t('components.acceptInvite.title') }}</h2>
            <div class="card-text fs-5">
                <p>{{ $t('components.acceptInvite.youWereInvited') }} "<b>{{ groupData.title }}</b>"</p>
                <p>{{ $t('components.acceptInvite.invitedBy') }} <b>{{ groupData.name }}</b> ({{ $t('components.acceptInvite.email') }}: {{ groupData.email }})</p>
            </div>
            <button class="btn btn-primary" @click="router.push('/')">
                {{ $t('components.acceptInvite.home') }}
            </button>
        </div>
        <div v-else-if="loading">
            <div class="card card-body mt-3">
                <h2 class="card-title">Ожидание данных...</h2>
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
.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.btn-primary {
    border-radius: 15px;
    background-color: #3846D3;
    border: none;
}
</style>