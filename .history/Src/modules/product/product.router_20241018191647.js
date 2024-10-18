import {Router} from 'express';
import productController from ''

const router = Router({caseSensitive:true});


    router.get('/',productController.getAll);
export default router;
