import {Router} from 'express';


import
const router = Router({caseSensitive:true});
//caseSensitive:true  ____    يعني بالريكويست الاسم لازم يكون متل الي أنا كاتبته اذا أنا حاطط سمول وعند الريكويست كتبته كبيتل ما بشتغل


    router.get('/',(req,res)=>{

    return res.json({message:"success"});
})

export default router;
