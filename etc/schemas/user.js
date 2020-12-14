const newUser = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' }
    }
}

module.exports = {
    newUser
}