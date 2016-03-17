//import the controllers
//This only specifies the folder name, which means it will automatically pull the index.js file
var controllers = require('./controllers');

//function to attach routes
var router = function (app) { //pass the express app in

    //app.VERB maps get requests to a middleware action
    //For example
    //app.get handles GET requests
    //app.post handles POST requests

    //when someone goes to the /page1 page, call controllers.page1
    //For example, www.webpage.com/page1, it will route to controllers.page1
    app.get('/login', controllers.Account.loginPage);
    app.post('/login', controllers.Account.login);
    app.get('/signup', controllers.Account.signupPage);
    app.post('/signup', controllers.Account.signup);
    app.get('/logout', controllers.Account.logout);
    app.get('/maker', controllers.Domo.makerPage);
    app.get('/', controllers.Account.loginPage);

};

//export the router function
module.exports = router;