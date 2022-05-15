const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    recipient: mongoose.Types.ObjectId,
    sender: mongoose.Types.ObjectId,
    content: String 
},
    {timestamps: true}
);
const Message = mongoose.model('Message', MessageSchema)
module.exports = Message;