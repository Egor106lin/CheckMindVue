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
                const response = await api.get('/api/groups/get_members', {
                    params: {
                        groupID: payload.groupID
                    },
                })
                const membersJSON = JSON.parse(response.data.data)
                console.log(membersJSON)
                commit('setMembers', membersJSON)
            } catch(error) {
                console.log(error)
            }   
        },
    }
}

export default MembersManagement