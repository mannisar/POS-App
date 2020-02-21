const connection = require('../configs/db')
// const path = require('path')

module.exports = {
    orderProduct: (data, loop) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE id = ?", data.id_product, (error, result) => {
                if (result.length > 0) { // CHECK ID PRODUCT (STEP 1)
                    // ==========================================
                    // GET STOCK, PRICE, ID FROM PRODUCT
                    // ==========================================
                    let checkStock = result[0].stock - data.stock
                    let checkPrice = result[0].price * data.stock
                    let checkProductId = result[0].id
                    // ==========================================
                    if (checkStock >= 0) { // CHECK STOCK PRODUCT (STEP 2)
                        connection.query("UPDATE product SET stock = ? WHERE id = ?", [checkStock, checkProductId]) // REDUCE DATA STOCK PRODUCT (STEP 3)
                        if (loop == 0) { connection.query("INSERT INTO `order` (id_user) VALUES ('" + data.id_user + "')") } // INSERT DATA ID_USER TO ORDER (STEP 4), LOOP HERE!
                        connection.query("SELECT * FROM `order` WHERE id", (error, result) => {
                            // ==========================================
                            // GET ID ORDER
                            // ==========================================
                            let checkOrderId = result[0].id
                            // ==========================================
                            connection.query("INSERT INTO order_detail (id_order, id_product, stock, price) VALUES ('" + checkOrderId + "', '" + data.id_product + "', '" + data.stock + "', '" + checkPrice + "')") // INSERT DATA ORDER DETAIL (STEP 5)
                            connection.query('SELECT sum(price) as total FROM order_detail WHERE id_order = ?', checkOrderId, (error, result) => {
                                // ==========================================
                                // GET TOTAL FROM PRICE ORDER DETAIL
                                // ==========================================
                                let checkTotal = result[0].total
                                // ==========================================
                                connection.query('UPDATE `order` SET total = ? WHERE id = ?', [checkTotal, checkOrderId], (error, result) => { //  INSERT DATA TOTAL TO ORDER (STEP 6)
                                    if (error) reject(new Error(error))
                                    resolve(result) // TAMPILKAN (STEP 7)
                                })
                                if (error) reject(new Error(error))
                            })
                            if (error) reject(new Error(error))
                        })
                    } else {
                        console.log('Cannot Reduce Stock Product, Below  0 (-1, -2, -3)!')
                        reject(new Error(error))
                    }
                } else {
                    console.log('ID Product Not Found!')
                    reject(new Error(error))
                }
                if (error) reject(new Error(error))
            })
        })
    }
}