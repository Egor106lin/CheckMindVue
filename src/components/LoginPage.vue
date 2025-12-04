<template>
    <div class="container">
        <div class="card mt-3">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col text-center">
                        <h1>CheckMind</h1>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col text-center">
                        <button class="btn btn-primary" @click="loginWithGoogle()">
                            <h5>Зайти с Google</h5>
                        </button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col text-center">
                        <button class="btn btn-primary">
                            <h5>Зайти с VK</h5>
                        </button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col text-center">
                        <button class="btn btn-primary">
                            <h5>Зайти с Яндекс</h5>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore()

async function loginWithGoogle() {
    try {
        await store.dispatch('loginWithGoogle')
        const link = store.getters.link
        window.location.href = link
    } catch(error) {
        console.log(error)
    }
}
</script>

<style lang="css" scoped>
.card {
    border: 2px solid #3846D3;
    border-radius: 20px;
}

.container {
    padding-top: 15%;
}

.btn-primary {
    background-color: #3846D3;
    border-radius: 15px;
    border: 2px solid #ffff;
}

h1 {
    color: #3846D3;
}
</style>