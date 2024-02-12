// API Repository for Login
const User = require('../models/user.model');

class LoginRepository {
    static async login(data) {
        try {
            return await User.findOne({where: {email: data.email}});
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = LoginRepository;