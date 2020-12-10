require('dotenv').config();
const { connect } = require('./src/database/mongo'),
    app = require('./app'),
    { API_PORT: apiPort = 9000 } = process.env;

connect().then(() => {
    app.listen(apiPort, () => {
        console.log(`Running on port ${apiPort}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(0);
});