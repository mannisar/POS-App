const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory,
    ignoreFavicon
} = require('../controllers/category')

Route
    .post('/category', createCategory)
    .get('/category', readCategory, ignoreFavicon)
    .get('/category/:categoryName', readCategory)
    .patch('/category/:categoryId', updateCategory)
    .delete('/category/:categoryId', deleteCategory)

module.exports = Route