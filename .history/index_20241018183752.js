

import 'dotenv/config'
import express from 'express'
import initApp from ''
const app =express();
const PORT =process.env.PORT || 3000;


initApp(app,express);

//app.get('/',(req,res)=>{
//return res.json({message:"welcome..!"});
//})


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

