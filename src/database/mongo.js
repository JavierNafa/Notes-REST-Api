const MongoClient = require('mongodb').MongoClient,
    { DB_URL: url = 'mongodb://localhost:27018/', DB_NAME: dbName = 'notes' } = process.env;
let db = null,
    client = null;

async function connect() {
    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });

        db = client.db(dbName);
        await db.collection('user').createIndex('email');
        await db.collection('note').createIndex('title');
        await db.collection('note').createIndex('creationDate');
        await db.collection('note').createIndex('userId');
        console.log('Connected to mongo');
    }
    catch (err) {
        throw err;
    }
}

async function disconnect() {
    try {
        await client.close();
    }
    catch (err) {
        throw err;
    }
}

function getDb() {
    return db;
}

module.exports = {
    connect,
    getDb,
    disconnect
}