

//Src/middleware/auth..js
import userModel from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

const auth = (allowedRoles = []) => {
    return  async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
            return res.status(400).json({ message: "Invalid token" });
        }
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    const decoded = jwt.verify(token,process.env.LOGINSIG);

      if (!decoded){
               // اذا كان التوكين ملعوب فيه 
             return res.status(400).json({ message: "Invalid token" });
         }

     // اذا التوكين صحيحه بدي اجيب معلومات اليوزر 
    // const user = await userModel.findById(decoded.id).select("userName");

     const user = await userModel.findById(decoded.id).select("userName role");

     if(!user){
        return res.status(404).json({message:"user not found"});
     }


    // التحقق من أن دور المستخدم مسموح له
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        console.log("User role:", user.role); // التحقق من قيمة الدور
        return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    }
    
     req.user = user;
     next(); //  يعني بقدر هلا يكمل ويروح يعمل انشاء 

}
}


export default auth;
