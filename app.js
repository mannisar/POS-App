const express = require('express')
const app = express();
const cors = require('cors')
const time = require('morgan')
const Body = require('body-parser')

const callRoute = require('./source/index')
const {
    port
} = require('./source/configs/mysql')

// app.use('/', callRoute, function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*")
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })

const whitelist = ['http://example1.com', 'http://example2.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(Body.urlencoded({
    extended: false
}))
app.use(Body.json())
app.use(time('dev'))
app.use('/', cors(), callRoute)
// app.options(cors(corsOptions)) <= For Others Domain
app.listen(port, () => console.log(`This Server Running On ${port}!`))