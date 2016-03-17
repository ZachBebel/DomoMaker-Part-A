var path = require('path'); //path is a built-in node library to handle file system paths
var models = require('../models'); //pull in our models. This will automatically load the index.js from that folder

var Account = models.Account;

var loginPage = function (req, res) {
    res.render('login');
}

var signupPage = function (req, res) {
    res.render('signup');
}

var logout = function (req, res) {
    res.redirect('/');
}

var login = function (req, res) {
    //check if the required fields exist
    //normally you would also perform validation to know if the data they sent you was real 
    if (!req.body.username || !req.body.pass) {
        //if not respond with a 400 error (either through json or a web page depending on the client dev)
        return res.status(400).json({
            error: "RAWR! All fields required!"
        });
    }

    Account.AccountModel.authenticate(req.body.username, req.body.pass, function (err, account) {

        if (err || !account) {
            console.log(err);
            return res.status(401).json({
                err: "RAWR! Incorrect username or password"
            }); //if error, return it
        }

        //return success
        res.json({
            redirect: '/maker'
        });

    });

}

var signup = function (req, res) {
    //check if the required fields exist
    //normally you would also perform validation to know if the data they sent you was real 
    if (!req.body.username || !req.body.pass || !req.body.pass2) {
        //if not respond with a 400 error (either through json or a web page depending on the client dev)
        return res.status(400).json({
            error: "RAWR! All fields required!"
        });
    }

    // Also check for matching passwords
    if (req.body.pass !== req.body.pass2) {
        //if not respond with a 400 error (either through json or a web page depending on the client dev)
        return res.status(400).json({
            error: "RAWR! Passwords do not match!"
        });
    }

    Account.AccountModel.generateHash(req.body.pass, function (salt, hash) {

        //dummy JSON to insert into database
        var accountData = {
            username: req.body.username,
            salt: salt,
            password: hash
        };

        //create a new object of AccountModel with the object to save
        var newAccount = new Account.AccountModel(accountData);

        //Save the newAccount object to the database
        newAccount.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    err: err
                }); //if error, return it
            }

            //return success
            res.json({
                redirect: '/maker'
            });
        });

    });
}

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;