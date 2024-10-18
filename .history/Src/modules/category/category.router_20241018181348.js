import {Router, Router} from 'express';

const router = Router({caseSensitive:true});
//caseSensitive:true  ____    يعني بالريكويست الاسم لازم يكون متل الي أنا كاتبته 


router.get('/categories',(req,res)=>{
    return res.json({message:"success"});
})

export default router;