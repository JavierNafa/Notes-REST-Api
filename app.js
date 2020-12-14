const express = require('express'),
    app = express(),
    helmet = require('helmet'),
    { serve, setup } = require('swagger-ui-express'),
    { cors, errorHandler, auth: { validateToken } } = require('./src/middlewares/index'),
    { user, login, note } = require('./src/routes'),
    swaggerDoc = require('./doc/swagger.json');

app.use(cors.express);

app.use(express.urlencoded({
    limit: '10mb',
    extended: true
}));

app.use(express.json({
    limit: '10mb'
}));

app.use(helmet());
app.use('/doc', serve, setup(swaggerDoc));
app.use('/login', login);
app.use('/user', user);
app.use('*', validateToken);
app.use('/note', note);

app.use(errorHandler);

module.exports = app;