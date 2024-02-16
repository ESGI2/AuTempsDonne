const UserRepository = require('../repositories/user.repository');
const PasswordHash = require("../components/passwordHash");
class UserServices {
    static async getAllUsers() {
        try {
            return await UserRepository.getAllUsers();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getUserByRole(role) {
        try {
            if (role !== 'admin' || role !== 'volunteer' || role !== 'beneficiary') {
                console.log('Invalid role');
            }
            return await UserRepository.getUserByRole(role);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            return await UserRepository.getUserById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            return await UserRepository.deleteUser(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async editUser(id, data) {
        try {
            return await UserRepository.editUser(id, data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async editPassword(id, password) {
        try {
            const { salt, hash } = await PasswordHash.hashPassword(password);
            return await UserRepository.editPassword(id, hash, salt);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = UserServices;