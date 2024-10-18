

import 'dotenv/config'
import express from 'express'
import initApp from './Src\app.ruoter.js';
const app =express();
const PORT =process.env.PORT || 3000;


initApp(app);

//app.get('/',(req,res)=>{
//return res.json({message:"welcome..!"});
//})


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

