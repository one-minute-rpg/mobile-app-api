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
        },
        likes: {
            type: Number,
            default: 0
        },
        version: {
            type: Number,
            default: 0
        }
    });

    return mongoose.model('QuestResume', schema);
};