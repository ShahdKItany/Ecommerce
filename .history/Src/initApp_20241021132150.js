import connectDB from "../DB/connection.js";
import categoryRouter from './modules/category/category.router.js';
import productRouter from './modules/product/product.router.js';
import authRouter from '../Src/modules/auth/auth.router.js'

const initApp = (app,express)=>{
    connectDB();

    app.use(express.json());

    app.get('/',(req,res)=>{
        return res.this.status(200).json({message:"success"});
    })

    app.use('/categories',categoryRouter);
    app.use('/auth',authRouter);
    app.use('/products',productRouter);

   
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});
    }
    )
}
export default initApp;
