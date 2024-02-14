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
}

module.exports = UserRepository;