exports.install = function (Vue, options) {
    Vue.prototype.toLogin = function () {
        localStorage.clear();
        this.$router.push("login");
    };
};