<template>
   <div class="app-container">
    <RouterView></RouterView>
   </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import axios from 'axios'

const refreshInterval = ref(null)

const refreshToken = async () => {
  try {
    await axios.post('/api/profile/refresh_token')
    console.log('Токен успешно обновлён')
  } catch (error) {
    console.error('Ошибка обновления токена', error)
  }
}

onMounted(() => {
  refreshInterval.value = setInterval(refreshToken, 30 * 60 * 1000)
})

onBeforeUnmount(() => {
  clearInterval(refreshInterval.value)
})
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
#app {
  font-family: 'Manrope';
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.app-container {
  min-height: 100vh;
  background-image: url('/src/assets/images/background_light.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
