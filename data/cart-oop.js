function Cart(localStorageKey){//Use Pascal Case for things that generate objects PascalCase
    const cart = {
    cartItems: undefined,

    loadFromStorage (){
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ||
        [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionsId: '1'
        },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionsId: '2'
        }];
    },

    saveToLocalStorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    addToCart(productId,quantity){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
        
        if(matchingItem){
            matchingItem.quantity += quantity;
        }
        else{
            if(quantity){
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionsId: '1'
                });
            }
            else{
                cart.push({
                    productId,
                    quantity :1,
                    deliveryOptionsId: '1'
                });
            }
        }
            this.saveToLocalStorage();
    },

    totalQuantityCalculator(){
        let totalQuantity = 0;
        this.cartItems.forEach((cartItem)=>{
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
        return totalQuantity;
    },

    deleteFromCart(productId){
        const newCart = [];

        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToLocalStorage();
    },  

    updateQuantity(productId,newQuantity){
        let matchingItem;
        this.cartItems.forEach((matchingItem)=>{
            if(productId === matchingItem.productId){
                matchingItem.quantity = newQuantity;
            }
            totalQuantityCalculator();
            this.saveToLocalStorage();
        });
    },

    updateDeliveryOptionsInCart(matchingProductId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(matchingProductId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionsId = deliveryOptionId;
        this.saveToLocalStorage();
    }   
    };
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);