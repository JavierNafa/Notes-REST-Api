const Joi = require("joi");

const login = Joi.object().keys({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).required()
});

module.exports = {
    'POST/login/': login
}