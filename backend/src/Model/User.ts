import mongoose, { Schema, Document } from 'mongoose';

// 定义用户接口
export interface IUser extends Document {
    username: string;
    password: string;
    email?: string; // 可选字段
    createdAt: Date;
}

// 定义用户 Schema
const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

// 创建用户模型
export const User = mongoose.model<IUser>('User', UserSchema);