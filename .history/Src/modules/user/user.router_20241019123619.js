import {Router} from 'express';


import * as userController from './user.controller.js';
const router = Router({caseSensitive:true});



// مسار لتسجيل مستخدم جديد
router.post('/register', registerUser);

// مسار لجلب جميع المستخدمين (اختياري)
router.get('/', getUsers);

    router.get('/',userController.getAll);

export default router;
