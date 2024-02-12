const RegisterRepository = require('../repositories/register.repository');
const PasswordHash = require('../components/passwordHash');

class RegisterServices {
    static async registerBeneficiary(data) {
        try {
            const { salt, hash } = await PasswordHash.hashPassword(data.password);
            data.salt = salt;
            data.password = hash;
            const user = await RegisterRepository.registerBeneficiary(data);
            return {"Message": "Enregistrement d'un bénéficiaire effectué avec succès"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = RegisterServices;