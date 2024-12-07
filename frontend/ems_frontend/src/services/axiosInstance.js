import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    console.log('Access token retrieved:', token); 

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers['Authorization']); 
    } else {
        console.log('No access token found'); 
    }
    return config;
}, (error) => {
    console.error('Request error:', error); 
    return Promise.reject(error);
});

export default axiosInstance;
