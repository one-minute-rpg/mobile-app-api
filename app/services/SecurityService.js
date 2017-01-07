var md5 = require('md5');
var SALT = '$_OMR%$_RPG_%';

module.exports = function (app) {
    function toMD5(text) {
        return md5(SALT + text);
    }

    return {
        toMD5: toMD5
    };
};