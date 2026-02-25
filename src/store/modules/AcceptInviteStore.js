import api from '@/store/api.js'

const AcceptInviteStore = {
    state: {
        groupData: null,
        status: null,
        message: null
    },
    getters: {
        getGroupData: (state) => state.groupData,
        getStatus: (state) => state.status,
        getMessage: (state) => state.message
    },
    mutations: {
        setGroupData: (state, groupData) => (
            (state.groupData = groupData)
        ),
        setStatus: (state, status) => (
            (state.status = status)
        ),
        setMessage: (state, message) => (
            (state.message = message)
        ),
    },
    actions: {
        async acceptInvite({ commit }, token) {
            try {
                const response = await api.post('/api/invite/accept', {'token': token})
                const status = response.data.status
                commit('setStatus', response.data.status)
                commit('setMessage', response.data.message)
                if (status != "error") {
                    commit('setGroupData', response.data.groupData)
                }
            } catch(error) {
                console.error('Error getting Google URL:', error)
                throw error
            }
        }
    }
}

export default AcceptInviteStore