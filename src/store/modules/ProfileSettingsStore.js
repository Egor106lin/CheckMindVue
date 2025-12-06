import api from '@/store/api.js'

const ProfileSettingsStore = {
    state: {
        userData: {},
    },
    getters: {
        getUserData: (state) => state.userData
    },
    mutations: {
        setUserData: (state, userData) => {
            (state.userData = userData)
        }
    },
    actions: {
        async getUserData({ commit }) {
            try {
                const response = await api.get('/api/profile/user_data')
                commit('setUserData', response.data)
            } catch(error) {
                console.error('error in store:', error)
            }
        }
    }
}

export default ProfileSettingsStore