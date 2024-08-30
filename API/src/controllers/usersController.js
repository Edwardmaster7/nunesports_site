const AppError = require('../utils/AppError')

const knex = require('../database/knex')

class UsersController {

    async create(req, res) {
        const { name, email, password, role } = req.body

        const user = await knex('Users').insert({
            name,
            email,
            password,
            role
        })

        // validate if fields where filled
        if (!name || !email || !password) {
            throw new AppError('Missing fields', 400)
        }

        // validate email format
        if (!email.includes('@')) {
            throw new AppError('Invalid email', 400)
        }
        
        // validate password length
        if (password.length < 8) {
            throw new AppError('Password must be at least 8 characters long', 400)
        }

        // validate role
        if (role) {
            if(role !== 'admin' && role !== 'user') {
                throw new AppError('Invalid role', 400)
            }
        }

        return res.status(201).json(user)
    }

    async update(req, res) {
        const { id } = req.params
        const { name, email, old_password, password, role } = req.body

        const userA = await knex("Users").where({ id });
    
        const user = userA[0];

        if (!user) {
            throw new AppError("User not found.")
        }

        // verify if email is already in use
        if (email) {
            //check if email is valid
            if (!email.includes("@")) {
                throw new AppError("Invalid email.")
            }

            const emailExists = await knex("Users")
                .where("email", email).first() === undefined ? false : true  

            // console.log(emailExists);

            if (emailExists && emailExists !== user.id) {
                throw new AppError("Email already in use.")
            }
        }

        if (password) {
            if (!old_password) {
                throw new AppError("Old password is required.")
            } else if (password === old_password) {
                throw new AppError("New password cannot be the same as old password.")
            } else {
                const isValid = old_password === user.password ? true : false

                // console.log(`old password: ${old_password}\nuser password: ${user.password}\nisValid: ${isValid}`)
                if (!isValid) {
                throw new AppError("Old password does not match.")
                }

                // validate password length
                if (password.length < 8) {
                    throw new AppError("Password must be at least 8 characters long.")
                }

                user.password = password
            }
        }

        user.name = name ?? user.name
        user.email = email ?? user.email
        user.role = role ?? user.role
        // user.avatar = request.file.filename?? user.avatar

        await knex("Users").where({ id }).update({ name:user.name, email:user.email, password:user.password, role:user.role, updated_at: knex.fn.now() });

        return res.json(user)
    }

    async delete(req, res) {
        const { id } = req.params

        const user = await knex('Users').where({ id }).first()

        if (!user) {
            throw new AppError('User not found', 404)
        }

        await knex('Users').where({ id }).delete()

        return res.json({ message: 'User deleted successfully' })
    }

    async show(req, res) {
        const { id } = req.params

        const user = await knex('Users').where({ id }).first()

        if (!user) {
            throw new AppError('User not found', 404)
        }

        return res.json(user)
    }
}

module.exports = UsersController