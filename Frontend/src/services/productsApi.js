import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const productsApi = {
    getAllProducts: async () => {
        const res = await axios.get(`${API_URL}/products`);
        return res.data;
    },
}