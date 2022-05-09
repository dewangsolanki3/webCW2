let express = require('express')
let bcrypt = require('bcryptjs')
let passport = require('passport')
let router = express.Router()
let jwt = require('jsonwebtoken')
let User = require('../models/Users.js')
let keys = require('../keys/keys.js')




router.get('/connect', (request, response) => {
    User.find({}, (error, result) => {
        if (error) throw error
    })
})



router.get('/test', (request, response) => {
    response.send('user test')
})



router.post('/register', (request, response) => {
    User.findOne({ email: request.body.email })
        .then(dataUser => {
            if (dataUser) {
                errors.email = 'email exists, please try again'
                return response.status(400).json(errors)
            } else {
                let newUser = new User({
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password
                })

                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error
                        newUser.password = hash
                        newUser.save()
                            .then(dataUser => response.json(dataUser))
                            .catch(error => console.log(error))
                    })
                })
            }
        })
})



router.get('/current', passport.authenticate('jwt', { session: false }), (request, response) => {
    response.json({
        id: request.user.id,
        name: request.user.name
    })
})



router.post('/login', (request, response) => {
    let password = request.body.password
    let email = request.body.email
    console.log(request.body)
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'Users not found'
                return response.status(404).json(errors)
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        let payload = { id: user.id, name: user.name, email: user.email }
                        console.log("It matched!")
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 4000 },
                            (err, token) => {
                                response.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                                console.log("Token", token)
                            })

                    } else {
                        errors.password = 'Password incorrect '
                        return res.status(400).json(errors)
                    }
                })
        })
})



module.exports = router