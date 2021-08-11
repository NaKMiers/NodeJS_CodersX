require('dotenv').config()

const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/nodejs_codersx', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('connect successfully')
    } catch(error) {
        console.log('connect failure')
    }
}
connect()

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')
const transferRoute = require('./routes/transfer.route')

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware)
app.use(csurf({ cookie: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Nguyen Anh Khoa',
    })
})

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)
app.use('/transfer', authMiddleware.requireAuth, transferRoute)

// Listening at port
app.listen(port, function (req, res) {
    console.log('Server listening at localhost:' + port)
})
