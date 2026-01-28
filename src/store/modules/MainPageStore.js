import api from '@/store/api.js'

const MainPageStore = {
    state: {
        groupsWithTests: null
    },
    getters: {
        getGroupsWithTests: state => state.groupsWithTests
    },
    mutations: {
        setGroupsWithTests(state, groupsWithTests) {
            state.groupsWithTests = groupsWithTests
        }
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
        }
    }
}

export default MainPageStore