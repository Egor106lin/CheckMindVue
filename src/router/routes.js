import { createWebHistory, createRouter } from 'vue-router'

import LoginPage from '@/components/LoginPage.vue'
import ProfileSettings from '@/components/ProfileSettings.vue'
import MainPage from '@/components/MainPage.vue'
import GroupsManagement from '@/components/GroupsManagement.vue'
import CreatTestsForm from '@/components/CreatTestsForm.vue'
import TestingInProgress from '@/components/TestingInProgress.vue'

const routes = [
    {
        path: '/login',
        component: LoginPage  
    },
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/groups',
        component: GroupsManagement
    },
    {
        path: '/profile',
        component: ProfileSettings
    },
    {   
        path: '/create_tests',
        component: CreatTestsForm
    },
    {   
        path: '/testing/:groupID/:testName',
        component: TestingInProgress
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router