const { getDb } = require('../database/mongo');

async function insert(collection, properties) {
    try {
        const result = await getDb().collection(collection).insertOne({ ...properties });
        return { ...result };
    }
    catch (err) {
        throw err;
    }
}

async function update(collection, search, set, upsert = false) {
    try {
        const result = await getDb().collection(collection).findOneAndUpdate({ ...search }, { $set: { ...set } }, { upsert });
        return { ...result };
    }
    catch (err) {
        throw err;
    }
}

async function find(collection, filters = {}, projection = {}, page = 0, limit = 10) {
    try {
        Object.keys(filters).forEach(filter => !filters[filter] && delete filters[filter]);
        const result = await getDb().collection(collection).find({ ...filters },
            { projection }).skip(parseInt(page)).limit(parseInt(limit)).toArray();
        return [...result];
    }
    catch (err) {
        throw err;
    }
}

async function findOne(collection, filters = {}) {
    try {
        const result = await getDb().collection(collection).findOne({ ...filters });
        return { ...result };
    }
    catch (err) {
        throw err;
    }
}

async function count(collection, filters = {}) {
    try {
        const result = await getDb().collection(collection).find({ ...filters }).count();
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function remove(collection, properties) {
    try {
        const result = await getDb().collection(collection).deleteOne({ ...properties });
        return { ...result };
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    insert,
    update,
    find,
    findOne,
    count,
    remove
};