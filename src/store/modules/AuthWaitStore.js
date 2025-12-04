import api from '@/store/api.js'

const AuthWaitStore = {
    state: {
        //link: null,
    },
    getters: {
        //link: (state) => state.link
    },
    mutations: {
        //setLink: (state, link) => (
        //    (state.link = link)
        //),
    },
    actions: {
        async sendCode(code) {
            try {
                const response = await api.post('/auth/google', code)
                console.log(response.data)
            } catch(error) {
                console.log(error)
            }
        }
    }
}

export default AuthWaitStore