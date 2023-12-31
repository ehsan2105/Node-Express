const express = require('express')
const path = require('path')
const notFound = require('./middlewares/not-fund')
const csrf = require('csurf')
const cartMidelleware = require('./middlewares/cart')
const errorHandlerMiddleware = require('./middlewares/erroe.handler')
const db = require('./data/database')
const authRouter = require('./routes/auth.routes')
const addCsrfTokenMiddleware = require('./middlewares/csrf.token')
const expressSession = require('express-session')
const checkAuthSaratusMiddeleware = require('./middlewares/check.auth')
const createSessionConfig = require('./config/session')
const protectRoutesMiddleware = require('./middlewares/protect-routes')
const productsRouters = require('./routes/products.routes')
const baseRouters = require('./routes/base.routes')
const adminRoutes = require('./routes/admin.routes')
const cartRoutes = require('./routes/cart.routes')
const orderRoutes = require('./routes/order.route')
const uppdatecartPriceMiddelwer = require('./middlewares/update-cart-price')
const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use('/products/assets',express.static('product-data'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const sessionConfig = createSessionConfig()

app.use(expressSession(sessionConfig))
app.use(csrf())
app.use(cartMidelleware)
app.use(uppdatecartPriceMiddelwer)
app.use(addCsrfTokenMiddleware)
app.use(checkAuthSaratusMiddeleware)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(baseRouters)
app.use(authRouter)
app.use(productsRouters)
app.use('/cart',cartRoutes)
app.use(notFound)
app.use(protectRoutesMiddleware)
app.use('/orders',orderRoutes)
app.use('/admin',adminRoutes)
app.use(errorHandlerMiddleware)



db.connectToDatabase().then(function () {
    app.listen(3000)
})
.catch(function (error) {
    console.log('db error')
    console.log(error)
})
