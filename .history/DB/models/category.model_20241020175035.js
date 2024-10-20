import { object, required } from 'joi';
import mongoose ,{model, Schema,Types }from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type:String,
        required:true,
     //  slug: "  اسم المنتج نفسه وبضيف عليه السلاش وهاد كتير منيح بال seo  "
    },

    image: {
        type: object,
        required: true,


    },
   
    
    status: {
        type: String,
        enum: ['active', 'notActive'],
        default: 'active'
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',  // يشير إلى جدول المستخدمين
       // required: true
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User' 
        // required: true

    }
}, { timestamps: true });

const categoryModel =  model('Category', categorySchema);

export default categoryModel;
