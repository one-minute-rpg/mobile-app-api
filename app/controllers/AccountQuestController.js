var sanitize = require('mongo-sanitize');
var chance = require('chance')();

module.exports = function (app) {
    var controller = {};

    var QuestUser = app.models.QuestUser;
    var QuestResume = app.models.QuestResume;
    
    controller.comment = function(req, res) {
        var commentData = {
            stars: sanitize(req.body.stars),
            title: sanitize(req.body.title),
            comment: sanitize(req.body.comment)
        };

        res.status(200).json({});
    };    

    controller.editComment = function(req, res) {
        var commentData = {
            id: sanitize(req.body.id),
            stars: sanitize(req.body.stars),
            title: sanitize(req.body.title),
            comment: sanitize(req.body.comment)
        };

        res.status(200).json({});
    };

    controller.saveQuestToAccount = function(req, res) {
        res.status(200).json();
    };

    controller.removeQuestFromAccount = function(req, res) {
        res.status(200).json();
    };

    controller.saveGame = function(req, res) {
        var gameData = sanitize({

        });

        res.status(200).json();
    };

    controller.getSavedGames = function(req, res) {
        res.status(200).json([]);
    };

    controller.getAllLiked = function(req, res) {
        var authData = req.authData;
        var email = authData.email;
        var query = {user_email: email};

        QuestUser.find(query)
            .then(function(quests) {
                var respData = quests.map(function(q) {
                    return {
                        quest_id: q.quest_id
                    }
                });

                res.status(200).json(respData);
            })
            .catch(function(err) {
                res.status(500).json({
                    code: 'ERR_INTERNAL'
                });
            })
    };

    controller.like = function(req, res) {
        var authData = req.authData;
        var questId = sanitize(req.body.questId);

        var filter = {user_email: authData.email, quest_id: questId};
        var isLiked = null;

        QuestUser.findOne(filter)
            .then(function(questUser) {
                if(!!questUser) {
                    isLiked = !questUser.like;
                    return QuestUser.update(filter, {
                        $set: {
                            like: isLiked
                        }
                    });
                }
                else {
                    isLiked = true;

                    return QuestUser.create({
                        user_email: filter.user_email,
                        quest_id: questId,
                        like: isLiked
                    });
                }
            })
            .then(function() {
                return QuestResume.findOne({quest_id: questId});
            })
            .then(function(questResume) {
                questResume.likes += isLiked ? 1 : -1;

                return QuestResume.update({quest_id: questId}, {
                    $set: {
                        likes: questResume.likes
                    }
                });
            })
            .then(function() {
                res.status(200).end();
            })
            .catch(function(err) {
                res.status(500).json({
                    code: 'ERR_INTERNAL'
                });
            });
    }

    return controller;
}