<template>
    <div class="container">
        <div class="card mt-5">
            <div class="card-body">
                <h3 class="card-title">{{ $t('components.groupsManagement.title') }}</h3>
                <button @click="getGroupsData()">
                    groups
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

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
