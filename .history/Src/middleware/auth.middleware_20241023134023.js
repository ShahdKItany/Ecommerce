export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req.headers;
        if(!authorization){
            return res.status(400).json({message:})
        }
        return res.json(req.headers);

    }

}