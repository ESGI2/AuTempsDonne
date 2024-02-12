const jwt= require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    const authentificationToken = process.env.ACCESS_TOKEN_SECRET;

    if (authToken) {
        try {
            const infos = jwt.verify(authToken, authentificationToken);
            req.user = infos;
            next();
        } catch (error) {
            res.status(403).json({error: "Token expiré ou invalide"});
        }
    } else {
        return res.status(401).json({message: "Clé d'authentification manquante"});
    }
};

module.exports = authMiddleware;