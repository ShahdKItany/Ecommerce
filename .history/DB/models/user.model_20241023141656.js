
import mongoose, { model, Schema, Types } from 'mongoose';

const userSchema = new Schema({
  
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
        type: Object
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
        enum: ['male', 'female']
    },
    status: {
        type: String,
        enum: ['active', 'notActive'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

const userModel = model('User', userSchema);

export default userModel;