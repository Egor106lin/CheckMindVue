<template>
    <PageHeader />
    <div class="container mt-3 px-md-3 px-2">
        <div class="row mb-4">
            <div class="col-12">
                <div class="card card-nf card-body mb-2 zone">
                    <h1 class="card-title">{{ $t('components.mainPage.checkMind') }}</h1>
                    <div>
                        <p>{{ $t('components.mainPage.description1') }}</p>
                        <p>{{ $t('components.mainPage.description2') }}</p>
                        <p>{{ $t('components.mainPage.description3') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="groups.length == 0" class="row mb-4">
            <div class="col-12">
                <div class="card card-nf card-body mb-2 zone">
                    <div>
                        <p>{{ $t('components.mainPage.startWork') }}</p>
                    </div>
                    <button class="btn btn-primary" @click="router.push('/groups')">{{ $t('components.mainPage.start') }}</button>
                </div>
            </div>
        </div>
        <div class="card card-nf card-body mb-4 zone" v-for="group in groups" :key="group">
            <div class="row mt-2 align-items-center">
                <div class="col-12 col-md-8">
                    <div class="d-flex align-items-center flex-wrap">
                        <h4 class="card-title mb-0 me-3">{{ group.name }}</h4>
                        <div class="d-flex align-items-center">
                            <span v-if="group.role == 'Admin'" class="badge bg-primary d-flex align-items-center">
                                <i class="bi bi-shield-check me-1"></i>
                                <span>{{ $t('components.mainPage.admin') }}</span>
                            </span>
                            <span v-else-if="group.role == 'User'" class="badge bg-secondary d-flex align-items-center">
                                <i class="bi bi-person me-1"></i>
                                <span>{{ $t('components.mainPage.user') }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="group.tests.length > 3"
                    class="col-12 col-md-4 mt-2 mt-md-0 d-flex justify-content-start justify-content-md-end"
                >
                    <div class="btn-group btn-group-sm">
                        <button
                            class="btn btn-primary"
                            :disabled="isBtnShowPreviousTestsDisabled(group.indexForFirstTest)"
                            @click="group.indexForFirstTest -= 3; group.indexForLastTest -= 3"
                        >
                            <i class="bi bi-arrow-left"></i>
                        </button>
                        <button
                            class="btn btn-primary"
                            :disabled="isBtnShowNextTestsDisabled(group.tests, group.indexForFirstTest, group.indexForLastTest)"
                            @click="group.indexForFirstTest += 3; group.indexForLastTest += 3"
                        >
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <h6 v-if="group.tests.length > 0" class="card-subtitle text-body-secondary mt-1">
                        {{ $t('components.mainPage.testsQuantity') }} {{ group.tests.length }}
                    </h6>
                    <h6 v-else class="card-subtitle text-body-secondary mt-1">
                        {{ $t('components.mainPage.noTests') }}
                    </h6>
                </div>
            </div>
            <div v-if="group.tests.length > 0" class="row g-2">
                <div
                    class="col-12 col-sm-6 col-lg-4 mb-2"
                    v-for="test in group.tests.slice(group.indexForFirstTest, group.indexForLastTest)"
                    :key="test.id"
                >
                    <div class="card card-test card-body h-100">
                        <h5 class="card-title" :class="test.archived ? 'text-muted' : ''">{{ test.test_name }}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">
                            {{ $t('components.mainPage.test.questions') }} {{ test.questions_quantity }}
                        </h6>
                        <p v-if="test.test_description != ''" class="card-text mb-2 text-truncate-2">
                            {{ test.test_description}}
                        </p>
                        <p v-else class="card-text mb-2 text-muted">
                            {{ $t('components.mainPage.test.noDescription') }}
                        </p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-trophy me-1"></i>
                                <span>{{ test.points }}</span>
                            </div>
                        </div>
                        <div v-if="group.role == 'Admin'" class="d-flex gap-1">
                            <button class="btn btn-primary flex-fill disabled">
                                {{ $t('components.mainPage.test.edit') }}
                            </button>
                            <button v-if="!test.archived" class="btn btn-secondary" style="min-width: 44px" :title="$t('components.mainPage.test.archive')" @click="archiveTest(test.id)">
                                <i class="bi bi-archive"></i>
                            </button>
                            <button class="btn btn-danger" style="min-width: 44px" :title="$t('components.mainPage.test.delete')" @click="deleteTest(test.id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        <div v-if="group.role == 'Admin'" class="d-flex gap-1 mt-1">
                            <button v-if="test.archived" class="btn btn-secondary w-100" :title="$t('components.mainPage.test.dearchive')" @click="dearchiveTest(test.id)">
                                {{ $t('components.mainPage.test.dearchive') }}
                            </button>
                        </div>
                        <div v-if="group.role == 'Admin'" class="d-flex gap-1 mt-1">
                            <button class="btn btn-secondary w-100" @click="openTestResults(test.attempts)">
                                {{ $t('components.mainPage.test.watchResults') }}
                            </button>
                        </div>
                        <div v-else-if="group.role == 'User'">
                            <button class="btn btn-primary w-100" @click="takeTheTest(test.id)">
                                {{ $t('components.mainPage.test.take') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="group.tests.length == 0 && group.role == 'Admin'" class="row mt-2 mb-2">
                <div class="col-12">
                    <button
                        class="btn btn-light w-md-auto"
                        @click="router.push('/create_tests')"
                    >
                        {{ $t('components.mainPage.test.create') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isResultsModalOpen" class="modal-overlay" @click.self="closeResultsModal">
        <div class="modal-content">
            <TestResults
            :results="testResultsData"
            @close="closeResultsModal"
            />
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import router from '@/router/routes'
import { ref, onMounted } from 'vue'
import PageHeader from './PageHeader.vue';
import TestResults from './TestResults.vue'
import { useStore } from 'vuex';
import { showError, showSuccess } from '@/utils/notifications';

const store = useStore()
const $t = useI18n().t
const groups = ref([])
const isResultsModalOpen = ref(false);
const testResultsData = ref()

function openTestResults(attempts) {
    console.log(attempts)
    testResultsData.value = attempts
    isResultsModalOpen.value = true
}

function closeResultsModal() {
  isResultsModalOpen.value = false;
  testResultsData.value = [];
}


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
    return testsList.slice(indexForFirstTest + 3, indexForLastTest + 3).length === 0;
}

function isBtnShowPreviousTestsDisabled(indexForFirstTest) {
    return indexForFirstTest < 3;
}

async function deleteTest(testID) {
    try {
        await store.dispatch('deleteTest', {
            testID: testID
        })
        getGroupsData()
        const status = store.getters['getDeleteTestStatus']
        status == 'success' ? showSuccess($t('toasts.success.testDeleted')) : showError($t('toasts.error.testDeletedError'))
    } catch(error) {
        showError($t('toasts.error.unknownError'))
    }
}

async function archiveTest(testID) {
    try {
        await store.dispatch('archiveTest', {
            testID: testID
        })
        getGroupsData()
        const status = store.getters['getArchiveTestStatus']
        status == 'success' ? showSuccess($t('toasts.success.testArchived')) : showError($t('toasts.error.testArchivedError'))
    } catch(error) {
        showError($t('toasts.error.unknownError'))
    }
}

async function dearchiveTest(testID) {
    try {
        await store.dispatch('dearchiveTest', {
            testID: testID
        })
        getGroupsData()
        const status = store.getters['getDearchiveTestStatus']
        status == 'success' ? showSuccess($t('toasts.success.testDearchived')) : showError($t('toasts.error.testDearchivedError'))
    } catch(error) {
        showError($t('toasts.error.unknownError'))
    }
}

</script>

<style lang="css" scoped>
.card {
    box-shadow: 10px 5px 5px #858383;
    border-radius: 20px;
}

.card-test:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.btn-primary {
    border-radius: 15px;
    border: 2px solid #3846D3;
    background-color: #ffffff;
    color: #3846D3;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #3846D3;
    color: #ffffff;
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
    box-shadow: 10px 5px 5px #858383;
}

.card-nf {
    border: none;
    border-radius: 20px;
}

.badge {
    font-size: 0.85rem;
    padding: 6px 12px;
    border-radius: 10px;
    font-weight: 500;
    line-height: 1.2;
    height: fit-content;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
}

.bg-primary {
    background-color: #3846D3 !important;
}

.text-truncate-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal-content {
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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
    
    .btn-primary, .btn-secondary, .btn-danger, .btn-light {
        min-height: 44px;
        padding: 8px 16px;
        font-size: 0.9rem;
    }
    
    .card .d-flex.gap-1 {
        flex-wrap: nowrap;
    }
    
    .card .btn-primary.flex-fill {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 8px;
        padding-right: 8px;
    }
    
    .card .btn-secondary,
    .card .btn-danger {
        flex: 0 0 auto;
        width: 44px;
        padding-left: 0;
        padding-right: 0;
    }
    
    .btn-group-sm .btn {
        min-height: 36px;
        padding: 6px 12px;
    }
}

@media (max-width: 576px) {
    .card {
        border-radius: 12px;
    }
    
    .zone {
        border-radius: 15px;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    h4 {
        font-size: 1.25rem;
    }
    
    h5 {
        font-size: 1.1rem;
    }
    
    h6 {
        font-size: 1rem;
    }
    
    p, span {
        font-size: 0.95rem;
    }
    
    .badge {
        font-size: 0.75rem;
        padding: 5px 10px;
    }
    
    .card .btn-primary.flex-fill {
        font-size: 0.85rem;
        padding-left: 6px;
        padding-right: 6px;
    }
}

@media (max-width: 400px) {
    .card .btn-primary.flex-fill {
        flex: 1;
        width: auto;
        padding-left: 8px;
        padding-right: 8px;
    }
    
    .card .btn-primary.flex-fill span {
        display: inline;
        font-size: 0.8rem;
    }
}
</style>