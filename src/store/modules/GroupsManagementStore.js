import api from '@/store/api.js'

const GroupsManagementStore = {
    state: {
        groupsData: null,
        status: null,
        message: null
    },
    getters: {
        getGroupsData: state => state.groupsData,
        getStatus: state => state.status,
        getMessage: state => state.message
    },
    mutations: {
        setGroupsData(state, data) {
            state.groupsData = data
        },
        setStatus(state, status) {
            state.status = status
        },
        setMessage(state, message) {
            state.message = message
        }
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
                const response = await api.post('/api/groups/delete', id)
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async leaveGroup({ commit }, id) {
            try {
                const response = await api.post('/api/groups/leave', id)
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async createGroup({ commit }, title) {
            try {
                const response = await api.post('/api/groups/create', {
                    group_title: title
                })
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async joinGroup({ commit }, id) {
            try {
                const response = await api.post('/api/groups/join', id)
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
    }
}

export default GroupsManagementStore