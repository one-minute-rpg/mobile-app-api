//config/express.js
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function () {
    var app = express();

    app.set('port', 3000);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(cors());

    load('models', { cwd: 'app' })
        .then('controllers')
        .then('routes')
        .into(app);

    app.get('*', function (req, res) {
        res.status(404).end();
    });

    app.post('*', function (req, res) {
        res.status(404).end();
    });

    return app;
};