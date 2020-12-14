const { insert, count, find } = require('../repositories/mongoFunctions'),
    { hashPassword } = require('../utils/hashGenerator'),
    sendMail = require('../utils/mailSender'),
    { getTemplate } = require('../utils/templateReader'),
    path = require('path'),
    collection = 'user',
    attachments = [{
        filename: 'nodemailer.png',
        path: `${path.resolve(__dirname, '../static/images/nodemailer.png')}`,
        cid: 'nodemailer'
    }],
    { EMAIL_USER: emailUser } = process.env;

async function createUser({ name, lastName, email, password }) {
    try {
        const isDuplicated = await count(collection, { email });
        if (isDuplicated === 1) {
            return { success: false };
        }
        const hash = await hashPassword({ password });
        await insert(collection, {
            name,
            lastName,
            email,
            hash
        });
        const template = await getTemplate('register', {
            name
        });
        await sendMail({
            from: emailUser,
            to: email,
            subject: 'Register Test',
            html: template,
            attachments
        });
        return { success: true, data: { name, lastName, email } };
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createUser
}