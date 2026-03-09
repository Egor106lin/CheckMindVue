<template>
    <div class="text-center mt-5">
        <p>Обработка входа через VK ID, пожалуйста, подождите...</p>
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
  const code = route.query.code
  const deviceId = route.query.device_id
  const state = route.query.state || ''
  const codeVerifier = sessionStorage.getItem('vk_code_verifier')
  if (!code || !deviceId || !codeVerifier) {
    console.error('Missing required parameters for VK code exchange')
    router.push('/login?error=invalid_callback')
    return;
  }

  try {
    await store.dispatch('exchangeVKCode', { 
      code, 
      deviceId, 
      codeVerifier, 
      state 
    })
    const redirectTo = state || '/'
    router.push(redirectTo)
  } catch (error) {
    console.error('VK exchange failed:', error)
    router.push('/login?error=auth_failed')
  } finally {
    sessionStorage.removeItem('vk_code_verifier')
    sessionStorage.removeItem('vk_state')
  }
});
</script>