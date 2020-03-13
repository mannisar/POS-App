const express = require('express')
const Route = express.Router()

const {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/user')

Route
    .post('/user', createUser)
    .get('/user', readUser)
    .patch('/user/:userId', updateUser)
    .delete('/user/:userId', deleteUser)
    .post('/user/login', login)

module.exports = Route