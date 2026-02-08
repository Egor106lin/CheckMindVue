<template>
  <RouterView></RouterView>
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
</style>
