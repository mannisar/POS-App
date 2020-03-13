const uuidv4 = require('uuid/v4')
const orderModel = require('../models/order')
const funcHelpers = require('../helpers')

module.exports = {
    orderProduct: async (request, response) => {
        try {
            const orderProduct = request.body
            var loop = 0

            await orderProduct.product.map(event => {
                // let id_order = uuidv4()
                const data = {
                    id_user: orderProduct.id_user,
                    total: orderProduct.total,
                    id_order: orderProduct.id_order,
                    id: event.id,
                    qty: event.qty
                }
                orderModel.orderProduct(data, loop)
                loop++
            })
            const result = await orderModel.readOrder()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Order Product Failed!')
        }
    },
    readOrder: async (request, response) => {
        try {
            const result = await orderModel.readOrder()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Read Order Failed!')
        }
    },
}