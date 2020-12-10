const router = require('express').Router(),
    { postUser } = require('../controllers/user'),
    { schemaValidator } = require('../middlewares/index');

router.post('/', schemaValidator, postUser);

module.exports = router;