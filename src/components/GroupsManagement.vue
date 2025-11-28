<template>
    <PageHeader />
    <div class="container">
        <div class="card mt-5">
            <div class="card-body">
                <h3 class="card-title mb-3">{{ $t('components.groupsManagement.title') }}</h3>
                <div class="row">
                    <div class="col-1">
                        <h5>№</h5>
                    </div>
                    <div class="col-3">
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
                </div>
                <div v-for="group in groupsData" :key="group">
                    <div class="row">
                        <div class="col-1">
                            <p>{{ group.number }}</p>
                        </div>
                        <div class="col-3">
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


const $t = useI18n().t
const store = useStore()

const groupsData = ref()

function getGroupsData() {
    try {
        store.dispatch('getGroupsData').then( () => {
            groupsData.value = store.getters['getGroupsData']
            console.log(groupsData.value)
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

</style>
