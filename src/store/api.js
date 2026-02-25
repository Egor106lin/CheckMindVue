import router from '@/router/routes';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = router.currentRoute.value.fullPath;
            if (currentPath.startsWith('/login')) {
                return Promise.reject(error);
            }
            const urlParams = new URLSearchParams(currentPath.split('?')[1]);
            const existingRedirect = urlParams.get('redirect');
            let redirectTarget = existingRedirect || currentPath;
            if (redirectTarget?.includes('/login')) {
                const nestedUrl = new URL(redirectTarget, 'http://localhost');
                const nestedRedirect = nestedUrl.searchParams.get('redirect');
                if (nestedRedirect) {
                    redirectTarget = nestedRedirect;
                } else {
                    redirectTarget = '/';
                }
            }
            
            router.push(`/login?redirect=${encodeURIComponent(redirectTarget)}`);
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