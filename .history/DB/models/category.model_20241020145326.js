import { object } from 'joi';
import mongoose ,{model, Schema,Types }from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: object,
        required: true,


    },
    slug:{
        type:String,
        req
    }
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
