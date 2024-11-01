
//Src/modules/category/category.router.js
import {Router} from 'express';
import * as subCategoryController from './subCategory.controller.js';
import fileUpload,{fileType} from '../../utils/multer.js';
import  auth  from '../../middleware/auth.js';

const router = Router({caseSensitive:true});



    router.post('/', auth(['admin']), fileUpload(fileType.image).single('image'), subCategoryController.create);
   
   router.get('/',subCategoryController.getAll);
   router.get('/active', subCategoryController.getActive);
    router.get('/:id', subCategoryController.getDetails);
    router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),categoryController.update);
    router.delete('/:id',auth(),categoryController.destroy);
export default router; 

