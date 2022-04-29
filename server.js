const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

require("dotenv").config();

const users = require('./api/users')
const profile = require('./api/profile')
const posts = require('./api/posts')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//db 
const db = require('./config/keys').mongoURI
mongoose.connect(db).then(() => console.log('MongoDb connected')).catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passport')(passport)

// test route
app.get('/', (req, res) => {
    res.send("hemllo test from server")
})

// routes use
app.use('/api/users', users)
// use profile api
app.use('/api/profile', profile)
// use post api
app.use('/api/posts', posts)

const PORT = 5000

app.listen( PORT, () => console.log(`App running on localhost: ${PORT}`)) 