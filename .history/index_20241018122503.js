

import 'dotenv/config'
import express from 'express'
const app =express();

const PORT =process.env.PORT || 3000;


app.get('/',req,res)=>{
    
}

app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})