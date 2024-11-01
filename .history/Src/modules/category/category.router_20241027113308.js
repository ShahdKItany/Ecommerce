
//Src/modules/category/category.router.js
import {Router} from 'express';
import * as categoryController from './category.controller.js';
import fileUpload,{fileType} from '../../utils/multer.js';
import  auth  from '../../middleware/auth.js';

const router = Router({caseSensitive:true});


    router.post('/',auth(), fileUpload(fileType.image).single('image'), categoryController.create);
    router.get('/',categoryController.getAll);
    router.get('/active', categoryController.getActive);
    router.get('/:id', categoryController.getDetails);
    //router.get('/:name', categoryController.getName);
        router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),categoryController.update);
    router.delete('/:id',auth(),categoryController.destroy);
export default router; 

