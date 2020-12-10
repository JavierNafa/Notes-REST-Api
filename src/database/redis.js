const redis = require('redis'),
    { REDIS_HOST: host = '127.0.0.1', REDIS_PORT: port = 6379, REDIS_DB_INDEX: db = 0 } = process.env;

module.exports = redis.createClient({ host, port, db })
    .on('connect', () => console.log('Connected to redis'))
    .on('error', err => console.log(`ERR:REDIS ${err}`));