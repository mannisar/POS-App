// const uuidv4 = require('uuid/v4')
const productModel = require('../models/product')
const funcHelpers = require('../helpers')
const {
    port
} = require('../configs/mysql')

module.exports = {
    createProduct: async (request, response) => {
        try {
            const {
                id,
                name_product,
                description,
                price,
                stock,
                id_category,
            } = request.body

            const data = {
                id,
                name_product,
                description,
                image: `${port}/api/upload/${request.file.filename}`,
                price,
                stock,
                id_category,
                date_added: new Date(),
                date_updated: new Date()
            }

            const result = await productModel.createProduct(data)
            funcHelpers.response(response, 200, 'Create Product Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Create Product Failed!')
        }
    },
    readProduct: async (request, response) => {
        try {
            const productId = request.params.productId

            const paginateId = request.query.paginateId || 1
            const limit = request.query.limit || 10

            const search = request.query.search || ''

            const sortBy = request.query.sortBy || 'id'
            const orderBy = request.query.orderBy || 'ASC'

            const data = {
                productId,
                paginateId,
                limit,
                search,
                sortBy,
                orderBy,
            }

            const result = await productModel.readProduct(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Read Product Failed!')
        }
    },
    updateProduct: async (request, response) => {
        try {
            const productId = request.params.productId
            const {
                name_product,
                description,
                price,
                stock,
                id_category
            } = request.body

            const data = {
                name_product,
                description,
                price,
                stock,
                id_category,
                date_updated: new Date()
            }

            const result = await productModel.updateProduct(data, productId)
            funcHelpers.response(response, 200, 'Update Product Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Update Product Failed!')
        }
    },
    deleteProduct: async (request, response) => {
        try {
            const productId = request.params.productId
            const result = await productModel.deleteProduct(productId)
            funcHelpers.response(response, 200, 'Delete Prodct Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Delete Product Failed!')
        }
    },
    ignoreFavicon: async (request, response, next) => {
        try {
            const result = request.originalUrl === '/favicon.ico'
            response.result(204).json({
                nope: true
            })
        } catch (error) {
            next()
        }
    }
}