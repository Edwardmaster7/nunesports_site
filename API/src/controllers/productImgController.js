
const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')
const path = require('path')
const AppError = require('../utils/AppError')

class ProductImgController {

    async update(request, response) {
        const { code } = request.params
        const imgFilename = request.file.filename

        const diskStorage = new DiskStorage()

        const product = await knex('Products').where('code', code).first()

        // validate product exists
        if (!product) {
            throw new AppError('Product not found', 404)
        }

        console.log(product)

        if (product.image) {
           await diskStorage.deleteFile(product.image)
        }

        await diskStorage.saveFile(imgFilename)
        
        product.image = imgFilename

        const updated = await knex('Products').where('code', code).update({ img_src: product.image }).returning('*')

        return response.json(updated)
    }
}

module.exports = ProductImgController