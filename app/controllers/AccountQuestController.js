var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function (app) {
    var controller = {};
    
    controller.comment = function(req, res) {
        var commentData = {
            stars: sanitize(req.body.stars),
            title: sanitize(req.body.title),
            comment: sanitize(req.body.comment)
        };

        res.status(200).json({});
    };    

    controller.editComment = function(req, res) {
        var commentData = {
            id: sanitize(req.body.id),
            stars: sanitize(req.body.stars),
            title: sanitize(req.body.title),
            comment: sanitize(req.body.comment)
        };

        res.status(200).json({});
    };

    controller.saveQuestToAccount = function(req, res) {
        res.status(200).json();
    };

    controller.removeQuestFromAccount = function(req, res) {
        res.status(200).json();
    };

    controller.saveGame = function(req, res) {
        var gameData = sanitize({

        });

        res.status(200).json();
    };

    controller.getSavedGames = function(req, res) {
        res.status(200).json([]);
    };

    return controller;
}