const LoginServices = require("../services/login.services");
const generateAccessToken = require("../components/generateToken");

class LoginController {
    static async login(req, res){
        const data = req.body;
        try {
            const user = await LoginServices.login(data);
            if (!user) {
                res.status(404).json({"Error": "User or password not found"});
            } else {
                // Création du token JWT
                const user_data = {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role,
                }
                const accessToken = generateAccessToken(user_data);
                // Création du cookie
                res.cookie('jwt', accessToken, { httpOnly: true, secure: true, maxAge: 604800 });
                res.status(200).json({ "Message": "User successfully logged in", 
                                      "Role": user_data.role});
            }
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }
}

module.exports = LoginController;