import api from '@/store/api.js'

const AcceptInviteStore = {
    state: {
        groupData: null,
    },
    getters: {
        getGroupData: (state) => state.groupData
    },
    mutations: {
        setGroupData: (state, groupData) => (
            (state.groupData = groupData)
        ),
    },
    actions: {
        async acceptInvite({ commit }, token) {
            try {
                const response = await api.post('/api/invite/accept', {'token': token})
                console.log('Response data:', response.data)
                commit('setGroupData', response.data.groupData)
            } catch(error) {
                console.error('Error getting Google URL:', error)
                throw error
            }
        }
    }
}

export default AcceptInviteStore