import bcrypt from 'bcryptjs';
import userModel from "../../../DB/models/user.model.js";

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


