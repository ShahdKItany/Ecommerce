

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

  
  const category= await categoryModel.findById(req.params.id); 
  if (!category){
         return res.status(404).json({message:"category not found"});
  }



  category.name = req.body.name.toLowerCase();

  if( await categoryModel.findOne({name:category.name ,_id:{$ne:req.params.id}})){ 
    //  هاي معناها افحصلي اذا هاد الاسم موود بتصنيف غير هاد التصنيف الي عندي
    //ne = not rquale
    return res.status(409).json({message:"category name is already exists"});
  }

  category.slug= slugify(req.body.name);
  if (req.file){

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
      folder:'ecommerce1/categories'
    });
    cloudinary.uploader.destroy(category.image.public_id);
    //destroy :  حتى كل ما ارفع صورة جديده يحذف الي قبل 

    category.image={secure_url,public_id};

  }
  
  category.status = req.body.status;

  await category.save();
   
  return res.json({message:"success",category});

}

export const destroy = async(req,res)=>{

const category= await categoryModel.findByIdAndDelete(req.params.id);

if(!category){
  return res.status(404).json({message:"category is not found"})};

  await cloudinary.up
  return res.status(200).json({message:"success",category})};

}
