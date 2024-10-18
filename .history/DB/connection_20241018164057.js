import mongoose from "mongoose";


const connectDB = async()=>{
mongoose.connect(process.env.DB)
.then(  ()=>{
    console.log
})
}