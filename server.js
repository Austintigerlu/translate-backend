const express = require('express')
const app = express()
require('dotenv').config();
const {PORT = 4000} = process.env

app.get('/', (req, res)=>{
    res.send('helloworld');
})
app.listen(PORT, ()=>console.log("You're listening on port " + PORT))