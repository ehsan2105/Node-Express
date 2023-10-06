const addToCartButtonElement = document.querySelector('#product-details button')
const cartBadgeElements = document.querySelector('.nav-items .badge')

async function addToCart() {
    const producdId = addToCartButtonElement.dataset.productid
    const csrfTOken = addToCartButtonElement.dataset.csrf
    let response
    try {

        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                producdId: producdId
                , _csrf: csrfTOken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        alert('somting went wrong1')
        return
    }
    if (!response.ok) {
        alert('somting went wrong2')
        return
    }
    const responseData = await response.json()

    const newTotalQuantity = responseData.newTotalItem

    for (const cartBadgeElement of cartBadgeElements) {

        cartBadgeElement.textContent = newTotalQuantity
    }
}

addToCartButtonElement.addEventListener('click', addToCart)