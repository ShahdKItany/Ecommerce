import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userModel from "../../../DB/models/user.model.js";

export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
   
    console.log(req.body);

    // التأكد من عدم وجود مستخدم بنفس البريد الإلكتروني
    const user = await userModel.findOne({email});
    if (user) {
        return res.status(409).json({ message: "Email already exists" });
    }
    console.log(""req.body);


    const saltRounds = parseInt(process.env.SALTROUND) ; 
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    try {
        const createUser = await userModel.create({ userName:userName, email:email, password: hashedPassword });
        return res.status(201).json({ message: "Success", user: createUser });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
}


export const login = async (req, res) => {
    
        const { userName,email,password } = req.body;

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

        if (user.status === "notActive") {
            return res.status(400).json({message:"your account is blocked"});
        }
        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG);
        return res.status(200).json({ message: "Login successful", token });
        
    
}
