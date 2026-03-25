<template>
    <div class="min-vh-100 d-flex align-items-center justify-content-center">
        <div class="card" style="max-width: 400px; width: 100%;">
            <div class="card-body text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Downloading...</span>
                </div>
                <p class="mt-3 mb-0">
                    Waiting for VK...
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

onMounted(async () => {
    const code = route.query.code;
    const deviceId = route.query.device_id;
    const state = route.query.state || '';
    const codeVerifier = sessionStorage.getItem('vk_code_verifier');

    if (!code || !deviceId || !codeVerifier) {
        console.error('Missing required parameters for VK code exchange');
        router.push('/login?error=invalid_callback');
        return;
    }

    try {
        await store.dispatch('exchangeVKCode', {
            code,
            deviceId,
            codeVerifier,
            state,
        });

        let redirectTo = state || '/';
        const resolved = router.resolve(redirectTo);
        if (!resolved.matched.length) {
            console.warn(`Route "${redirectTo}" not found, redirecting to home`);
            redirectTo = '/';
        }

        router.push(redirectTo);
    } catch (error) {
        console.error('VK exchange failed:', error);
        router.push('/login?error=auth_failed');
    } finally {
        sessionStorage.removeItem('vk_code_verifier');
        sessionStorage.removeItem('vk_state');
    }
});
</script>