<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>CheckMind</title>
  </head>
  <PageHeader/>
  <MainPage/>
</template>

<script>
import MainPage from './components/MainPage.vue';
import PageHeader from './components/PageHeader.vue';

export default {
  components: {MainPage, PageHeader},
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
