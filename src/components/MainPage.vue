<template>
    <PageHeader />
    <div class="container mt-3">
        <div class="row mb-4 zone">
            <div class="col">
                <div class="card card-body mb-2">
                    <h2 class="card-title">CheckMind</h2>
                    <div>
                        <p>Инфа о проекте</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-4 zone" v-for="group in groups" :key="group">
            <div class="row mb-2 mt-2">
                <h4 class="col ml-5">{{ group.group_name }} ({{ group.role }})</h4>
                <div
                    class="col-md-auto d-flex justify-content-end"
                >
                    <div class="btn-group">
                        <button
                            class="btn btn-primary"
                            :disabled="isBtnShowPreviousTestsDisabled(group.indexForFirstTest, group.indexForLastTest)"
                            @click="group.indexForFirstTest -= 3; group.indexForLastTest -= 3"
                        >
                            <i class="bi bi-arrow-left"></i>
                        </button>
                        <button
                            class="btn btn-primary"
                            :disabled="isBtnShowNextTestsDisabled(group.tests, group.indexForFirstTest, group.indexForLastTest)"
                            @click="group.indexForFirstTest += 3; group.indexForLastTest += 3; console.log(group.tests.slice(group.indexForFirstTest, group.indexForLastTest))"
                        >
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-4 mb-2" v-for="test in group.tests.slice(group.indexForFirstTest, group.indexForLastTest)" :key="test">
                <div class="card card-body">
                    <h5 class="card-title">{{ test.test_name }}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{{ test.questions_quantity }}</h6>
                    <p v-if="test.test_description != ''" class="card-text">{{ test.test_description}}</p>
                    <p v-else class="card-text">Нет описания</p>
                    <div class="row flex-row-rewerse">
                        <div class="col-md-auto">
                            <i class="bi bi-trophy"></i>
                        </div>
                        <div class="col-md-auto">
                            <p>{{ test.points }}</p>
                        </div>
                    </div>
                    <div class="btn-group w-100">
                        <div class="btn btn-primary" @click="takeTheTest()">
                            Редактировать
                        </div>
                        <div class="btn btn-secondary">
                            <i class="bi bi-archive"></i>
                        </div>
                        <div class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//import { useI18n } from 'vue-i18n';
import router from '@/router/routes'
import { ref } from 'vue'
import PageHeader from './PageHeader.vue';

//const $t = useI18n().t

const groups = ref(
    [
        {
            group_name: 'Group 1',
            role: 'Administrator',
            tests: [
                {
                    test_name: 'Test 1',
                    test_description: 'Description 1',
                    questions_quantity: 10,
                    points: 30
                },
                {
                    test_name: 'Test 2',
                    test_description: 'Description 2',
                    questions_quantity: 7,
                    points: 18
                },
                {
                    test_name: 'Test 3',
                    test_description: 'Description 3',
                    questions_quantity: 12,
                    points: 25
                },
                {
                    test_name: 'Test 4',
                    test_description: 'Description 4',
                    questions_quantity: 4,
                    points: 15
                },
                {
                    test_name: 'Test 5',
                    test_description: 'Description 5',
                    questions_quantity: 9,
                    points: 22
                },
                {
                    test_name: 'Test 6',
                    test_description: 'Description 6',
                    questions_quantity: 15,
                    points: 29
                },
                {
                    test_name: 'Test 7',
                    test_description: 'Description 7',
                    questions_quantity: 5,
                    points: 12
                },
                {
                    test_name: 'Test 8',
                    test_description: 'Description 8',
                    questions_quantity: 11,
                    points: 27
                },
                {
                    test_name: 'Test 9',
                    test_description: 'Description 9',
                    questions_quantity: 3,
                    points: 10
                },
                {
                    test_name: 'Test 10',
                    test_description: 'Description 10',
                    questions_quantity: 14,
                    points: 31
                }
            ],
            indexForFirstTest: 0,
            indexForLastTest: 3
        },
        {
            group_name: 'Group 2',
            role: 'User',
            tests: [
                {
                    test_name: 'Test 1',
                    test_description: 'Description 1',
                    questions_quantity: 10,
                    points: 30
                },
                {
                    test_name: 'Test 2',
                    test_description: 'Description 2',
                    questions_quantity: 7,
                    points: 18
                },
                {
                    test_name: 'Test 3',
                    test_description: 'Description 3',
                    questions_quantity: 12,
                    points: 25
                },
                {
                    test_name: 'Test 4',
                    test_description: 'Description 4',
                    questions_quantity: 4,
                    points: 15
                },
                {
                    test_name: 'Test 5',
                    test_description: 'Description 5',
                    questions_quantity: 9,
                    points: 22
                },
                {
                    test_name: 'Test 6',
                    test_description: 'Description 6',
                    questions_quantity: 15,
                    points: 29
                },
                {
                    test_name: 'Test 7',
                    test_description: 'Description 7',
                    questions_quantity: 5,
                    points: 12
                },
                {
                    test_name: 'Test 8',
                    test_description: 'Description 8',
                    questions_quantity: 11,
                    points: 27
                },
                {
                    test_name: 'Test 9',
                    test_description: 'Description 9',
                    questions_quantity: 3,
                    points: 10
                },
                {
                    test_name: 'Test 10',
                    test_description: 'Description 10',
                    questions_quantity: 14,
                    points: 31
                }
            ],
            indexForFirstTest: 0,
            indexForLastTest: 3
        }
    ]
)

function takeTheTest() {
    router.push('/testing/123456789/Тестдляотладки')
}

function isBtnShowNextTestsDisabled(testsList, indexForFirstTest, indexForLastTest) {
    if (testsList.slice(indexForFirstTest + 3, indexForLastTest + 3).length != 0) {
        return false
    } else {
        return true
    }
}

function isBtnShowPreviousTestsDisabled(indexForFirstTest, indexForLastTest) {
    if (indexForFirstTest >= 3 || indexForLastTest >= 6) {
        return false
    } else {
        return true
    }
}

</script>

<style lang="css" scoped>
.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.btn-primary {
    border-radius: 15px;
    border: 2px solid #3846D3;
    background-color: #ffffff;
    color: #3846D3;
}

.btn-danger {
    background-color: #d33838;
    border-radius: 15px;
    border: none;
}

.btn-secondary {
    border-radius: 15px;
    border: none;
}

.zone {
    border-radius: 20px;
    box-shadow: 10px 5px 5px #d1d1d1;
}

</style>

