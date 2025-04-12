import { request } from './api';

// Login request function
export const login = async (username: string, password: string) => {
    const data = { username, password };
    return await request<{ message: string; token?: string }>('POST', '/auth/login', data);
};