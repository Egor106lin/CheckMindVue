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
            commit('setError', null)
            try {
                const response = await api.post('/tests/created_test', testData)
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