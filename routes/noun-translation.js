const express = require('express')
const Noun = require('../models/noun')
const functions = require('./function')
const { generateNewNoun } = require('./function')
const router = express.Router()


router.get('/', function(req, res) {
    res.render('noun-translation', {title: 'Noun translation quiz', noun: 'Select Mode'})
})

router.post('/', (req, res) => {

    if (req.body.mode === 'english-to-german') {
        generateNewNoun(Noun).then(r => {
            res.render('noun-translation', {title: 'Noun translation quiz', noun: r.translation})
        })        
    } else if (req.body.mode === 'german-to-english') {
        generateNewNoun(Noun).then(r => {
            res.render('noun-translation', {title: 'Noun translation quiz', noun: r.noun})
        })    
    } else {
        res.render('noun-translation', {title: 'Noun translation quiz', noun: 'Select Mode'})
    }
})

module.exports = router
