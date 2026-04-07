<template>
    <PageHeader />
    <div class="container mt-3 px-md-3 px-2">
        <div class="row">
            <div class="col-12">
                <div v-if="testInProgress" class="card card-body zone">
                    <div class="row mb-3" v-if="test">
                        <div class="col-12">
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-primary" 
                                    role="progressbar"
                                    :style="{ width: (questionNow / test.questionsQuantity * 100) + '%' }"
                                    :aria-valuenow="questionNow"
                                    aria-valuemin="1"
                                    :aria-valuemax="test.questionsQuantity">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <div class="col-6 col-md-8">
                            <h5 class="card-title mb-0">
                                {{ $t('components.testingInProgress.question.testName') }} <b>"{{ test?.testName }}"</b>
                            </h5>
                        </div>
                        <div class="col-6 col-md-4 text-end">
                            <button
                                class="btn btn-primary desktop-btn"
                                v-if="questionNow != 1"
                                @click="changeQuestion(false)"
                            >
                                <i class="bi bi-arrow-left"></i>
                                <span class="ms-1 d-none d-md-inline">{{ $t('components.testingInProgress.question.previousQuestion') }}</span>
                            </button>
                            <button
                                class="btn btn-primary desktop-btn"
                                v-if="questionNow < test?.questionsQuantity"
                                @click="changeQuestion(true)"
                            >
                                <span class="me-1 d-none d-md-inline">{{ $t('components.testingInProgress.question.nextQuestion') }}</span>
                                <i class="bi bi-arrow-right"></i>
                            </button>
                            <button
                                v-if="questionNow == test?.questionsQuantity"
                                class="btn btn-danger desktop-btn"
                                :disabled="btnFinishDisabled()"
                                @click="finishTest()"
                            >
                                <i class="bi bi-check"></i>
                                <span class="ms-1 d-none d-md-inline">{{ $t('components.testingInProgress.question.finishTest') }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12">
                            <h5 class="card-subtitle text-body-secondary">
                                {{ $t('components.testingInProgress.question.questionNumber') }} 
                                {{ questionNow }} / {{ test?.questionsQuantity }}
                            </h5>
                        </div>
                    </div>
                    <hr>
                    <div class="row mb-4">
                        <div class="col-12">
                            <h4 class="mb-3">{{ test?.questionsAndOptions[questionNow - 1]?.question }}</h4>
                        </div>
                    </div>
                    <div v-for="(option, optionIndex) in test?.questionsAndOptions[questionNow - 1]?.options" :key="optionIndex" class="option-card" :class="{ selected: isOptionSelected(optionIndex) }" @click="toggleOption(optionIndex)">
                        <div class="option-card-content">
                            <input
                                type="checkbox"
                                v-if="!test?.questionsAndOptions[questionNow - 1]?.singleCorrect"
                                :checked="isOptionSelected(optionIndex)"
                                disabled
                                class="form-check-input"
                            />
                            <input
                                type="radio"
                                v-else
                                :name="'q' + questionNow"
                                :checked="isOptionSelected(optionIndex)"
                                disabled
                                class="form-check-input"
                            />
                            <span class="option-text">{{ option.title }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="!testInProgress && testResult" class="card card-body zone">
                    <div class="row mb-3">
                        <div class="col-12">
                            <h3 class="card-title">{{ $t('components.testingInProgress.results.testCompleted', { name: testResult.testName }) }}</h3>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-12">
                            <h5>{{ $t('components.testingInProgress.results.result') }} <b>{{ testResult.userScore }} / {{ testResult.maxScore }}</b></h5>
                        </div>
                    </div>
                    <div class="d-none d-md-block">
                        <ElTable :data="testResult.detailedResults" class="rounded-5 mt-3">
                            <ElTableColumn prop="question" :label="$t('components.testingInProgress.results.question')" width="200"/>
                            <ElTableColumn :label="$t('components.testingInProgress.results.selectedAnswers')">
                                <template #default="scope">
                                    {{ formatAnswers(scope.row.userAnswers) }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn :label="$t('components.testingInProgress.results.correctAnswers')">
                                <template #default="scope">
                                    {{ formatAnswers(scope.row.correctAnswers) }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="pointsEarned" :label="$t('components.testingInProgress.results.pointsEarned')" width="140"/>
                            <ElTableColumn prop="maxPoints" :label="$t('components.testingInProgress.results.maxPoints')" width="140"/>
                        </ElTable>
                    </div>
                    <div class="d-md-none">
                        <div v-for="(result, index) in testResult.detailedResults" :key="index" class="card mb-3">
                            <div class="card-body">
                                <h6 class="card-title mb-2">{{ $t('components.testingInProgress.results.question') }} {{ index + 1 }}</h6>
                                <p class="small text-muted mb-2">{{ result.question }}</p>
                                <div class="row small mb-2">
                                    <div class="col-6">
                                        <p class="mb-1"><strong>{{ $t('components.testingInProgress.results.selected') }}</strong></p>
                                        <p class="mb-0">{{ formatAnswers(result.userAnswers) }}</p>
                                    </div>
                                    <div class="col-6">
                                        <p class="mb-1"><strong>{{ $t('components.testingInProgress.results.correct') }}</strong></p>
                                        <p class="mb-0">{{ formatAnswers(result.correctAnswers) }}</p>
                                    </div>
                                </div>
                                <div class="row small">
                                    <div class="col-6">
                                        <p class="mb-1"><strong>{{ $t('components.testingInProgress.results.points') }}</strong></p>
                                        <p class="mb-0">{{ result.pointsEarned }} / {{ result.maxPoints }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <button class="btn btn-primary w-100 w-md-auto px-4" @click="pushOnMain()">
                                {{ $t('components.testingInProgress.home') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { onBeforeMount, ref, watch } from 'vue';
import router from '@/router/routes'
import { ElTable, ElTableColumn } from 'element-plus';
import PageHeader from './PageHeader.vue';

const $t = useI18n().t
const store = useStore()

const test = ref()
const answers = ref([])
const testResult = ref(null)

const groupIDFromUrl = router.currentRoute.value.query['test_id']

const testInProgress = ref(true)
const questionNow = ref(1)

const getStorageKey = (suffix) => {
    if (!test.value?.testID) return null
    return `test_${test.value.testID}_${suffix}`
}

const saveQuestionNowToStorage = () => {
    const key = getStorageKey('questionNow')
    if (key) localStorage.setItem(key, questionNow.value.toString())
}

const saveAnswersToStorage = () => {
    const key = getStorageKey('answers')
    if (key) localStorage.setItem(key, JSON.stringify(answers.value))
}

const loadFromStorage = () => {
    if (!test.value?.testID) return
    const qKey = getStorageKey('questionNow')
    const savedQuestion = localStorage.getItem(qKey)
    if (savedQuestion) {
        questionNow.value = parseInt(savedQuestion)
    } else {
        questionNow.value = 1
    }

    const aKey = getStorageKey('answers')
    const savedAnswers = localStorage.getItem(aKey)
    if (savedAnswers) {
        try {
            const parsed = JSON.parse(savedAnswers)
            if (Array.isArray(parsed) && parsed.length === test.value.questionsQuantity) {
                answers.value = parsed
            } else {
                answers.value = Array.from({ length: test.value.questionsQuantity }).map(() => ({
                    question: '',
                    options: []
                }))
            }
        } catch {
            answers.value = Array.from({ length: test.value.questionsQuantity }).map(() => ({
                question: '',
                options: []
            }))
        }
    } else {
        answers.value = Array.from({ length: test.value.questionsQuantity }).map(() => ({
            question: '',
            options: []
        }))
    }
}

const clearStorage = () => {
    const qKey = getStorageKey('questionNow')
    const aKey = getStorageKey('answers')
    if (qKey) localStorage.removeItem(qKey)
    if (aKey) localStorage.removeItem(aKey)
}

onBeforeMount(() => {
    getTestAndAnswers()
})

async function getTestAndAnswers() {
    try {
        await store.dispatch('getTest', {
            testID: groupIDFromUrl
        })
        test.value = store.getters.test
        loadFromStorage()
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

function isOptionSelected(optionIndex) {
    const currentAnswers = answers.value[questionNow.value - 1]?.options || []
    return currentAnswers.includes(optionIndex)
}

function toggleOption(optionIndex) {
    const index = questionNow.value - 1
    if (!answers.value[index]) {
        answers.value[index] = { options: [] }
    }
    
    if (test.value?.questionsAndOptions[questionNow.value - 1]?.singleCorrect) {
        answers.value[index].options = [optionIndex]
    } else {
        const current = answers.value[index].options
        if (current.includes(optionIndex)) {
            answers.value[index].options = current.filter(i => i !== optionIndex)
        } else {
            answers.value[index].options = [...current, optionIndex]
        }
    }
    saveAnswersToStorage()
}

function changeQuestion(next = true) {
    saveAnswersToStorage()
    saveQuestionNowToStorage()

    if (next) {
        if (questionNow.value < test.value.questionsQuantity) {
            questionNow.value++
        } else {
            return
        }
    } else {
        if (questionNow.value > 1) {
            questionNow.value--
        } else {
            return
        }
    }
    saveQuestionNowToStorage()
}

watch(answers, () => {
    saveAnswersToStorage()
}, { deep: true })

async function finishTest() {
    try {      
        const answersForBackend = []
        answers.value.forEach((answer, index) => {
            const questionText = test.value.questionsAndOptions[index]?.question || `Вопрос ${index + 1}`
            answersForBackend.push({
                question: questionText,
                answers: answer.options
            })
        })
        await store.dispatch('checkAnswers', { 
            answers: answersForBackend, 
            testID: test.value.testID 
        })
        
        testResult.value = store.getters.result
        testInProgress.value = false
        clearStorage()
    } catch (error) {
        console.error('Ошибка при завершении теста:', error)
        throw error
    }
}

function btnFinishDisabled() {
    const res = ref(false)
    answers.value.forEach((answer) => {
        if (answer.options.length == 0) {
            res.value = true
        }
    });
    return res.value
}

function formatAnswers(answers) {
    if (!answers) return '—'
    if (Array.isArray(answers)) {
        return answers.length ? answers.join(', ') : '—'
    }
    return answers
}

function pushOnMain() {
    router.push('/')
}
</script>

<style lang="css" scoped>
.zone {
    border-radius: 20px;
    box-shadow: 10px 5px 5px #858383;
}

.card {
    border: none;
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

.desktop-btn {
    padding: 10px 20px;
    font-size: 1rem;
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

:deep(.el-table) {
    --el-table-border-color: #dee2e6;
    --el-table-header-bg-color: #f8f9fa;
    --el-table-text-color: #495057;
    border-radius: 12px;
    overflow: hidden;
}

:deep(.el-table th.el-table__cell) {
    background-color: #f8f9fa;
    font-weight: 600;
}

.text-end {
    text-align: right !important;
}

.d-flex.flex-wrap.gap-2.justify-content-end {
    justify-content: flex-end !important;
}

.option-card {
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 12px 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #fff;
}

.option-card:hover {
    border-color: #3846D3;
    background-color: #f8f9ff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.option-card.selected {
    background-color: #eef2ff;
    border-color: #3846D3;
}

.option-card-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.option-card .form-check-input {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0;
    flex-shrink: 0;
    cursor: pointer;
}

.option-text {
    font-size: 1rem;
    line-height: 1.4;
    color: #212529;
}

@media (max-width: 768px) {
    .option-card {
        padding: 10px 14px;
    }
    .option-text {
        font-size: 0.95rem;
    }
}

@media (max-width: 576px) {
    .option-card {
        padding: 8px 12px;
    }
    .option-text {
        font-size: 0.9rem;
    }
}

@media (max-width: 768px) {
    .container {
        padding-left: 12px;
        padding-right: 12px;
    }
    
    .zone {
        box-shadow: 5px 3px 3px #d1d1d1;
        border-radius: 16px;
    }
    
    .card {
        border-radius: 16px;
    }
    
    .btn-primary, .btn-danger {
        min-height: 44px;
        padding: 10px 16px;
        font-size: 0.95rem;
    }
    
    .desktop-btn {
        padding: 8px 10px;
        font-size: 0.9rem;
        min-height: 40px;
        min-width: 40px;
    }
    
    .desktop-btn span {
        display: none;
    }
    
    .desktop-btn i {
        margin: 0 !important;
    }
    
    .col-6.text-end {
        padding-left: 5px;
        padding-right: 5px;
    }
    
    .col-6:first-child {
        padding-left: 12px;
        padding-right: 5px;
    }
    
    .card-title {
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

@media (max-width: 576px) {
    .card {
        border-radius: 14px;
    }
    
    .zone {
        border-radius: 14px;
    }
    
    h3 {
        font-size: 1.4rem;
    }
    
    h4 {
        font-size: 1.2rem;
    }
    
    .desktop-btn {
        padding: 6px 8px;
        min-height: 36px;
        min-width: 36px;
    }
    
    .d-flex.flex-wrap.gap-2.justify-content-end {
        gap: 6px !important;
    }
}

@media (max-width: 400px) {
    .col-11 {
        padding-left: 10px;
    }
    
    .desktop-btn {
        padding: 5px 6px;
        min-height: 34px;
        min-width: 34px;
    }
    
    .col-6.text-end {
        padding-left: 2px;
        padding-right: 2px;
    }
    
    .col-6:first-child {
        padding-left: 12px;
        padding-right: 2px;
    }
    
    .card-title {
        font-size: 0.9rem;
    }
}
</style>