const { insert, count, find } = require('../repositories/mongoFunctions'),
    { hashPassword } = require('../utils/hashGenerator'),
    collection = 'user';

async function createUser({ name, lastName, email, password }) {
    try {
        const isDuplicated = await count(collection, { email });
        if (isDuplicated > 0) {
            return { success: false };
        }
        const hash = await hashPassword({ password });
        await insert(collection, {
            name,
            lastName,
            email,
            hash
        });
        return { success: true, data: { name, lastName, email } };
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createUser
}