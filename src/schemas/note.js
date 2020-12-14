const Joi = require("joi"),
    { validateQueryStringArray, validateDateTimeFormat } = require('../utils/customValidator');

const add = Joi.object().keys({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(0).max(1000).required()
});

const get = Joi.object().keys({
    titles: Joi.custom(validateQueryStringArray),
    fromDate: Joi.custom(validateDateTimeFormat).default(null),
    toDate: Joi.when('fromDate', {
        is: null,
        then: Joi.allow(null).only(),
        otherwise: Joi.date().greater(Joi.ref('fromDate')).required()
    }),
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0)
});

const update = Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(0).max(1000).required()
});

const remove = Joi.object().keys({
    id: Joi.string().hex().length(24).required()
});

module.exports = {
    'POST/note/': add,
    'GET/note/': get,
    'PUT/note/:id': update,
    'DELETE/note/:id': remove
}