<template>
    <PageHeader />
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <div v-if="testInProgress" class="card card-body">
                    <div class="row mb-2">
                        <div class="col">
                            <h5 class="card-title">
                                {{ $t('components.testingInProgress.testName') }} <b>"{{ test?.testName }}"</b>
                            </h5>
                        </div>
                        <div class="btn-group col-md-auto">
                            <button
                                class="btn btn-primary"
                                v-if="questionNow != 1"
                                @click="changeQuestion(false)"
                            >
                                <i class="bi bi-arrow-left"></i>    
                                {{ $t('components.testingInProgress.previousQuestion') }}
                            </button>
                            <button
                                class="btn btn-primary"
                                v-if="questionNow < test?.questionsQuantity"
                                @click="changeQuestion(true)"
                            >
                                {{ $t('components.testingInProgress.nextQuestion') }}
                                <i class="bi bi-arrow-right"></i>
                            </button>
                            <button
                                v-if="questionNow == test?.questionsQuantity"
                                class="btn btn-danger"
                                :disabled="btnFinishDisabled()"
                                @click="finishTest()"
                            >
                                {{ $t('components.testingInProgress.finishTest') }}
                                <i class="bi bi-check"></i>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h5 class="card-title">
                                {{ $t('components.testingInProgress.questionNumber') }} 
                                {{ questionNow }} / {{ test?.questionsQuantity }}
                            </h5>
                        </div>
                    </div>
                    <hr>
                    <div class="row mb-2">
                        <div class="col">
                            <h3>{{ test?.questionsAndOptions[questionNow - 1]?.question }}</h3>
                        </div>
                    </div>
                    <div v-for="option in test?.questionsAndOptions[questionNow - 1]?.options" :key="option">
                        <div class="row">
                            <div class="col-1">
                                <input
                                    class="form-check-input large-checkbox"
                                    type="checkbox"
                                    :value="option.title"
                                    v-model="answers[questionNow - 1].options"
                                >
                            </div>
                            <div class="col-11">
                                <p>{{ option.title }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!testInProgress" class="card card-body">
                    <div class="row">
                        <h3 class="card-title">Тест <b>"{{ result?.testName }}"</b> пройден!</h3>
                    </div>
                    <div class="row">
                        <h5>Ваш результат: <b>{{ result?.result }} / {{ result?.questionsQuantity }}</b></h5>
                    </div>
                    <div v-for="question in result?.mistakes" :key="question">
                        <div class="row">
                            <div class="col-8">
                                <p>{{ question?.question }}</p>
                            </div>
                            <div class="col-4" v-if="question?.correct">
                                <p>{{ $t('components.testingInProgress.rightAnswer') }}</p>
                            </div>
                            <div class="col-4" v-else-if="!question?.correct">
                                <p>{{ $t('components.testingInProgress.wrongAnswer') }}</p>
                            </div>
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
import { useRoute } from 'vue-router'
import PageHeader from './PageHeader.vue';

const $t = useI18n().t
const store = useStore()

const test = ref()
const answers = ref()
const result = ref()

const router = useRoute()
const groupIDFromUrl = router.params.groupID
const testNameFromUrl = router.params.testName

const testInProgress = ref(true)
const questionNow = ref(1)


onBeforeMount(() => {
    const questionNowLocalStorage = localStorage.getItem('questionNow')
    if (questionNowLocalStorage == null) {
        questionNow.value = 1
    } else {
        questionNow.value = questionNowLocalStorage
    }
    getTestAndAnswers()
})

async function getTestAndAnswers() {
    try {
        await store.dispatch('getTest', {
            groupID: groupIDFromUrl,
            testName: testNameFromUrl
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
    localStorage.setItem('questionNow', questionNow.value)
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
        await store.dispatch('checkAnswers', { answers: answers.value }).then( () => {
            result.value = store.getters.result
        })
    } catch (error) {
        console.error('Ошибка:', error)
    }
    testInProgress.value = false
    answers.value.forEach((answer, index) => {
        if (test.value.questionsAndOptions[index]?.question) {
            answer.question = test.value.questionsAndOptions[index].question;
        }
    });
    answers.value.unshift({ groupID: test.value.groupID })
    answers.value.unshift({ testName: test.value.testName })
    localStorage.removeItem('answers')
    localStorage.removeItem('questionNow')
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
</script>

<style lang="css" scoped>

.large-checkbox {
    transform: scale(1.3);
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