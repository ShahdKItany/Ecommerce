export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req.headers;
        if(!authorization){
            re
        }
        return res.json(req.headers);

    }

}