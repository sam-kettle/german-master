const mongoose = require('mongoose')

// Noun schema
let nounSchema = mongoose.Schema({
    gender: {
        type: String,
        required: true
    },
    noun: {
        type: String,
        required: true
    },
    translation: {
        type: String,
        required: true
    },
})

let Noun = module.exports = mongoose.model('Noun', nounSchema)