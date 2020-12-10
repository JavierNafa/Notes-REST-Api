const jwt = require('jsonwebtoken'),
    { TOKEN_KEY: key, TOKEN_EXPIRATION_TIME: expiration = '1h' } = process.env;

async function generateToken({ userId }) {
    return new Promise((resolve, reject) => {
        jwt.sign({ userId }, key, { algorithm: 'HS256', expiresIn: expiration }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}

async function decodeToken({ token }) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    generateToken,
    decodeToken
}