const { login } = require('../services/login');

async function postLogin(req, res, next) {
    try {
        const { userId } = res.locals,
            token = await login({ userId });
        return res.status(200).send({ success: true, data: token, message: 'OK' });
    }
    catch (err) {
        return next(err);
    }
}

module.exports = {
    postLogin
}