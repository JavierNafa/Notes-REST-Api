const moment = require('moment'),
    { ObjectID } = require('mongodb'),
    { insert, count, find, update, remove } = require('../repositories/mongoFunctions'),
    { set } = require('../repositories/redisFunctions'),
    collection = 'note';

async function createNote({ userId, title, content }) {
    try {
        const isDuplicated = await count(collection, { userId, title });
        if (isDuplicated > 0) {
            return { success: false };
        }
        const { insertedId } = await insert(collection, {
            title,
            content,
            creationDate: moment().toDate(),
            modificationDate: moment().toDate(),
            userId
        });
        return { success: true, data: { title, content, _id: insertedId.toString() } };
    }
    catch (err) {
        throw err;
    }
}

async function getNotes({ userId, titles, fromDate, toDate, key }) {
    try {
        const notes = await find(collection, {
            userId,
            title: titles ? {
                $in: JSON.parse(titles)
            } : null,
            creationDate: fromDate ? {
                $gte: moment(fromDate).toDate(),
                $lte: moment(toDate).toDate()
            } : null
        }, { userId: 0 });
        if (notes.length > 0) {
            await set({ key, data: JSON.stringify([...notes]) });
        }
        return notes;
    }
    catch (err) {
        throw err;
    }
}

async function updateNote({ userId, id, title, content }) {
    try {
        const objectId = new ObjectID(id),
            isDuplicated = await count(collection, { userId, title, _id: { $ne: objectId } });
        if (isDuplicated > 0) {
            return { success: false };
        }
        const { lastErrorObject: { updatedExisting: exist } } = await update(collection, {
            userId,
            _id: objectId
        }, {
            title,
            content,
            modificationDate: moment().toDate()
        });
        return { success: exist, data: { title, content } };
    }
    catch (err) {
        throw err;
    }
}

async function removeNote({ userId, id }) {
    try {
        const objectId = new ObjectID(id),
            exist = await count(collection, { userId, _id: objectId });
        if (exist === 0) {
            return { success: false };
        }
        const { deletedCount } = await remove(collection, {
            userId,
            _id: objectId
        });
        if (deletedCount > 0) {
            return { success: true };
        }
        return { success: false }
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createNote,
    getNotes,
    updateNote,
    removeNote
}