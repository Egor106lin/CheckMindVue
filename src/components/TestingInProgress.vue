<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col">
                <div class="card card-body">
                    <div class="row mb-2">
                        <div class="col-8">
                            <h5 class="card-title">{{ $t('components.testingInProgress.questionNumber') }} {{ questionNow }} / {{ test?.questionsQuantity }}</h5>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-secondary" @click="changeQuestion(false)">Предыдущий вопрос</button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-primary" @click="changeQuestion(true)">Следующий вопрос</button>
                        </div>
                    </div>
                    <hr>
                    <div class="row mb-2">
                        <div class="col">
                            <h3>{{ test?.questionsAndOptions[questionNow - 1].question }}</h3>
                        </div>
                    </div>
                    <div v-for="option in test?.questionsAndOptions[questionNow - 1].options" :key="option">
                        <div class="row">
                            <div class="col-1">
                                <input class="form-check-input large-checkbox" type="checkbox">
                            </div>
                            <div class="col-11">
                                <p>{{ option.title }}</p>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const $t = useI18n().t
const store = useStore()
const test = ref()
const questionNow = ref(1)
const router = useRoute()
const groupIDFromUrl = router.params.groupID
const testNameFromUrl = router.params.testName

onMounted(() => {
    const questionNowLocalStorage = localStorage.getItem('questionNow')
    if (questionNowLocalStorage == null) {
        questionNow.value = 0
    } else {
        questionNow.value = questionNowLocalStorage
    }
    getTest()
})

onBeforeUnmount(() => {
    localStorage.setItem('questionNow', questionNow.value)
})

async function getTest() {
    try {
        await store.dispatch('getTest', {
            groupID: groupIDFromUrl,
            testName: testNameFromUrl
        })
        test.value = store.state.testingInProgress.test
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

function changeQuestion(next = true) {
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
</script>