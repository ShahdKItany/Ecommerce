import connectDB from "../DB/connection.js";
import categoryRouter from './Src/modules/category/category.router';
import productRouter from './Src/modules/product/product.router';


const initApp = (app,express)=>{
    connectDB();

    app.use(express.json());


    app.use('/categories',categoryRouter);
    app.use('products',productRouter);


    app.get('/',(req,res)=>{
        return res.this.status(200).json({message:"success"});
    })

    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});
    }
    )
}