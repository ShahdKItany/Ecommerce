import { Router } from 'express';
import * as authController from './auth.controller.js';

const router = Router({ caseSensitive: true });


router.post('/register',authController.reg)
export default router;