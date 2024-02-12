const LoginServices = require("../services/login.services");

class LoginController {
    static async login(req, res){
        const data = req.body;
        try {
            const user = await LoginServices.login(data);
            if (!user) {
                res.status(404).json({"Error": "User not found"});
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }
}

module.exports = LoginController;