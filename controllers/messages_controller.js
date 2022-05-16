const express = require('express')

const router = express.Router()

const db = require('../models');

 router.get('/:id', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id).populate('messages');
        const messages = user.messages;
        console.log(messages);
        res.json(messages);
    } catch (error) {
        res.status(400).json(error);
    }
})

 router.post('/:id/new', async (req, res) => {
    try {
        const newMessage = await db.Message.create(req.body);
        const pastMessages = db.User.findById(req.params.id).messages
        const user = await db.User.findByIdAndUpdate(req.params.id, {messages: [...pastMessages, newMessage._id]});
    } catch (error) {
        console.log(error);
        req.error = error;
    }
})


module.exports = router;