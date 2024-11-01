import { Router } from 'express';
import * as authController from './auth.controller.js';
import auth from '../../middleware/auth.js';

const router = Router({ caseSensitive: true });


router.post('/register',authController.register);
router.post('/login',authController.login);

// مسار يسمح فقط للمسؤولين (admin)
router.post('/admin-route', auth(['admin']), (req, res) => {
    res.status(200).json({ message: "Welcome, admin!" });
});

// مسار يمكن للمسؤولين (admin) والمستخدمين (user) الوصول إليه
router.get('/user-route', auth(['admin', 'user']), (req, res) => {
    res.status(200).json({ message: "Hello, user or admin!" });
});
export default router;
