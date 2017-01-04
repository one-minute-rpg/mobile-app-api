var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function (app) {
    var controller = {};

    var ERR_ACCOUNT_ALREADY_EXISTS = 'ERR_ACCOUNT_ALREADY_EXISTS';
    var ERR_LOGIN_INVALID = 'ERR_LOGIN_INVALID';
    var ERR_INTERNAL = 'ERR_INTERNAL';

    var User = app.models.User;
    var AuthToken = app.models.AuthToken;

    controller.login = function(req, res) {
        //TODO: crypt
        var loginData = {
            email: sanitize(req.body.email),
            password: sanitize(req.body.password)
        };

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
                return !!authToken ?
                    AuthToken.create({
                        email: loginData.email,
                        token: token
                    })
                    :
                    AuthToken.update(
                        { email: loginData.email },
                        {
                            $set: {
                                email: loginData.email,
                                token: token
                            }
                        }
                    );
            })
            .then(function() {
                res.status(200).json({
                    token: token
                });
            })
            .catch(function(err) {
                if(err === ERR_LOGIN_INVALID) {
                    res.status(400).json({
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
        // TODO: crypt pass.
        var accountData = {
            email: sanitize(req.body.email),
            password: sanitize(req.body.password),
            name: sanitize(req.body.name)
        };
        
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

    controller.loginFacebook = function(req, res) {
        var loginData = {
            userId: sanitize(req.body.userId),
            accessToken: sanitize(req.body.accessToken)
        };

        var filter = {
            userId: loginData.userId
        };

        FacebookAuthToken.findOne(filter)
            .then(function(user) {
                if(!!user) {
                    return FacebookAuthToken.update(
                        filter,
                        {
                            $set: {
                                email: loginData.email,
                                accessToken: loginData.accessToken
                            }
                        }
                    );
                }
                else {
                    return FacebookAuthToken.create(loginData);
                }
            })
            .then(function() {
                res.status(200).end();
            })
            .catch(function(err) {
                res.status(500).end();
            });
    };

    return controller;
}