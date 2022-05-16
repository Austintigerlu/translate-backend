require('./config/db.connection.js');
require('dotenv').config();
const express = require('express')
const app = express()
const db = require('./models')
const {PORT = 4000} = process.env
const cors = require('cors');
const morgan = require('morgan');

app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res)=>{
    res.send('helloworld');
})

app.get('/users', async (req, res) => {
    try {
        res.json(await db.User.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})
app.get('/messages/:id', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id).populate('messages');
        const messages = user.messages;
        console.log(messages);
        res.json(messages);
    } catch (error) {
        res.status(400).json(error);
    }
})
app.get('/translations/:id', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id).populate('translations');
        console.log(user)
        const translations = user.translations;
        res.json(translations);
    } catch (error) {
        res.status(400).json(error);
    }
})
app.post('/user/new', async (req, res) => {
    try {
        const newUser = await db.User.create(req.body)
    } catch (error) {
        console.log(error);
        req.error = error;
    }
})
app.post('/messages/:id/new', async (req, res) => {
    try {
        const newMessage = await db.Message.create(req.body);
        const pastMessages = db.User.findById(req.params.id).messages
        const user = await db.User.findByIdAndUpdate(req.params.id, {messages: [...pastMessages, newMessage._id]});
    } catch (error) {
        console.log(error);
        req.error = error;
    }
})
app.post('/translations/:id/new', async (req, res) => {
    try {
        // console.log(req.body);
        const newTranslation = await db.Translation.create(req.body);
        let pastTranslation = await db.User.findById(req.params.id).translations
        if(!pastTranslation)
            pastTranslation = []
        const user = await db.User.findByIdAndUpdate(req.params.id, {translations: [...pastTranslation, newTranslation._id]});
    } catch (error) {
        console.log(error);
        req.error = error;
    }
})
app.listen(PORT, ()=>console.log("You're listening on port " + PORT))