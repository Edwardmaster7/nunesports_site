const { Router } = require('express')

const ProductsController = require('../controllers/productsController')
const productsController = new ProductsController()

const ProductImgController = require('../controllers/productImgController')
const productImgController = new ProductImgController()

const multer = require('multer')
const uploadConfig = require('../config/upload')
const upload = multer(uploadConfig.MULTER)

// Middlewares
const ensureAdmin = require('../middlewares/ensureAdmin')

const productsRouter = Router()

productsRouter.get('/', productsController.index)
productsRouter.get('/:code', productsController.show)
productsRouter.post('/', ensureAdmin, productsController.create)
productsRouter.put('/:code', ensureAdmin, productsController.update)
productsRouter.delete('/:code', ensureAdmin, productsController.delete)

// Upload image for product
productsRouter.patch("/img/:code", upload.single("img"), ensureAdmin, productImgController.update)

module.exports = productsRouter