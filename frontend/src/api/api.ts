import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Replace with your backend API base URL

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

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