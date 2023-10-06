const cartItemUpdateFormElement = document.querySelectorAll('.cart-item-management')
const cartTotalPriceElement = document.getElementById('cart-total-price')
const cartBadgeElements = document.querySelectorAll('.nav-item .badge ')


async function updateCartItem(event) {
  event.preventDefault()

  const form = event.target

  const productId = form.dataset.productd
  const csrf = form.dataset.csrf

  const quantity = form.firstElementChild.value

  let response
  try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        producdId: productId,
        quantity: quantity,
        _csrf: csrf
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    alert('error itemes')
    return
  }

  if (!response.ok) {

    alert('error itemes status')
    return
  }

  const responseData = await response.json()
  console.log(responseData)
  

  const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price')
  cartItemTotalPriceElement.textContent = responseData.updatedCartData.updateItemPrice
  const cartTotalPriceElement = document.getElementById('cart-total-price')
  cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice

  for ( const cartBadgeElement of cartBadgeElements){
    cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity
  
  }
}


for (const formElemet of cartItemUpdateFormElement) {
  formElemet.addEventListener('submit', updateCartItem)
} 