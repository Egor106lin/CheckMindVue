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
                            <label class="form-label small text-muted mb-1">
                                {{ $t('components.createTestsForm.testDataForm.groupName') }}
                            </label>
                            <div v-if="groups.length > 0" class="dropdown">
                                <button 
                                    class="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center" 
                                    type="button" 
                                    id="groupDropdown" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                    :disabled="!canCreateTestsForm"
                                >
                                    <span v-if="selectedGroup">
                                        {{ selectedGroup.name }}
                                    </span>
                                    <span v-else class="text-muted">
                                        {{ $t('components.createTestsForm.testDataForm.selectGroup') }}
                                    </span>
                                    <i class="bi bi-chevron-down"></i>
                                </button>
                                <ul class="dropdown-menu w-100 p-3" aria-labelledby="groupDropdown" style="max-height: 300px; overflow-y: auto;">
                                    <li v-for="group in groups" :key="group.id" class="mb-2">
                                        <div class="form-check">
                                            <input 
                                                class="form-check-input" 
                                                type="radio" 
                                                name="groupRadio"
                                                :id="'group-' + group.id" 
                                                :value="String(group.id)"
                                                v-model="state.group_id"
                                                @change="v$.group_id.$touch()"
                                            >
                                            <label class="form-check-label d-flex justify-content-between w-100" :for="'group-' + group.id">
                                                <span>{{ group.name }}</span>
                                                <small class="text-muted">ID: {{ group.id }}</small>
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else-if="groups.length == 0">
                                <label class="form-label text-muted mb-1">
                                    {{ $t('components.createTestsForm.testDataForm.noGroups') }}
                                </label>
                            </div>
                            <div v-if="v$.group_id.$error" class="text-danger small mt-1">
                                <span v-if="v$.group_id.required.$invalid">
                                    {{ $t('validation.required') }}
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
                        <button
                            v-if="!canCreateTestsForm"
                            class="btn btn-danger mb-1 mt-1"
                            @click="cancelTestCreation()"
                        >
                            {{ $t('components.createTestsForm.testDataForm.cancelTestCreation') }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8 mt-3 mt-md-0" v-if="!canCreateTestsForm && !user">
                <create-tests-writer 
                    @leaveOnMain="finishedTest()"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { required, numeric, minValue, maxValue, helpers } from '@vuelidate/validators';
import { ref, computed, reactive, onBeforeMount } from 'vue';
import createTestsWriter from './CreateTestsWriter.vue';
import router from '@/router/routes';
import PageHeader from './PageHeader.vue';
import { useStore } from 'vuex';

const $t = useI18n().t
const store = useStore()
const canCreateTestsForm = ref(true)

const groups = ref([])

onBeforeMount(async () => {
    try {
        await store.dispatch('getGroupsToCreateTest')
        const groupsData = store.getters.getGroupsList
        groups.value = Array.isArray(groupsData) ? groupsData : []
    } catch (error) {
        console.error('Ошибка загрузки групп:', error)
        groups.value = []
    }

    const formData = localStorage.getItem('formData')
    if (formData) {
        const saved = JSON.parse(formData)
        state.test_name = saved.test_name || ''
        state.test_description = saved.test_description || ''
        state.group_id = saved.group_id != null ? String(saved.group_id) : null
        state.questions_quantity = saved.questions_quantity || ''
        canCreateTestsForm.value = false
    }
})

const state = reactive({
    test_name: '',
    test_description: '',
    group_id: null,
    questions_quantity: '',  
})

const selectedGroup = computed(() => {
    if (!Array.isArray(groups.value)) return null
    return groups.value.find(g => String(g.id) === state.group_id)
})

const rules = computed(() => ({
    test_name: { required },
    test_description: { required },
    group_id: { required: helpers.withMessage($t('validation.required'), value => value !== null && value !== '') },
    questions_quantity: { 
        required, 
        numeric, 
        minValue: minValue(1), 
        maxValue: maxValue(30) 
    },
}))

const v$ = useVuelidate(rules, state)

function saveFormData() {
    v$.value.$touch()
    
    if (v$.value.$invalid) {
        return
    }
    
    canCreateTestsForm.value = false
    const formDataJSON = JSON.stringify(state)
    localStorage.setItem('formData', formDataJSON)
    localStorage.setItem('canCreateTestsForm', JSON.stringify(false))
}

function finishedTest() {
    localStorage.removeItem('formData')
    localStorage.removeItem('canCreateTestsForm')
    router.push('/')    
}

function cancelTestCreation() {
    canCreateTestsForm.value = true
    localStorage.removeItem('formData')
    localStorage.removeItem('canCreateTestsForm')
    localStorage.removeItem('questionWrittenByUserNow')
    localStorage.removeItem('testCreatedByUser')
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

.form-control:focus,
.btn-outline-secondary:focus {
    border: 2px solid #3846D3;
    border-radius: 15px;
    box-shadow: none;
}

.form-control,
.btn-outline-secondary {
    outline: none !important;
    box-shadow: none !important;
    border-radius: 15px;
    border: 2px solid #f3f3f3;
    padding: 10px 15px;
}

.form-control:disabled,
.btn-outline-secondary:disabled {
    background-color: #f8f9fa;
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-outline-secondary {
    background-color: white;
    color: #212529;
    text-align: left;
}

.btn-outline-secondary:hover {
    background-color: #f8f9fa;
    border-color: #ced4da;
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

.btn-primary.disabled,
.btn-primary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.65;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    padding: 12px 20px;
    border: none;
}

.h6.h4-md {
    font-size: 1rem;
}

.form-label {
    font-weight: 500;
}

.dropdown-menu {
    border-radius: 15px;
    border: 2px solid #f3f3f3;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    max-height: 300px;
    overflow-y: auto;
}

.dropdown-menu .form-check {
    padding-left: 1.5rem;
}

.dropdown-menu .form-check-input {
    margin-left: -1.5rem;
}

.dropdown-menu .form-check-label {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 0.95rem;
}

@media (min-width: 768px) {
    .h6.h4-md {
        font-size: 1.5rem;
    }
    
    .form-control,
    .btn-outline-secondary {
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
    
    .btn-primary {
        min-height: 48px;
        padding: 12px 16px;
        font-size: 1rem;
    }
    
    .form-control,
    .btn-outline-secondary {
        padding: 12px 16px;
        font-size: 1rem;
    }
    
    hr {
        margin: 15px 0;
    }

    .dropdown-menu {
        max-height: 250px;
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
    
    .btn-primary {
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

.form-control.is-invalid,
.btn-outline-secondary.is-invalid {
    border-color: #dc3545 !important;
}

.form-control.is-invalid:focus,
.btn-outline-secondary.is-invalid:focus {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
}
</style>