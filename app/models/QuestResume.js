var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        cover: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        quest_id: { 
            type: String,
        }
    });

    return mongoose.model('QuestResume', schema);
};