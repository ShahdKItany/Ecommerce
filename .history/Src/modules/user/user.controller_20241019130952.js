import User from '../../../DB/models/';
import bcrypt from 'bcryptjs';

// وظيفة لتسجيل مستخدم جديد
export const registerUser = async (req, res) => {
    const { username, email, password, phone, address, gender } = req.body;

    try {
        // التأكد من أن البريد الإلكتروني غير مسجل مسبقاً
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // إنشاء مستخدم جديد
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            gender,
            status: 'active',  // الحالة الافتراضية
            role: 'user'       // الدور الافتراضي
        });

        // حفظ المستخدم الجديد في قاعدة البيانات
        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during registration', error });
    }
};

// وظيفة لجلب جميع المستخدمين
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching users', error });
    }
};
