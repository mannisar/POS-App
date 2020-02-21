const connection = require('../configs/db')

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE email = ?', email, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    checkName: (name) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE name = ?', name, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}