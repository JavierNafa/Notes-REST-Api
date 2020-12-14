class StatusResponseError extends Error {
    constructor({ statusCode = 400, message = '', data = null }) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

module.exports = StatusResponseError;