var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function (app) {
    var controller = {};

    var FacebookAuthToken = app.models.FacebookAuthToken;

    controller.loginFacebook = function(req, res) {
        var loginData = {
            email: sanitize(req.body.email),
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