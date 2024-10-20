import connectDB from "../../DB/connection.js";

const initApp = (app,express)=>{
    connectDB();

    app.use(express.json());

    app.get('/',(req,res)=>{
        return res.this.status(200).json({message:"success"})
    })
}