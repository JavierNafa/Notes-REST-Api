const login = require('./login'),
    createUser = require('./user'),
    { createNote, getNote, updateNote, deleteNote } = require('./note');

describe('Run all tests', () => {
    createUser();
    login();
    createNote();
    getNote();
    updateNote();
    deleteNote();
});