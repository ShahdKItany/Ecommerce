//   git add .
//  git commit -m "changes" 
//  git push -u origin main




import 'dotenv/config'
import express from 'express'

import initApp from './Src/initApp.js';

const app =express();
const PORT =process.env.PORT || 3000;


initApp(app,express);


app.listen(PORT,()=>{

    console.log(`server is running ... ${PORT}`);
})

