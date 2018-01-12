"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    Object.defineProperty(User.prototype, "newEmail", {
        set: function (newMail) {
            this.email = newMail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "newPassword", {
        set: function (newPass) {
            this.password = newPass;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports["default"] = User;
