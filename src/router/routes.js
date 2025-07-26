import { createWebHistory, createRouter } from 'vue-router'
import ProfileSettings from '@/components/ProfileSettings.vue'
import MainPage from '@/components/MainPage.vue'
import CreatTests from '@/components/CreatTests.vue'

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/profile_settings',
        component: ProfileSettings
    },
    {   
        path: '/create_tests',
        component: CreatTests
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router