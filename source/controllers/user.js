const JWT = require('jsonwebtoken')
const userModel = require('../models/user')
const funcHelpers = require('../helpers/')
const {
    JWT_KEY
} = require('../configs/mysql')

module.exports = {
    register: async (request, response) => {
        try {
            const salt = funcHelpers.generateSalt(18)
            const hashPassword = funcHelpers.setPassword(request.body.password, salt)
            const data = {
                id: request.body.id,
                name: request.body.name,
                email: request.body.email,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
                id_level: request.body.id_level || '2',
                data_added: new Date(),
                data_updated: new Date()
            }
            const result = await userModel.register(data)
            funcHelpers.response(response, 200, 'Create User Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Create User Failed!')
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
            funcHelpers.cumstomErrorResponse(response, 404, 'Login Failed!')
        }
    }
}