const checkIsResponsible = (req, res, next) => {
    const userData = req.user;
    if (userData.role !== "responsable" && userData.role !== "admin" ) {
        return res.status(403).json({"Error": "You are not authorized to access this route"});
    }
    next();
};

module.exports = checkIsResponsible;