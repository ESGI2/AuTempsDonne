const jwt= require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    const authentificationToken = process.env.ACCESS_TOKEN_SECRET;

    if (authToken) {
        try {
            req.user = jwt.verify(authToken, authentificationToken);
            next();
        } catch (error) {
            res.status(403).json({"Error": "Expired or invalid token", "Help": "Please login again", "Error details": error});
        }
    } else {
        return res.status(401).json({"Message": "Missing authentication key"});
    }
};

module.exports = authMiddleware;