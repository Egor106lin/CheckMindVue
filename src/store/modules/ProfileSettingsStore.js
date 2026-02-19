import api from '@/store/api.js'

const ProfileSettingsStore = {
    state: {
        userData: {},
        status: null
    },
    getters: {
        getUserData: (state) => state.userData,
        getStatus: (state) => state.status
    },
    mutations: {
        setUserData: (state, userData) => {
            (state.userData = userData)
        },
        setStatus: (state, status) => {
            state.status = status
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
        },
        async deleteAccount({ commit }) {
            try {
                const response = await api.get('/api/profile/delete')
                commit('setStatus', response.data.status)
            } catch(error) {
                commit('setStatus', 'error')
            }
        }
    }
}

export default ProfileSettingsStore