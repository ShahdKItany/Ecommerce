import {Router} from 'express';


import * as userController from './user.controller.js';
const router = Router({caseSensitive:true});



// مسار لتسجيل مستخدم جديد
router.post('/register', userController.registerUser);


    router.get('/',userController.getAll);

export default router;
import { Router } from 'express';
import * as userController from './user.controller.js';

const router = Router({ caseSensitive: true });

// مسار لتسجيل مستخدم جديد
router.post('/register', userController.registerUser);

// مسار لجلب جميع المستخدمين
router.get('/', userController.getUsers);

export default router;
