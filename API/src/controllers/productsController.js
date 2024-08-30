const AppError = require('../utils/AppError')

const knex = require('../database/knex')

class ProductsController {

    async create(req, res) {
        const { name, price, description } = req.body

        // validate if fields are given
        if (!name || !price) {
            throw new AppError('Name and price are required', 400)
        }

        // validate if product already exists
        const productExists = await knex('Products').where({ name }).first()
        if (productExists) {
            throw new AppError('Product already exists with this name', 409)
        }

        const product = await knex('Products').insert({
            name,
            price,
            description
        })

        return res.status(201).json(product)
    }

    async update(req, res) {
        const { code } = req.params
        const { name, price, description } = req.body


        const product = await knex('Products').where({ code }).first()

        if (!product) {
            throw new AppError('Product not found', 404)
        }

        product.name = name ?? product.name
        product.price = price ?? product.price
        product.description = description ?? product.description

        await knex('Products').where({ code }).update({ name: product.name, price: product.price, description: product.description })

        return res.status(204).send()
    }

    async delete(req, res) {
        const { code } = req.params

        const product = await knex('Products').where({ code }).first()

        if (!product) {
            throw new AppError('Product not found', 404)
        }

        await knex('Products').where({ code }).delete()

        return res.status(204).send()
    }

    async index(req, res) {
        const products = await knex('Products').select('*')
        
        return res.json(products)
    }

    async show(req, res) {
        const { code } = req.params

        const product = await knex('Products').where({ code }).first()

        if (!product) {
            throw new AppError('Product not found', 404)
        }

        return res.json(product)
    }
}

module.exports = ProductsController