<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card card-body mb-3 mt-2">
                    <h2 class="card-title">CheckMind</h2>
                    <div>
                        <p>Инфа о проекте</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="admin">

        </div>
        <div v-else-if="!admin">
            <div v-if="in_group" class="row">
                <div class="col-6">
                    <div class="card card-body">
                        <div class="card-title">
                            <h5>Название теста</h5>
                        </div>
                        <div>
                            <p>Описание теста</p>
                        </div>
                        <button
                            class="btn btn-primary"
                            @click="takeTheTest()"
                        >
                            Пройти тест
                        </button>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card card-body">
                        <div class="card-title">
                            <h5>Название теста 2</h5>
                        </div>
                        <div>
                            <p>Описание теста 2</p>
                        </div>
                        <button
                            class="btn btn-primary"
                            @click="takeTheTest()"
                        >
                            Пройти тест
                        </button>
                    </div>
                </div>
            </div>
            <div v-else-if="!in_group">
                <p>Ты не в группе. иди добавься хотя-бы в одну</p>
            </div>
        </div>
    </div>
    <button @click="admin = !admin">админ-юзер</button>
    <button @click="in_group = !in_group">вГруппе-нет</button>
</template>

<script setup>
//import { useI18n } from 'vue-i18n';
import router from '@/router/routes'
import { ref } from 'vue'

const in_group = ref(true)
const admin = ref(false)
//const $t = useI18n().t

function takeTheTest() {
    router.push('/testing')
}
</script>

