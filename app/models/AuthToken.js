var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        token: {
             type: String,
             required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('AuthToken', schema);
};