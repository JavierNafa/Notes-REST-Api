const { getData } = require('../services/cache');

module.exports = async (req, res, next) => {
    try {
        const pattern = req.baseUrl.replace('/', ''),
            url = req.url,
            key = `${pattern}__${url}`,
            result = await getData(key);
        if (result) {
            return res.status(200).send({ success: true, data: result, message: 'OK' });
        }
        res.locals.key = key;
        return next();
    }
    catch (err) {
        return next(err);
    }
}