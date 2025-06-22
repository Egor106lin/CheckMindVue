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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
