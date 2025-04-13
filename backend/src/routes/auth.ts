import { Router } from 'express';
import { User } from '../Model/User'; // 引入 User 模型
import bcrypt from 'bcrypt'; // 用于加密密码

const authRouter = Router();

// 登录路由
authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });

    try {
        // 查找用户
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 注册路由
authRouter.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // 检查用户名是否已存在
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // 加密密码
        const saltRounds = 10; // 定义盐的轮数
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 创建新用户
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        // 保存用户到数据库
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default authRouter;