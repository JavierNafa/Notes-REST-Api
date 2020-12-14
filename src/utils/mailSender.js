const nodemailer = require('nodemailer'),
    { EMAIL_SERVICE: service, EMAIL_USER: user, EMAIL_PASSWORD: pass } = process.env,
    config = {
        service,
        auth: {
            user,
            pass
        }
    },
    transporter = nodemailer.createTransport(config);

module.exports = async (email) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(email, (err, info) => {
            if (err) {
                reject(err);
            }
            resolve(info);
        });
    });
}