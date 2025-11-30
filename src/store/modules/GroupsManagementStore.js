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
                const response = await api.get('/groups/get_list')
                commit('setGroupsData', JSON.parse(response.data.data))
                return response.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default GroupsManagementStore