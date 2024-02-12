// API Services for Login
const LoginRepository = require('../repositories/login.repository');
const PasswordHash = require('../components/passwordHash');

class LoginServices {
    static async login(data) {
        try {
            const user = await LoginRepository.login(data);
            if (!user) {
                return {"Error": "User not found"};
            }

            const passwordIsValid = PasswordHash.verifyHashPassword(data.password, user.password, user.salt);
            if (!passwordIsValid) {
                return {"Error": "Invalid password"};
            }

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = LoginServices;
