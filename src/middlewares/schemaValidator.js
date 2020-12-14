const _ = require('lodash'),
    schemas = require('../schemas/index'),
    StatusResponseError = require('../utils/statusResponseError');

module.exports = (req, res, next) => {
    const method = req.method,
        url = req.baseUrl,
        path = req.route.path,
        query = req.query,
        params = req.params,
        body = req.body,
        schema = _.get(schemas, url);
    if (schema) {
        const validator = _.get(schema, `${method}${url}${path}`);
        if (validator) {
            const { error } = validator.validate({ ...body, ...params, ...query });
            if (error) {
                return next(error);
            }
            return next();
        }
    }
    return next(new StatusResponseError({ statusCode: 404, message: `This route doesn't exist` }));
}