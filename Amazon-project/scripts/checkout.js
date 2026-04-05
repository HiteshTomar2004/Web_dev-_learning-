import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";
//import '../data/backend-practice.js'


/*METHOD 1 Array of promises in Promise.all()
The promise  is same as callback below

Promise.all([//array of promises
    loadProductsFetch(),//returns a promise
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
*/


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

async function loadPage(){ // async wraps the code in a promise

    try{
        //throw 'error1';//when it runs it skips rest of code directly to catch

        await loadProductsFetch(); //waits for loadProductsFetch to finish before next line and allows us to simplify code by not writing .then()
    
        const value = await new Promise((resolve,reject)=>{
            //throw 'error2'; //skips to catch
                loadCart(()=>{ //inside this function throw wont work as this functions runs in future
                
                //reject('error3'); use reject here
                
                resolve('value2');  //'value2' is saved in a variable
            });
        });

    } catch (error){
        console.log('Unexpected error. Please try again later');
    }

    renderOrderSummary();
    renderPaymentSummary();

}
loadPage();

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

ASYNC 
async makes a function return a promise -> short method of writing a promise without resolve 

async function loadPage(){
    console.log('hello');
    return 'value1'; //same as resolve('value1');
}

same as 

function loadPage(){
    new Promise((resolve)=>{
        console.log('hello');
        resolve('value1');
        });
 }

AWAIT lets us wait for a promise to finish before we go to next line
we can only use await when inside an async function
can only be used with promises not callback
closest function has to be an async
we can use await with Promise.all()

async function loadPage(){ 
    console.log('load page');
    await loadProductsFetch(); 
    return 'value1'; 
}

same as

function loadPage(){
    new Promise((resolve)=>{
        console.log('load page');
        resolve();

    }).then(()=>{
        return loadProductsFetch();    
    
    }).then(()=>{
        return new Promise((resolve)=>{
        resolve('value1');     
    });
    });
}

TRY CATCH
Use try catch in async await or synchronous code or .catch with objects
whenever we get an error in try catch is skips the rest of the code and go directly to catch
it is meant to handle unexpected error outside of control

use throw to manually create errors in sync code
throw does not work in future inside promises can work outside await 
inside await async codes we use reject() a function which lets us create error in future
*/