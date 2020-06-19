const express = require('express')
const Noun = require('../models/noun')
const router = express.Router()

// Route functions
async function generateNewNoun(nounSchema) {
    const count = await nounSchema.countDocuments()
    const random = Math.floor(Math.random() * count)
    return await nounSchema.findOne().skip(random)
}

router.get('/', function(req, res) {
    generateNewNoun(Noun).then(r => {
        res.render('noun-gender', {title: 'Noun gender quiz', noun: r.noun})
    })
})

router.post('/', (req, res) => {
    Noun.findOne({ noun: req.body.currentnoun }).exec((e, result) => {
        if (result.gender === req.body.userinput) {
            generateNewNoun(Noun).then(r => {
                res.render('noun-gender', {
                    title: 'Noun gender quiz',
                    noun: r.noun,
                    answer: 'Correct!'
                })
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