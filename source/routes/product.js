const express = require('express')
const Route = express.Router()

const {
    authentication,
    authorization
} = require('../helpers/auth')

const {
    createProduct,
    readProduct,
    updateProduct,
    deleteProduct,
    ignoreFavicon
} = require('../controllers/product')

const {
    uploadImages
} = require('../controllers/upload')

Route
    .post('/product', authentication, authorization, uploadImages, createProduct)
    .get('/product', readProduct, ignoreFavicon)
    .get('/product/:productId', authentication, authorization, readProduct)
    .patch('/product/:productId', authentication, authorization, updateProduct)
    .delete('/product/:productId', authentication, authorization, deleteProduct)

module.exports = Route