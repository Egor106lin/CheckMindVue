<template>
<div>
    <div class="col">
        <div v-if="testInProgress" class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-4 card-title">
                        <h5>{{ $t('components.createTestsWriter.everyQuestionForm.questionNumber') }} {{ questionWrittenByUserNow + 1}}</h5>
                    </div>
                    <div class="col-4">
                        <button
                            class="btn btn-secondary w-100"
                            :disabled="!(questionWrittenByUserNow > 0)"
                            @click="previousQuestion"
                        >{{ $t('components.createTestsWriter.everyQuestionForm.buttons.previousButton') }}</button>
                    </div>
                    <div class="col-4" v-if="questionWrittenByUserNow + 1 < testData.questions_quantity">
                        <button
                            class="btn btn-primary w-100"
                            type="submit"
                            id="next-btn"
                            :disabled="disableNextQuestionButton()"
                            @click="nextQuestion()"
                        >{{ $t('components.createTestsWriter.everyQuestionForm.buttons.nextButton') }}</button>
                    </div>
                    <div class="col-4" v-else-if="questionWrittenByUserNow + 1 == testData.questions_quantity">
                        <div class="col d-flex justify-content-end">
                            <button
                                class="btn btn-primary w-100"
                                :disabled="disableSaveButton()"
                                @click="saveTest()"
                            >{{ $t('components.createTestsWriter.everyQuestionForm.buttons.saveTest') }}</button>
                        </div>
                    </div>
                </div>
                <div class="row mt-2 mb-2">
                    <div class="col">
                        <input
                            v-model="testCreatedByUser[questionWrittenByUserNow].question"
                            class="form-control"
                            :placeholder="$t('components.createTestsWriter.everyQuestionForm.questionTitle')"
                        >
                    </div>
                </div>
                <div class="row mt-2 mb-2">
                    <div class="col-8">
                        <h5>{{ $t('components.createTestsWriter.everyQuestionForm.answerOptions') }}</h5>
                    </div>
                    <div class="col-4">
                        <button
                            class="btn btn-primary w-100"
                            :disabled="testCreatedByUser[questionWrittenByUserNow].options.length >= 10"
                            @click="addOption"
                        >{{ $t('components.createTestsWriter.everyQuestionForm.buttons.addOption') }}</button>
                    </div>
                </div>
                <div v-for="option in testCreatedByUser[questionWrittenByUserNow].options" :key="option" class="row">
                    <div class="row">
                        <div class="col-1">
                            <input v-model="option.correct" class="form-check-input large-checkbox" type="checkbox">
                        </div>
                        <div class="col-10">
                            <input v-model="option.title" class="form-control">
                        </div>
                        <div class="col-1">
                            <button
                                class="btn btn-danger"
                                :disabled="testCreatedByUser[questionWrittenByUserNow].options.length <= 2"
                                @click="deleteOption(option)"
                            >{{ $t('components.createTestsWriter.everyQuestionForm.buttons.deleteOption') }}</button>
                        </div>
                        <div class="d-flex justify-content-center"><hr class="mt-2 mb-2 w-50"></div>
                    </div>
                </div>
                <div class="row">
                    <p>{{ $t('components.createTestsWriter.everyQuestionForm.rule1') }}</p>
                </div>
            </div>
        </div>
        <div v-if="!testInProgress" class="card">
            <div class="card-body">
                <div class="card-title">
                    <h5>{{ $t('components.createTestsWriter.readyTestCard.title') }}</h5>
                </div>
                <div class="row">
                    <div class="col-10">
                        <p>{{ $t('components.createTestsWriter.readyTestCard.forGroup') }} <b>{{ testData.group_id }}</b></p>
                    </div>
                    <div class="col-2">
                        <button
                            class="btn btn-primary"
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
import { ref, defineEmits } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const $t = useI18n().t
const testInProgress = ref(true)

const emit = defineEmits(['leaveOnMain'])

const testData = JSON.parse(localStorage.getItem('formData') || null)
const testCreatedByUser = ref(Array.from({ length: testData.questions_quantity }).map(() => ({
    question: '',
    options: [
        { title: '', correct: false},
        { title: '', correct: false}
    ]
})));

const questionWrittenByUserNow = ref(0)

function nextQuestion() {
    localStorage.setItem('testCreatedByUser', JSON.stringify(testCreatedByUser.value))
    questionWrittenByUserNow.value++
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
    let getCorrectOption = false
    let emptyOption = false
    for (const option of testCreatedByUser.value[questionWrittenByUserNow.value].options) {
        if (isOnlySpacesOrEmpty(option.title)) {
            emptyOption = true
        } else if (option.correct == true) {
            getCorrectOption = true
        }
    }
    return !getCorrectOption || emptyOption
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
    emit('leaveOnMain')
}
</script>

<style lang="css" scoped>
.large-checkbox {
    transform: scale(1.7);
    opacity: 0.9;
    cursor: pointer;
}
.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.form-control:focus {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.form-control {
    outline: none !important;
    box-shadow: none !important;
    border-radius: 20px;
    border: 2px solid #f3f3f3;
}

.btn-primary {
    background-color: #3846D3;
    border-radius: 15px;
    border: none;
}

.btn-secondary {
    background-color: #232b86;
    border-radius: 15px;
    border: none;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}
</style>
