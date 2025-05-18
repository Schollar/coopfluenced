import { createStore } from 'vuex'; // Import createStore from 'vuex'
import count from './modules/count'; // Import the count module
import messages from './modules/messages'; // Import the messages module
// Create the Vuex store
const store = createStore({
    state() {
        return {
            isDark: true, // Example state
        };
    },
    mutations: {
        toggleTheme(state) {
            state.isDark = !state.isDark;
        },
    },
    getters: {
        theme(state) {
            return state.isDark ? 'dark' : 'light';
        },
    },
    modules: {
        // Import modules here
        count,
        messages,
    },
});

export default store; // Export the store