export const getAll = (req,res)=>{

    return res.json({message:"success"});
}
export const create = (req,res)=>{


      const name = req.body.name.toLowerCase();
      //  يعني ايش ما كان مكتوب الاسم اعطيني اياه كل الاحراف سمول 


      if(await categoryModel.findOne)

    return res.json({message:"success",name});
}
