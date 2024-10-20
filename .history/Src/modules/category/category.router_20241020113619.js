import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from './category.controller.js';
import { createCategoryValidation, updateCategoryValidation } from '../../middleware/category.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { validation } from './category.validation.js';
import multer from 'multer';
import { fileType, fileUpload } from '../../utils/multer.js';

const router = express.Router();

// رفع صورة الفئة
const upload = fileUpload(fileType.image);

// إنشاء فئة جديدة
router.post(
    '/',
    authMiddleware,  // التأكد من أن المستخدم مسجل الدخول
    upload.single('image'),  // رفع صورة الفئة
    validation(createCategoryValidation),  // التحقق من البيانات
    createCategory
);

// عرض جميع الفئات
router.get('/', getAllCategories);

// جلب فئة واحدة باستخدام ID
router.get('/:id', getCategoryById);

// تحديث فئة
router.put(
    '/:id',
    authMiddleware,
    upload.single('image'),
    validation(updateCategoryValidation),
    updateCategory
);

// حذف فئة
router.delete('/:id', authMiddleware, deleteCategory);

export default router;
