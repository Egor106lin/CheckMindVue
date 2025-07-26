import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'

import {createBootstrap} from 'bootstrap-vue-next'
import { useVuelidate } from '@vuelidate/core';

import App from './App.vue'

import ProfileSettings from './components/ProfileSettings.vue'
import MainPage from './components/MainPage.vue'
import CreatTests from './components/CreatTests.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


const routes = [
  { path: '/', component: MainPage },
  { path: '/profile', component: ProfileSettings },
  { path: '/create_tests', component: CreatTests }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(createBootstrap())
app.use(useVuelidate);
app.use(router)
app.mount('#app')
