import { Router } from 'express';
import multer from 'multer';
import * as categoryController from '../controllers/category.controller.js';
import { validateCategory } from '../validation/category.validation.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// إنشاء فئة
router.post('/', authMiddleware, upload.single('image'), validateCategory, categoryController.createCategory);

// قراءة جميع الفئات
router.get('/', authMiddleware, categoryController.getAllCategories);

// جلب فئة حسب ID
router.get('/:id', authMiddleware, categoryController.getCategoryById);

// تحديث فئة
router.put('/:id', authMiddleware, upload.single('image'), validateCategory, categoryController.updateCategory);

// حذف فئة
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

export default router;
