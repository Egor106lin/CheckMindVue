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
                            :disabled="!(questionWrittenByUserNow + 1 < testData.questions_quantity)"
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
                                        :disabled="optionsCounter >= 10"
                                        @click="addOption"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="option in testCreatedByUser[questionWrittenByUserNow].options" :key="option">
                        <div class="row" v-if="option.number < optionsCounter">
                            <div class="col-1">
                                <input v-model="option.correct" class="form-check-input" type="checkbox">
                            </div>
                            <div class="col-10">
                                <input v-model="option.title" class="form-control">
                            </div>
                            <div class="col-1">
                                <button
                                    class="btn btn-danger"
                                    :disabled="optionsCounter <= 2"
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
let optionsCounter = ref(2)

const testDataJSON = localStorage.getItem('formData')
const testData = JSON.parse(testDataJSON)
const testCreatedByUser = Array.from({ length: testData.questions_quantity }).map(() => ({
    question: '',
    options: {
        option0: { title: '', correct: false, number: "0" },
        option1: { title: '', correct: false, number: "1" },
        option2: { title: '', correct: false, number: "2" },
        option3: { title: '', correct: false, number: "3" },
        option4: { title: '', correct: false, number: "4" },
        option5: { title: '', correct: false, number: "5" },
        option6: { title: '', correct: false, number: "6" },
        option7: { title: '', correct: false, number: "7" },
        option8: { title: '', correct: false, number: "8" },
        option9: { title: '', correct: false, number: "9" }
    }
}));

let questionWrittenByUserNow = ref(0)
console.log(testData, questionWrittenByUserNow)
console.log(testCreatedByUser)

function nextQuestion() {
    questionWrittenByUserNow.value++
}

function previousQuestion() {
    questionWrittenByUserNow.value--
}

function addOption() {
    optionsCounter.value++
}

function deleteOption(option) {
    option.title = ''
    option.correct = false
    optionsCounter.value--
}
</script>