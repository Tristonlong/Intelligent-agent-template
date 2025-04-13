import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Replace with your backend API base URL

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// 添加请求拦截器
api.interceptors.request.use(
    (config: any) => {
        // 在请求发送前做一些处理
        const token = localStorage.getItem('token'); // 从本地存储获取 Token
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`, // 添加认证 Token 到请求头
            };
        }
        console.log('Request:', config); // 打印请求信息（可选）
        return config;
    },
    (error) => {
        // 处理请求错误
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);


// 添加响应拦截器
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // 在响应返回前做一些处理
        console.log('Response:', response); // 打印响应信息（可选）
        return response;
    },
    (error) => {
        // 统一处理错误响应
        console.error('Response Error:', error.response || error.message);
        if (error.response?.status === 401) {
            // 如果是 401 未授权错误，可以跳转到登录页面
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


// General request function
export const request = async <T>(
    method: AxiosRequestConfig['method'],
    url: string,
    data?: any,
    params?: any
): Promise<T> => {
    try {
        const response = await api.request<T>({
            method,
            url,
            data,
            params,
        });
        return response.data; // Return only the data
    } catch (error: any) {
        console.error('API Request Error:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

export default api;