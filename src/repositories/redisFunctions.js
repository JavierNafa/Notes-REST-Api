const client = require('../database/redis'),
    { promisify } = require('util'),
    getAsync = promisify(client.get).bind(client),
    setAsync = promisify(client.set).bind(client),
    { REDIS_EXPIRATION: expiration = 60 } = process.env;

async function set({ key, data, expires = expiration }) {
    try {
        const result = await setAsync(key, data, 'EX', expires);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function get(key) {
    try {
        const result = await getAsync(key);
        return result;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    set,
    get
}