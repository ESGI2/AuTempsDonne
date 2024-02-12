// API Repository for Register
const User = require('../models/user.model');
const moment = require('moment-timezone');

class RegisterRepository {
    static async registerBeneficiary(data) {
        try {
            const benefiaciary = await User.create(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    salt: data.salt,
                    role: 'beneficiary',
                    registration_date: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss'),
                    validation_status: 'validated',
                    nbr_child: 0,
                    newsletter: false,
                    account_status: 'active'
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async registerVolunteer(data) {
        try {
            const volunteer = await User.create(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    salt: data.salt,
                    role: 'volunteer',
                    phone: data.phone,
                    registration_date: moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss'),
                    validation_status: 'pending',
                    nbr_child: 0,
                    newsletter: false,
                    account_status: 'active'
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = RegisterRepository;