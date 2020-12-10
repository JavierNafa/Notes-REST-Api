require('dotenv').config();
const { connect } = require('./src/database/mongo'),
    app = require('./app'),
    { PORT: port = 8000 } = process.env;

connect().then(() => {
    app.listen(port, () => {
        console.log(`Running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(0);
});