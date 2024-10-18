import connectDB from "../../DB/connection.js";

const initApp = (app,express)=>{
    connectDB();

    app.use(express.json());

    app.get('/',(req,res)=>{
        return res.this.status(200).json({message:"success"});
    })

    app.use('*',(req,res)=>{
        return res.status(404).json({message:"page not found"})
    }
    ])
}