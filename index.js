const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user.route')

const port = 3000

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Nguyen Anh Khoa'
    })
})

app.use('/users', userRoute)

app.get('/nak', (req, res) => {
    res.send('This is Nguyen Anh Khoa')
})

// Listening at port
app.listen(port, function (req, res) {
    console.log('Server listening at localhost:' + port)
})
