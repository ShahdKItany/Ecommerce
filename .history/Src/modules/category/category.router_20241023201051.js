import {Router} from 'express';
import * as categoryController from './category.controller.js';
import fileUpload,{fileType} from '../../utils/multer.js';
import {auth} from '../../../middleware/auth.middleware.js';
//Src\middleware\auth.middleware.js

const router = Router({caseSensitive:true});


    router.post('/',auth(), fileUpload(fileType.image).single('image'), categoryController.create);
    router.get('/',categoryController.getAll);
    router.get('/active', categoryController.getActive);
    router.get('/:id', categoryController.getDetails);
    router.patch('/:id',fileUpload(fileType.image).single('image'),categoryController.update);
    router.delete('/:id',categoryController.destroy);
export default router; 

