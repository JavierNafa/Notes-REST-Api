const newOrExisting = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        content: { type: 'string' }
    }
}

const allNotes = {
    type: 'array',
    items: {
        ...newOrExisting
    }
}

module.exports = {
    newOrExisting,
    allNotes
}