const cart = [];
let totalQuantity = 0;

function totalQuantityCalculator(){
    totalQuantity = 0;
    cart.forEach((item)=>{
        totalQuantity += item.quantity;
    });
    document.querySelector('.js-cart-icon-update').innerHTML = totalQuantity;
}

