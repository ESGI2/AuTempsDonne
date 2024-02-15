const UserRepository = require('../repositories/user.repository');

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
}

module.exports = UserServices;