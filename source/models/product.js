const connection = require('../configs/db')

module.exports = {
    countProduct: (product, category) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT COUNT(*) AS totalData FROM product LEFT JOIN category ON product.id_category = category.id WHERE product.name_product LIKE "%' + product + '%" AND category.name_category LIKE "%' + category + '%"', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result[0].totalData)
            })
        })
    },
    createProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE product AUTO_INCREMENT=0')
            connection.query("SELECT * FROM product WHERE name_product = ?", data.name_product, (error, result) => {
                if (result.length > 0) {
                    connection.query("UPDATE product SET stock = ? WHERE id = ?", [result[0].stock + parseInt(data.stock), result[0].id], (error, result) => {
                        if (error) reject(new Error(error))
                        resolve(result)
                    })
                } else {
                    connection.query("SELECT * FROM category WHERE id = ?", data.id_category, (error, result) => {
                        if (data.id_category == result[0].id) {
                            connection.query("INSERT INTO product SET ?", data)
                            connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id', (error, result) => {
                                if (error) reject(new Error(error))
                                resolve(result)
                            })
                        } else {
                            reject(new Error(error))
                        }
                    })
                }
                if (error) reject(new Error(error))
            })
        })
    },
    readProduct: (product, category, data) => {
        const productId = data.productId
        const paginateId = data.paginateId
        const limit = data.limit
        const sortBy = data.sortBy
        const orderBy = data.orderBy
        return new Promise((resolve, reject) => {
            if (productId != null) {
                connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id WHERE product.id = ?', productId, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else if (product != null || category != null || paginateId != null || limit != null || sortBy != null || orderBy != null) {
                let paginateStart = ((paginateId * limit) - limit)
                connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id WHERE product.name_product LIKE "%' + product + '%" AND category.name_category LIKE "%' + category + '%" ORDER BY ' + sortBy + ' ' + orderBy + ' LIMIT ' + paginateStart + ',' + limit, (error, result) => {
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
    updateProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE product SET ? WHERE id = ?`, [data, data.id])
            connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM product WHERE id = ?`, data.productId)
            connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id', (error, result) => {
                if (error) reject(new Error(error))
                connection.query('ALTER TABLE product DROP id') // product.id
                connection.query('ALTER TABLE product ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST') //
                resolve(result)
            })
        })
    },
}