const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

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

// Set static folder
app.use(express.static(path.join(__dirname, 'static')))

function generate_noun(noun) {
    const count = noun.countDocuments()
    const random = Math.floor(Math.random() * count)
    return new Promise((resolve, reject) => {
        noun.findOne().skip(random).then((result) => { resolve (result) })
    })
}

// Routing
app.get('/', (req, res) => res.render('index', { title: 'Home' } )
)

app.get('/noun-gender', function(req, res) {
    // let nounToDisplay = generate_noun(Noun).then((result) => { return (result.noun) })
    res.render('noun-gender', { title: 'Noun gender quiz', noun: nounToDisplay })
})

// Run server
app.listen(port, () => console.log(`Server is running on port: ${port}`))