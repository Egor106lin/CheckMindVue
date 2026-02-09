<template>
   <div class="app-container">
    <RouterView></RouterView>
   </div>
</template>

<script setup>
import { onErrorCaptured } from 'vue';

onErrorCaptured((err) => {
  const errMsg = err?.message || err?.toString() || '';
  if (errMsg.includes('ResizeObserver')) {
    return false
  }
  console.error('App error:', err);
  return false
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
