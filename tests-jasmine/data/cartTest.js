import {addToCart ,cart, loadFromStorage, updateDeliveryOptionsInCart} from "../../data/cart.js";

describe('test suite: addToCart', ()=>{
    
    it('add existing product to cart',()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionsId: '1'
            }]);
        });
        loadFromStorage();
        
        console.log(localStorage.getItem('cart'));
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);//only works when the method setItem is mocked with spyon
        expect(cart[0].quantity).toEqual(2); 
    });


    it('add a new product to cart', ()=>{//flaky test which sometimes passes and sometimes fails
        //Making a Mockup using spyOn(object, string-which is a method) .and is property of spyOn and we use callFake to overwrite the object
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);//localStorage only supports string
        });
        console.log(localStorage.getItem('cart'));//still fails because cart already loads on import before mockup therefore we need to reload cart
        loadFromStorage();
        
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",null);
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);//only works when the method setItem is mocked with spyon
        expect(cart[0].quantity).toEqual(1); 
    });
});