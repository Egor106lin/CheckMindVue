<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Вы нажали на меня {{ count }} раз.</button>
</template>