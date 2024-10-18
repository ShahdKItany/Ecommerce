import {Router} from 'express';
import productController f

const router = Router({caseSensitive:true});


    router.get('/',productController.getAll);
export default router;
