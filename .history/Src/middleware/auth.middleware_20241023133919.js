export const auth= () =>{

    return (req,res,next)=>{

        const{authorization}
        return res.json(req.headers);

    }

}