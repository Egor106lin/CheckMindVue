<template>
    <div class="background">
        <div class="container d-flex align-items-center min-vh-100">
            <div class="row w-100 justify-content-center">
                <div class="col-12 col-md-8 col-lg-5">
                    <div class="card">
                        <div class="card-body p-4 p-sm-5">
                            <div class="row mb-4">
                                <div class="col text-center">
                                    <div class="blue mx-auto">
                                        <h1>CheckMind</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col text-center">
                                    <button class="btn btn-primary w-100 py-3" @click="loginWithGoogle()">
                                        <span class="h5 mb-0">Зайти с Google</span>
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col text-center">
                                    <button class="btn btn-primary w-100 py-3">
                                        <span class="h5 mb-0">Зайти с VK</span>
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col text-center">
                                    <button class="btn btn-primary w-100 py-3">
                                        <span class="h5 mb-0">Зайти с Яндекс</span>
                                    </button>
                                </div>
                            </div>
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
.background {
    min-height: 100vh;
    background-image: url('/src/assets/images/background_light.svg') !important;
    background-size: cover;
    background-position: center;
}

.card {
    border-radius: 35px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-primary {
    background-color: #3f48ad;
    border-radius: 20px;
    border: none;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(56, 70, 211, 0.3);
}

.btn-primary:active {
    transform: translateY(-1px);
}

h1 {
    color: #ffff;
    user-select: none;
    font-size: 2.5rem;
    margin-bottom: 0;
}

.blue {
    background-image: url('/src/assets/images/background_light.svg');
    border-radius: 40px;
    padding: 10px 20px;
    display: inline-block;
    background-size: cover;
    background-position: center;
}

@media (max-width: 768px) {
    .background {
        padding: 20px 0;
    }
    
    .card {
        border-radius: 30px;
        box-shadow: 5px 5px 15px 0 #3846D3;
    }
    
    .card-body {
        padding: 2rem 1.5rem !important;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    .blue {
        border-radius: 30px;
        padding: 8px 16px;
    }
    
    .btn-primary {
        border-radius: 18px;
        font-size: 1.1rem;
        padding-top: 1rem !important;
        padding-bottom: 1rem !important;
    }
    
    .btn-primary:hover {
        transform: none;
    }
}

@media (max-width: 576px) {
    .card-body {
        padding: 1.5rem 1rem !important;
    }
    
    h1 {
        font-size: 1.8rem;
    }
    
    .blue {
        border-radius: 25px;
        padding: 6px 12px;
    }
    
    .btn-primary {
        border-radius: 16px;
        font-size: 1rem;
    }
}

@media (max-width: 400px) {
    h1 {
        font-size: 1.5rem;
    }
    
    .btn-primary {
        font-size: 0.95rem;
    }
}
</style>