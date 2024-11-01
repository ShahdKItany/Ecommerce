

import categoryModel from '../../../DB/models/category.model.js';
import{ uploadImage, deleteImage }  from '../../utils/cloudinary.js';
import slugify from 'slugify';


export const create = async (req, res) => {

    const {categoryId}=req.body;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"category not found"})
    }

return res.json(category);

}