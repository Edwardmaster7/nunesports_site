const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { signToken } = require("../config/auth")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    console.log(`email: ${email}, password: ${password}`)

    const user = await knex("Users").where('email', email).first()
    
    // console.log(`user ${JSON.stringify(user)}`)

    if (!user) {
      throw new AppError("Email and/or password incorrect.", 401)
    }

    if (password !== user.password) {
      throw new AppError("Email and/or password incorrect.", 401)
    }

    console.log(`user id on sessionsController: ${user.id}`)

    const token = signToken({ userId: String(user.id), isAdmin: user.isAdmin })

    return response.json({ id:user.id, token })
  }
}

module.exports = SessionsController