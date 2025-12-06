import api from '@/store/api.js'

const CreateTestsStore = {
    state: {
        testData: null,
        error: null
    },
    getters: {
        getTestData: state => state.testData,
        getError: state => state.error
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        setTestData(state, data) {
            state.testData = data
        }
    },
    actions: {
        async sendTestData({ commit }, testData) {
            try {
                const response = await api.post('/api/tests/created_test', testData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                commit('setTestData', response.data)
                return response.data
            } catch (error) {
                commit('setError', error.response?.data?.message || 'Ошибка отправки данных')
                throw error
            }
        }
    }
}

export default CreateTestsStore