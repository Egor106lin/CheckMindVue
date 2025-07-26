<template>
  <button class="mt-auto btn btn-primary w-10" @click="in_group = !in_group">Переключатель</button>
  <div v-if="in_group" class="user_in_group">
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Тесты, предложенные Вам администратором группы</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card h-100 w-50">
            <img src="" class="card-img-top" alt="Картинка для первого теста">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Название теста</h5>
              <p class="card-text">Описание теста</p>
              <button name="test_button" class="mt-auto btn btn-primary w-100">Пройти</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="user_not_in_group">
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Присоединитесь к группе во вкладке "Профиль", и начните прохождение тестов</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card h-100 w-50">
            <img src="../assets/images/logo.png" class="card-img-top" alt="Нет доступных тестов">
            <div class="card-body d-flex flex-column">
              <p class="card-text">Нет доступных тестов</p>
              <button name="test_button" class="mt-auto btn btn-primary w-100 disabled">Пройти</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const in_group = ref(true)
    return {
      in_group
    }
  }
}
</script>

