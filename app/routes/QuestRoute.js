module.exports = function (app) {
    var controller = app.controllers.QuestController;

    app.route('/quest/search')
        .get(controller.search);

    app.route('/quest/find')
        .get(controller.find);

    app.route('/quest/download/:id')
        .get(controller.download);

    app.route('/quest/publish')
        .post(controller.publish);
};