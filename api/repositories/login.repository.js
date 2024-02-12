// API Repository for Login
const User = require('../models/user.model');

class LoginRepository {
    static async login(data) {
        try {
            const user = await User.findOne({where: {email: data.email}});
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = LoginRepository;