// src/modules/category/category.router.js
import { Router } from 'express';
import { auth } from '../../middleware/auth.middleware.js'; // تأكد من أن المسار صحيح

const router = Router();

// استخدم auth في المسارات الخاصة بك
router.get('/', auth(), (req, res) => {
    res.send('Category route');
});

export default router;
