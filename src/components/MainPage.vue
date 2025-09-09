<template>
  <button class="mt-auto btn btn-primary w-10" @click="in_group = !in_group">Переключатель</button>
  <div v-if="in_group" class="user_in_group">
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>{{ $t('components.mainPage.headerInGroup') }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card h-100 w-50">
            <img src="" class="card-img-top">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">заглушка</h5>
              <p class="card-text">заглушка</p>
              <button name="test_button" class="mt-auto btn btn-primary w-100">{{ $t('components.mainPage.startTest') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>{{ $t('components.mainPage.headerNotInGroup') }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card h-100 w-50">
            <img src="../assets/images/logo.png" class="card-img-top">
            <div class="card-body d-flex flex-column">
              <p class="card-text">{{ $t('components.mainPage.noTests') }}</p>
              <button name="test_button" class="mt-auto btn btn-primary w-100 disabled">{{ $t('components.mainPage.startTest') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue'

const in_group = ref(true)
const $t = useI18n().t
</script>

