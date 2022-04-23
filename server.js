const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

require("dotenv").config();

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//database connection
const db = require('./config/keys').mongoURI
mongoose.connect(db).then(() => console.log('MongoDb connected')).catch(err => console.log(err))

// passport configuration (user auth)
app.use(passport.initialize())
require('./config/passport')(passport)

// test route
app.get('/', (req, res) => {
    res.send("hemllo test from server")
})

// routes use
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const PORT = 5000

app.listen( PORT, () => console.log(`App running on localhost: ${PORT}`))