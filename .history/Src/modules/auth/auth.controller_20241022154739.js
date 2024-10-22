import bcrypt from 'bcryptjs';
import userModel from "../../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const saltRounds = parseInt(process.env.SALTROUND);

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const createUser = await userModel.create({ userName, email, password: hashedPassword });

    return res.status(201).json({ message: "Success", user: createUser });
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Compare provided password with the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({id:user._id,role:user})

        // If successful login, return a success response (you can include a JWT or session creation)
        return res.status(200).json({ message: "Login successful", user });
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}
