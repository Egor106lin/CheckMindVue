<template>
  <PageHeader/>
  <RouterView></RouterView>
</template>

<script>
import PageHeader from './components/PageHeader.vue';

export default {
  components: {PageHeader},
  name: 'App',
}
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
#app {
  font-family: 'Manrope';
}
</style>
