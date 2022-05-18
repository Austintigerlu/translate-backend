const express = require('express')

const router = express.Router()

const db = require('../models');

 router.get('/:id', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id).populate('translations');
        console.log(user)
        const translations = user.translations;
        res.json(translations);
    } catch (error) {
        res.status(400).json(error);
    }
})
 router.post('/:id/new', async (req, res) => {
    try {
        // console.log(req.body);
        const newTranslation = await db.Translation.create(req.body);
        let pastTranslation = await db.User.findById(req.params.id).translations
        if(!pastTranslation)
            pastTranslation = []
        const user = await db.User.findByIdAndUpdate(req.params.id, {translations: [...pastTranslation, newTranslation._id]});
        res.json({message: 'Success'})
    } catch (error) {
        res.json({message: 'Failed', err : error})
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const deletedTranslation = db.User.findByIdAndDelete(req.params.id);
        res.json({message: 'Success'})
    }
    catch(error){
        res.status(400).json(error);
    }
})
module.exports = router;