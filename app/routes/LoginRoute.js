module.exports = function(app) {
    var controller = app.controllers.LoginController;

    app.route('/login/enter')
        .post(controller.enter);
}