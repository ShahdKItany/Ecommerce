import bcrypt from 'bcryptjs';


import userModel from "../../../DB/models/user.model.js";


export const register =async(req,res)=>{

    const{userName,email,password}=req.body;

    const user = await userModel.findOne({email});
    //  هيك بتأكد اذا ايميل هاد اليوزر اليي بدو  يسجل اذا ايميه موجود او لا ( اذا مسجل قبل او لا)

    if(user){
        return res.status(409).json({message:"email already exists"});
    }
}