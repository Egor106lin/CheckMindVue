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
            <div v-else>
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
                            name="create_test" 
                            class="mt-auto btn btn-primary w-100"
                            :class="((!v$.test_name.$error && v$.test_name.$dirty) &&
                                    (!v$.test_description.$error && v$.test_description.$dirty) &&
                                    (!v$.group_id.$error && v$.group_id.$dirty) &&
                                    (!v$.questions_quantity.$error && v$.questions_quantity.$dirty)) ? '' : 'disabled'">
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

<script>
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import { ref, computed, reactive } from 'vue';

export default {
    setup() {
        const user = ref(false)
        let canCreateTest = ref(0)
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
        const v$ = useVuelidate(rules, state)
        
        return {state, v$, user, canCreateTest}
    },
    data() {
    return {
      $t: useI18n().t,
    }
  }
}
</script>