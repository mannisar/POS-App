const categoryModel = require('../models/category')
const funcHelpers = require('../helpers')

module.exports = {
    createCategory: async (request, response) => {
        try {
            const {
                id,
                name_category
            } = request.body

            const data = {
                id,
                name_category
            }
            const result = await categoryModel.createCategory(data)
            funcHelpers.response(response, 200, 'Create Product Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Create Category Failed!')
        }
    },
    readCategory: async (request, response) => {
        try {
            const {
                categoryName
            } = request.params

            const data = {
                categoryName
            }
            const result = await categoryModel.readCategory(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Read Category Failed!')
        }
    },
    updateCategory: async (request, response) => {
        try {
            const {
                id,
                name_category
            } = request.body
            const categoryId = request.params.categoryId

            const data = {
                id,
                name_category
            }
            const result = await categoryModel.updateCategory([data, categoryId])
            funcHelpers.response(response, 200, 'Update Category Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Update Category Failed!')
        }
    },
    deleteCategory: async (request, response) => {
        try {
            const categoryId = request.params.categoryId
            const result = await categoryModel.deleteCategory(categoryId)
            funcHelpers.response(response, 200, 'Delete Category Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Delete Category Failed!')
        }
    },
    ignoreFavicon: async (request, response, next) => {
        try {
            const result = request.originalUrl === '/favicon.ico'
            response.result(204).json({
                nope: true
            }) // 204 artinya no content, dan panjang JSON 0
        } catch (error) {
            next()
        }
    }
}