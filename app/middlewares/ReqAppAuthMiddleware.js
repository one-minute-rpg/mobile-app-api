module.exports = function() {
    var allowedKeys = [
        // realm
        'da8945882d90d542d4519cfa7a14a5bf'
    ];

    return function(req, res, next) {
        var headerKey = req.headers.appkey;

        var hasKey = allowedKeys.indexOf(headerKey);

        if(hasKey) {
            next();
        }
        else {
            res.status(401).end();
        }
    }
}