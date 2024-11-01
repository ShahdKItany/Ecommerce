

//Src/middleware/auth.middleware.js
import userModel from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

 const auth = () => {
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
     const user = await userModel.findById(decoded.id).select("userName");
     if(!user){
        return res.status(404).json({message:"user not found"});
     }
     req.user = user;
     next(); //  يعني بقدر هلا يكمل ويروح يعمل انشاء 

}
}


export default auth;
// middleware/auth.js


ه jwt = require('jsonwebtoken');

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = decoded;
    next();
  };
}

module.exports = authorizeRole;
