const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const sessionsRouter = require('./sessions.routes')
const usersRouter = require('./users.routes')

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)

module.exports = routes