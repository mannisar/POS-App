const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    readOrder,
    orderProduct
} = require('../controllers/order')

Route
    .post('/order', orderProduct)
    .get('/history', readOrder)

module.exports = Route