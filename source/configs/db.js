const {
    database
} = require('./mysql')
const mysql = require('mysql')

const connection = mysql.createConnection(database)

connection.connect((error) => {
    if (error) {
        console.log("Database Failed!")
    } else {
        console.log(`Database Connected!`)
    }
})

module.exports = connection