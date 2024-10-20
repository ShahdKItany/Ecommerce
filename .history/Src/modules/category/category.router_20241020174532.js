import {Router} from 'express';
import * as categoryController from './category.controller.js';
const router = Router({caseSensitive:true});



   router.post('/',fileUpload)

    router.get('/',categoryController.getAll);

export default router; 

