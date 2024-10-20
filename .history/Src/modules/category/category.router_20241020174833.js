import {Router} from 'express';
import * as categoryController from './category.controller.js';
import fileUpload,{fileType} from '../../utils/m'
const router = Router({caseSensitive:true});



   router.post('/',fileUpload(fileType.image).single('image').controller.create);

    router.get('/',categoryController.getAll);

export default router; 

