import {Router} from 'express';
import * as categoryController from './category.controller.js';
import fileUpload,{fileType} from '../../utils/multer.js';


const router = Router({caseSensitive:true});



router.post('/', fileUpload(fileType.image).single('image'), categoryController.create);

    router.get('/',categoryController.getAll);

    router.get('/active', categoryController.getActive);

    router.get('/:id', categoryController.getDetails);

   router.patch('/:id')
export default router; 

