import {Router} from 'express';
import productController

const router = Router({caseSensitive:true});


    router.get('/',productController.getAll);
export default router;
