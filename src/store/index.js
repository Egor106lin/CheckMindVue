import Vuex from 'vuex';

import LoginPageStore from './modules/LoginPageStore';
import AuthWaitStore from './modules/AuthWaitStore';
import CreateTestsStore from './modules/CreateTestsStore';
import MainPageStore from './modules/MainPageStore';
import ProfileSettingsStore from './modules/ProfileSettingsStore';
import TestingInProgressStore from './modules/TestingInProgressStore';
import GroupsManagementStore from './modules/GroupsManagementStore';

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loginPage: LoginPageStore,
    authWait: AuthWaitStore,
    createTests: CreateTestsStore,
    mainPage: MainPageStore,
    profileSettings: ProfileSettingsStore,
    testingInProgress: TestingInProgressStore,
    groupsManagement: GroupsManagementStore,
  },
})

export default store