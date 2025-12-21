<template>
    <PageHeader />
    <div class="container mt-3">
        <div class="row zone mb-3">
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
                <h4 class="col ml-5">Название группы (роль)</h4>
                <div
                    class="col-md-auto d-flex justify-content-end"
                >
                    <div class="btn-group">
                        <div class="btn btn-primary">
                            <i class="bi bi-arrow-left"></i>
                        </div>
                        <div class="btn btn-primary">
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4 mb-2" v-for="test in group" :key="test">
                <div class="card card-body">
                    <h5 class="card-title">Название теста</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Количество вопросов</h6>
                    <p v-if="test.description != ''" class="card-text">Описание</p>
                    <p v-else class="card-text">Нет описания</p>
                    <div class="row flex-row-rewerse">
                        <div class="col-md-auto">
                            <i class="bi bi-trophy"></i>
                        </div>
                        <div class="col-md-auto">
                            <p>30 баллов</p>
                        </div>
                    </div>
                    <div class="btn-group w-100">
                        <div class="btn btn-primary">
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
//import router from '@/router/routes'
import { ref } from 'vue'
import PageHeader from './PageHeader.vue';

//const $t = useI18n().t

const groups = ref([[2, 2, 2], [2], [2, 2, 2], [2, 2, 2]])

// function takeTheTest() {
//     router.push('/testing/123456789/Тестдляотладки')
// }
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

