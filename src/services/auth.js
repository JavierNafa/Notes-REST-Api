const { findOne, count } = require('../repositories/mongoFunctions'),
    { compare } = require('../utils/hashGenerator'),
    { decodeToken } = require('../utils/tokenGenerator'),
    { ObjectID } = require('mongodb'),
    collection = 'user';

async function compareHash({ email, password }) {
    try {
        const { _id, hash } = await findOne(collection, {
            email
        });
        if (_id) {
            const match = await compare({ password, hash });
            return { _id, match };
        }
        return { _id: null };
    }
    catch (err) {
        throw err;
    }
}

async function compareToken({ token }) {
    try {
        const { userId } = await decodeToken({ token }),
            exist = await count(collection, {
                _id: new ObjectID(userId)
            });
        if (exist === 1) {
            return userId;
        }
        return null;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    compareHash,
    compareToken
}