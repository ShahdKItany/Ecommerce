import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from './category.controller.js';
import { createCategoryValidation, updateCategoryValidation } from './category.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { validation } from './category.validation.js';
import multer from 'multer';
import { fileType, fileUpload } from '../../utils/multer.js';

const router = express.Router();

// رفع صورة الفئة
const upload = fileUpload(fileType.image);

/

export default router;
