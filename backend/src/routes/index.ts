import { Express } from 'express';
import authRouter from './auth';

export const setRoutes = (app: Express) => {
    app.use('/api/auth', authRouter); // 挂载认证相关路由
};