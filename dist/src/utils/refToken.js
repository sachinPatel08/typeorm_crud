var activeToken = function () {
    var value = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var token = "";
    for (var i = 0; i <= 20; i++) {
        token += value.charAt(Math.floor(Math.random() * value.length));
    }
    return token;
};
// activeToken()
module.exports = { activeToken: activeToken };
//# sourceMappingURL=refToken.js.map