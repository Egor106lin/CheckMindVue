<template>
    <div class="container">
        <div class="row">
            <div v-if="user">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ $t('components.createTestsForm.alert.alertNotAdmin') }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!user" class="mb-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">{{ $t('components.createTestsForm.testDataForm.createNewTest') }}</h5>
                            <input 
                            v-model="v$.test_name.$model"
                            class="form-control"
                            type="text"
                            :placeholder="$t('components.createTestsForm.testDataForm.testName')"
                            @blur="v$.test_name.$touch()">
                            <hr>
                            <textarea
                            v-model="v$.test_description.$model"
                            class="form-control"
                            type="text"
                            :placeholder="$t('components.createTestsForm.testDataForm.testDescription')"
                            @blur="v$.test_description.$touch()"></textarea>
                            <hr>
                            <input
                            v-model="v$.group_id.$model"
                            @blur="v$.group_id.$touch"
                            class="form-control"
                            type="text"
                            :placeholder="$t('components.createTestsForm.testDataForm.groupId')">
                            <hr>
                            <input
                            v-model="v$.questions_quantity.$model"
                            @blur="v$.questions_quantity.$touch"
                            class="form-control"
                            type="number"
                            :placeholder="$t('components.createTestsForm.testDataForm.questionsQuanity')">
                            <hr>
                            <button
                            @click="saveFormData()"
                            name="create_test" 
                            class="mt-auto btn btn-primary w-100"
                            :class="(!v$.$error && v$.$dirty && cancreateTestsForm) ? '' : 'disabled'">
                                    {{ $t('components.createTestsForm.testDataForm.createNewTest') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <create-tests-writer v-if="!cancreateTestsForm && !user" />
        </div>
    </div>
    <button @click="user = !user">user/admin</button>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import { ref, computed, reactive } from 'vue';
import createTestsWriter from './CreateTestsWriter.vue';

const $t = useI18n().t
const user = ref(false)
let cancreateTestsForm = ref(true)

let state = reactive({
    test_name: '',
    test_description: '',
    group_id: '',
    questions_quantity: '',  
})
const rules = computed(() => ({
    test_name: {required},
    test_description: {required},
    group_id: {required, numeric},
    questions_quantity: {required, numeric},
}))
const saveFormData = () => {
    const formDataJSON = JSON.stringify(state)
    localStorage.setItem('formData', formDataJSON)
    cancreateTestsForm.value = false
}
const v$ = useVuelidate(rules, state)
</script>