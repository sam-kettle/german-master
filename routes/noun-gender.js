const express = require('express')
const Noun = require('../models/noun')
const functions = require('./function')
const router = express.Router()


router.get('/', function(req, res) {
    functions.generateNewNoun(Noun).then(r => {
        res.render('noun-gender', {title: 'Noun gender quiz', noun: r.noun, translation: r.translation})
    })
})

router.post('/', (req, res) => {
    Noun.findOne({ noun: req.body.currentnoun }).exec((e, result) => {
        if (result.gender === req.body.userinput) {
            functions.generateNewNoun(Noun).then(r => {
                res.render('noun-gender', {
                    title: 'Noun gender quiz',
                    noun: r.noun,
                    translation: r.translation,
                    answer: 'Correct!'
                })
            })
        } else {
            res.render('noun-gender', {
                title: 'Noun gender quiz',
                noun: req.body.currentnoun,
                translation: req.body.translation,
                answer: 'Incorrect'
            })
        }
    })
})

module.exports = router