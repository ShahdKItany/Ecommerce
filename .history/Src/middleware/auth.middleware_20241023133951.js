export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req.headers;
        if(!authorization){
            reat
        }
        return res.json(req.headers);

    }

}