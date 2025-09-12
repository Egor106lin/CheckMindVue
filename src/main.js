import { createApp } from 'vue'

import router from './router/routes.js'
import store from './store'
import i18n from './locales/i18n';

import {createBootstrap} from 'bootstrap-vue-next'
import { useVuelidate } from '@vuelidate/core';

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
app.use(createBootstrap())
app.use(useVuelidate);
app.use(i18n);
app.use(router)
app.use(store)
app.mount('#app')
