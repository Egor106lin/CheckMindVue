<template>
    <PageHeader />
    <div class="container mt-3">
        <div class="row mb-4 zone">
            <div class="col">
                <div class="card card-body mb-2">
                    <h2 class="card-title">{{ $t('components.mainPage.checkMind') }}</h2>
                    <div>
                        <p>Инфа о проекте</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-nf card-body row mb-4 zone" v-for="group in groups" :key="group">
            <div class="row mt-2">
                <h4 v-if="group.role == 'Admin'" class="card-title col ml-5">{{ group.name }} {{ $t('components.mainPage.admin') }}</h4>
                <h4 v-else-if="group.role == 'User'" class="card-title col ml-5">{{ group.name }} {{ $t('components.mainPage.user') }}</h4>
                <div
                    v-if="group.tests.length > 3"
                    class="col-md-auto d-flex justify-content-end"
                >
                    <div class="btn-group">
                        <button
                            class="btn btn-primary"
                            :disabled="isBtnShowPreviousTestsDisabled(group.indexForFirstTest, group.indexForLastTest)"
                            @click="group.indexForFirstTest -= 3; group.indexForLastTest -= 3"
                        >
                            <i class="bi bi-arrow-left"></i>
                        </button>
                        <button
                            class="btn btn-primary"
                            :disabled="isBtnShowNextTestsDisabled(group.tests, group.indexForFirstTest, group.indexForLastTest)"
                            @click="group.indexForFirstTest += 3; group.indexForLastTest += 3; console.log(group.tests.slice(group.indexForFirstTest, group.indexForLastTest))"
                        >
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <h6 v-if="group.tests.length > 0" class="col card-subtitle text-body-secondary">{{ $t('components.mainPage.testsQuantity') }} {{ group.tests.length }}</h6>
                <h6 v-else class="col card-subtitle text-body-secondary">{{ $t('components.mainPage.noTests') }}</h6>
            </div>
            <div v-if="group.tests.length > 0" class="row">
                <div
                    class="col-4 mb-2"
                    v-for="test in group.tests.slice(group.indexForFirstTest, group.indexForLastTest)"
                    :key="test"
                >
                    <div class="card card-body">
                        <h5 class="card-title">{{ test.test_name }}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{{ $t('components.mainPage.test.questions') }} {{ test.questions_quantity }}</h6>
                        <p v-if="test.test_description != ''" class="card-text">{{ test.test_description}}</p>
                        <p v-else class="card-text">{{ $t('components.mainPage.test.noDescription') }}</p>
                        <div class="row flex-row-rewerse">
                            <div class="col-md-auto">
                                <i class="bi bi-trophy"></i>
                            </div>
                            <div class="col-md-auto">
                                <p>{{ test.points }}</p>
                            </div>
                        </div>
                        <div
                            v-if="group.role == 'Admin'"
                            class="btn-group w-100"
                        >
                            <div class="btn btn-primary" @click="takeTheTest(test.id)">
                                {{ $t('components.mainPage.test.edit') }}
                            </div>
                            <div class="btn btn-secondary">
                                <i class="bi bi-archive"></i>
                            </div>
                            <div class="btn btn-danger">
                                <i class="bi bi-trash"></i>
                            </div>
                        </div>
                        <div
                            v-else-if="group.role == 'User'"
                        >
                            <div class="btn btn-primary w-100" @click="takeTheTest(test.id)">
                                {{ $t('components.mainPage.test.take') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="group.tests.length == 0 && group.role == 'Admin'" class="row mt-2 mb-2">
                <div class="col">
                    <button
                        class="btn btn-light"
                        @click="router.push('/create_tests')"
                    >
                        {{ $t('components.mainPage.test.create') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import router from '@/router/routes'
import { ref, onMounted } from 'vue'
import PageHeader from './PageHeader.vue';
import { useStore } from 'vuex';


const store = useStore()
const $t = useI18n().t
const groups = ref()

async function getGroupsData() {
    try {
        await store.dispatch('getGroupsWithTests').then(() => {
            groups.value = store.getters.getGroupsWithTests
        })
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

onMounted(() => {
    getGroupsData()
})

function takeTheTest(testID) {
    router.push({
        path: '/testing',
        query: { 
            test_id: testID
        }
    })
}

function isBtnShowNextTestsDisabled(testsList, indexForFirstTest, indexForLastTest) {
    if (testsList.slice(indexForFirstTest + 3, indexForLastTest + 3).length != 0) {
        return false
    } else {
        return true
    }
}

function isBtnShowPreviousTestsDisabled(indexForFirstTest, indexForLastTest) {
    if (indexForFirstTest >= 3 || indexForLastTest >= 6) {
        return false
    } else {
        return true
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
    border: 2px solid #3846D3;
    background-color: #ffffff;
    color: #3846D3;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}

.btn-secondary {
    border-radius: 15px;
    border: none;
}

.btn-light {
    border-radius: 15px;
    border: none;
}

.zone {
    border-radius: 20px;
    box-shadow: 10px 5px 5px #d1d1d1;
}

.card-nf {
    border: none;
    border-radius: 20px;
}
</style>

