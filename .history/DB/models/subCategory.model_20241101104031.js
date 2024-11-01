import mongoose, { model, Schema, Types } from 'mongoose';


const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        //  slug: " اسم المنتج نفسه وبضيف عليه السلاش وهاد كتير منيح بال seo "
    },
    image: {
        type: Object,  // Correct this to 'Object' (not from Joi)
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'notActive'],
        default: 'active'
    },

    categoruId {
        tupe:Ytp
    }
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',  // Refers to the user table
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const subCategoryModel = model('Subcategory', subCategorySchema);

export default subCategoryModel;



