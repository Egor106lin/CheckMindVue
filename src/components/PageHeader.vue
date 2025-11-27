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
          <router-link class="nav-link text-white" to="/profile_settings">{{ $t('components.pageHeader.profile') }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const $t = useI18n().t
</script>

<style lang="css">
.navbar {
  background-color: #3846D3;
}
</style>

