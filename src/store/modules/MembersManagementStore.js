import api from '@/store/api.js'

const MembersManagement = {
    state: {
        members: null,
        status: null
    },
    getters: {
        members: (state) => state.members,
        getStatus: (state) => state.status
    },
    mutations: {
        setMembers: (state, membersJSON) => (
            (state.members = membersJSON)
        ),
        setStatus: (state, status) => (
            (state.status = status)
        ),
    },
    actions: {
        async getMembers({ commit }, payload) {
            try {
                const response = await api.post('/api/groups/get_members', {
                    group_id: payload.groupID
                })
                const membersJSON = response.data.data
                console.log(membersJSON)
                commit('setMembers', membersJSON)
            } catch(error) {
                console.log(error)
            }   
        },
        async deleteMember({ commit }, payload) {
            try {
                const response = await api.post('/api/groups/delete_member', {
                    user_id: payload.userID,
                    group_id: payload.groupID
                })
                commit('setStatus', response.data.status)
            } catch(error) {
                commit('setStatus', 'error')
            }
        }
    }
}

export default MembersManagement