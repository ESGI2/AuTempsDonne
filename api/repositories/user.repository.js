// API Repository for User
const User = require('../models/user.model');

class UserRepository {
    static async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getUserByRole(role) {
        try {
            const users = await User.findAll({
                where: {
                    role: role
                }
            });
            return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            await user.destroy();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async editUser(id, data) {
        try {
            const user = await User.findByPk(id);
            await user.update(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async editPassword(id, hash, salt) {
        try {
            const user = await User.findByPk(id);
            await user.update(
                {
                    hash: hash,
                    salt: salt
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = UserRepository;