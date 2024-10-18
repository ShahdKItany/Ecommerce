

import 'dotenv/config'
import express from 'express'
import categoryRouter from './Src/modules/category/category.router';
import productRouter from './Src/modules/product/product.router'
const app =express();

const PORT =process.env.PORT || 3000;


app.use('/categories',categoryRouter);
app.use('products',)

app.get('/',(req,res)=>{
return res.json({message:"welcome..!"});
})


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

