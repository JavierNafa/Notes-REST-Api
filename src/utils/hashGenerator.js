const bcrypt = require('bcrypt');

async function hashPassword({ password }) {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    catch (err) {
        throw err;
    }
}

async function compare({ password, hash }) {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    }
    catch (err) {
        throw err;
    }
}


module.exports = {
    hashPassword,
    compare
}