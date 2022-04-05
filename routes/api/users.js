const express = require('express')
const router = express.Router()
const passport = require('passport')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//validation users input
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const keys = require('../../config/keys')

const User = require('../../models/Users')
const Users = require('../../models/Users')


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

    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }


    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email aldredy exists'
                return res.status(400).json(errors)
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'robohash'
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
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

    // sgMail.setApiKey('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')
    // const email = req.body.email
    // const message = {
    //     to: email,
    //     from: 'vaishnavbharadwaj22@gmail.com',
    //     subject: 'Hello from GetConnect',
    //     text: 'Hello from GetConnect',
    //     html: '<h1>Thank you!</h1> for getting connected with us!!'
    // }

    // sgMail.send(message).then(response => console.log('Email sent!')).catch(error => console.log(error.message))
})

//login route
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }


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
                        const payload = { id: user.id, name: user.name, email: user.email, avatar: user.avatar }

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