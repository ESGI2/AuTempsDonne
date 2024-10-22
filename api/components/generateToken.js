const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '604800s' });
    return token;
}

module.exports = generateAccessToken;