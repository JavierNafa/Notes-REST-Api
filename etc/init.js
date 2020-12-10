require('dotenv').config('../.env');
const { connect, disconnect, getDb } = require('../src/database/mongo'),
    redisMock = require('redis-mock'),
    { promisify } = require('util'),
    Ajv = require('ajv'),
    ajv = new Ajv({ allErrors: true });

let redisQuit, redisFlush = null;

jest.mock('redis', () => redisMock);

beforeAll(async () => {
    const redisClient = require('../src/database/redis');
    redisQuit = promisify(redisClient.quit).bind(redisClient);
    redisFlush = promisify(redisClient.flushdb).bind(redisClient);
    await connect();
    expect.extend({
        toMatchSchema(data, schema) {
            const validate = ajv.compile(schema),
                isValid = validate(data);
            return {
                message: () => ajv.errorsText(validate.errors),
                pass: isValid
            }
        }
    });
});

afterAll(async (done) => {
    await redisFlush();
    await redisQuit();
    await getDb().dropDatabase();
    await disconnect();
    done();
});