export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req.headers;
        if(!authorization){
            return res.stat
        }
        return res.json(req.headers);

    }

}