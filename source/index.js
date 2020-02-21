const express = require('express')
const Route = express.Router()

const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')

Route
    .use('/api/', productRouter)
    .use('/api/upload', express.static('./upload'))
    .use('/api/', categoryRouter)
    .use('/api/', orderRouter)
    .use('/api/user/', userRouter)

module.exports = Route