import {cart ,deleteFromCart,totalQuantityCalculator, updateQuantity, updateDeliveryOptionsInCart} from '../../data/cart.js';   // .. represents outside current folder // . represents inside current folder
import { products} from '../../data/products.js';//named export from products.js
import formatCurrency from '../utils/money.js'; //default export from money.js
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';//only works for esm libraries otherwise we have to use script tags
import {deliveryOptions} from '../../data/deliveryOptions.js';

//hello();
totalQuantityCalculator();

const today = dayjs();//from external library module day.js()
const deliveryDate = today.add(7, 'days');//(number,strings in what to add)
console.log(deliveryDate.format('dddd, MMMM D'));

export function renderCheckout(){
    let cartItemHTML = ``;

    cart.forEach((cartItem) =>{
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product)=>{
            if(product.id === productId){
                matchingProduct = product;
            }
        })

        const deliveryOptionsId = cartItem.deliveryOptionsId;
        let deliveryOption;
        deliveryOptions.forEach((option)=>{
            if(option.id === deliveryOptionsId){
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartItemHTML = cartItemHTML + 
        `<div class="cart-item-container js-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: 
                        <span class="quantity-label"
                            data-quanity-label-id="${matchingProduct.id}">
                        ${cartItem.quantity}
                        </span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link"
                        data-update-link-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input" type="number" 
                        data-quantity-input-id="${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity"
                        data-save-id="${matchingProduct.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link"
                        data-delete-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
        `;
    });
    document.querySelector('.js-order-review').innerHTML = cartItemHTML;


    document.querySelectorAll('.js-delete-quantity-link')
        .forEach((deleteButton) =>{
            deleteButton.addEventListener('click',()=>{
                const productId = deleteButton.dataset.deleteId;
                deleteQuantity(productId);
            });
        });

    document.querySelectorAll('.js-update-quantity-link')
        .forEach((updateButton) =>{
            updateButton.addEventListener('click',()=>{
                const productId = updateButton.dataset.updateLinkId;
                const updateElement = document.querySelector(`.js-item-container-${productId}`);
                updateElement.classList.add('is-editing-quantity');
            });
        });
    document.querySelectorAll('.js-save-quantity')
        .forEach((saveButton) =>{
            saveButton.addEventListener('click',()=>{
                const productId = saveButton.dataset.saveId;
                saveQuantity(productId);
            });
        });
    document.querySelectorAll('.js-quantity-input')
        .forEach((inputElement)=>{
            inputElement.addEventListener('keydown',(event)=>{ 
                if(event.key === 'Enter'){ 
                    const productId = inputElement.dataset.quantityInputId; 
                    saveQuantity(productId); 
                } 
            });
        });

    function deleteQuantity(productId){
        deleteFromCart(productId);// from cart.js
                const deleteElement = document.querySelector(`.js-item-container-${productId}`);//choosing which element to delete from HTML code
                deleteElement.remove();
                totalQuantityCalculator();
    }

    function saveQuantity(productId){
        const saveElement = document.querySelector(`.js-item-container-${productId}`);
                saveElement.classList.remove('is-editing-quantity');
                
                const updatedQuantity = Number(document.querySelector(`[data-quantity-input-id="${productId}"]`).value);
                
                if(updatedQuantity <= 1000 && updatedQuantity >0){
                    document.querySelector(`[data-quanity-label-id="${productId}"]`).innerHTML = updatedQuantity;
                    updateQuantity(productId,updatedQuantity);
                }
                else if(updatedQuantity === 0){
                    deleteQuantity(productId);
                }
                else{
                    document.querySelector(`[data-quanity-label-id="${productId}"]`).innerHTML = '<div style="color: red;">Quantity cannot be less than 0 or greater than 1000</div>';
                }
    }

    function deliveryOptionsHtml(matchingProduct, cartItem){

        let deliveryHtml = '';
        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents!==0?`$${formatCurrency(deliveryOption.priceCents)} -`:'FREE';

            const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

            deliveryHtml += 
                `<div class="delivery-option">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-matching-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>`;
        });//name element groups radio buttons together
        
        return deliveryHtml;
    }

    document.querySelectorAll('.js-delivery-option')
        .forEach((radioInputElement)=>{
            radioInputElement.addEventListener('click',()=>{
                const {matchingProductId, deliveryOptionId} = radioInputElement.dataset;
                updateDeliveryOptionsInCart(matchingProductId,deliveryOptionId);
                renderCheckout();//Update HTML and Regenerate all Data = MVC (model-view-control)
            })
        });
    }
        /*MVC - many frameworks based on it
            split code into 3 parts 
            1.Model = Saves and manages the data eg Cart 
            2.View = takes data and displays it on page eg HTML generators
            3.Control = Runs some code when we interact with page eg Event listeners*/