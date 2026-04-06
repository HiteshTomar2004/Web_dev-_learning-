class Cart {
    
    cartItems;//public property
    #localStorageKey;//private property only used inside class

    constructor(localStorageKey){//method name should be constructor and should not return anything
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage (){//private method
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ||
        [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionsId: '1'
        },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionsId: '2'
        }];
    }

    saveToLocalStorage(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
    }

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
    }

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
    }

    deleteFromCart(productId){
        const newCart = [];

        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToLocalStorage();
    }

    updateQuantity(productId,newQuantity){
        let matchingItem;
        this.cartItems.forEach((matchingItem)=>{
            if(productId === matchingItem.productId){
                matchingItem.quantity = newQuantity;
            }
            totalQuantityCalculator();
            this.saveToLocalStorage();
        });
    }

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
}


//each object generated is called an instance of the class
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

//cart.#localStorageKey = 'test';//not accessible outside class, also field = class

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);

/*
inbuilt date class in JS
const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString());
*/
/*
console.log(this);//undefined originally it was for window but now undefined
const object2 = {
  a: 2,
  b: this.a//currently object hasnt been created yet so this is undefined 
}
  */
/*
function logThis(){
  console.log(this);
}
logThis();
logThis.call('hello');//.call allows to set first value to value of this
//logThis.call('valueforthis',param1,param2)

//arrow function do not change the value of this so "this" keeps the value that it had outside the function
//inside a regular function "this" is undefined but we can change it using eg .call()

this //value undefined, outside this "this"here<--------------------
const obj3 = {                                                     |
    method(){                                                      |
        console.log(this) //also undefined ,this "this" points to _| 
    }
}therefore inside a method we use this to point to outside objects
*/