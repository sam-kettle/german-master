const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Load route modules
const nounGenderRouter = require('./routes/noun-gender')
const nounTranslationRouter = require('./routes/noun-translation')

// Initialise app
const app = express()
const port = 3000

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

// Routes
app.use('/noun-gender', nounGenderRouter)
app.use('/noun-translation', nounTranslationRouter)

app.get('/', (req, res) => res.render('index', { title: 'Home' } )
)

// Run server
app.listen(port, () => console.log(`Server is running on port: ${port}`))