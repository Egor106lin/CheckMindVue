import api from '@/store/api.js'

const MainPageStore = {
    state: {
        groupsWithTests: null,
        deleteTestStatus: null,
        archiveTestStatus: null
    },
    getters: {
        getGroupsWithTests: state => state.groupsWithTests,
        getDeleteTestStatus: state => state.deleteTestStatus,
        getArchiveTestStatus: state => state.archiveTestStatus
    },
    mutations: {
        setGroupsWithTests(state, groupsWithTests) {
            state.groupsWithTests = groupsWithTests
        },
        setDeleteTestStatus(state, deleteTestStatus) {
            state.deleteTestStatus = deleteTestStatus
        },
        setArchiveTestStatus(state, archiveTestStatus) {
            state.archiveTestStatus = archiveTestStatus
        },
    },
    actions: {
        async getGroupsWithTests({ commit }) {
            try {
                const response = await api.get('/api/groups/get_list')
                const adminGroups = response.data.adminGroupsData
                const userGroups = response.data.userGroupsData
                commit('setGroupsWithTests', [...adminGroups, ...userGroups])
            } catch (error) {
                console.log(error)
            }
        },
        async deleteTest({ commit }, payload) {
            try {
                const response = await api.post('/api/tests/delete', {
                    test_id: payload.testID
                })
                commit('setDeleteTestStatus', response.data.status)
            } catch(error) {
                console.log(error)
            }
        },
        async archiveTest({ commit }, payload) {
            try {
                const response = await api.post('/api/tests/archive', {
                    test_id: payload.testID
                })
                commit('setArchiveTestStatus', response.data.status)
            } catch(error) {
                console.log(error)
            }
        }
    }
}

export default MainPageStore