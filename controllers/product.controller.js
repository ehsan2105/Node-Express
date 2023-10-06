const Product = require('../models/product.model')
const { get } = require('../routes/auth.routes')

async function getAllProduct(req, res, next) {
    try {
        const products = await Product.findAll()
        res.render('customer/products/all-products', { products: products })

    } catch (erroe) {
        next(erroe)
    }

}
async function getProductDetails(req, res, next) {
    try {
        

        const product = await Product.findById(req.params.id)
        res.render('customer/products/products-dataile', { product: product })
    } catch (error) {
        
        
        next(error)

    }
}


module.exports = {
    getAllProduct: getAllProduct,
    getProductDetails:getProductDetails
}