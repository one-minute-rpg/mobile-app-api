var sanitize = require('mongo-sanitize');

module.exports = function (app) {
    var AuthToken = app.models.AuthToken;

    return function(req, res, next) {
        var token = sanitize(req.headers.authtoken);

        AuthToken.findOne({token: token})
            .then(function(authToken) {
                if(!!authToken) {
                    req.authData = authToken;
                    next();
                }
                else {
                    res.status(401).json({
                        code: 'ERR_TOKEN_EXPIRED'
                    });
                }
            })
            .catch(function(err){
                res.status(500).json({
                    code: 'ERR_INTERNAL'
                });
            });
    }
};