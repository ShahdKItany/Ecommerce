import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'not active'],
        default: 'active'
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',  // يشير إلى جدول المستخدمين
        required: true
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'   // يشير إلى جدول المستخدمين
    }
}, { timestamps: true });

const CategoryMode =  model('Category', categorySchema);

export default Category;
