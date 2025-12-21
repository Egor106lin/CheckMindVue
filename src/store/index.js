import Vuex from 'vuex';

import LoginPageStore from './modules/LoginPageStore';
import CreateTestsStore from './modules/CreateTestsStore';
import MainPageStore from './modules/MainPageStore';
import ProfileSettingsStore from './modules/ProfileSettingsStore';
import TestingInProgressStore from './modules/TestingInProgressStore';
import GroupsManagementStore from './modules/GroupsManagementStore';
import MembersManagementStore from './modules/MembersManagementStore'

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loginPage: LoginPageStore,
    createTests: CreateTestsStore,
    mainPage: MainPageStore,
    profileSettings: ProfileSettingsStore,
    testingInProgress: TestingInProgressStore,
    groupsManagement: GroupsManagementStore,
    MembersManagement: MembersManagementStore
  },
})

export default store