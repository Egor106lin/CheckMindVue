<template>
    <PageHeader />
    <div class="container mt-3 px-md-3 px-2">
        <div class="row">
            <div :class="!canCreateTestsForm && !user ? 'col-12 col-md-4' : 'col-12'">
                <div class="card zone">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title h6 h4-md">{{ $t('components.createTestsForm.testDataForm.createNewTest') }}</h5>
                        <div class="mb-3">
                            <label for="test_name" class="form-label small text-muted mb-1">
                                {{ $t('components.createTestsForm.testDataForm.testName') }}
                            </label>
                            <input 
                                id="test_name"
                                v-model="state.test_name"
                                class="form-control"
                                type="text"
                                :disabled="!canCreateTestsForm"
                                :placeholder="$t('components.createTestsForm.testDataForm.testName')"
                                @blur="v$.test_name.$touch()"
                            >
                            <div v-if="v$.test_name.$error" class="text-danger small mt-1">
                                <span v-if="v$.test_name.required.$invalid">
                                    {{ $t('validation.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="test_description" class="form-label small text-muted mb-1">
                                {{ $t('components.createTestsForm.testDataForm.testDescription') }}
                            </label>
                            <textarea
                                id="test_description"
                                v-model="state.test_description"
                                class="form-control"
                                rows="3"
                                :disabled="!canCreateTestsForm"
                                :placeholder="$t('components.createTestsForm.testDataForm.testDescription')"
                                @blur="v$.test_description.$touch()"
                            ></textarea>
                            <div v-if="v$.test_description.$error" class="text-danger small mt-1">
                                <span v-if="v$.test_description.required.$invalid">
                                    {{ $t('validation.required') }}
                                </span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="group_id" class="form-label small text-muted mb-1">
                                {{ $t('components.createTestsForm.testDataForm.groupId') }}
                            </label>
                            <input
                                id="group_id"
                                v-model="state.group_id"
                                @blur="v$.group_id.$touch()"
                                class="form-control"
                                type="text"
                                :disabled="!canCreateTestsForm"
                                :placeholder="$t('components.createTestsForm.testDataForm.groupId')"
                            >
                            <div v-if="v$.group_id.$error" class="text-danger small mt-1">
                                <span v-if="v$.group_id.required.$invalid">
                                    {{ $t('validation.required') }}
                                </span>
                                <span v-if="v$.group_id.numeric.$invalid">
                                    {{ $t('validation.numeric') }}
                                </span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="questions_quantity" class="form-label small text-muted mb-1">
                                {{ $t('components.createTestsForm.testDataForm.questionsQuanity') }}
                            </label>
                            <input
                                id="questions_quantity"
                                v-model.number="state.questions_quantity"
                                @blur="v$.questions_quantity.$touch()"
                                class="form-control"
                                type="number"
                                min="1"
                                max="30"
                                :disabled="!canCreateTestsForm"
                                :placeholder="$t('components.createTestsForm.testDataForm.questionsQuanity')"
                            >
                            <div v-if="v$.questions_quantity.$error" class="text-danger small mt-1">
                                <span v-if="v$.questions_quantity.required.$invalid">
                                    {{ $t('validation.required') }}
                                </span>
                                <span v-if="v$.questions_quantity.numeric.$invalid">
                                    {{ $t('validation.numeric') }}
                                </span>
                                <span v-if="v$.questions_quantity.minValue.$invalid">
                                    {{ $t('validation.minValue', { min: 1 }) }}
                                </span>
                                <span v-if="v$.questions_quantity.maxValue.$invalid">
                                    {{ $t('validation.maxValue', { max: 30 }) }}
                                </span>
                            </div>
                        </div>
                        <button
                            @click="saveFormData()"
                            name="create_test" 
                            class="btn btn-primary w-100"
                            :class="{ 
                                'disabled': v$.$invalid || !v$.$dirty || !canCreateTestsForm,
                                'opacity-50': v$.$invalid || !v$.$dirty || !canCreateTestsForm
                            }"
                            :disabled="v$.$invalid || !v$.$dirty || !canCreateTestsForm"
                        >
                            {{ $t('components.createTestsForm.testDataForm.createNewTest') }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8 mt-3 mt-md-0" v-if="!canCreateTestsForm && !user">
                <create-tests-writer 
                    @leaveOnMain="finishedTest()"
                    @editForm="enableEditing()"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { required, numeric, minValue, maxValue } from '@vuelidate/validators';
import { ref, computed, reactive, onBeforeMount } from 'vue';
import createTestsWriter from './CreateTestsWriter.vue';
import router from '@/router/routes';
import PageHeader from './PageHeader.vue';

const $t = useI18n().t
const canCreateTestsForm = ref(true)

onBeforeMount(() => {
    const formData = localStorage.getItem('formData')
    if (formData != null) {
        const testParams = JSON.parse(formData)
        state.test_name = testParams.test_name || ''
        state.test_description = testParams.test_description || ''
        state.group_id = testParams.group_id || ''
        state.questions_quantity = testParams.questions_quantity || ''
        canCreateTestsForm.value = false
    }
})

const state = reactive({
    test_name: '',
    test_description: '',
    group_id: '',
    questions_quantity: '',  
})

const rules = computed(() => ({
    test_name: { required },
    test_description: { required },
    group_id: { required, numeric },
    questions_quantity: { 
        required, 
        numeric, 
        minValue: minValue(1), 
        maxValue: maxValue(30) 
    },
}))

const v$ = useVuelidate(rules, state)

const saveFormData = () => {
    v$.value.$touch()
    
    if (v$.value.$invalid) {
        return
    }
    
    canCreateTestsForm.value = false
    const formDataJSON = JSON.stringify(state)
    localStorage.setItem('formData', formDataJSON)
    localStorage.setItem('canCreateTestsForm', JSON.stringify(false))
}

const enableEditing = () => {
    canCreateTestsForm.value = true
    localStorage.removeItem('canCreateTestsForm')
}

const finishedTest = () => {
    localStorage.removeItem('formData')
    localStorage.removeItem('canCreateTestsForm')
    router.push('/')    
}
</script>

<style lang="css" scoped>
.zone {
    border-radius: 20px;
    box-shadow: 10px 5px 5px #858383;
}

.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.form-control:focus {
    border: 2px solid #3846D3;
    border-radius: 15px;
}

.form-control {
    outline: none !important;
    box-shadow: none !important;
    border-radius: 15px;
    border: 2px solid #f3f3f3;
    padding: 10px 15px;
}

.form-control:disabled {
    background-color: #f8f9fa;
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-primary {
    background-color: #3846D3;
    border-radius: 15px;
    border: none;
    padding: 12px 20px;
    font-weight: 500;
}

.btn-primary:hover {
    background-color: #2a37b0;
}

.btn-outline-secondary {
    border-radius: 15px;
    padding: 10px 20px;
}

.btn-primary.disabled,
.btn-primary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.65;
}

.h6.h4-md {
    font-size: 1rem;
}

.form-label {
    font-weight: 500;
}

@media (min-width: 768px) {
    .h6.h4-md {
        font-size: 1.5rem;
    }
    
    .form-control {
        padding: 12px 18px;
    }
}

@media (max-width: 768px) {
    .container {
        padding-left: 12px;
        padding-right: 12px;
    }
    
    .zone {
        box-shadow: 5px 3px 3px #d1d1d1;
        border-radius: 16px;
    }
    
    .card {
        border-radius: 16px;
    }
    
    .btn-primary, .btn-outline-secondary {
        min-height: 48px;
        padding: 12px 16px;
        font-size: 1rem;
    }
    
    .form-control {
        padding: 12px 16px;
        font-size: 1rem;
    }
    
    hr {
        margin: 15px 0;
    }
}

@media (max-width: 576px) {
    .card {
        border-radius: 14px;
    }
    
    .zone {
        border-radius: 14px;
    }
    
    h5 {
        font-size: 1.1rem;
    }
    
    .btn-primary, .btn-outline-secondary {
        min-height: 52px;
    }
    
    .mt-md-0 {
        margin-top: 20px !important;
    }
}

.text-danger.small {
    font-size: 0.85rem;
    margin-top: 4px;
}

.form-control.is-invalid {
    border-color: #dc3545 !important;
}

.form-control.is-invalid:focus {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
}
</style>