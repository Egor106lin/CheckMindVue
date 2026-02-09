<template>
    <PageHeader />
    <div class="container mt-3 px-md-3 px-2">
        <div class="row">
            <div class="col-12">
                <div v-if="testInProgress" class="card card-body zone">
                    <div class="row mb-3 align-items-center">
                        <div class="col-12 col-md-8 mb-3 mb-md-0">
                            <h5 class="card-title mb-0">
                                {{ $t('components.testingInProgress.testName') }} <b>"{{ test?.testName }}"</b>
                            </h5>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="d-flex flex-wrap gap-2 justify-content-start justify-content-md-end">
                                <button
                                    class="btn btn-primary desktop-btn"
                                    v-if="questionNow != 1"
                                    @click="changeQuestion(false)"
                                >
                                    <i class="bi bi-arrow-left"></i>
                                    <span class="ms-1">{{ $t('components.testingInProgress.previousQuestion') }}</span>
                                </button>
                                <button
                                    class="btn btn-primary desktop-btn"
                                    v-if="questionNow < test?.questionsQuantity"
                                    @click="changeQuestion(true)"
                                >
                                    <span class="me-1">{{ $t('components.testingInProgress.nextQuestion') }}</span>
                                    <i class="bi bi-arrow-right"></i>
                                </button>
                                <button
                                    v-if="questionNow == test?.questionsQuantity"
                                    class="btn btn-danger desktop-btn"
                                    :disabled="btnFinishDisabled()"
                                    @click="finishTest()"
                                >
                                    <i class="bi bi-check"></i>
                                    <span class="ms-1">{{ $t('components.testingInProgress.finishTest') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <div class="col-12">
                            <h5 class="card-subtitle text-body-secondary">
                                {{ $t('components.testingInProgress.questionNumber') }} 
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
                    
                    <div v-for="(option, optionIndex) in test?.questionsAndOptions[questionNow - 1]?.options" :key="optionIndex" class="mb-3">
                        <div class="row align-items-center option-row">
                            <div class="col-1">
                                <input
                                    class="form-check-input large-checkbox"
                                    type="checkbox"
                                    :value="optionIndex"
                                    v-model="answers[questionNow - 1].options"
                                    :id="'option-' + questionNow + '-' + optionIndex"
                                >
                            </div>
                            <div class="col-11">
                                <label :for="'option-' + questionNow + '-' + optionIndex" class="option-label w-100 mb-0">
                                    {{ option.title }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="!testInProgress && testResult" class="card card-body zone">
                    <div class="row mb-3">
                        <div class="col-12">
                            <h3 class="card-title">Тест <b>"{{ testResult.testName }}"</b> пройден!</h3>
                        </div>
                    </div>
                    
                    <div class="row mb-4">
                        <div class="col-12">
                            <h5>Ваш результат: <b>{{ testResult.userScore }} / {{ testResult.maxScore }}</b></h5>
                        </div>
                    </div>
                    
                    <!-- Десктопная таблица -->
                    <div class="d-none d-md-block">
                        <ElTable :data="testResult.detailedResults" class="rounded-5 mt-3">
                            <ElTableColumn prop="question" label="Вопрос" width="200"/>
                            <ElTableColumn prop="userAnswers" label="Выбранные ответы"/>
                            <ElTableColumn prop="correctAnswers" label="Правильные ответы"/>
                            <ElTableColumn prop="pointsEarned" label="Набранные баллы" width="140"/>
                            <ElTableColumn prop="maxPoints" label="Максимум баллов" width="140"/>
                        </ElTable>
                    </div>
                    
                    <!-- Мобильные карточки -->
                    <div class="d-md-none">
                        <div v-for="(result, index) in testResult.detailedResults" :key="index" class="card mb-3">
                            <div class="card-body">
                                <h6 class="card-title mb-2">Вопрос {{ index + 1 }}</h6>
                                <p class="small text-muted mb-2">{{ result.question }}</p>
                                
                                <div class="row small mb-2">
                                    <div class="col-6">
                                        <p class="mb-1"><strong>Выбрано:</strong></p>
                                        <p class="mb-0">{{ result.userAnswers || '—' }}</p>
                                    </div>
                                    <div class="col-6">
                                        <p class="mb-1"><strong>Правильно:</strong></p>
                                        <p class="mb-0">{{ result.correctAnswers || '—' }}</p>
                                    </div>
                                </div>
                                
                                <div class="row small">
                                    <div class="col-6">
                                        <p class="mb-1"><strong>Баллы:</strong></p>
                                        <p class="mb-0">{{ result.pointsEarned }} / {{ result.maxPoints }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-4">
                        <div class="col-12">
                            <button class="btn btn-primary w-100 w-md-auto px-4" @click="pushOnMain()">
                                На главную
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
import { onBeforeMount, ref } from 'vue';
import router from '@/router/routes'
import { ElTable, ElTableColumn } from 'element-plus';
import PageHeader from './PageHeader.vue';

const $t = useI18n().t
const store = useStore()

const test = ref()
const answers = ref()
const testResult = ref(null)

const groupIDFromUrl = router.currentRoute.value.query['test_id']

const testInProgress = ref(true)
const questionNow = ref(1)

onBeforeMount(() => {
    const questionNowLocalStorage = localStorage.getItem('questionNow')
    if (questionNowLocalStorage == null) {
        questionNow.value = 1
    } else {
        questionNow.value = parseInt(questionNowLocalStorage)
    }
    getTestAndAnswers()
})

async function getTestAndAnswers() {
    try {
        await store.dispatch('getTest', {
            testID: groupIDFromUrl
        })
        test.value = store.getters.test

        const answersLocaleStorage = JSON.parse(localStorage.getItem('answers'))
        if (answersLocaleStorage == null) {
            answers.value = Array.from({ length: test.value.questionsQuantity }).map(() => ({
                question: '',
                options: []
            }))
        } else {
            answers.value = answersLocaleStorage
        }
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

function changeQuestion(next = true) {
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('questionNow', questionNow.value.toString())
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
}

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
        localStorage.removeItem('answers')
        localStorage.removeItem('questionNow')
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
    border: 2px solid #3846D3;
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

.large-checkbox {
    transform: scale(1.3);
    opacity: 0.9;
    cursor: pointer;
}

.option-row:hover {
    background-color: rgba(56, 70, 211, 0.05);
    border-radius: 10px;
    transition: background-color 0.2s ease;
}

.option-label {
    cursor: pointer;
    padding: 10px 0;
    display: block;
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
        padding: 8px 12px;
        font-size: 0.9rem;
        min-height: 40px;
    }
    
    .large-checkbox {
        transform: scale(1.5);
    }
    
    .option-label {
        padding: 12px 0;
        font-size: 1rem;
    }
    
    h4 {
        font-size: 1.3rem;
    }
    
    h5 {
        font-size: 1.1rem;
    }
    
    .desktop-btn span {
        display: none;
    }
    
    .desktop-btn i {
        margin: 0 !important;
    }
}

@media (min-width: 769px) {
    .d-flex.flex-wrap.gap-2 {
        gap: 12px !important;
    }
    
    .desktop-btn {
        padding: 12px 24px;
        font-size: 1.05rem;
        min-height: 50px;
    }
    
    .desktop-btn span {
        display: inline;
    }
    
    .desktop-btn i {
        display: inline;
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
    
    .btn-primary, .btn-danger {
        width: 100%;
        margin-bottom: 8px;
    }
    
    .d-flex.flex-wrap.gap-2 {
        gap: 8px !important;
    }
    
    .large-checkbox {
        transform: scale(1.6);
    }
    
    .option-label {
        font-size: 1.05rem;
        padding: 14px 0;
    }
}

@media (max-width: 400px) {
    .col-11 {
        padding-left: 10px;
    }
    
    .large-checkbox {
        transform: scale(1.7);
    }
    
    .option-label {
        font-size: 1.1rem;
    }
    
    .desktop-btn {
        padding: 10px 14px;
        min-height: 44px;
    }
}
</style>