const Product = require('./product.model');
class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items
        this.totalQuantity = totalQuantity
        this.totalPrice = totalPrice
    }
    async updatePrices() {
        const productIds = this.items.map(function (item) {
          return item.product.id;
        });
    
        const products = await Product.findMultiple(productIds)
    
        const deletableCartItemProductIds = [];
    
        for (const cartItem of this.items) {
          const product = products.find(function (prod) {
            return prod.id === cartItem.product.id;
          })
    
          if (!product) {
            deletableCartItemProductIds.push(cartItem.product.id)
            continue
          }
    
          cartItem.product = product;
          cartItem.totalPrice = cartItem.quantioty * cartItem.product.price
        }
    
        if (deletableCartItemProductIds.length > 0) {
          this.items = this.items.filter(function (item) {
            return deletableCartItemProductIds.indexOf(item.product.id) < 0
          })
        }
    
        this.totalQuantity = 0
        this.totalPrice = 0
    
        for (const item of this.items) {
          this.totalQuantity = this.totalQuantity + item.quantioty
          this.totalPrice = this.totalPrice + item.totalPrice
        }
      }
    addItem(product) {
        const cartItem = {
            product: product,
            quantioty: 1,
            totalPrice: product.price
        }
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            if (item.product.id === product.id) {
                cartItem.quantioty = +item.quantioty + 1
                cartItem.totalPrice = item.totalPrice + product.price
                this.items[i] = cartItem
                this.totalQuantity++
                this.totalPrice += product.price
                return
            }
        }
        this.items.push(cartItem)
        this.totalQuantity++
        this.totalPrice += product.price
    }

    updateItem(productId , newQuantity){
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            if (item.product.id === productId && newQuantity > 0) {
                const cartItem = {...item}
                const quantiotyChange = newQuantity - item.quantioty
                cartItem.quantioty = newQuantity
                cartItem.totalPrice = newQuantity * item.product.price
                this.items[i] = cartItem
                this.totalQuantity= this.totalQuantity + quantiotyChange
                this.totalPrice += quantiotyChange* item.product.price
                
                return {updateItemPrice : cartItem.totalPrice}
            }else if (item.product.id === productId && newQuantity <= 0){
                this.items.splice(i,1)
                this.totalQuantity= this.totalQuantity -item.quantioty
                this.totalPrice -= item.totalPrice
                return {updateItemPrice : 0}
            
            }
    }
}


}
module.exports = Cart