import api from '@/store/api.js'

const MembersManagement = {
    state: {
        members: null
    },
    getters: {
        members: (state) => state.members,
    },
    mutations: {
        setMembers: (state, membersJSON) => (
            (state.members = membersJSON)
        )
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
    }
}

export default MembersManagement