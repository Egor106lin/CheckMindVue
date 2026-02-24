import api from '@/store/api.js'

const LoginPageStore = {
    state: {
        link: null,
    },
    getters: {
        link: (state) => state.link
    },
    mutations: {
        setLink: (state, link) => (
            (state.link = link)
        ),
    },
    actions: {
        async loginWithGoogle({ commit }, stateParam = '') {
            try {
                const params = stateParam ? { state: stateParam } : {}
                const response = await api.get('/api/url/google', params)
                if (response.data) {
                    commit('setLink', response.data)
                    return response.data
                } else {
                    console.error('No URL in response:', response.data)
                    throw new Error('No URL received from server')
                }
            } catch(error) {
                console.error('Error getting Google URL:', error)
                throw error
            }
        }
    }
}

export default LoginPageStore