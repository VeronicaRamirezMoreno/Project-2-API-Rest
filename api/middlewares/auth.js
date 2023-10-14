const jwt = require('jsonwebtoken')
const User = require('..//models/user.models')
require('dotenv').config()

const checkAuth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Token not found')
    }

    jwt.verify(req.headers.authorization, process.env.SECRET,
        async (error, payload) => {
            if (error) {
                console.log(error.message)
                return res.status(401).send('Token not valid')
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                return res.status(404).send('User not found')
            }

            res.locals.user = user
            next()
        })
}

const checkAdmin = (req, res, next) => {
    if (res.locals.user.role !== 'admin') {
        return res.status(401).send('User not authorized')
    }
    next()
}

const checkPersonnel = (req, res, next) => {
    if (res.locals.user.role === 'user') {
        return res.status(401).send('User not authorized')
    }
    next()
}

module.exports = {
    checkAuth,
    checkAdmin,
    checkPersonnel
}