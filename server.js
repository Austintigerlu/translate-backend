require('./config/db.connection.js');
const express = require('express')
const app = express()
require('dotenv').config();
const db = require('./models')
const {PORT = 4000} = process.env

app.get('/', (req, res)=>{
    res.send('helloworld');
})
app.get('/useme', async (req, res) => {
    try {
        res.send('why')
    } catch (error) {
        console.log(error);
        req.error = error;
    }
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
        const messages = await db.User.findById(req.params.id).messages;
        console.log(messages);
        res.json(messages);
    } catch (error) {
        res.status(400).json(error);
    }
})
app.get('/translations/:id', async (req, res) => {
    try {
        const translations = await db.User.findById(req.params.id).translations;
        console.log(translations);
        res.json(translations);
    } catch (error) {
        res.status(400).json(error);
    }
})
app.listen(PORT, ()=>console.log("You're listening on port " + PORT))