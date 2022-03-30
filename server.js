const express = require('express')
const bodyParser = require('body-parser')
require("dotenv").config();

const users = require('./routes/api/users')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("hemllo")
})

// routes use
app.use('/api/users', users)

//PORT in env file
const PORT = process.env.PORT || 8080

app.listen( PORT, () => console.log(`App running on localhost: ${PORT}`))