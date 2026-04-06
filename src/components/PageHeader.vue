<template>
  <nav class="navbar navbar-expand-md sticky-top user-select-none">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <router-link to="/"><img :src="logo" alt="Логотип" class="rounded-circle me-2"></router-link>
        <h2><router-link class="navbar-brand text-white" to="/">{{ $t('components.pageHeader.productName') }}</router-link></h2>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-md-center">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/" exact>
              {{ $t('components.pageHeader.mainPage') }}
              <i class="bi bi-house"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/groups">
              {{ $t('components.pageHeader.groupsManagement') }}
              <i class="bi bi-people"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/create_tests">
              {{ $t('components.pageHeader.createTests') }}
              <i class="bi bi-pen"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <div class="d-flex align-items-center">
              <router-link class="nav-link text-white" to="/profile">{{ userName }}</router-link>
              <router-link to="/profile"><img :src="avatarUrl" alt="Аватар" class="rounded-circle" style="width: 32px; height: 32px;"></router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import logo from '@/assets/images/logo_32_32.png'
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
  padding: 0.5rem 1rem;
}

.nav-link.router-link-exact-active {
  font-size: 1.1rem;
  font-weight: normal;
  text-decoration: none;
}

@media (max-width: 767.98px) {
  .navbar {
    padding: 0.25rem 0.5rem;
  }

  .navbar-brand {
    font-size: 1.2rem;
  }

  .navbar-nav {
    padding-top: 0.5rem;
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .nav-item:last-child .nav-link {
    border-bottom: none;
  }

  .nav-item .d-flex {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .nav-item .d-flex .nav-link {
    border-bottom: none;
    padding-right: 0.5rem;
  }

  .nav-link.router-link-exact-active {
    font-size: 1.15rem;
    border-bottom: none;
  }

  .navbar-toggler {
    border: none;
    padding: 0.25rem 0.5rem;
  }
}

@media (max-width: 575.98px) {
  .navbar-brand h2 {
    font-size: 1.1rem;
  }

  .nav-link {
    font-size: 1rem;
  }
}
</style>