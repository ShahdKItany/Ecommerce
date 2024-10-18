

import 'dotenv/config'
import express from 'express'
import catergoryRouter from 
const app =express();

const PORT =process.env.PORT || 3000;


app.get('/',(req,res)=>{
return res.json({message:"welcome..!"});
})


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

