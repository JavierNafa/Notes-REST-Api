const router = require('express').Router(),
    { postLogin } = require('../controllers/login'),
    { schemaValidator, auth: { validateHash } } = require('../middlewares/index');

router.post('/', schemaValidator, validateHash, postLogin);

module.exports = router;