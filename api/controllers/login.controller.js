const LoginServices = require("../services/login.services");

class LoginController {
    static async login(req, res){
        const data = req.body;
        try {
            const user = await LoginServices.login(data);
            if (!user) {
                res.status(404).json({"Message": "Utilisateur non trouvé"});
            }
            res.status(200).json({"Message": "Utilisateur connecté", "User": user});
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Erreur lors de la connexion de l'utilisateur."});
        }
    }
}

module.exports = LoginController;