<template>
    <div class="container w-50">
        <button @click="user = !user">Переключатель</button>
        <div class="row">
            <div class="col">
                <div class="card h-100">
                    <img alt="Фото профиля" src="../assets/images/logo.png">
                    <p>тут будет фото профиля</p>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><b>Информация о пользователе</b></h5>
                        <p class="card-text">Имя: Иван</p>
                        <p class="card-text">Фамилия: Иванов</p>
                        <p class="card-text">Роль: {{user ? "Пользователь" : "Администратор"}}</p>
                        <div class="row">
                            <div class="col">
                                <button name="change_avatar" class="mt-auto btn btn-primary w-100">Сменить аватар</button>
                                <hr>
                                <button name="change_name" class="mt-auto btn btn-primary w-100">Сменить имя и фамилию</button>
                            </div>
                            <div class="col">
                                <button name="change_password" class="mt-auto btn btn-primary w-100">Сменить пароль</button>
                                <hr>
                                <button name="leave_account" class="mt-auto btn btn-danger w-100">Выйти из аккаунта</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">
                <div v-if="user" class="card">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><b>Управление группами</b></h5>
                        <p class="card-text">Присоединитесь к группе по ID</p>
                        <div class="row">
                            <div class="col">
                                <input class="form-control w-100" type="text" placeholder="ID-группы">
                            </div>
                            <div class="col">
                                <button name="join_group" class="mt-auto btn btn-primary w-100">Присоединиться</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="card">
                    <div class="card-body d-flex flex-column">
                    <h5 class="card-title"><b>Управление группами</b></h5>
                    <p class="card-text">Создать новую группу</p>
                    <p v-if="created_group"><b>ID группы:</b> 1234567890</p>
                        <div class="row">
                            <div class="col">
                                <input class="form-control w-100" type="number" placeholder="Кол-во участников">
                            </div>
                            <div class="col">
                                <button @click="created_group = !created_group" name="ccreate_group" class="mt-auto btn btn-primary w-100">Создать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body d-flex flex-column">
                    <h5 class="card-title"><b>Гайд</b></h5>
                    <p class="card-text">Администраторы могут создавать тесты и группы.</p>
                    <p class="card-text">В группы участники могут вступать по уникальному ID, который предоставит администратор.</p>
                    <p class="card-text">Роль задается при регистрации аккаунта, и не может быть изменена.</p>
                    <p class="card-text">Тесты создаются во вкладке "Задания"</p>
                    <form action="/create_tests">
                        <button v-bind:class="user ? 'disabled' : ''" name="create_tests_link" class="mt-auto btn btn-primary w-100">Создать тест</button>
                    </form>
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
    const user = ref(true)
    const created_group = ref(false)
    return {
      user, created_group
    }
  }
}
</script>