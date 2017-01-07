var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function (app) {
    var controller = {};

    var ERR_ACCOUNT_ALREADY_EXISTS = 'ERR_ACCOUNT_ALREADY_EXISTS';
    var ERR_LOGIN_INVALID = 'ERR_LOGIN_INVALID';
    var ERR_INTERNAL = 'ERR_INTERNAL';

    var User = app.models.User;
    var AuthToken = app.models.AuthToken;
    var SecurityService = app.services.SecurityService;

    controller.login = function(req, res) {
        var loginData = {
            email: sanitize(req.body.email),
            password: sanitize(req.body.password)
        };

        loginData.password = SecurityService.toMD5(loginData.password);

        var token = chance.guid();

        User.findOne(loginData)
            .then(function(user) {
                if(!user) {
                    throw ERR_LOGIN_INVALID;
                }

                return AuthToken.findOne({
                    email: loginData.email
                });
            })
            .then(function(authToken) {
                var promise = null;

                if(!authToken) {
                    promise = AuthToken.create({
                        email: loginData.email,
                        token: token
                    });
                }
                else {
                    promise =  AuthToken.update(
                        { email: loginData.email },
                        {
                            $set: {
                                email: loginData.email,
                                token: token
                            }
                        }
                    );
                }

                return promise;
            })
            .then(function() {
                return User.findOne({email: loginData.email});
            })
            .then(function(user) {
                res.status(200).json({
                    token: token,
                    email: user.email,
                    name: user.name
                });
            })
            .catch(function(err) {
                if(err === ERR_LOGIN_INVALID) {
                    res.status(401).json({
                        code: ERR_LOGIN_INVALID
                    });
                }
                else {
                    res.status(500).json({
                        code: ERR_INTERNAL
                    });
                }
            });
    };

    controller.createAccount = function(req, res) {
        var accountData = {
            email: sanitize(req.body.email),
            password: sanitize(req.body.password),
            name: sanitize(req.body.name)
        };

        accountData.password = SecurityService.toMD5(accountData.password);
        
        User.findOne({email: accountData.email})
            .then(function(user) {
                if(!user) {
                    return User.create(accountData);
                }

                throw ERR_ACCOUNT_ALREADY_EXISTS;
            })
            .then(function(){
                res.status(200).end();
            })
            .catch(function(err) {
                if(err === ERR_ACCOUNT_ALREADY_EXISTS) {
                    res.status(400).json({
                        code: ERR_ACCOUNT_ALREADY_EXISTS
                    });
                }
                else {
                    res.status(500).json({
                        code: ERR_INTERNAL
                    });
                }
            });
    };

    return controller;
}