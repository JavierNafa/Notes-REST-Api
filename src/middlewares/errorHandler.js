const { MongoError } = require('mongodb'),
    { ValidationError } = require('joi'),
    { JsonWebTokenError } = require('jsonwebtoken'),
    StatusResponseError = require('../utils/statusResponseError');

module.exports = (err, req, res, next) => {
    if (err instanceof StatusResponseError) {
        return res.status(err.statusCode).send({
            success: false,
            data: err.data,
            message: err.message
        });
    }
    if (err instanceof ValidationError) {
        return res.status(400).send({
            success: false,
            data: null,
            message: `Invalid value : ${err.details[0].context.value}, pls don't try to hack this`
        });
    }
    if (err instanceof JsonWebTokenError) {
        return res.status(403).send({
            success: false,
            data: null,
            message: `You are not who you say you are`
        });
    }
    if (err instanceof MongoError) {
        return res.status(500).send({
            success: false,
            data: null,
            message: ` You killed the DB: ${err.message}`
        });
    }
    return res.status(500).send({
        success: false,
        data: null,
        message: `This should not happen: ${err.message}`
    });
}