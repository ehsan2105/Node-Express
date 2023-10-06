const express = require('express')
const adminController = require('../controllers/admin-conteoller')
const imageUploadMiddleware = require('../middlewares/image.upload')


const router = express.Router()

router.get('/product', adminController.getProducts)
router.get('/product/new', adminController.getNewProducts)

router.post('/product', imageUploadMiddleware, adminController.createNewProducts)

router.get('/products/:id', adminController.getUpdateProduct)
router.post('/products/:id', imageUploadMiddleware, adminController.updataProduct)

router.delete('/products/:id',adminController.deleteProduct)

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);


module.exports = router