import axios from "axios";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    async fetchCount() {
        return axios.get(`${API_BASE_URL}/api/count`);
    },
    async fetchMessages() {
        return axios.get(`${API_BASE_URL}/api/messages`);
    },
    async incrementCount() {
        return axios.put(`${API_BASE_URL}/api/count/`);
    },
    async addMessage(message) {
        return axios.post(`${API_BASE_URL}/api/message/`, message);
    },
};