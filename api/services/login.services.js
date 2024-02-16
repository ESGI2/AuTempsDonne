// API Services for Login
const LoginRepository = require('../repositories/login.repository');
const PasswordHash = require('../components/passwordHash');
const crypto = require("crypto");

class LoginServices {
    static async login(data) {
        try {
            const user = await LoginRepository.login(data);
            if (!user) {
                return null;
            }

            const passwordIsValid = PasswordHash.verifyHashPassword(data.password, user.password, user.salt);
            if (!passwordIsValid) {
                return null;
            }

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = LoginServices;
