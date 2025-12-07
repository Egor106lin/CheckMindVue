<template>
<nav class="navbar navbar-expand-md sticky-top">
  <div class="container-fluid">
    <h2><router-link class="navbar-brand text-white" to="/">{{ $t('components.pageHeader.productName') }}</router-link></h2>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/">{{ $t('components.pageHeader.mainPage') }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/groups">{{ $t('components.pageHeader.groupsManagement') }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/create_tests">{{ $t('components.pageHeader.createTests') }}</router-link>
        </li>
        <li class="nav-item">
            <div class="d-flex align-items-center">
                <router-link class="nav-link text-white" to="/profile">{{ userName }}</router-link>
                <router-link to="/profile"><img :src="avatarUrl" alt="Аватар" class="rounded-circle me-2" style="width: 30px; height: 30px;"></router-link>
            </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const $t = useI18n().t
const userData = ref()
const loading = ref(true)
const userName = ref(localStorage.getItem('userName'))
const avatarUrl = ref(localStorage.getItem('avatarUrl'))

async function loadData() {
    try {
        await store.dispatch('getUserData')
        userData.value = store.getters['getUserData']
        if (userName.value != userData.value.name) {
            localStorage.setItem('userName', userData.value.name)
            userName.value = userData.value.name 
        }
        if (avatarUrl.value != userData.value.avatar_url) {
            localStorage.setItem('avatarUrl', userData.value.avatar_url)
            avatarUrl.value = userData.value.avatar_url 
        }
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
onBeforeMount(() => {
    loadData()
})
</script>

<style lang="css">
.navbar {
  background-color: #3846D3;
}
</style>

