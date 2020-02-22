const connection = require('../configs/db')
// const path = require('path')

module.exports = {
    createProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE name_product = ?", data.name_product, (error, result) => {
                if (result.length > 0) {
                    connection.query("UPDATE product SET stock = ? WHERE id = ?", [result[0].stock + parseInt(data.stock), result[0].id], (error, result) => {
                        if (error) reject(new Error(error))
                        resolve(result)
                    })
                } else {
                    connection.query("SELECT * FROM category WHERE id = ?", data.id_category, (error, result) => {
                        if (data.id_category == result[0].id) {
                            connection.query("INSERT INTO product SET ?", data, (error, result) => {
                                if (error) reject(new Error(error))
                                resolve(result)
                            })
                        } else {
                            reject(new Error(error))
                        }
                    })
                }
            })
        })
    },
    readProduct: (data) => {
        const productId = data.productId
        const paginateId = data.paginateId
        const limit = data.limit
        const search = data.search
        const sortBy = data.sortBy
        const orderBy = data.orderBy
        return new Promise((resolve, reject) => {
            if (productId != null) {
                connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id WHERE product.id = ?', productId, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else if (paginateId != null || search != null || sortBy != null) {
                let paginateStart = ((paginateId * limit) - limit)
                connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id WHERE name_product LIKE "%' + search + '%" ORDER BY ' + sortBy + ' ' + orderBy + ' LIMIT ' + paginateStart + ',' + limit, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else {
                connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id', (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            }
        })
    },
    updateProduct: (data, productId) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE product SET ? WHERE id = ?`, [data, productId], (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteProduct: (productId) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM product WHERE id = ?`, productId, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}