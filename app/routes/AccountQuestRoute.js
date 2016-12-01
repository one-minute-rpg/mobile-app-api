module.exports = function (app) {
    var controller = app.controllers.AccountQuestController;

    app.route('/account-quest/comment')
        .post(controller.comment)
        .put(controller.editComment);

    app.route('/account-quest/save-game')
        .get(controller.getSavedGames)
        .post(controller.saveGame);

    app.route('/account-quest/my-quests')
        .post(controller.saveQuestToAccount)
        .delete(controller.removeQuestFromAccount);
};