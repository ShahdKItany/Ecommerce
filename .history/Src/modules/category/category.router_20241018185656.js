import {Router} from 'express';


import * as categoryController from './category.controller';
const router = Router({caseSensitive:true});


    router.get('/',(req,res)=>{

    return res.json({message:"success"});
})

export default router;
