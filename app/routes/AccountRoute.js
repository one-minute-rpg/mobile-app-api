module.exports = function (app) {
    var controller = app.controllers.AccountController;

    app.route('/account/login-facebook')
        .post(controller.loginFacebook);
};