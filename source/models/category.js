const connection = require('../configs/db')

module.exports = {
    createCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE category AUTO_INCREMENT=0')
            connection.query(`INSERT INTO category SET ?`, data)
            connection.query('SELECT * FROM category', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    readCategory: (data) => {
        const categoryName = data.categoryName
        return new Promise((resolve, reject) => {
            if (categoryName != null) {
                connection.query('SELECT * FROM category WHERE name_category like "%' + categoryName + '%"', (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else {
                connection.query(`SELECT * FROM category`, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            }
        })
    },
    updateCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE category SET ? WHERE id = ?', [data, data.id])
            connection.query('SELECT * FROM category', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM category WHERE id = ?`, data)
            connection.query('ALTER TABLE category DROP id') // product.id
            connection.query('ALTER TABLE category ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST') //
            connection.query('SELECT * FROM category', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}