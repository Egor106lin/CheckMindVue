<template>
    <button @click="getTest()">get</button>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore()

const test = ref(null)

async function getTest() {
    try {
        await store.dispatch('getTest')
        test.value = store.state.testingInProgress.test
    } catch (error) {
        console.error('Ошибка:', error)
    }
    console.log(test.value)
}
</script>