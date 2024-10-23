export const auth = () => {
    return (req, res, next) => {
        const { authorization } = req.headers;

        // Check if authorization header is present
        if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
            return res.status(400).json({ message: "Invalid token" });
        }

      return res.json(req.headers)
    }
}
