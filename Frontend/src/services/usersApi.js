import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const usersApi = {
    getAllUser: async () => {
        const res = await axios.get(`${API_URL}/user`);
        return res.data;
    },
    createUser: async (user) => {
        const res = await axios.post(`${API_URL}/user`, user);
        return res.data;
    },
    updateUser: async (user) => {
        const res = await axios.put(`${API_URL}/user/${user.id}`, user);
        return res.data;
    },
}