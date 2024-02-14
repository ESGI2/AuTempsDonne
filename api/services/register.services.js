// API Services for Register
const RegisterRepository = require('../repositories/register.repository');
const PasswordHash = require('../components/passwordHash');

class RegisterServices {
    static async registerBeneficiary(data) {
        try {
            const { salt, hash } = await PasswordHash.hashPassword(data.password);
            data.salt = salt;
            data.password = hash;
            await RegisterRepository.registerBeneficiary(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async registerVolunteer(data) {
        try {
            const { salt, hash } = await PasswordHash.hashPassword(data.password);
            data.salt = salt;
            data.password = hash;
            await RegisterRepository.registerVolunteer(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = RegisterServices;