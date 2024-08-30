const { Router } = require('express')

const sessionsRouter = require('./sessions.routes')
const usersRouter = require('./users.routes')
const productsRouter = require('./products.routes')

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/products', productsRouter)

module.exports = routes