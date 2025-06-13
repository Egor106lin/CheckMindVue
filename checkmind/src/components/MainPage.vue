<template>
  <button @click="count++">Вы нажали на меня {{ count }} раз.</button>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0);
    return {
      count
    }
  },
}
</script>

