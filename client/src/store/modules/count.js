import apiService from '../../services/apiService'; // Import the centralized API service

const state = {
    count: 0, // Initialize bags as an empty array
};

const mutations = {
    SET_COUNT(state, count) {
        state.count = count.count;
    },
    ADD_COUNT(state, count) {
        state.count += count;
    },
};

const actions = {
    async fetchCount({ commit }) {
        try {
            const response = await apiService.fetchCount();
            commit('SET_COUNT', response.data);
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    },
    async incrementCount({ commit }) {
        try {
            const response = await apiService.incrementCount(); // Use the centralized API service
            commit('SET_COUNT', response.data);
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};