import api from '@/store/api.js'

const GroupsManagementStore = {
    state: {
        adminGroupsData: null,
        userGroupsData: null,
        inviteUrl: null,
        status: null,
        message: null
    },
    getters: {
        getAdminGroupsData: state => state.adminGroupsData,
        getUserGroupsData: state => state.userGroupsData,
        getInviteUrl: state => state.inviteUrl,
        getStatus: state => state.status,
        getMessage: state => state.message
    },
    mutations: {
        setAdminGroupsData(state, data) {
            state.adminGroupsData = data
        },
        setUserGroupsData(state, data) {
            state.userGroupsData = data
        },
        setInviteUrl(state, inviteUrl) {
            state.inviteUrl = inviteUrl
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
                commit('setAdminGroupsData', response.data.data.adminGroupsData)
                commit('setUserGroupsData', response.data.data.userGroupsData)
            } catch (error) {
                commit('setStatus', 'error')
            }
        },
        async getInviteUrl({ commit }, id) {
            try {
                const response = await api.get(`api/invite/generate/${id}`)
                commit('setInviteUrl', response.data.data.inviteUrl)
            } catch (error) {
                commit('setInviteUrl', '')
            }
        },
        async deleteGroup({ commit }, id) {
            try {
                const response = await api.post('/api/groups/delete', id)
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
            } catch (error) {
                commit('setStatus', 'error')
            }
        },
        async leaveGroup({ commit }, id) {
            try {
                const response = await api.post('/api/groups/leave', id)
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
            } catch (error) {
                commit('setStatus', 'error')
            }
        },
        async createGroup({ commit }, title) {
            try {
                const response = await api.post('/api/groups/create', {
                    group_title: title
                })
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
            } catch (error) {
                commit('setStatus', 'error')
            }
        },
        async joinGroup({ commit }, id) {
            try {
                const response = await api.post('/api/groups/join', id)
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
            } catch (error) {
                commit('setStatus', 'error')
            }
        },
        async renameGroup({ commit }, data) {
            try {
                const response = await api.post('/api/groups/rename', data)
                commit('setStatus', response.data.status)
            } catch (error) {
                commit('setStatus', 'error')
            }
        },
    }
}

export default GroupsManagementStore