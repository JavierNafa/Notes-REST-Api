const { compareHash, compareToken } = require('../services/auth'),
    StatusResponseError = require('../utils/statusResponseError');

async function validateHash(req, res, next) {
    try {
        const { email, password } = req.body,
            { _id, match } = await compareHash({ email, password });
        if (_id) {
            if (match) {
                res.locals.userId = _id.toString();
                return next();
            }
        }
        return next(new StatusResponseError({ statusCode: 401, message: `That's not your password or email` }));
    }
    catch (err) {
        return next(err);
    }
}

async function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const [, token] = authorization.split(' '),
                userId = await compareToken({ token });
            if (userId) {
                res.locals.userId = userId;
                return next();
            }
        }
        return next(new StatusResponseError({ statusCode: 403, message: `You are not who you say you are` }));
    }
    catch (err) {
        return next(err);
    }
}

module.exports = {
    validateHash,
    validateToken
}