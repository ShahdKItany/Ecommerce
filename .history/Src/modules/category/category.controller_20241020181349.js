

import categoryModel from '../../../DB/models/category.model.js';
import cloudinary from '../../utils/cloudinary.js';


export const getAll = (req,res)=>{

    return res.json({message:"success"});
}
export const create =async (req,res)=>{


      const name = req.body.name.toLowerCase();
      //  يعني ايش ما كان مكتوب الاسم اعطيني اياه كل الاحراف سمول 


      if( await categoryModel.findOne({name})){
        return res.status(409).json({message:"category already exists"});
      }


      const {} = cloudinary.uploader.upload(req.file.path,{
        folder:
      });

    return res.json({message:"success",name});
}