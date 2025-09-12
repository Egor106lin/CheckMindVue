import router from '@/router/routes';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            router.push('/login')
        }
        return Promise.reject(error);
    }
);

export default {
    get(endpoint, params = {}) {
        return apiClient.get(endpoint, { params });
    },

    post(endpoint, data) {
        return apiClient.post(endpoint, data);
    },

    put(endpoint, data) {
        return apiClient.put(endpoint, data);
    },

    patch(endpoint, data) {
        return apiClient.patch(endpoint, data);
    },

    delete(endpoint) {
        return apiClient.delete(endpoint);
    },
};