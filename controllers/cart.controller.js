const Product = require('../models/product.model')

function getCar(req, res) {
    res.render('customer/cart/cart')
}
async function addCartItem(req, res, next) {
    let product

    try {

        product = await Product.findById(req.body.producdId)

    } catch (error) {
        next(error)
        return
    }
    const cart = res.locals.cart
    cart.addItem(product)
    req.session.cart = cart
    res.status(201).json({
        maessage: 'Cart update',
        newTotalItem: cart.totalQuantity
    })
}

function updateCartItem(req, res) {
    const cart = res.locals.cart

    const updateItemData = cart.updateItem(req.body.producdId, +req.body.quantity)

    req.session.cart = cart

    res.json({
        maessage: 'Item update',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updateItemPrice: updateItemData.updateItemPrice
        }
    })
}

module.exports = {
    addCartItem: addCartItem,
    getCar: getCar,
    updateCartItem: updateCartItem
}