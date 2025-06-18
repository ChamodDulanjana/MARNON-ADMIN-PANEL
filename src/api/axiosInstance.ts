import axios from 'axios';
import logout from "@/util/logout.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

export const axiosInstanceWithCredentials = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // 🔥 this is key for cookie-based auth
});

// Add interceptor
axiosInstanceWithCredentials.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);