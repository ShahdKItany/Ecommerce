

import 'dotenv/config'
import express from 'express'
import initApp from './Src/app.router.js'

const app =express();
const PORT =process.env.PORT || 3000;


initApp(app,express);

/


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

