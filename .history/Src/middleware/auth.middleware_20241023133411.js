export const auth= () =>{

    return (req,res,next)=>{
        return res.json("hi",req.h);

    }

}