import mongoose from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
        min:4,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    status: {
        type: String,
        enum: ['active', 'not active'],
        default: 'not active'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

const userModel = model('User', userSchema);

export default userModel;
