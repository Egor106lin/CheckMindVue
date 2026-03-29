import api from '@/store/api.js'

const CreateTestsStore = {
    state: {
        testData: null,
        groupsList: null
    },
    getters: {
        getTestData: state => state.testData,
        getGroupsList: state => state.groupsList
    },
    mutations: {
        setTestData(state, data) {
            state.testData = data
        },
        setGroupsList(state, groupsList) {
            state.groupsList = groupsList
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
                commit('setTestData', response.data.receivedData)
                return response.data.receivedData
            } catch (error) {
                console.log(error)
            }
        },
        async getGroupsToCreateTest({ commit }) {
            try {
                const response = await api.get('/api/tests/get_groups_to_create_test')
                commit('setGroupsList', response.data.data.groups)
            } catch(error) {
                commit('setGroupsList', [])
            }
        }
    }
}

export default CreateTestsStore