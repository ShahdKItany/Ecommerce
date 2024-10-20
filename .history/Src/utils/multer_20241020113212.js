import multer from 'multer';

// أنواع الملفات المسموح بها
export const fileType = {
    image: ['image/png', 'image/jpeg', 'image/webp'],  // أنواع الصور المقبولة
    pdf: ['application/pdf']  // ملفات PDF المقبولة
};

// دالة رفع الملفات
function fileUpload(customTypes = []) {  
    // تخزين الملفات في النظام المحلي
    const storage = multer.diskStorage({});  

    // فلترة الملفات حسب النوع
    function fileFilter(req, file, cb) {
        // إذا كان نوع الملف (MIME type) من الأنواع المسموح بها
        if (customTypes.includes(file.mimetype)) {
            cb(null, true);  // قبول الملف
        } else {
            cb("invalid format", false);  // رفض الملف
        }
    }

    // إنشاء وظيفة التحميل باستخدام Multer
    const upload = multer({ fileFilter, storage });

    return upload;
}

export default fileUpload;
