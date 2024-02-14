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
}

module.exports = UserServices;