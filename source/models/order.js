const connection = require('../configs/db')

module.exports = {
    orderProduct: (data, loop) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE id = ?", data.id, (error, result) => {
                if (error) reject(new Error(error))
                if (result.length > 0) { // CHECK ID PRODUCT (STEP 1)
                    // ==========================================
                    // GET STOCK, ID FROM PRODUCT
                    // ==========================================
                    let checkStock = result[0].stock - data.qty
                    let checkProductId = result[0].id
                    // ==========================================
                    if (checkStock >= 0) { // CHECK STOCK PRODUCT (STEP 2)
                        connection.query("UPDATE product SET stock = ? WHERE id = ?", [checkStock, checkProductId]) // REDUCE DATA STOCK PRODUCT (STEP 3)
                        if (loop == 0) { connection.query("INSERT INTO `order` (id, id_user, total) VALUES ('" + data.id_order + "', '" + data.id_user + "', '" + data.total + "')") } // INSERT DATA ID_USER TO ORDER (STEP 4), LOOP HERE!
                        connection.query("INSERT INTO order_detail (id_order, id_product, qty) VALUES ('" + data.id_order + "', '" + data.id + "', '" + data.qty + "')", (error, result) => {
                            if (error) reject(new Error(error))
                            resolve(result)
                        })
                    } else {
                        console.log('Cannot Reduce Stock Product, Below  0 (-1, -2, -3)!')
                        reject(new Error(error))
                    }
                } else {
                    console.log('ID Product Not Found!')
                    reject(new Error(error))
                }
            })
        })
    },
    readOrder: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `order`', (error, result) => {
                // SELECT `order`.*, order_detail.id_product, order_detail.qty FROM `order` INNER JOIN order_detail ON `order`.id = order_detail.id_order
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
}