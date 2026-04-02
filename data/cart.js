export let cart = JSON.parse(localStorage.getItem('cart')) ||
[{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


let totalQuantity = 0;

export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    
    const quantitySelected = document.querySelector(`.js-quantity-selector-${productId}`).value;//same convert to camel from kebab
    let quantity = Number(quantitySelected);
    
    if(matchingItem){
        matchingItem.quantity += quantity;
    }
    else{
        cart.push({
            productId,
            quantity
        });
    }

    saveToLocalStorage();
}

export function totalQuantityCalculator(){
    totalQuantity = 0;
    cart.forEach((cartItem)=>{
        totalQuantity += cartItem.quantity;
    });
    const cartIconHeader = document.querySelector('.js-cart-icon-update');
    if(cartIconHeader){
        cartIconHeader.innerHTML = totalQuantity;
    }
    const checkoutHeaderElement = document.querySelector('.js-checkout-update');
    if(checkoutHeaderElement){
        checkoutHeaderElement.innerHTML = String(totalQuantity + ' items');
    }
}


export function deleteFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToLocalStorage();
}

export function updateQuantity(productId,newQuantity){
    let matchingItem;
    cart.forEach((matchingItem)=>{
        if(productId === matchingItem.productId){
            matchingItem.quantity = newQuantity;
        }
        totalQuantityCalculator();
        saveToLocalStorage();
    });
}