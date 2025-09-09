<template>
    <div class="container">
        <div class="row">
            <div v-if="user">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ $t('components.createTests.alertNotAdmin') }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="col">
                    <div class="card">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">{{ $t('components.createTests.createNewTest') }}</h5>
                            <input 
                            v-model="v$.test_name.$model"
                            class="form-control"
                            type="text"
                            :placeholder="$t('components.createTests.testName')"
                            @blur="v$.test_name.$touch()">
                            <hr>
                            <textarea
                            v-model="v$.test_description.$model"
                            class="form-control"
                            type="text"
                            :placeholder="$t('components.createTests.testDescription')"
                            @blur="v$.test_description.$touch()"></textarea>
                            <hr>
                            <input
                            v-model="v$.group_id.$model"
                            @blur="v$.group_id.$touch"
                            class="form-control"
                            type="text"
                            :placeholder="$t('components.createTests.groupId')">
                            <hr>
                            <input
                            v-model="v$.questions_quantity.$model"
                            @blur="v$.questions_quantity.$touch"
                            class="form-control"
                            type="number"
                            :placeholder="$t('components.createTests.questionsQuanity')">
                            <hr>
                            <button
                            @click="saveFormData()"
                            name="create_test" 
                            class="mt-auto btn btn-primary w-100"
                            :class="(!v$.$error && v$.$dirty) ? '' : 'disabled'">
                                    {{ $t('components.createTests.createNewTest') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button @click="user = !user">user/admin</button>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import { ref, computed, reactive } from 'vue';

const $t = useI18n().t
const user = ref(false)
const state = reactive({
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
    console.log('Данные формы:', state)
    console.log('Данные сохранены в localStorage:', formDataJSON)
}
const v$ = useVuelidate(rules, state)
</script>