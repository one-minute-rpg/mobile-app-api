var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function(app) {
    var controller = {};

    controller.enter = function(req, res) {
        var loginData = {
            email: sanitize(req.body.email),
            password: sanitize(req.body.password)
        };

        res.status(200).json({
            token: chance.guid()
        });
    };

    return controller;
}