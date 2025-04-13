import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import { setRoutes } from './routes/index';
import { connectDB } from './db';

const app = express();
const PORT = process.env.PORT || 5001;

// 配置 CORS
app.use(cors({
    origin: 'http://localhost:3000', // 允许的前端地址
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 初始化路由
setRoutes(app);

connectDB();


// 注册路由
app.use(authRouter); // 确保注册了 auth 路由

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});