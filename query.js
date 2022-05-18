require('./config/db.connection.js');
require('dotenv').config();
const db = require('./models')

db.User.findOne({username: 'scarknight'},
    (error, allUsers) => {
        if(!error){
            console.log(allUsers);
        }
    } 
)
