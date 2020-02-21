const userModel = require('../models/user')
const helper = require('../helpers/')
const JWT = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../configs/mysql')

module.exports = {
    register: async (request, response) => {
        try {
            const salt = helper.generateSalt(18)
            const hashPassword = helper.setPassword(request.body.password, salt)
            const data = {
                name: request.body.name,
                email: request.body.email,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
                id_level: request.body.id_level || '2',
                data_added: new Date(),
                data_updated: new Date()
            }
            const result = await userModel.register(data)
            response.json(result)
        } catch (error) {
            console.log(error)
        }
    },
    login: async (request, response) => {
        const data = {
            password: request.body.password,
            email: request.body.email
        }

        const emailValid = await userModel.checkEmail(data.email)
        const dataUser = emailValid[0]
        const hashPassword = helper.setPassword(data.password, dataUser.salt)

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

            response.json(dataUser)
        } else {
            response.json({
                message: 'Login error!'
            })
        }
    }
}