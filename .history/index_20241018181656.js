

import 'dotenv/config'
import express from 'express'
import categoryRouter from './Src/modules/category/category.router';
const app =express();

const PORT =process.env.PORT || 3000;


app.use(طcategoryRouter);

app.get('/',(req,res)=>{
return res.json({message:"welcome..!"});
})


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

