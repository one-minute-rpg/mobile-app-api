var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        email: {
            type: String
        },
        accessToken: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('FacebookAuthToken', schema);
};