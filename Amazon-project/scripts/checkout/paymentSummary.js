import {cart, totalQuantityCalculator} from "../../data/cart.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProducts } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    
    let totalProductPriceCents = 0;
    let shippingCostPriceCents = 0;
    cart.forEach((cartItem)=>{
        const matchingItem = getProducts(cartItem.productId);
        totalProductPriceCents += (cartItem.quantity*matchingItem.priceCents);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingCostPriceCents += deliveryOption.priceCents;
    });
    const totalPriceBeforeTaxCents = totalProductPriceCents + shippingCostPriceCents;
    
    const TaxCents = totalPriceBeforeTaxCents*0.1;

    const totalCents = totalPriceBeforeTaxCents + TaxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(totalProductPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingCostPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    //how to send something to backend
    document.querySelector('.js-place-order')
        .addEventListener('click', async ()=>{//async arrow function   
            try{
                const response = await fetch('https://supersimplebackend.dev/orders',{//an object with
                    method: 'POST',//type of request
                    headers: {//object of type of content to send
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({//actual data in an object
                        cart: cart
                    })
                });
                const order = await response.json();//response.json() is a promise
                addOrder(order);
            
        } catch(error){
            console.log('Unexpected error. Try again later');
        }
        
        //window.location is a special object by js which lets you to control URL of the page
        window.location.href = 'orders.html';
        });
}

/*
GET to get something from backend
POST to create something
PUT to update something
DELETE to delete something
*/