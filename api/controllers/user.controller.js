const UserServices = require("../services/user.services");

class UserController {
    static async getUsers(req, res) {
        try {
            const { id, role } = req.query;
            let users;

            if (id) {
                users = await UserServices.getUserById(id);
                if (!users) return res.status(404).json({ "Error": "User not found" });
            } else if (role) {
                try {
                    users = await UserServices.getUserByRole(role);
                } catch (error) {
                    return res.status(400).json({ "Error": error.message });
                }

                if (!users || users.length === 0) {
                    return res.status(404).json({ "Error": "No users found for the specified role" });
                }
            } else {
                users = await UserServices.getAllUsers();
                if (!users || users.length === 0) {
                    return res.status(404).json({ "Error": "No users found" });
                }
            }
            res.status(200).json({ "Message": "Users recovered", users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error recovering users" });
        }
    }
}

module.exports = UserController;