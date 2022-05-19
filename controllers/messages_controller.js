const express = require('express')

const router = express.Router()

const db = require('../models');
const { populate } = require('../models/Message');

 router.get('/:id', (req, res) => {
    db.User
    .findOne({_id: req.params.id })
    .populate({
        path: 'messages',
        populate: {
            path: 'recipient'
        }
    })
    .populate({
        path: 'messages',
        populate: {
            path: 'sender',
        }
    })
    .then(user => {
       res.json(user.messages); 
    })
    .catch(err => res.status(400).json(err))
})

 router.post('/:id/new', async (req, res) => {
    try {
        const sender = await db.User.findOne({username: req.body.sender}).populate('messages')
        const recipient = await db.User.findOne({username: req.body.recipient}).populate('messages');
        const senderPastMessages = sender.messages
        const recipientPastMessages = recipient.messages
        req.body.sender = sender._id
        req.body.recipient = recipient._id;
        const newMessage = await db.Message.create(req.body);
        console.log(sender)
        await db.User.findByIdAndUpdate(sender._id, {messages: [...senderPastMessages, newMessage._id]})
        await db.User.findByIdAndUpdate(recipient._id, {messages: [...recipientPastMessages, newMessage._id]})
        res.json({message : 'Success'})
    } catch (error) {
        console.log(error);
        req.error = error;
    }
})


module.exports = router;