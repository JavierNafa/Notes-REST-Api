const router = require('express').Router(),
    { postNote, getNote, putNote, deleteNote } = require('../controllers/note'),
    { schemaValidator, cache } = require('../middlewares/index');

router.post('/', schemaValidator, postNote);
router.get('/', schemaValidator, cache, getNote);
router.put('/:id', schemaValidator, putNote);
router.delete('/:id', schemaValidator, deleteNote);

module.exports = router;