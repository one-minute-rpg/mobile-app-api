module.exports = function (app) {
    var controller = app.controllers.AccountController;

    app.route('/account/login')
        .post(controller.login);

    app.post('/account/recover-password')
        .post(controller.recoverPassword);

    app.post('/account/create')
        .post(controller.create);
};