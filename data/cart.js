export const cart = [];
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
}

export function totalQuantityCalculator(){
    totalQuantity = 0;
    cart.forEach((cartItem)=>{
        totalQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-icon-update').innerHTML = totalQuantity;
}

