<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h5>Одну минуту...</h5>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const router = useRoute()

onBeforeMount(() => {
    const code = URLSearchParams(router.currentRoute()).get('code')
    console.log(code)
    if (code) {
        store.dispatch('sendCode', code)
    } else {
        console.log('Нет параметра code')
    }
})
</script>