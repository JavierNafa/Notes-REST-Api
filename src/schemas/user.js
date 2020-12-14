const Joi = require("joi");

const add = Joi.object().keys({
    name: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).required()
});

module.exports = {
    'POST/user/': add
}