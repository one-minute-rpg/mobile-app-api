module.exports = function (app) {
    var controller = app.controllers.AccountController;

    app.route('/account/login')
        .post(controller.login);

    app.route('/account/create')
        .post(controller.createAccount);
};