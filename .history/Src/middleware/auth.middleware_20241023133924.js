export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}=req
        return res.json(req.headers);

    }

}