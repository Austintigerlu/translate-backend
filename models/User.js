const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: String,
    messages : [{
        type: mongoose.Types.ObjectId,
        default: []
    }],
    translations : [mongoose.Types.ObjectId]
},
    {
        timestamps: true
    }
);
const User = mongoose.model('User', UserSchema)
module.exports = User;