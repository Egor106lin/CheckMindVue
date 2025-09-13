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
        async getTest({ commit }, payload) {
            try {
                const response = await api.get('tests/questions_and_options', {
                    params: {
                        groupID: payload.groupID,
                        testName: payload.testName
                    }
                })
                const testJSON = response.data
                commit('setTest', testJSON)
            } catch(error) {
                console.log(payload.groupID, payload.testName)
                commit('setTest', {"groupID":"123456789","questionsQuantity":5,"testName":"Тест для отладки","testDescription":"Описание теста для отладки. С помощью него можно сверстать страницу, на которой нужен готовый тест.","questionsAndOptions":[{"question":"Вопрос 1","options":[{"title":"1"},{"title":"2"}]},{"question":"Вопрос 2","options":[{"title":"1"},{"title":"2"},{"title":"3"},{"title":"4"},{"title":"5"},{"title":"6"},{"title":"7"},{"title":"8"},{"title":"9"},{"title":"10"}]},{"question":"Вопрос 3","options":[{"title":"1"},{"title":"1"}]},{"question":"Вопрос 4","options":[{"title":"1"},{"title":"2"}]},{"question":"Вопрос 5","options":[{"title":"1"},{"title":"2"},{"title":"3"},{"title":"4"}]}]})
            }   
        }
    }
}

export default TestingInProgress