import {Router} from 'express';


import * as categoryController from './category.controller';
const router = Router({caseSensitive:true});

    router.get('/',categoryController.getAll);

export default router;
