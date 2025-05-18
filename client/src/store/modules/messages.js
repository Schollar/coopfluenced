import apiService from "../../services/apiService";

export default {
    namespaced: true,

    state: {
        messages: [],
    },

    mutations: {
        SET_MESSAGES(state, messages) {
            state.messages = [...messages]; // clone to preserve immutability
        },
        ADD_MESSAGE(state, message) {
            state.messages.unshift({ ...message }); // shallow clone for safety
        },
    },

    actions: {
        async fetchMessages({ commit }) {
            try {
                const response = await apiService.fetchMessages();
                commit("SET_MESSAGES", response.data);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
                // Optional: dispatch global error handler or notify user
            }
        },

        async addMessage({ commit }, messagePayload) {
            try {
                const response = await apiService.addMessage(messagePayload);
                commit("ADD_MESSAGE", response.data); // use server-returned message
            } catch (error) {
                console.error("Failed to add message:", error);
                // Optional: notify user or rollback optimistic update
            }
        },
    },
};
