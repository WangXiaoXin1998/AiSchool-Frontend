exports.install = function (Vue, options) {
    Vue.prototype.toLogin = function () {
        localStorage.clear();
        this.$router.push("login");
    };
    Vue.prototype.getCityLevel = function (level) {
        if(level==1){
            return '一线城市'
        } else if(level==2){
            return '二线城市'
        } else if(level==3){
            return '三线城市'
        } else if(level==4){
            return '四线城市'
        } else if(level==5){
            return '五线城市'
        } else{
            return '其它城市'
        }
    };
};