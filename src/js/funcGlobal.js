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
    Vue.prototype.translateCityLevel = function (level) {
        if(level=='一线城市'){
            return 1
        } else if(level=='二线城市'){
            return 2
        } else if(level=='三线城市'){
            return 3
        } else if(level=='四线城市'){
            return 4
        } else if(level=='五线城市'){
            return 5
        } else{
            return level
        }
    };
};