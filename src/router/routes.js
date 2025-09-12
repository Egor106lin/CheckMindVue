import { createWebHistory, createRouter } from 'vue-router'

import ProfileSettings from '@/components/ProfileSettings.vue'
import MainPage from '@/components/MainPage.vue'
import CreatTestsForm from '@/components/CreatTestsForm.vue'
import TestingInProgress from '@/components/TestingInProgress.vue'

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
        component: CreatTestsForm
    },
    {   
        path: '/testing',
        component: TestingInProgress
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router