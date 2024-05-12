const checkIsVolunteer = (req, res, next) => {
    const userData = req.user;
    if (userData.role !== "volunteer" && userData.role !== "responsible" && userData.role !== "admin") {
        return res.status(403).json({"Error": "You are not authorized to access this route"});
    }
    next();
};

module.exports = checkIsVolunteer;