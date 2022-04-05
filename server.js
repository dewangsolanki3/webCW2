const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

require("dotenv").config();

const users = require('./routes/api/users')

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

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))

//     app.get('*', (req,res)=> {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

//PORT in env file
const PORT = process.env.PORT || 8080

app.listen( PORT, () => console.log(`App running on localhost: ${PORT}`))