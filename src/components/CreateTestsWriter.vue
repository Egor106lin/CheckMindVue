<template>
<div class="mt-1">
    <div class="col">
        <div class="card">
            <div class="mb-0">
                <div class="row">
                    <div class="col-6">
                        <h4>{{ $t('components.createTests.everyQuestionForm.questionNumber') }} {{ questionWrittenByUserNow + 1}}</h4>
                    </div>
                    <div class="col-3">
                        <button
                            class="btn btn-primary w-100 h-100"
                            :disabled="!(questionWrittenByUserNow > 0)"
                            @click="previousQuestion"
                        >{{ $t('components.createTests.everyQuestionForm.buttons.previousButton') }}</button>
                    </div>
                    <div class="col-3">
                        <button
                            class="btn btn-primary w-100 h-100"
                            type="submit"
                            :disabled="!(questionWrittenByUserNow + 1 < testData.questions_quantity)"
                            @click="nextQuestion()"
                        >{{ $t('components.createTests.everyQuestionForm.buttons.nextButton') }}</button>
                    </div>
                </div>
                
            </div>
            <hr class="mt-0 mb-0">
            <div class="card-body d-flex flex-column">
                <div class="row">
                    <input
                        v-model="testCreatedByUser[questionWrittenByUserNow]"
                        class="form-control mb-3"
                        :placeholder="$t('components.createTests.everyQuestionForm.questionTitle')"
                    >
                </div>
                <div class="row">
                    <div class="row">
                        <h5 class="mb-3">{{ $t('components.createTests.everyQuestionForm.answerOptions') }}</h5>
                    </div>
                    <div class="row">
                        <div class="col-1">
                            <input class="form-check-input" type="checkbox">
                        </div>
                        <div class="col-11">
                            <input class="form-control">
                        </div>
                    </div>
                    <hr class="mt-2 mb-2">
                    <div class="row">
                        <div class="col-1">
                            <input class="form-check-input" type="checkbox">
                        </div>
                        <div class="col-11">
                            <input class="form-control">
                        </div>
                    </div>
                    <hr class="mt-2 mb-2">
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
const testCreatedByUser = Array.from({ length: testData.questions_quantity})

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
</script>