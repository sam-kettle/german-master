const express = require('express')
const Noun = require('../models/noun')
const functions = require('./function')
const router = express.Router()

router.get('/', (req, res) => {
    functions.generateNewNoun(Noun).then(r => {
        res.render('noun-translation', {
            title: 'Noun translation quiz',
            noun: r.noun
        })
    })
})

router.post('/', (req, res) => {
    Noun.findOne({ noun: req.body.currentnoun }).exec((e, result) => {
        if (result.translation === req.body.userinput) {
            functions.generateNewNoun(Noun).then(r => {
                res.render('noun-translation', {
                    title: 'Noun translation quiz',
                    noun: r.noun,
                    answer: 'Correct!'
                })
            })
        } else {
            res.render('noun-translation', {
                title: 'Noun translation quiz',
                noun: req.body.currentnoun,
                answer: 'Incorrect'
            })
        }
    })
})

module.exports = router
