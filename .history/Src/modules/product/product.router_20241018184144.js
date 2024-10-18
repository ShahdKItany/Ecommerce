import {Router} from 'express';

const router = Router({caseSensitive:true});


    router.get('/',(req,res)=>{

    return res.json({message:" success"});
})

export default router;
