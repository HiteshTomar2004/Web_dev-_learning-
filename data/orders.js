export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);//unshift adds order to front of list
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

/*URL parameters also called search parameters
let us save data directly in the URL
eg-  tracking.html?orderId=123
? mmeans we are adding a url parameter
it is a property value pair left side is property right side is value
so ?orderId=123 can be represented in an object like this
{
    orderId: 123
}
this data is saved directly in url and we can use JS to get it out
*/