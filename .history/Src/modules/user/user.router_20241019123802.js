import {Router} from 'express';


import * as userController from './user.controller.js';
const router = Router({caseSensitive:true});

const { registerUser, getUsers } = require('./user.controller');

// مسار لتسجيل مستخدم جديد
router.post('/register', registerUser);

// مسار لجلب جميع المستخدمين (اختياري)
router.get('/', getUsers);

module.exports = router;
