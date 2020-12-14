const app = require('../../app'),
    request = require('supertest')(app),
    moment = require('moment'),
    { noteSchema: { allNotes, newOrExisting } } = require('../schemas/index');

let noteId = null;

function createNote() {
    describe('Create a new note', () => {
        it('Should create a new note', async (done) => {
            const res = await request.post('/note/')
                .send({
                    title: 'test',
                    content: 'this is a content test'
                })
                .set('authorization', `bearer ${global.token}`);
            const { data } = JSON.parse(res.text);
            expect(res.status).toBe(201);
            expect(data).toMatchSchema(newOrExisting);
            noteId = data._id;
            done();
        });

        it('Should fail creating a new note', async (done) => {
            const res = await request.post('/note/')
                .send({
                    title: 'test',
                    content: 'this is a content test'
                })
                .set('authorization', `bearer ${global.token}`);
            expect(res.status).toBe(400);
            expect(JSON.parse(res.text).success).toBeFalsy();
            done();
        });
    });
}

function getNote() {
    describe('Get notes', () => {
        it('Should get notes', async (done) => {
            const res = await request.get('/note/')
                .query({
                    fromDate: moment().subtract(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                    toDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    titles: JSON.stringify(["test"]),
                    page: 0,
                    limit: 10
                })
                .set('authorization', `bearer ${global.token}`);
            expect(res.status).toBe(200);
            expect(JSON.parse(res.text).data).toMatchSchema(allNotes);
            done();
        });

        it('Should fail geting notes', async (done) => {
            const res = await request.get('/note/')
                .query({
                    fromDate: moment().subtract(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                    toDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    titles: JSON.stringify(["test"]),
                    page: 0,
                    limit: 10
                });
            expect(res.status).toBe(403);
            expect(JSON.parse(res.text).success).toBeFalsy();
            done();
        });
    });
}

function updateNote() {
    describe('Update a note', () => {
        it('Should update a note', async (done) => {
            const res = await request.put(`/note/${noteId}`)
                .send({
                    title: 'testUpdate',
                    content: 'this is an update test'
                })
                .set('authorization', `bearer ${global.token}`);
            expect(res.status).toBe(200);
            expect(JSON.parse(res.text).data).toMatchSchema(newOrExisting);
            done();
        });

        it('Should fail updating a note', async (done) => {
            const res = await request.put(`/note/5fcad7e9b5f7221ea46561b6`)
                .send({
                    title: 'testUpdate',
                    content: 'this is an update test'
                })
                .set('authorization', `bearer ${global.token}`);
            expect(res.status).toBe(400);
            expect(JSON.parse(res.text).success).toBeFalsy();
            done();
        });
    });
}

function deleteNote() {
    describe('Delete a note', () => {
        it('Should delete a note', async (done) => {
            const res = await request.delete(`/note/${noteId}`)
                .set('authorization', `bearer ${global.token}`);
            expect(res.status).toBe(200);
            expect(JSON.parse(res.text).success).toBeTruthy();
            done();
        });

        it('Should fail deleting a note', async (done) => {
            const res = await request.delete(`/note/5fcad7e9b5f7221ea46561b6`)
                .set('authorization', `bearer ${global.token}`);
            expect(res.status).toBe(400);
            expect(JSON.parse(res.text).success).toBeFalsy();
            done();
        });
    });
}

module.exports = {
    createNote,
    getNote,
    updateNote,
    deleteNote
}