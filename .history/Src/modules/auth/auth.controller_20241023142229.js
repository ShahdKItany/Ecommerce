import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../../../DB/models/user.model.js";

// تسجيل مستخدم جديد
export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    // التحقق من المدخلات
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // التأكد من عدم وجود مستخدم بنفس البريد الإلكتروني
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
    }

    // تشفير كلمة المرور
    const saltRounds = parseInt(process.env.SALTROUND);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // إنشاء المستخدم
    try {
        const newUser = await userModel.create({ userName, email, password: hashedPassword, status: 'notActive' });
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// تسجيل الدخول
export const login = async (req, res) => {
    const { email, password } = req.body;

    // التحقق من المدخلات
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // البحث عن المستخدم بالبريد الإلكتروني
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Email not found" });
    }

    // التحقق من حالة المستخدم
    if (user.status === 'notActive') {
        return res.status(403).json({ message: "Your account is not active" });
    }

    // مقارنة كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    // إنشاء JWT
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.LOGINSIG,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ message: "Login successful", token });
};
