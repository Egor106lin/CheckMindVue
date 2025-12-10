import api from '@/store/api.js'

const GroupsManagementStore = {
    state: {
        groupsData: null,
        canDeleteGroup: null,
        canLeaveGroup: null
    },
    getters: {
        getGroupsData: state => state.groupsData,
        getCanDeleteGroup: state => state.canDeleteGroup,
        getCanLeaveGroup: state => state.canLeaveGroup,
    },
    mutations: {
        setGroupsData(state, data) {
            state.groupsData = data
        },
        setCanDeleteGroup(state, data) {
            state.canDeleteGroup = data
        },
        setCanLeaveGroup(state, data) {
            state.canLeaveGroup = data
        },
    },
    actions: {
        async getGroupsData({ commit }) {
            try {
                const response = await api.get('/api/groups/get_list')
                commit('setGroupsData', JSON.parse(response.data.data))
                return response.data
            } catch (error) {
                console.log(error)
            }
        },
        async deleteGroup({ commit }, id) {
            try {
                const response = await api.post('/api/groups/delete', id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                commit('setCanDeleteGroup', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async leaveGroup({ commit }, id) {
            try {
                const response = await api.post('/api/groups/leave', id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                commit('setCanLeaveGroup', response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default GroupsManagementStore