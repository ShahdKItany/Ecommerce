

import 'dotenv/config'
import express from 'express'

const app =express();

const PORT =process.env.PORT || 3000;


app.use('/categories',categoryRouter);
app.use('products',productRouter);

app.get('/',(req,res)=>{
return res.json({message:"welcome..!"});
})


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

