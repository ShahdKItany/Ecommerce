import mongoose ,{model, Schema,Types }from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: obj
    },
    status: {
        type: String,
        enum: ['active', 'notActive'],
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

const categoryModel =  model('Category', categorySchema);

export default categoryModel;
