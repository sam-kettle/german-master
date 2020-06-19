const express = require('express')
const Noun = require('../models/noun')
const router = express.Router()

router.get('/', function(req, res) {
    Noun.countDocuments().exec((err, count) => {
        const random = Math.floor(Math.random() * count)
        Noun.findOne().skip(random).exec((e, nouns) => {
            res.render('noun-gender', {title: 'Noun gender quiz', noun: nouns.noun})
        })
    })
})

router.post('/', (req, res) => {
    Noun.findOne({ noun: req.body.currentnoun }).exec((e, result) => {
        if (result.gender === req.body.userinput) {
            res.render('noun-gender', {
                title: 'Noun gender quiz',
                noun: req.body.currentnoun,
                answer: 'Correct!'
            })
        } else {
            res.render('noun-gender', {
                title: 'Noun gender quiz',
                noun: req.body.currentnoun,
                answer: 'Incorrect'
            })
        }
    })
})

module.exports = router