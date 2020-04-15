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
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// routes

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/secret', (req, res) => {
    res.render('secret')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    // handle user sign up
    let username = req.body.username
    let password = req.body.password

    User.register(new User({ username: username}), password, (err, user) => {
        if (err) {
            console.log(err)
            res.render('register')
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret')
            })
        }
    } )
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res) => {
})


app.listen(5000, () => {
    console.log('Server started on port 5000...')
})