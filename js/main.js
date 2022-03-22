const addToShopingCartButtons = document.querySelectorAll('.formulario__submit');
addToShopingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked)
})

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked)

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer')


function addToCartClicked(event) {
    const button = event.target
    const item = button.closest('.item')

    const itemTitle = item.querySelector('.item-title').textContent
    const itemPrice = item.querySelector('.item-price').textContent
    const itemImage = item.querySelector('.item-image').src

    addItemToShopingCart(itemTitle, itemPrice, itemImage)
}

function addItemToShopingCart(itemTitle, itemPrice, itemImage) {

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle')
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[i].parentElement.parentElement.querySelector('.shoppingCartItemQuantity')
            elementQuantity.value++
                updateShoppingCartTotal()
            return
        }
    }

    const shoppingCartRow = document.createElement('div')
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
                <div class="col-6 camisa">
                    <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <img src=${itemImage} alt="Imagen del Producto" class="shopping-cart-image camisa__imagen">
                    </div>
                </div>
                <h3 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h3>
                <div class="col-2">
                    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <input class="shopping-cart-quantity-input shoppingCartItemQuantity formulario__campo formulario__campo--cantidad " type="number" placeholder="Cantidad" value=1 ">
                    <button class="btn btn-danger buttonDelete formulario__submit " type="button ">X</button>
                    </div>
                </div>
            </div>
    `
    shoppingCartRow.innerHTML = shoppingCartContent
    shoppingCartItemsContainer.append(shoppingCartRow)

    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem)

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged)

    updateShoppingCartTotal()
}

function updateShoppingCartTotal() {
    let total = 0
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal')

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem')


    shoppingCartItems.forEach(shoppingCartItem => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice')

        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''))

        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity')

        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value)

        total = total + shoppingCartItemPrice * shoppingCartItemQuantity
    })

    shoppingCartTotal.innerHTML = `$ ${total.toFixed(2)}`
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target
    buttonClicked.closest('.shoppingCartItem').remove()
    updateShoppingCartTotal()
}

function quantityChanged(event) {
    const input = event.target
    if (input.value <= 0) {
        input.value = 1
    }
    updateShoppingCartTotal()
}

function comprarButtonClicked() {
    window.alert('Gracias por su compra')
    shoppingCartItemsContainer.innerHTML = ''
    updateShoppingCartTotal()
}