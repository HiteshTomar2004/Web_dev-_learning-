import {cart, loadFromStorage} from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js"

//Integrated testing
describe('test suite: renderOrderSummary',()=>{//testing how page looks and behaves

    const productId1 = `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`;
    const productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;

    beforeAll(//done is a parameter provided by jasmine to wait before next step
        (done)=>{
            loadProductsFetch().then(()=>{
                done();//done can be used inside beforeEach and it too
            });
        }
    );
    //some hooks:- beforeEach() runs before each test afterEach() runs after each test beforeAll() before all tests afterAll() runs after all tests
    beforeEach(()=>{//beforeEach is a hook and allows to run this funciton before each test
        
        spyOn(localStorage, 'setItem');
            document.querySelector('.js-test-container').innerHTML = `
                <div class="js-order-review"></div>
                <div class="js-payment-summary"></div>
                `;

                spyOn(localStorage, 'getItem').and.callFake(()=>{
                    return JSON.stringify([
                        {
                            productId: productId1,
                            quantity: 2,
                            deliveryOptionsId: '1'
                        },{
                            productId: productId2,
                            quantity: 1,
                            deliveryOptionsId: '2'
                        }
                    ]);
                });
            loadFromStorage();

            renderOrderSummary();
    });


    it('displays the cart', ()=>{
        
        expect(
            document.querySelectorAll('.js-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = ``;
    
    });


    it('delete a product',()=>{

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`js-item-container-${productId1}`)
        ).toEqual(null);
        
        expect(
            document.querySelector(`.js-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toEqual(productId2);
        document.querySelector('.js-test-container').innerHTML = ``;
    
    });
});