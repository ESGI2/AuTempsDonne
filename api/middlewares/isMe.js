const checkIsMe = (req, res, next) => {
    const userData = req.user;
    const {id} = req.params;

    console.log(id)
    console.log(userData.id)
    if (userData.id.toString() !== id && userData.role !== "admin") {
        return res.status(403).json({"Error": "You are not authorized to access this route"});
    }
    next();
};

module.exports = checkIsMe;