import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'staff', enum: ['staff', 'manager', 'admin', 'superadmin'] }
}, {
    timeseries: true
});

userSchema.plugin(normalize);

export const UserModel = model('User', userSchema);

