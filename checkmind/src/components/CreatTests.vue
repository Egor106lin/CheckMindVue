<template>
    <div class="container">
        <div class="row">
            <div v-if="user">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">Упс! Тесты может создавать только администратор!</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="col">
                    <div class="card">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">Создание нового теста</h5>
                            <form>
                                <input 
                                @blur="v$.test_name.$touch"
                                class="form-control"
                                type="text"
                                placeholder="Название теста"
                                v-model="test_name">
                                <p class="error-alert" v-if="v$.test_name.$error">Поле не должно быть пустым</p>
                                <hr>
                                <input
                                @blur="v$.group_id.$touch"
                                class="form-control"
                                type="text"
                                placeholder="ID-группы"
                                v-model="group_id">
                                <p class="error-alert" v-if="v$.group_id.$error">Поле не может быть пустым и должно содержать только цифры</p>
                                <hr>
                                <input
                                @blur="v$.questions_quantity.$touch"
                                class="form-control"
                                type="number"
                                placeholder="Количество вопросов"
                                v-model="questions_quantity">
                                <p class="error-alert" v-if="v$.questions_quantity.$error">Поле не может быть пустым и должно содержать только цифры</p>
                                <hr>
                                <input
                                @blur="v$.answers_quantity.$touch"
                                class="form-control"
                                type="number"
                                placeholder="Количество ответов"
                                v-model="answers_quantity">
                                <p class="error-alert" v-if="v$.answers_quantity.$error">Поле не может быть пустым и должно содержать только цифры</p>
                                <hr>
                                <input
                                @blur="v$.correct_answers_quantity.$touch"
                                class="form-control"
                                type="number"
                                placeholder="Количество верных ответов"
                                v-model="correct_answers_quantity">
                                <p class="error-alert" v-if="v$.correct_answers_quantity.$error">Поле не может быть пустым и должно содержать только цифры</p>
                                <button name="create_test" class="mt-auto btn btn-primary w-100 disabled">Перейти к написанию заданий</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button @click="user = !user">user/admin</button>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import { reactive } from 'vue';
import { ref } from 'vue'

export default {
    setup() {
        const user = ref(false)
        const state = reactive({
            test_name: '',
            group_id: '',
            questions_quantity: '',
            answers_quantity: '',
            correct_answers_quantity: '',
        })
        const rules = {
            test_name: {required},
            group_id: {required, numeric},
            questions_quantity: {required, numeric},
            answers_quantity: {required, numeric},
            correct_answers_quantity: {required, numeric},
        }
        const v$ = useVuelidate(rules, state)

        return {state, v$, user}
    },
}
</script>

<style>
.error-alert {
    border: 1px groove red;
}
</style>