

import categoryModel from '../../../DB/models/category.model.js';
import cloudinary from '../../utils/cloudinary.js';
import slugify from 'slugify';


export const getAll = (req,res)=>{

    return res.json({message:"success"});
}
export const create =async (req,res)=>{


     // const name = req.body.name.toLowerCase();
      //  يعني ايش ما كان مكتوب الاسم اعطيني اياه كل الاحراف سمول 

      req.body.name = req.body.name.toLowerCase();


      //if( await categoryModel.findOne({name})){  
      if( await categoryModel.findOne(name:req.body.name)){ 
        
        return res.status(409).json({message:"category already exists"});
      }


      const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:'ecommerce1/categories'
      });



      req.body.image ={secure_url,public_id};

     // const slug = slugify(name);
     req.body.slug = slugify( req.body.name);



      //const category = await categoryModel.create({name,slug,image:{secure_url,public_id}});
      const category = await categoryModel.create(req.body);


    return res.json({message:"success",category});;
}
