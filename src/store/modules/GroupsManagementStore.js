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
        async deleteGroup(context, id) {
            try {
                const response = await api.post('/api/groups/delete', id)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async leaveGroup(context, id) {
            try {
                const response = await api.post('/api/groups/leave', id)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async createGroup(context, title) {
            console.log(title)
            try {
                const response = await api.post('/api/groups/create', {
                    group_title: title
                })
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async joinGroup(context, id) {
            try {
                const response = await api.post('/api/groups/join', id)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
    }
}

export default GroupsManagementStore