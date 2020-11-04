import axios from 'axios'

const authHeaders = () => {
    return {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("authToken")}` }
    }
}

const baseUrl = `https://task-manager-server-pavan.herokuapp.com`

const apicalls = {
    login: (email, password) => {
        return axios.post(`${baseUrl}/users/login`, { email, password });
    },

    register: (email, password) => {
        return axios.post(`${baseUrl}/users`, { email, password, role: "user" });
    },

    refresh: () => {
        return axios.get(`${baseUrl}/users/me`, authHeaders());
    },

    getUserTaks: () => {
        return axios.get(`${baseUrl}/tasks`, authHeaders());
    },

    updateTask: (taskId, payload) => {
        return axios.patch(`${baseUrl}/tasks/${taskId}`, payload, authHeaders());
    },

    addTask: (description, completed) => {
        return axios.post(`${baseUrl}/tasks`, { description, completed }, authHeaders());
    },

    deleteTask: (taskId) => {
        return axios.delete(`${baseUrl}/tasks/${taskId}`, authHeaders())
    },

    getAllUsers: () => {
        return axios.get(`${baseUrl}/user/all`, authHeaders());
    },

    getUserTasksForAdmin: (userId) => {
        return axios.get(`${baseUrl}/admin/tasks/${userId}`, authHeaders());
    }
}

export default apicalls