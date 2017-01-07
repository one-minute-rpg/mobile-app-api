var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        user_email: {
            type: String,
            required: true
        },
        quest_id: {
            type: String,
            required: true
        },
        like: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('QuestUser', schema);
};