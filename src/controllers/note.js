const { createNote, getNotes, updateNote, removeNote } = require('../services/note'),
    StatusResponseError = require('../utils/statusResponseError');

async function postNote(req, res, next) {
    try {
        const { title, content } = req.body,
            { userId } = res.locals,
            { success, data } = await createNote({
                userId,
                title,
                content
            });
        if (success) {
            return res.status(201).send({ success, data, message: 'OK' });
        }
        return next(new StatusResponseError({ message: `You have created this note before, remember: ${title}` }));
    }
    catch (err) {
        return next(err);
    }
}

async function getNote(req, res, next) {
    try {
        const { titles, fromDate, toDate, page, limit } = req.query,
            { userId, key } = res.locals,
            notes = await getNotes({
                userId,
                titles,
                fromDate,
                toDate,
                page,
                limit,
                key
            });
        return res.status(200).send({ success: true, data: notes, message: 'OK' });
    }
    catch (err) {
        return next(err);
    }
}

async function putNote(req, res, next) {
    try {
        const { id } = req.params,
            { title, content } = req.body,
            { userId } = res.locals,
            { success, data } = await updateNote({ userId, id, title, content });
        if (success) {
            return res.status(200).send({ success: true, data: data, message: 'OK' });
        }
        return next(new StatusResponseError({
            message: `Check if the title ${title} is not duplicated in another note, if the note exist or if the note id is ok`
        }));
    }
    catch (err) {
        return next(err);
    }
}

async function deleteNote(req, res, next) {
    try {
        const { id } = req.params,
            { userId } = res.locals,
            { success } = await removeNote({ userId, id });
        if (success) {
            return res.status(200).send({ success: true, data: null, message: 'OK' });
        }
        return next(new StatusResponseError({ message: `The note doesn't exist` }));
    }
    catch (err) {
        return next(err);
    }
}

module.exports = {
    postNote,
    getNote,
    putNote,
    deleteNote
}