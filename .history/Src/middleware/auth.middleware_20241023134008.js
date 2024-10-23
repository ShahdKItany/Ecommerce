export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req.headers;
        if(!authorization){
            return res.status(400)
        }
        return res.json(req.headers);

    }

}