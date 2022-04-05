const express = require('express')
require("dotenv").config()
const mongoose = require('mongoose')

let MONGODB_URI = "mongodb+srv://dewangsolanki3:Cluster@123@cluster0-n0bdv.mongodb.net/devconnect?retryWrites=true&w=majority"

// Mongoose connection
// mongoose.connect( MONGODB_URI || 'mongodb://localhost:27017/React-Galaxy', { useNewUrlParser: true , useUnifiedTopology: true } , error => {
//     error ? console.log("=======Oops Dewang=======" , error) : console.log("======Dewang MongoDB Successful======")  
// })


// mongoose.connect(MONGODB_URI).then(() => console.log('MongoDb connected')).catch(err => console.log(err))



const app = express()

app.get('/', (req, res) => {
    res.send("hemllo")
})


const PORT = process.env.PORT || 8080

app.listen( PORT, () => console.log(`App running on localhost: ${PORT}`))

