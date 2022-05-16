const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models');
const { User } = require('../models');


 router.get('/', async (req, res) => {
    try {
        res.json(await db.User.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

 router.post('/register', async (req, res) => {
    const user = req.body;
    const takenUsername = await User.findOne({username: user.username});
    const takenEmail = await User.findOne({email: user.email})

    if (takenUsername || takenEmail){
        res.json({message: "Username or email has already been taken"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 12);

        const dbUser = new User ({
            name: user.name,
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password,
            profilePic: user.profilePic,
        })
        dbUser.save();
        res.json({message: "Success"})
    }
})

router.post("/login", (req,res) => {
    const userLogin = req.body;

    User.findOne({username: userLogin.username})
    .then(dbUser => {
        if(!dbUser) {
            return res.json({
                message: "Invalid Username or Password"
            })
        }
        bcrypt.compare(userLogin.password, dbUser.password)
        .then(isCorrect => { 
            if(isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username,
                }
                jwt.sign(
                    payload,
                    "secret",
                    {expiresIn: 1000 * 60 * 60 * 24},
                    (err, token) => {
                        if(err) return res.json({message: err})
                        return res.json({
                            message: "Success",
                            token: token,
                        })
                    }
                )
            } else {
                return res.json({
                    message: "Invalid Username or Passowrd"
                })
            }

        })
    })
})

function verifyJWT(req,res,next){
    const token = req.headers["access-token"]

    if(token) {
        jwt.verify(token, "secret", (err,decoded) => {
            if(err) return res.json({
                isLoggedIn: false,
                message: "Failed to Login"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username =decoded.username
            next()
        })
    } else {
        res.json({message: "Incorrect Token", isLoggedIn: false})
    }
}

router.get("/username", verifyJWT, (req,res) => {
    res.json({isLoggedIn: true, username: req.user.username})
})

//  router.delete('/:id', async (req, res) => {
//     try {
//         const deletedUser = await db.User.findByIdAndDelete(req.params.id);
//     } 
//     catch (error) {
//         res.status(400).json(error);
//     }
// })
// router.put('/:id', async (req, res)=>{
//     try{
//         const updatedUser = await db.User.findByIdAndUpdate(req.params.id, req.body);
//     }
//     catch(error){
//         res.status(400).json(error);
//     }
// })
module.exports = router;