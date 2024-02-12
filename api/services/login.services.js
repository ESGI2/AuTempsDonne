// API Services for Login
const LoginRepository = require('../repositories/login.repository');
const PasswordHash = require('../components/passwordHash');

class LoginServices {
    static async login(data) {
        try {
            const user = await LoginRepository.login(data);
            if (!user) {
                return {"Message": "Utilisateur non trouvé"};
            }

            const passwordIsValid = await PasswordHash.verifyHashPassword(data.password, user.password, user.salt);
            if (!passwordIsValid) {
                return {"Message": "Mot de passe incorrect"};
            }

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = LoginServices;
