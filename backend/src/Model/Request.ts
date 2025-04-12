import mongoose, { Schema, Document } from 'mongoose';

export interface ILoginRequest extends Document {
    username: string;
    password: string;
    timestamp: Date;
}

const LoginRequestSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const LoginRequest = mongoose.model<ILoginRequest>('LoginRequest', LoginRequestSchema);