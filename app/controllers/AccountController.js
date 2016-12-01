var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function (app) {
    var controller = {};

    controller.login = function (req, res) {
        var loginData = {
            email: sanitize(req.body.email),
            password: sanitize(req.body.password)
        };

        res.status(200).json({
            token: chance.guid()
        });
    };

    controller.recoverPassword = function (req, res) {
        var email = sanitize(req.body.email);
        res.status(200).end();
    };

    controller.create = function (req, res) {
        var accountData = {
            email: sanitize(req.body.email),
            name: sanitize(req.body.name),
            password: sanitize(req.body.password)
        };

        res.status(200).end();
    }

    return controller;
}