const Product = require('../models/product.model')
const Order = require('../models/order.model')


async function getProducts(req, res, next) {
    try {

        const product = await Product.findAll()
        res.render('admin/products/all-productes', { products: product })
    } catch (error) {
        next(error)
        return
    }
}

function getNewProducts(req, res) {
    res.render('admin/products/new-products')
}
async function getOrders(req, res, next) {
    try {
      const orders = await Order.findAll();
      res.render('admin/orders/admin-orders', {
        orders: orders
      });
    } catch (error) {
      next(error);
    }
  }

async function createNewProducts(req, res, next) {

    const product = new Product({
        ...req.body
        , image: req.file.filename
    })
    try {

        await product.save()
        console.log('ok')
    } catch (error) {
        console.log('no')
        next(error)
        return
    }
    res.redirect('product')
}

async function getUpdateProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id)
        res.render('admin/products/update-products', { product: product })
    } catch (error) {
        next(error)

    }
}
async function updataProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id
    })
    if (req.file) {
        product.replaceImage(req.file.filename)
    }
    try {

        await product.save()
    } catch (error) {
        next(error)
        return
    }
    res.redirect('/admin/product/')
}

async function deleteProduct(req, res, next){
    let product
    try{

         product = await  Product.findById(req.params.id)
         await product.remove()
    }catch(error){
        return next(error)
    }
    res.json({message : 'delete product'})
}



async function updateOrder(req, res, next) {
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;
  
    try {
      const order = await Order.findById(orderId);
  
      order.status = newStatus;
  
      await order.save();
  
      res.json({ message: 'Order updated', newStatus: newStatus });
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProducts: createNewProducts,
    getUpdateProduct: getUpdateProduct,
    updataProduct: updataProduct,
    deleteProduct : deleteProduct,
    getOrders:getOrders,
    updateOrder:updateOrder
}   