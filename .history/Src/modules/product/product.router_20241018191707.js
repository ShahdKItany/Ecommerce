import {Router} from 'express';
import productController from './product.controller.js';

const router = Router({caseSensitive:true});


    router.get('/',productController.getAll);
    export default router;
