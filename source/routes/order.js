const express = require('express')
const Route = express.Router()

const {
    orderProduct
} = require('../controllers/order')

Route
    .post('/order', orderProduct)

module.exports = Route