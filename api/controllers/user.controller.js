const UserServices = require("../services/user.services");

class UserController {
    static async getAllUsers(req, res){
        try {
            const users = await UserServices.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({"Error": "Error recovering users"});
        }
    }
}

module.exports = UserController;