const UserRepository = require('../repositories/user.repository');
const PasswordHash = require('../components/passwordHash');

class UserServices {
    static async getAllUsers() {
        try {
            const users = await UserRepository.getAllUsers();
            return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = UserServices;