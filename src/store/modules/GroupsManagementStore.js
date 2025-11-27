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
                const response = await api.get('/groups/get_data')
                commit('setGroupsData', response.data)
                return response.data
            } catch (error) {
                commit('setGroupsData', [{"number":1,"owner":"Александр","group_size":15,"name":"Проект","ID":"123456789"},{"number":2,"owner":"Мария","group_size":8,"name":"Группа","ID":"987654321"},{"number":3,"owner":"Иван","group_size":22,"name":"Команда","ID":"456123789"},{"number":4,"owner":"Ольга","group_size":5,"name":"Отдел","ID":"321654987"},{"number":5,"owner":"Дмитрий","group_size":17,"name":"Разработка","ID":"789123456"}])
            }
        }
    }
}

export default GroupsManagementStore