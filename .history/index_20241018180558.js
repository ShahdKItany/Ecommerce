

import 'dotenv/config'
import express from 'express'
import categoryRouter from './Src/modules/category/category.router';
const app =express();

const PORT =process.env.PORT || 3000;


app.use(categoryRouter);



app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

