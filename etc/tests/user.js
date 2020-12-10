const app = require('../../app'),
    request = require('supertest')(app),
    { userSchema: { newUser } } = require('../schemas/index');

module.exports = () => describe('Create a new user', () => {
    it('Should create a new user', async (done) => {
        const res = await request.post('/user')
            .send({
                name: 'test',
                lastName: 'test',
                email: 'test@test.com',
                password: 'test5678'
            });
        expect(res.status).toBe(201);
        expect(JSON.parse(res.text).data).toMatchSchema(newUser);
        done();
    });

    it('Should fail because already exist', async (done) => {
        const res = await request.post('/user')
            .send({
                name: 'test',
                lastName: 'test',
                email: 'test@test.com',
                password: 'test5678'
            });
        expect(res.status).toBe(400);
        expect(JSON.parse(res.text).success).toBeFalsy();
        done();
    });
});