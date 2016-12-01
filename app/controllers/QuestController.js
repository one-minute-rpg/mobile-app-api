var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function (app) {
    var controller = {};

    controller.search = function (req, res) {
        var search = sanitize(req.query.q);
        res.status(200).json([
            {
                id: chance.guid(),
                title: {
                    'pt_br': 'O cavaleiro da morte',
                    'en_use': 'The death knight'
                },
                image: 'http://img09.deviantart.net/9ef3/i/2012/351/d/2/death_knight_by_rinacane-d5obt2e.jpg'
            }
        ]);
    };

    controller.find = function(req, res) {
        var id = sanitize(req.params.id);
        res.status(200).json({});
    };

    controller.download = function(req, res) {
        var id = sanitize(req.params.id);
        res.status(200).json({});
    };
    
    return controller;
}