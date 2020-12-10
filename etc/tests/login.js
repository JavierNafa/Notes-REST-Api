const app = require('../../app'),
    request = require('supertest')(app);

module.exports = () => describe('Login test', () => {
    it('Should sign in', async (done) => {
        const res = await request.post('/login/')
            .send({
                email: 'test@test.com',
                password: 'test5678'
            });
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text).success).toBeTruthy();
        global.token = JSON.parse(res.text).data;
        done();
    });

    it('Should fain login by password', async (done) => {
        const res = await request.post('/login/')
            .send({
                email: 'test@test.com',
                password: 'fail'
            });
        expect(res.status).toBe(401);
        expect(JSON.parse(res.text).success).toBeFalsy();
        done();
    });

    it('Should fain login by email', async (done) => {
        const res = await request.post('/login/')
            .send({
                email: 'fail@fail.com',
                password: 'test5678'
            });
        expect(res.status).toBe(401);
        expect(JSON.parse(res.text).success).toBeFalsy();
        done();
    });

});