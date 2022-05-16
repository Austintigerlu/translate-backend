const express = require('express')

const router = express.Router()

const db = require('../models');


 router.get('/', async (req, res) => {
    try {
        res.json(await db.User.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})
 router.get('/:username', async (req, res) =>{
    try{
        res.json(await db.User.findOne({username: req.params.username}))
    }
    catch{
        res.status(400).json(error);
    }
})
 router.get('/:email', async (req, res) =>{
    try{
        res.json(await db.User.findOne({username: req.params.email}))
    }
    catch{
        res.status(400).json(error);
    }
})
 router.post('/new', async (req, res) => {
    try {
        const newUser = await db.User.create(req.body)
    } catch (error) {
        res.status(400).json(error);
    }
})
 router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await db.User.findByIdAndDelete(req.params.id);
    } 
    catch (error) {
        res.status(400).json(error);
    }
})
router.put('/:id', async (req, res)=>{
    try{
        const updatedUser = await db.User.findByIdAndUpdate(req.params.id, req.body);
    }
    catch(error){
        res.status(400).json(error);
    }
})
module.exports = router;