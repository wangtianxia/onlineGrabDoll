import CF from '../router/ind'

window.gameSDk = function () {
    this.userId = 0;
};

var w = gameSDk.prototype;
//设置用户id
w.setUserId = function (uid) {
    this.userId = uid;
};
//获取id
w.getUserId = function () {
    return this.userId;
};
//用户返回
w.goBack = function () {
    CF.app.$router.go(-1)
};
export default new gameSDk();



