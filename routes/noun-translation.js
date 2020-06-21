const express = require('express')
const Noun = require('../models/noun')
const router = express.Router()

router.get('/', (req, res) => {
    generateNewNoun()
    res.render('noun-translation')
})

module.exports = router
