const connection = require('../configs/db')

module.exports = {
    createUser: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE user AUTO_INCREMENT=0') // dri 0
            connection.query('INSERT INTO user SET ?', data)
            connection.query('SELECT * FROM user', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    readUser: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateUser: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE user SET ? WHERE id = ?', [data, data.id])
            connection.query('SELECT * FROM user', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteUser: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM user WHERE id = ?`, data)
            connection.query('ALTER TABLE user DROP id')
            connection.query('ALTER TABLE user ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
            connection.query('SELECT * FROM user', (error, result) => {
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