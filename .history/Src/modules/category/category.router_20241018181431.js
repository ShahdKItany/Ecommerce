import {Router, Router} from 'express';

const router = Router({caseSensitive:true});
//caseSensitive:true  ____    يعني بالريكويست الاسم لازم يكون متل الي أنا كاتبته اذا أنا حاطط سمول وعند الريكويست كتبته كبيتل ما بشتغل


router.get('/categories',(req,res)=>{
    return res.json({message:"success"});
})

export default router;
