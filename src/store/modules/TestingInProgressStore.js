import api from '@/store/api.js'

const TestingInProgress = {
    state: {
        test: null,
        answers: null,
        result: null
    },
    getters: {
        test: (state) => state.test,
        answers: (state) => state.answers,
        result: (state) => state.result
    },
    mutations: {
        setTest: (state, testJSON) => (
            (state.test = testJSON)
        ),
        setAnswers: (state, answersJSON) => (
            (state.answers = answersJSON)
        ),
        setResult: (state, resultJSON) => {
            (state.result = resultJSON)
        }
    },
    actions: {
        async getTest({ commit }, payload) {
            try {
                const response = await api.get('/api/tests/questions_and_options', {
                    params: {
                        groupID: payload.groupID,
                        testName: payload.testName
                    },
                })
                const testJSON = JSON.parse(response.data.data)
                console.log(testJSON)
                commit('setTest', testJSON)
            } catch(error) {
                console.log(error)
            }   
        },
        async checkAnswers({ commit }, payload) {
            try {
                const response = await api.post('/api/tests/check_answers', {
                    userAnswers: payload.answers
                })
                commit('setAnswers', payload.answers)
                commit('setResult', JSON.parse(response.data.data))
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default TestingInProgress