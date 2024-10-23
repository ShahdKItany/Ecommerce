export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req.headers;
        if(!authorization.startWith(proccess.env.BEARERTOKEN)){
            return res.status(400).json({message:"invalid token"});
        }
        return res.json(req.headers);

    }

}