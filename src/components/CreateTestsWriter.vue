<template>
<div class="mt-1">
    <div class="col">
        <div class="card">
            <div class="mb-0">
                <div class="row">
                    <div class="col-6">
                        <h4>{{ $t('components.createTestsWriter.everyQuestionForm.questionNumber') }} {{ questionWrittenByUserNow + 1}}</h4>
                    </div>
                    <div class="col-3">
                        <button
                            class="btn btn-primary w-100 h-100"
                            :disabled="!(questionWrittenByUserNow > 0)"
                            @click="previousQuestion"
                        >{{ $t('components.createTestsWriter.everyQuestionForm.buttons.previousButton') }}</button>
                    </div>
                    <div class="col-3">
                        <button
                            class="btn btn-primary w-100 h-100"
                            type="submit"
                            id="next-btn"
                            :disabled="disableNextQuestionButton()"
                            @click="nextQuestion()"
                        >{{ $t('components.createTestsWriter.everyQuestionForm.buttons.nextButton') }}</button>
                    </div>
                </div>
                
            </div>
            <hr class="mt-0 mb-0">
            <div class="card-body d-flex flex-column">
                <div class="row">
                    <input
                        v-model="testCreatedByUser[questionWrittenByUserNow].question"
                        class="form-control mb-3"
                        :placeholder="$t('components.createTestsWriter.everyQuestionForm.questionTitle')"
                    >
                </div>
                <div class="row">
                    <div class="row mb-3">
                        <div class="col-4">
                            <h5>{{ $t('components.createTestsWriter.everyQuestionForm.answerOptions') }}</h5>
                        </div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col d-flex justify-content-end">
                                    <button
                                        class="btn btn-primary w-50"
                                        :disabled="testCreatedByUser[questionWrittenByUserNow].options.length >= 10"
                                        @click="addOption"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="option in testCreatedByUser[questionWrittenByUserNow].options" :key="option">
                        <div class="row">
                            <div class="col-1">
                                <input v-model="option.correct" class="form-check-input" type="checkbox">
                            </div>
                            <div class="col-10">
                                <input v-model="option.title" class="form-control">
                            </div>
                            <div class="col-1">
                                <button
                                    class="btn btn-danger"
                                    :disabled="testCreatedByUser[questionWrittenByUserNow].options.length <= 2"
                                    @click="deleteOption(option)"
                                >-</button>
                            </div>
                            <hr class="mt-2 mb-2">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <p>{{ $t('components.createTestsWriter.everyQuestionForm.rule1') }}</p>
                </div>
                <div class="row">
                    <p>{{ $t('components.createTestsWriter.everyQuestionForm.rule2') }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const $t = useI18n().t

const testDataJSON = localStorage.getItem('formData')
const testData = JSON.parse(testDataJSON)
const testCreatedByUser = ref(Array.from({ length: testData.questions_quantity }).map(() => ({
    question: '',
    options: [
        { title: '', correct: false},
        { title: '', correct: false}
    ]
})));

let questionWrittenByUserNow = ref(0)

function nextQuestion() {
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
</script>