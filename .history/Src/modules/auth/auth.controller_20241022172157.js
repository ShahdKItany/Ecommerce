import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userModel from "../../../DB/models/user.model.js";

export const register = async (req, res) => {
    const { userName, email, password } = req.body;

     // التحقق من الحقول المطلوبة
     if ( !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });

    if (user) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const saltRounds = parseInt(process.env.SALTROUND);

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const createUser = await userModel.create({ userName, email, password: hashedPassword });

    return res.status(201).json({ message: "Success", user: createUser });
};



export const login = async (req, res) => {
    
        const { userName,email,password } = req.body;

         // التحقق من الحقول المطلوبة
    if ( !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

        // Find user by email
        const user = await userModel.findOne({email});

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Compare provided password with the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSIG);
        return res.status(200).json({ message: "Login successful", token });
        
    
}
