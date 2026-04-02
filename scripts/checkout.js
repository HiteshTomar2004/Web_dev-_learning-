import {cart ,deleteFromCart,totalQuantityCalculator, updateQuantity} from '../data/cart.js';   // .. represents outside current folder
import { products} from '../data/products.js';
import { formatCurrency } from './utils/money.js'; // . represents inside current folder

totalQuantityCalculator();

let cartItemHTML = ``;

cart.forEach((cartItem) =>{
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    })
    cartItemHTML = cartItemHTML + 
    `<div class="cart-item-container js-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>`;
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