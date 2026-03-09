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
        },
        async loginWithVK({ commit }, { stateParam = '', codeChallenge }) {
            try {
                const params = { code_challenge: codeChallenge }
                if (stateParam) params.state = stateParam
                const response = await api.get('/api/url/vk', params)
                if (response.data) {
                    commit('setLink', response.data)
                    return response.data
                } else {
                    console.error('No URL in response:', response.data)
                    throw new Error('No URL received from server')
                }
            } catch(error) {
                console.error('Error getting VK URL:', error)
                throw error
            }
        },
        // eslint-disable-next-line
        async exchangeVKCode({ commit }, { code, deviceId, codeVerifier, state }) {
            try {
                const response = await api.post('/api/auth/vk/exchange', {
                    code,
                    device_id: deviceId,
                    code_verifier: codeVerifier,
                    state
                })
                return response.data
            } catch(error) {
                console.error('Error exchanging VK code:', error)
                throw error
            }
        }
    }
}

export default LoginPageStore