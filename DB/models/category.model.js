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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // يشير إلى جدول المستخدمين
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'   // يشير إلى جدول المستخدمين
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;
