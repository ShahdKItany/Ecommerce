export const auth = () => {
    return (req, res, next) => {
        const { authorization } = req.headers;

        // Check if authorization header is present
        if (!authorization || !authorization.startsWith(process.env.BEARERTOKEN)) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // If token is valid, proceed to the next middleware or route handler
        next();
    }
}
