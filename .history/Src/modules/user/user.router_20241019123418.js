import {Router} from 'express';


import * as userController from './category.controller.js';
const router = Router({caseSensitive:true});

    router.get('/',categoryController.getAll);

export default router;
