const fs = require('fs').promises,
    path = require('path'),
    handlebars = require('handlebars');

async function getTemplate(templateName, data = {}) {
    try {
        const html = await fs.readFile(`${path.resolve(__dirname, `../static/templates/${templateName}.html`)}`, { encoding: 'utf-8' }),
            template = handlebars.compile(html),
            result = template(data);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}

module.exports = {
    getTemplate
}