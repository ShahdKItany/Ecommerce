import {Router} from 'express';

const router = Router({caseSensitive:true});


    router.get('/',productController.getAll);
export default router;
