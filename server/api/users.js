const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcryptjs')


const keys = require('../keys/keys')
const User = require('../models/Users')

router.get('/test', (req, res) => {
    res.send('user test')
})

// connection with db test api
router.get('/connect', (req, res) => {
    User.find({}, function (err, result) {
        if (err) throw err;
        console.log(result);
    })
})

//register route
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'User already exist, try with different email'
                return res.status(400).json(errors)
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//login route
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'Users not found'
                return res.status(404).json(errors)
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //user matched 
                        //payload
                        const payload = { id: user.id, name: user.name, email: user.email }

                        //sign Token 
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })

                    } else {
                        errors.password = 'Password incorrect '
                        return res.status(400).json(errors)
                    }
                })
        })
})

//current user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name
    })
})

module.exports = router