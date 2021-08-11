require('dotenv').config()

const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const authMiddleware = require('./middlewares/auth.middleware')
const productRoute = require('./routes/product.route')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Nguyen Anh Khoa'
    })
})

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth',
    (req, res, next) => {
        res.locals.user = { avatar: 'images/logo.jpg', name: 'No Name' }
        next()
    }, 
    authRoute)
app.use('/products', productRoute)

// Listening at port
app.listen(port, function (req, res) {
    console.log('Server listening at localhost:' + port)
})
