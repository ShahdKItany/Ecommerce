

import categoryModel from '../../../DB/models/category.model.js';

export const getAll = (req,res)=>{

    return res.json({message:"success"});
}
export const create = (req,res)=>{


      const name = req.body.name.toLowerCase();
      //  يعني ايش ما كان مكتوب الاسم اعطيني اياه كل الاحراف سمول 


      if(await categoryModel.findOne({name})){
        return res.status(409).js
      }

    return res.json({message:"success",name});
}
