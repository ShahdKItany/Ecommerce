

import categoryModel from '../../../DB/models/category.model.js';
import cloudinary from '../../utils/cloudinary.js';
import slugify from 'slugify';



export const create =async (req,res)=>{

      req.body.name = req.body.name.toLowerCase();

      if( await categoryModel.findOne({name:req.body.name})){ 
        
        return res.status(409).json({message:"category already exists"});
      }

      const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:'ecommerce1/categories'
      });


      req.body.image ={secure_url,public_id};

     req.body.slug = slugify( req.body.name);

      const category = await categoryModel.create(req.body);


    return res.json({message:"success",category});;
}

//admin
export const getAll = async (req,res)=>{

    const categories = await categoryModel.find({});
    return res.status(200).json({message:"success",categories});
}
 

//user
export const getActive= async (req,res)=>{

    const categories = await categoryModel.find({status: 'active'});
    return res.status(200).json({message:"success",categories});
}
 

export const getDetails= async(req,res)=>{

    const category = await categoryModel.findById(req.params.id);
    
    return res.status(200).json({message:"success",category});
    }

    
export const getName= async (req,res)=>{

   // const categories = await categoryModel.find({status: 'active'}).select("name");
   // return res.status(200).json({message:"success",categories});

   return res.json(req.params);
}

export const update = async(req,res)=>{

  req.body.name = req.body.name.toLowerCase();

  if( await categoryModel.findOne({name:req.body.name})){ 
    
    return res.status(409).json({message:"category already exists"});
  }
  
  const category= await categoryModel.findById(req.params.id); 
  if (!category){
         return res.status(404).json({message:"category not found"});
  }


  req.body.slug
   
  return res.json(category);

}