const { createUser } = require('../services/user'),
    StatusResponseError = require('../utils/statusResponseError');

async function postUser(req, res, next) {
    try {
        const { name, lastName, email, password } = req.body,
            { success, data } = await createUser({
                name,
                lastName,
                email,
                password
            });
        if (success) {
            return res.status(201).send({ success, data, message: 'OK' });
        }
        return next(new StatusResponseError({ message: `Email already exist, are you trying to hack someone?` }));
    }
    catch (err) {
        return next(err);
    }
}

module.exports = {
    postUser
}