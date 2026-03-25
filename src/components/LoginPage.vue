<template>
    <div class="background">
        <div class="decoration">
            <img src="../assets/images/notepad.svg" alt="Notepad" class="notepad">
            <img src="../assets/images/abc.svg" alt="ABC" class="abc">
        </div>
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
                                    <p class="text-white-50 mt-2">Log in to continue</p>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col text-center">
                                    <button class="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2" @click="loginWithGoogle()">
                                        <span class="h5 mb-0">Log in with Google</span>
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col text-center">
                                    <button class="btn btn-primary w-100 py-3" @click="loginWithVK()">
                                        <span class="h5 mb-0">Log in with VK</span>
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col text-center">
                                    <button class="btn btn-primary w-100 py-3 disabled">
                                        <span class="h5 mb-0">Log in with Yandex</span>
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
import { useRoute } from 'vue-router';
import { generateCodeVerifier, generateCodeChallenge } from '@/utils/pkce';

const store = useStore();
const route = useRoute();

async function loginWithGoogle() {
    try {
        const redirectPath = route.query.redirect || '';
        await store.dispatch('loginWithGoogle', redirectPath);
        const link = store.getters.link;
        window.location.href = link;
    } catch(error) {
        console.log(error);
    }
}

async function loginWithVK() {
    try {
        sessionStorage.removeItem('vk_code_verifier');
        sessionStorage.removeItem('vk_state');
        const redirectPath = route.query.redirect || '';
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        sessionStorage.setItem('vk_code_verifier', codeVerifier);
        if (redirectPath) {
            sessionStorage.setItem('vk_state', redirectPath);
        }
        await store.dispatch('loginWithVK', { 
            stateParam: redirectPath, 
            codeChallenge 
        });
        const link = store.getters.link;
        window.location.href = link;
    } catch(error) {
        console.log(error);
    }
}
</script>

<style lang="css" scoped>
.btn-primary {
    background-color: #3846D3;
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

.background {
    position: relative;
    min-height: 100vh;
    background-image: url('/src/assets/images/background_light.svg') !important;
    background-size: cover;
    background-position: center;
    overflow: hidden;
}

.decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.notepad {
    position: absolute;
    left: 5%;
    top: 20%;
    width: 360px;
    height: auto;
    opacity: 0.7;
    transform: rotate(-5deg);
}

.abc {
    position: absolute;
    right: 5%;
    bottom: 15%;
    width: 400px;
    height: auto;
    opacity: 0.7;
    transform: rotate(5deg);
}

.card {
    position: relative;
    z-index: 2;
    border-radius: 35px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.blue {
    background-image: url('/src/assets/images/background_light.svg');
    border-radius: 40px;
    padding: 10px 20px;
    display: inline-block;
    background-size: cover;
    background-position: center;
}

h1 {
    color: #fff;
    user-select: none;
    font-size: 2.5rem;
    margin-bottom: 0;
}

@media (max-width: 768px) {
    .background {
        padding: 20px 0;
    }
    
    .card {
        border-radius: 30px;
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
    
    .btn-outline-light {
        border-radius: 25px;
        font-size: 1rem;
        padding-top: 1rem !important;
        padding-bottom: 1rem !important;
    }
    
    .notepad {
        width: 120px;
        left: 2%;
        top: 15%;
    }
    
    .abc {
        width: 140px;
        right: 2%;
        bottom: 10%;
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
    
    .btn-outline-light {
        border-radius: 20px;
        font-size: 0.95rem;
    }
    
    .notepad, .abc {
        display: none;
    }
}

@media (max-width: 400px) {
    h1 {
        font-size: 1.5rem;
    }
    
    .btn-outline-light {
        font-size: 0.9rem;
    }
}
</style>