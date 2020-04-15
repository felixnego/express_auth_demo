const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')

const app = express()

mongoose.connect('mongodb://localhost/express_auth_demo')

app.use(require('express-session')({
    secret: 'Nobody expected the Spanish Inquisition',
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/secret', (req, res) => {
    res.render('secret')
})

app.listen(5000, () => {
    console.log('Server started on port 5000...')
})