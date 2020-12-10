const router = require('express').Router(),
    { postLogin } = require('../controllers/login'),
    { schemaValidator } = require('../middlewares/index');

router.post('/', schemaValidator, postLogin);

module.exports = router;