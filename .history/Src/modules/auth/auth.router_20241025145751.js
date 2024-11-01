import { Router } from 'express';
import * as authController from './auth.controller.js';
import auth from '../../middleware/auth.js';

const router = Router({ caseSensitive: true });


router.post('/register',authController.register);
router.post('/login',authController.login);



export default router;
