const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Initialise app
const app = express()
const port = 3000

// Load models
const Noun = require('./models/noun')

// Mongoose set-up
mongoose.connect('mongodb://localhost/germanmasterdb', {useNewUrlParser: true, useUnifiedTopology: true} )
let db = mongoose.connection

// Check for database errors or open connection
db.on('error', (e) => console.log(e))
db.once('open', () => console.log('Connected to mongoDB'))

// Set view engine
app.set('views', )
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// body-parser config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set static folder
app.use(express.static(path.join(__dirname, 'static')))

// Routing
app.get('/', (req, res) => res.render('index', { title: 'Home' } )
)

app.get('/noun-gender', function(req, res) {
    Noun.countDocuments().exec((err, count) => {
        const random = Math.floor(Math.random() * count)
        Noun.findOne().skip(random).exec((e, nouns) => {
            res.render('noun-gender', {title: 'Noun gender quiz', noun: nouns.noun})
        })
    })
})

app.post('/noun-gender', (req, res) => {
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

// Run server
app.listen(port, () => console.log(`Server is running on port: ${port}`))