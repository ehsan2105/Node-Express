const express = require('express')

const  productsController = require('../controllers/product.controller')

const router = express.Router()

router.get('/products',productsController.getAllProduct)

router.get('/products/:id',productsController.getProductDetails)

module.exports = router
