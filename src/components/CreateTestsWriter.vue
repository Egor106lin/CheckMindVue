<template>
<div>
    <div class="col">
        <div v-if="testInProgress" class="card zone">
            <div class="card-body">
                <div class="row mb-3" v-if="testData">
                    <div class="col-12">
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-primary" 
                                role="progressbar"
                                :style="{ width: ((questionWrittenByUserNow + 1) / testData.questions_quantity * 100) + '%' }"
                                :aria-valuenow="questionWrittenByUserNow + 1"
                                aria-valuemin="1"
                                :aria-valuemax="testData.questions_quantity">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3 align-items-center">
                    <div class="col-12 col-md-4 mb-2 mb-md-0">
                        <h5 class="card-title mb-0">{{ $t('components.createTestsWriter.everyQuestionForm.questionNumber') }} {{ questionWrittenByUserNow + 1}}</h5>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="d-flex flex-wrap gap-2 justify-content-end">
                            <button
                                class="btn btn-outline-secondary"
                                :disabled="!(questionWrittenByUserNow > 0)"
                                @click="previousQuestion"
                            >
                                <i class="bi bi-arrow-left d-md-none"></i>
                                <span class="d-none d-md-inline">{{ $t('components.createTestsWriter.everyQuestionForm.buttons.previousButton') }}</span>
                            </button>
                            
                            <button
                                class="btn btn-primary"
                                v-if="questionWrittenByUserNow + 1 < testData.questions_quantity"
                                :disabled="disableNextQuestionButton()"
                                @click="nextQuestion()"
                            >
                                <span class="d-none d-md-inline">{{ $t('components.createTestsWriter.everyQuestionForm.buttons.nextButton') }}</span>
                                <i class="bi bi-arrow-right d-md-none"></i>
                            </button>
                            
                            <button
                                v-if="questionWrittenByUserNow + 1 == testData.questions_quantity"
                                class="btn btn-success"
                                :disabled="disableSaveButton()"
                                @click="saveTest()"
                            >
                                <i class="bi bi-check-circle me-1"></i>
                                {{ $t('components.createTestsWriter.everyQuestionForm.buttons.saveTest') }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row mt-3 mb-3">
                    <div class="col-12">
                        <input
                            v-model="testCreatedByUser[questionWrittenByUserNow].question"
                            class="form-control form-control-lg"
                            :placeholder="$t('components.createTestsWriter.everyQuestionForm.questionTitle')"
                        >
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                :id="'singleCorrect_' + questionWrittenByUserNow"
                                v-model="testCreatedByUser[questionWrittenByUserNow].singleCorrect"
                                @change="handleSingleCorrectToggle"
                            >
                            <label class="form-check-label" :for="'singleCorrect_' + questionWrittenByUserNow">
                                {{  $t('components.createTestsWriter.everyQuestionForm.oneAnswer') }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row mb-3 align-items-center">
                    <div class="col-12 col-md-8 mb-2 mb-md-0">
                        <h5 class="mb-0">{{ $t('components.createTestsWriter.everyQuestionForm.answerOptions') }}</h5>
                    </div>
                    <div class="col-12 col-md-4">
                        <button
                            class="btn btn-outline-primary w-100"
                            :disabled="testCreatedByUser[questionWrittenByUserNow].options.length >= 10"
                            @click="addOption"
                        >
                            <i class="bi bi-plus-circle me-1"></i>
                            {{ $t('components.createTestsWriter.everyQuestionForm.buttons.addOption') }}
                        </button>
                    </div>
                </div>
                <div v-for="(option, index) in testCreatedByUser[questionWrittenByUserNow].options" :key="index" class="row mb-3">
                    <div class="col-12">
                        <div class="input-group">
                            <div class="input-group-text">
                                <input
                                    v-if="!testCreatedByUser[questionWrittenByUserNow].singleCorrect"
                                    v-model="option.correct"
                                    class="form-check-input mt-0"
                                    type="checkbox"
                                />
                                <input
                                    v-else
                                    class="form-check-input mt-0"
                                    type="radio"
                                    :name="'correct_' + questionWrittenByUserNow"
                                    :value="index"
                                    :checked="option.correct"
                                    @change="setSingleCorrect(index)"
                                />
                            </div>
                            <input v-model="option.title" class="form-control" />
                            <button
                                class="btn btn-outline-danger"
                                :disabled="testCreatedByUser[questionWrittenByUserNow].options.length <= 2"
                                @click="deleteOption(option)"
                            >
                                <i class="bi bi-trash"></i>
                                <span class="d-none d-md-inline ms-1">{{ $t('components.createTestsWriter.everyQuestionForm.buttons.deleteOption') }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-12">
                        <p class="text-muted small">{{ $t('components.createTestsWriter.everyQuestionForm.rule1') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!testInProgress" class="card zone">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12">
                        <h5 class="card-title">{{ $t('components.createTestsWriter.readyTestCard.title') }}</h5>
                    </div>
                </div>
                
                <div class="row align-items-center">
                    <div class="col-12 col-md-10 mb-3 mb-md-0">
                        <p class="mb-0">{{ $t('components.createTestsWriter.readyTestCard.forGroup') }} <b class="badge bg-primary">{{ testData.group_id }}</b></p>
                    </div>
                    <div class="col-12 col-md-2">
                        <button
                            class="btn btn-primary w-100"
                            @click="leaveOnMain()"
                        >{{ $t('components.createTestsWriter.readyTestCard.buttons.leave') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, defineEmits, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const $t = useI18n().t
const testInProgress = ref(true)
const testCreatedByUser = ref()

const emit = defineEmits(['leaveOnMain'])
const testData = JSON.parse(localStorage.getItem('formData') || null)
const questionWrittenByUserNow = ref()

onBeforeMount(() => {
    let questionWrittenByUserNowLS = localStorage.getItem('questionWrittenByUserNow')
    if (questionWrittenByUserNowLS != null) {
        questionWrittenByUserNow.value = JSON.parse(questionWrittenByUserNowLS)
    } else {
        questionWrittenByUserNow.value = 0
    }
    let testCreatedByUserLS = localStorage.getItem('testCreatedByUser')
    if (testCreatedByUserLS != null) {
        testCreatedByUser.value = JSON.parse(testCreatedByUserLS)
    } else {
        testCreatedByUser.value = Array.from({ length: testData.questions_quantity }).map(() => ({
            question: '',
            singleCorrect: false,
            options: [
                { title: '', correct: false},
                { title: '', correct: false}
            ]
        }));
    }
})

function nextQuestion() {
    localStorage.setItem('testCreatedByUser', JSON.stringify(testCreatedByUser.value))
    questionWrittenByUserNow.value++
    localStorage.setItem('questionWrittenByUserNow', JSON.stringify(questionWrittenByUserNow.value))
}

function previousQuestion() {
    questionWrittenByUserNow.value--
}

function addOption() {
    testCreatedByUser.value[questionWrittenByUserNow.value].options.push({ title: '', correct: false })
}

function deleteOption(option) {
    let index = testCreatedByUser.value[questionWrittenByUserNow.value].options.indexOf(option)
    testCreatedByUser.value[questionWrittenByUserNow.value].options.splice(index, 1)
}

function handleSingleCorrectToggle() {
    const currentQ = testCreatedByUser.value[questionWrittenByUserNow.value]
    if (currentQ.singleCorrect) {
        const correctIndices = currentQ.options.reduce((acc, opt, idx) => opt.correct ? [...acc, idx] : acc, [])
        if (correctIndices.length > 1) {
            for (let i = 1; i < correctIndices.length; i++) {
                currentQ.options[correctIndices[i]].correct = false
            }
        }
    }
}

function setSingleCorrect(index) {
    const currentQ = testCreatedByUser.value[questionWrittenByUserNow.value]
    currentQ.options.forEach((opt, i) => {
        opt.correct = (i === index)
    })
}

function disableNextQuestionButton() {
    if (questionWrittenByUserNow.value + 1 >= testData.questions_quantity) {
        return true
    } else if (
        isOnlySpacesOrEmpty(testCreatedByUser.value[questionWrittenByUserNow.value].question)
    ) {
        return true
    } else if (findUncorrectOption()) {
        return true
    } else {
        return false
    }
}

function disableSaveButton() {
    if (
        isOnlySpacesOrEmpty(testCreatedByUser.value[questionWrittenByUserNow.value].question)
    ) {
        return true
    } else if (findUncorrectOption()) {
        return true
    } else {
        return false
    }
}

function isOnlySpacesOrEmpty(inputText) {
  return /^\s*$/.test(inputText) || inputText == '';
}

function findUncorrectOption() {
    const currentQ = testCreatedByUser.value[questionWrittenByUserNow.value]
    let correctCount = 0
    let emptyOption = false
    for (const option of currentQ.options) {
        if (isOnlySpacesOrEmpty(option.title)) {
            emptyOption = true
        } else if (option.correct == true) {
            correctCount++
        }
    }
    if (currentQ.singleCorrect) {
        return correctCount !== 1 || emptyOption
    } else {
        return correctCount === 0 || emptyOption
    }
}

async function saveTest() {
    testInProgress.value = false
    const testDataToSend = {
        groupID: testData.group_id,
        questionsQuantity: testData.questions_quantity,
        testName: testData.test_name,
        testDescription: testData.test_description,
        questionsAndOptions: testCreatedByUser.value,
    };
    const testJSON = JSON.stringify(testDataToSend)
    try {
        await store.dispatch('sendTestData', testJSON)
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

function leaveOnMain() {
    localStorage.removeItem('testCreatedByUser')
    localStorage.removeItem('formData')
    localStorage.removeItem('questionWrittenByUserNow')
    emit('leaveOnMain')
}
</script>

<style lang="css" scoped>
.zone {
    border-radius: 20px;
    box-shadow: 10px 5px 5px #858383;
}

.card {
    box-shadow: 10px 5px 5px #858383;
    border-radius: 20px;
}

.form-control:focus {
    border: 2px solid #3846D3;
    border-radius: 15px;
}

.form-control {
    outline: none !important;
    box-shadow: none !important;
    border-radius: 15px;
    border: 2px solid #f3f3f3;
}

.form-control-lg {
    padding: 14px 18px;
    font-size: 1.1rem;
}

.btn-primary {
    background-color: #3846D3;
    border-radius: 12px;
    border: none;
}

.btn-success {
    background-color: #28a745;
    border-radius: 12px;
    border: none;
}

.btn-outline-secondary {
    border-radius: 12px;
    border: 2px solid #6c757d;
    color: #6c757d;
}

.btn-outline-primary {
    border-radius: 12px;
    border: 2px solid #3846D3;
    color: #3846D3;
}

.btn-outline-danger {
    border-radius: 12px;
    border: 2px solid #dc3545;
    color: #dc3545;
}

.input-group-text {
    background-color: transparent;
    border-right: none;
}

.input-group .form-control {
    border-left: none;
}

.badge {
    font-size: 0.9rem;
    padding: 6px 12px;
    border-radius: 10px;
}

@media (max-width: 768px) {
    .zone {
        box-shadow: 5px 3px 3px #d1d1d1;
        border-radius: 16px;
    }

    .card {
        border-radius: 16px;
    }

    .btn, .form-control {
        min-height: 44px;
        padding: 8px 12px;
        font-size: 0.95rem;
    }

    .form-control-lg {
        padding: 10px 14px;
        font-size: 1rem;
    }

    .btn-outline-danger span {
        display: none;
    }

    .input-group {
        flex-wrap: wrap;
    }

    .input-group-text {
        padding: 0.375rem 0.5rem;
    }

    .input-group .form-control {
        flex: 1 1 140px;
        min-width: 140px;
    }

    .input-group .btn-outline-danger {
        width: auto;
        flex: 0 0 auto;
        margin-left: 4px;
        padding: 0.375rem 0.5rem;
    }

    .d-flex.flex-wrap.gap-2.justify-content-end .btn {
        min-width: 44px;
    }

    .card-body {
        overflow-x: hidden;
    }
}

@media (max-width: 576px) {
    .card {
        border-radius: 14px;
    }
    .zone {
        border-radius: 14px;
    }
    h5 {
        font-size: 1.1rem;
    }
    .input-group .form-control {
        flex: 1 1 120px;
        min-width: 120px;
    }
    .input-group .btn-outline-danger {
        padding: 0.375rem 0.5rem;
    }
}

@media (max-width: 480px) {
    .input-group {
        flex-wrap: wrap;
    }
    .input-group-text {
        width: auto;
        padding: 0.375rem 0.5rem;
    }
    .input-group .form-control {
        flex: 1 1 calc(100% - 100px);
        min-width: 0;
    }
    .input-group .btn-outline-danger {
        width: auto;
        margin-left: 4px;
        flex: 0 0 auto;
    }
}

@media (max-width: 400px) {
    .input-group {
        flex-wrap: wrap;
    }
    .input-group-text {
        width: 100%;
        justify-content: center;
        border-radius: 12px 12px 0 0;
        border-bottom: none;
        background-color: #f8f9fa;
    }
    .input-group .form-control {
        flex: 1 1 100%;
        border-radius: 0;
        margin: 0;
        border-top: none;
        border-bottom: none;
    }
    .input-group .btn-outline-danger {
        width: 100%;
        border-radius: 0 0 12px 12px;
        margin-top: 0;
        margin-left: 0;
        border-top: none;
        background-color: #fff;
    }
    .input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
}
</style>