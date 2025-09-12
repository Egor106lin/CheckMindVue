import Vuex from 'vuex';

import CreateTestsStore from './modules/CreateTestsStore';
import MainPageStore from './modules/MainPageStore';
import ProfileSettingsStore from './modules/ProfileSettingsStore';
import TestingInProgress from './modules/TestingInProgressStore';

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    createTests: CreateTestsStore,
    mainPage: MainPageStore,
    profileSettings: ProfileSettingsStore,
    testingInProgress: TestingInProgress
  },
})

export default store