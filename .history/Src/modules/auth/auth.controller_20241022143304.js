import bcrypt from 'bcryptjs';
import userModel from "../../../DB/models/user.model.js";

export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
        return res.status(409).json({ message: "Email already exists" });
    }

    // Parse SALTROUND as a number, or provide a default value if undefined
    const saltRounds = parseInt(process.env.SALTROUND);

    // Hash the password with the parsed salt rounds
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const createUser = await userModel.create({ userName, email, password: hashedPassword });

    return res.status(201).json({ message: "Success", user: createUser });
}


export const login = async(req,res)=>{

    const {email,password}=req.body;

    const {user} = await userModel.findOne({email});
    if (user)

}