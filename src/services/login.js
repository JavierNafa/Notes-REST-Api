const { generateToken } = require('../utils/tokenGenerator');

async function login({ userId }) {
    try {
        const result = await generateToken({ userId });
        return result;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    login
}