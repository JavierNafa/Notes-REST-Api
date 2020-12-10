const { get } = require('../repositories/redisFunctions');

async function getData(key) {
    try {
        const result = await get(key);
        if (result) {
            return JSON.parse(result);
        }
        return null;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getData
}