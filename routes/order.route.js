const express = require('express')

const orderController = require('../controllers/order.controllers')

const router = express.Router()


router.post('/',orderController.addOrder)

router.get('/',orderController.getOrders)

module.exports = router