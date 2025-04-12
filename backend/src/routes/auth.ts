import { Router } from 'express';

const authRouter = Router();

// 登录路由
authRouter.post('/login', (req, res) => {
    const { username, password } = req.body; // 获取请求体中的数据
    console.log('Received login request:', { username, password }); // 打印请求数据

    // 模拟登录逻辑
    if (username === 'test' && password === 'password') {
        res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

export default authRouter;