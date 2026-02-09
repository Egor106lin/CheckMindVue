<template>
    <div class="background">
        <div class="container">
            <div class="card mt-3">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col text-center">
                            <div class="blue mx-auto">
                                <h1>CheckMind</h1>
                            </div>
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
    border-radius: 35px;
    box-shadow: 7px 5px 16px 1px #3846D3;
    background: none;
}

.background {
    margin: 0;
    padding-top: 15%;
    min-height: 100vh;
    background-image: url('/src/assets/images/background_light.svg') !important;
}

.btn-primary {
    background-color: #3846D3;
    border-radius: 15px;
    border: none;
}

.btn-primary:hover {
    transform: translateY(-2px);
}

h1 {
    color: #ffff;
    user-select: none;
}

.blue {
    background-image: url('/src/assets/images/background_light.svg');
    border-radius: 30px;
    padding: 3px;
    max-width: 70%;
}
</style>