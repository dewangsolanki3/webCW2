const express = require('express')
const router = express.Router()

const User = require('../../models/Users')

router.get('/test', (req, res) => {
    res.send('user test')
})

module.exports = router