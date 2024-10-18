import {Router, Router} from 'express';

const router = Router({caseSensitive:true});
//caseSensitive:true 


router.get('/categories',(req,res)=>{
    return res.json({message:"success"});
})

export default router;