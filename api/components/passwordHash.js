const crypto = require('crypto');

class PasswordHash {

    static async hashPassword(password){
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return {salt, hash};
    }

    static verifyHashPassword(password, hash, salt){
        const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return verifyHash === hash;
    }
}

module.exports = PasswordHash;