var sanitize = require('mongo-sanitize');
var chance = require('chance')();

function normalizePage(page) {
    var result = +sanitize(page) || 0;
        
    if(isNaN(result) || result < 0) {
        result = 0;
    }

    return result;
}

module.exports = function (app) {
    var QuestResume = app.models.QuestResume;
    var QuestFull = app.models.QuestFull;

    var controller = {};

    controller.search = function (req, res) {
        var QuestResume = app.models.QuestResume;

        var search = sanitize(req.query.q);
        var page = normalizePage(req.query.page);
        var itensPerPage = 10;

        var find = !!search ? {"title": new RegExp(search, 'i')} : {};

        QuestResume
            .find(find)
            .limit(itensPerPage)
            .skip(itensPerPage * page)
            .exec(function(err, quests) {
                res.status(200).json({
                    quests: quests,
                    noMoreData: quests.length < itensPerPage
                });
            });
    };

    controller.find = function(req, res) {
        var id = sanitize(req.params.id);
        res.status(200).json({});
    };

    controller.download = function(req, res) {
        var id = sanitize(req.params.id);

        QuestFull.findOne({quest_id: id})
            .then(function(quest) {
                res.status(200).json({
                    quest: quest
                });
            })
            .catch(function(err) {
                res.status(500).end();
            });
    };

    controller.publish = function(req, res) {
        var quest = req.body;

        var query = {
            quest_id: quest.quest_id
        };

        QuestFull.findOne(query)
            .then(function(dbQuest) {
                if(!!dbQuest) {
                    quest.version = dbQuest.version + 1;
                    return QuestFull.update(query, {
                        $set: quest
                    });
                }
                else {
                    quest.version = 1;
                    return QuestFull.create(quest);
                }
            })
            .then(function(){
                return QuestResume.findOne(query);
            })
            .then(function(dbQuestResume) {
                var resumeModel = {
                    quest_id: quest.quest_id,
                    title: quest.title,
                    language: quest.language,
                    cover: quest.cover,
                    description: quest.description,
                    version: 1
                };

                if(!!dbQuestResume) {
                    resumeModel.version = dbQuestResume.version + 1;

                    return QuestResume.update(query, {
                        $set: resumeModel
                    });
                }
                else {
                    return QuestResume.create(resumeModel);
                }
            })
            .then(function(result) {
                res.status(200).end();
            })
            .catch(function(err) {
                res.status(500).end();
            });
    };

    controller.getResume = function(req, res) {
        var id = sanitize(req.params.id);
        var query = { quest_id: id };

        QuestResume.findOne(query)
            .then(function(questResume) {
                res.status(200).json(questResume);
            })
            .catch(function(err){
                res.status(500).end();
            });
    }
    
    return controller;
}