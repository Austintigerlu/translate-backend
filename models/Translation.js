const mongoose = require('mongoose')

const TranslationSchema = new mongoose.Schema({
    original_text: {
        type: String,
        required: true
    },
    translated_text: {
        type: String,
        required: true
    },
    original_language: {
        type: String,
        required: true
    },
    translated_language: {
        type: String,
        required: true
    }
},
    {timestamps: true}
);
const Translation = mongoose.model('Translation', TranslationSchema)
module.exports = Translation;