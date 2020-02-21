const orderModel = require('../models/order')
const funcHelpers = require('../helpers')

module.exports = {
    orderProduct: async (request, response) => {
        try {
            const orderProduct = request.body
            var loop = 0
            await orderProduct.product.map(event => {
                const data = {
                    id_user: orderProduct.id_user,
                    id_product: event.id_product,
                    stock: event.stock,
                }
                orderModel.orderProduct(data, loop)
                loop++
            })
            funcHelpers.response(response, 200, 'Order Product Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Order Product Failed!')
        }
    }
}