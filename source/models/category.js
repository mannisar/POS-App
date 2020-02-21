const connection = require('../configs/db')

module.exports = {
    createCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO category SET ?`, data, (error, result) => {
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
            connection.query(`UPDATE category SET ? WHERE id = ?`, data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteCategory: (categoryId) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM category WHERE id = ?`, categoryId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}