//config/express.js
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function(){
    var app = express();
    
    app.set('port', 3000);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    // se nenhum rota atender, direciona para página 404
    app.get('*', function(req, res) {
        res.status(404).end();
    });

    return app;
};