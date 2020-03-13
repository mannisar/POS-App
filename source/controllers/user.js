const JWT = require('jsonwebtoken')
const userModel = require('../models/user')
const funcHelpers = require('../helpers/')
const {
    JWT_KEY
} = require('../configs/mysql')

module.exports = {
    createUser: async (request, response) => {
        try {
            const salt = funcHelpers.generateSalt(18)
            const hashPassword = funcHelpers.setPassword(request.body.password, salt)
            const data = {
                //id: request.body.id,
                name: request.body.name,
                email: request.body.email,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
                role: request.body.role || 'cashier',
                data_added: new Date(),
                data_updated: new Date()
            }
            const result = await userModel.createUser(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Create User Failed!')
        }
    },
    readUser: async (request, response) => {
        try {
            const result = await userModel.readUser()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Create User Failed!')
        }
    },
    updateUser: async (request, response) => {
        try {
            const salt = funcHelpers.generateSalt(18)
            const hashPassword = funcHelpers.setPassword(request.body.password, salt)
            const id = request.params.userId

            const {
                name,
                email,
                role,
            } = request.body

            const data = {
                id,
                name,
                email,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
                role,
                //date_updated: new Date()
            }

            const result = await userModel.updateUser(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Update User Failed!')
        }
    },
    deleteUser: async (request, response) => {
        try {
            const data = request.params.userId
            const result = await userModel.deleteUser(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Delete User Failed!')
        }
    },
    login: async (request, response) => {
        const data = {
            password: request.body.password,
            email: request.body.email
        }

        const emailValid = await userModel.checkEmail(data.email)
        const dataUser = emailValid[0]
        const hashPassword = funcHelpers.setPassword(data.password, dataUser.salt)

        if (hashPassword.passwordHash === dataUser.password) {
            const token = JWT.sign({
                email: dataUser.email,
                id: dataUser.id
            }, JWT_KEY, {
                expiresIn: '1d'
            })

            delete dataUser.salt
            delete dataUser.password

            dataUser.token = token

            funcHelpers.response(response, 200, dataUser)
        } else {
            funcHelpers.cumstomErrorResponse(response, 404, 'Login User Failed!')
        }
    }
}