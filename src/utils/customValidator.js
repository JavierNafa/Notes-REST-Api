const Joi = require('joi'),
    moment = require('moment');

function validateQueryStringArray(value, helpers) {
    try {
        const array = JSON.parse(value),
            { error } = Joi.array().items(
                Joi.string().min(1).max(100).required()
            ).validate(array);
        if (error) {
            return helpers.error(error);
        }
        return value;
    }
    catch (err) {
        return helpers.error(`The array doesn't have the correct format`);
    }
}

function validateDateTimeFormat(value, helpers) {
    try {
        const isValid = moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid();
        if (isValid) {
            return value;
        }
        return helpers.error('The format is incorrect');

    }
    catch (err) {
        return helpers.error('The format is incorrect');
    }
}

module.exports = {
    validateQueryStringArray,
    validateDateTimeFormat
}