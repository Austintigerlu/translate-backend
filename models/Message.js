const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    sender:{ 
        type: mongoose.Types.ObjectId,
        ref : 'User'
    },
    content: String
},
    {timestamps: true}
);
const Message = mongoose.model('Message', MessageSchema)
module.exports = Message;