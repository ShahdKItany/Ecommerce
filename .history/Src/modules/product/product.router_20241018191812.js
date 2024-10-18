import {Router} from 'express';
import * as productController from './product.controller';

const router = Router({caseSensitive:true});


    router.get('/',productController.getAll);
    
    
    export default router;
