import multer from 'multer';
import cloudinary from './cloudinary.js';  // استيراد Cloudinary
//import { fileType } from './multer.js';  // الملف الموجود سابقًا

export const fileUpload = (req, res, next) => {
    const storage = multer.memoryStorage();  // نستخدم ذاكرة مؤقتة
    const upload = multer({ storage }).single('image');

    upload(req, res, async (err) => {
        if (err) return res.status(400).send('Error uploading image');

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload_stream((error, result) => {
                    if (error) return res.status(500).send('Error uploading to cloud');
                    req.body.image = result.secure_url;  // تخزين رابط الصورة
                    next();
                }).end(req.file.buffer);  // رفع الصورة كـ stream
            } catch (err) {
                return res.status(500).send('Cloudinary upload failed');
            }
        } else {
            next();  // إذا لم تكن هناك صورة
        }
    });
};
