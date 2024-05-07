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

    static async getMe(req, res) {
        try {
            const { id } = req.user;
            const user = await UserServices.getUserById(id);
            const me = {
                id: user.id,
                email: user.email,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name
            };
            if (!user) return res.status(404).json({ "Error": "User not found" });
            res.status(200).json({ "Message": "User recovered", me });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error recovering user" });
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('jwt');
            res.status(200).json({ "Message": "User logged out" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error logging out user" });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await UserServices.getUserById(id);
            if (!user) return res.status(404).json({ "Error": "User not found" });
            if (user.role === 'admin') return res.status(403).json({ "Error": "You can't delete an admin" });
            await UserServices.deleteUser(id);
            res.status(200).json({ "Message": "User deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error deleting user" });
        }
    }

    static async editUser(req, res) {
        try {
            const { id } = req.params;
            const user = await UserServices.getUserById(id);
            if (!user) return res.status(404).json({ "Error": "User not found" });
            const data = req.body;
            const editedData = {};
            if (data.nbr_child === "") data.nbr_child = 0;
            for (const key in data) {
                if (data[key] !== "") {
                    editedData[key] = data[key];
                } else {
                    editedData[key] = null;
                }
            }

            await UserServices.editUser(id, editedData);
            res.status(200).json({ "Message": "User updated", data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error updating user" });
        }
    }

    static async editPassword(req, res) {
        try {
            const { id } = req.params;
            const user = await UserServices.getUserById(id);
            if (!user) return res.status(404).json({ "Error": "User not found" });
            const { password } = req.body;
            await UserServices.editPassword(id, password);
            res.status(200).json({ "Message": "Password updated" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error updating password" });
        }
    }

    static async getVolunteers(req, res) {
        try {
            const volunteers = await UserServices.getVolunteers();
            if (!volunteers || volunteers.length === 0) {
                return res.status(404).json({ "Error": "No volunteers found" });
            }
            res.status(200).json({volunteers});
        } catch (error) {
            console.error(error);
            res.status(500).json({ "Error": "Error recovering volunteers" });
        }
    }
}

module.exports = UserController;