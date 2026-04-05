import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";
//import '../data/backend-practice.js'


/*METHOD 1 Array of promises in Promise.all()
The promise  is same as callback below
*/
Promise.all([//array of promises
    new Promise((resolve)=>{
        loadProducts(()=>{
        resolve('value1');//any parameter saved inside resolve will be passed onto next then
    });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');  //if nothing undefined is passed in an array of values
        });
    })

]).then((values)=>{
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});

/* METHOD 2 using promises and then every time

new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value1');//any parameter saved inside resolve will be passed onto next then
    });

}).then((value1)=>{
    console.log(value1);
        return new Promise((resolve)=>{
            loadCart(()=>{
                resolve('value2'); //both value1 and value2 are passed onto next then  
            });
        });

}).then((value1,value2)=>{//we wanted loadCart to finish before we generate HTML
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/* METHOD 3 MULTIPLE CALLBACKS - not recommended

loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();//code inside code inside code multiple callbacks
    });
});
*/

/*
Promises-
promise is a class
better way to handle asynchronous code
similar to done() function
lets us wait for some code to finish, before going to next step

resolve is a function similar to jasmine done() lets us control when to go to next step
Promise and the old loadProducts() function run simultaneously which allows js to do multiple things at the same time
resolve lets us control when to go to next step

Multiple callbacks can cause a lot of nesting 
promises help to flatten our code

in .then we would want our async code loadCart to finish before we move onto next step of generating carts therefore we make a new Promise for resolve as prev resolve is not a part of .then 
this keeps code flattened therefore recommended to Use callbacks instead of promises

Promise.all() lets us run multiple promises at the same time and wait for all of them to finish
*/