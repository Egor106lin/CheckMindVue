import api from '@/store/api.js'

const GroupsManagementStore = {
    state: {
        groupsData: null,
    },
    getters: {
        getGroupsData: state => state.groupsData,
    },
    mutations: {

        setGroupsData(state, data) {
            state.groupsData = data
        }
    },
    actions: {
        async getGroupsData({ commit }) {
            try {
                const response = await api.get('/groups/get_data')
                commit('setGroupsData', response.data)
                return response.data
            } catch (error) {
                commit('setGroupsData', {'group': 1})
            }
        }
    }
}

export default GroupsManagementStore