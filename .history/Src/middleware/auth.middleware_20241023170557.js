export const auth = () => {
    return (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
            return res.status(400).json({ message: "Invalid token" });
        }

    
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    const decoded = jwt.verify(token,process.env.LOGINSIG);
 if (!decoded){

 }

    return res.json(req.headers);


}
}
