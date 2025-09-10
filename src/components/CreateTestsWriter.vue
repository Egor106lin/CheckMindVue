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
                                <div class="col">
                                    <button
                                        class="btn btn-primary w-50"
                                        :disabled="optionsCounter <= 2"
                                        @click="deleteOption"
                                    >-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="n in optionsCounter" :key="n">
                        <div class="row">
                            <div class="col-1">
                                <input v-model="testCreatedByUser[questionWrittenByUserNow][`option${n}`].correct" class="form-check-input" type="checkbox">
                            </div>
                            <div class="col-11">
                                <input v-model="testCreatedByUser[questionWrittenByUserNow][`option${n}`].title" class="form-control">
                            </div>
                        </div>
                        <hr class="mt-2 mb-2">
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
    option1: { title: '', correct: false },
    option2: { title: '', correct: false },
    option3: { title: '', correct: false },
    option4: { title: '', correct: false },
    option5: { title: '', correct: false },
    option6: { title: '', correct: false },
    option7: { title: '', correct: false },
    option8: { title: '', correct: false },
    option9: { title: '', correct: false },
    option10: { title: '', correct: false },
}));

let questionWrittenByUserNow = ref(0)
console.log(testData, questionWrittenByUserNow)
console.log(testCreatedByUser)

function nextQuestion() {
    console.log(testCreatedByUser)
    questionWrittenByUserNow.value += 1
}

function previousQuestion() {
    questionWrittenByUserNow.value -= 1
}

function addOption() {
    optionsCounter.value += 1
}

function deleteOption() {
    testCreatedByUser[questionWrittenByUserNow][`option${optionsCounter.value}`].title = ''
    testCreatedByUser[questionWrittenByUserNow][`option${optionsCounter.value}`].correct = false
    optionsCounter.value -= 1
}
</script>