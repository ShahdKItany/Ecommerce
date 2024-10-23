export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req.headers;
        return res.json(req.headers);

    }

}