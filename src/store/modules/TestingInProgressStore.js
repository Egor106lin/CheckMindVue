import api from '@/store/api.js'

const TestingInProgress = {
    state: {
        test: null,
    },
    getters: {
        test: (state) => state.test
    },
    mutations: {
        setTest: (state, testJSON) => (
            (state.test = testJSON)
        )
    },
    actions: {
        async getTest({ commit }) {
            try {
                const response = await api.get('tests/questions_and_options')
                const testJSON = response.data
                commit('setTest', testJSON)
            } catch(error) {
                commit('setTest', {test: {'1': '1'}})
            }   
        }
    }
}

export default TestingInProgress