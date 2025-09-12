import Vuex from 'vuex';

import CreateTestsStore from './modules/CreateTestsStore';
import MainPageStore from './modules/MainPageStore';
import ProfileSettingsStore from './modules/ProfileSettingsStore';

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    createTests: CreateTestsStore,
    mainPage: MainPageStore,
    profileSettings: ProfileSettingsStore
  },
})

export default store