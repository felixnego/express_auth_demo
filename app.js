const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/express_auth_demo')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/secret', (req, res) => {
    res.render('secret')
})

app.listen(5000, () => {
    console.log('Server started on port 5000...')
})