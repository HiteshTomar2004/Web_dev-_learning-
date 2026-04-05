const xhr = new XMLHttpRequest(); // creates a new HTTP message to send to backend

xhr.addEventListener('load',()=>{//set up event listerner first then do the event , load is an event to recieve response
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');//.open('Type of HTTP message eg- GET,POST,PUT,DELETE', where to send the message eg -URL)
//https : secure http instead of plain text SSL is used
xhr.send();//Async code//each request sent sends back a response called Request-Response Cycle
xhr.response

//A backend only supports a certain sets of URL paths
//Status code : 
// starts with 4 or 5 : 404 400 500 = failed
// starts with 4 means our problem and starts with 5 means backend problem
// starts with 2 : 200 201 204 = succeeded

//try finding list of all URL paths supported in documentation page of backend
//list of all backend url supported is called backend API
//API = application programming interface
//responses can be text json HTML images
