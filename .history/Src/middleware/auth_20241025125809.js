//Src/middleware/auth.middleware.js
import userModel from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

const auth = (allowedRoles = []) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;

        // التحقق من وجود التوكين وصحته
        if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const token = authorization.split(process.env.BEARERTOKEN)[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.LOGINSIG);
        } catch (error) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // إذا كانت التوكين صحيحة، يتم جلب معلومات المستخدم
        const user = await userModel.findById(decoded.id).select("userName role");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // التحقق من الأدوار المسموح بها (إذا كانت محددة)
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }

        req.user = user; // تخصيص بيانات المستخدم في الطلب
        next(); // السماح بالانتقال للميدل وير التالي
    };
};

export default auth;
