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
                console.log('ошибка')
            }
        },
        async leave() {
            try {
                await api.get('/api/profile/leave')
            } catch(error) {
                console.log('ошибка')
            }
        }
    }
}

export default ProfileSettingsStore