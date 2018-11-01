/**
 * Created by Jonathan on 2016/4/22.
 *  网络连接类
 */

var Connet = function () {
    this._socketOption_ = {};
};
var p = Connet.prototype;

/**
 * jsonP 加密方法
 * @param param
 * @returns {string}
 */
var getJsonPSign = function(param){
    var paramArray = [],str = "";
    for(var key in param){
        paramArray.push(key);
    }
    paramArray.sort();
    for(var i=0; i<paramArray.length; i++){
        str += "&"+paramArray[i]+"="+param[paramArray[i]];
    }
    str = str.substring(1);
    return encodeURIComponent(cg.JP("A5eq8SAvPjrD",str));
};

/**
 * 前端服务器请求
 * @param url
 * @param param
 * @param callback
 * @param type
 */
p.queryWeb = function (url,param,callback,type) {
    cg.queryWeb(url,param,callback,type);
};

/**
 * socket网络请求
 * @param host
 * @param port
 * @param route 路径
 * @param params
 * @param callback
 */
p._socketQuery = function (host,port,route,params,callback) {
    var self = this,
        h = host||window.location.hostname,
        po = port.toString(),
        socketKey = "|"+h+":"+po+"|";
    self.removeSocketListener("io-error");
    self.removeSocketListener("error");
    self.removeSocketListener("onKick");
    self.removeSocketListener("close");
    //self.removeSocketListener("heartbeat timeout");
    self._socketOption_[socketKey] = {
        host:h,
        port:po,
        route:route,
        params:params,
        isClosed:false
    };
    pomelo.init({
        host: h,
        port: po,
        log: true
    }, function() {
        pomelo.request(route, params,callback);
    });
    //

    self.addSocketListener("io-error", function (e) {
        console.log("出错(io-error):",e);
        var option = self._socketOption_[socketKey];
        if(!option) return;
        option.isClosed = true;
        // UITools.msgAlert("抱歉!服务器正在维护!",500,300);
    });
    self.addSocketListener("error", function (e) {
           console.log("出错(error):",e);
    });
    self.addSocketListener("onKick", function (e) {
           console.log("onKick!",e);
    });
    // self.addSocketListener("close", function (e) {
    //     console.log("close！",e);
    // });
    //断线提示
    // self.addSocketListener("heartbeat timeout",function (res) {
    //     // self._socketReConnect(socketKey);
    // });
};

p._socketReConnect = function (socketKey) {
    var option = this._socketOption_[socketKey];
    if(!option || option.isClosed) return;
    var self = this;
};

/**
 * 连接服务器查询
 * @param uid
 * @param callback
 */
p.getConnector = function (socketHost,port,uid,callback) {
    this._socketQuery(socketHost,port,"gate.gateHandler.queryEntry",{
            uid:uid
        },
        function(data) {
            pomelo.disconnect();
            if(data.port){
                // cg.gameInfo.user.socket_host = data.host;
                // cg.gameInfo.user.socket_point = data.port;
                callback(data);
            }else  callback(data);
        });
};

//进入匹配服务器
p.joinQueue = function (uid,callback) {
    var self = this;
    //如果未分配连接服  先获取
    if(cg.gameInfo.user.socket_host === cg.gameInfo.user.socket_gate_host && 
        cg.gameInfo.user.socket_point === cg.gameInfo.user.socket_gate_point){
        this.getConnector(uid,function(err,res){            
            //分配后递归调用自身
            if(!err)self.joinQueue(uid,callback);
            else{ if(callback)callback(500); }
        });
    }else{
        this._socketQuery(cg.gameInfo.user.socket_host,cg.gameInfo.user.socket_point,"connector.entryHandler.queueEntry",
        {
            uid: cg.gameInfo.user.uid,
            headImg: cg.gameInfo.user.headimg,
            sex: cg.gameInfo.user.sex,
            game_id: cg.gameInfo.user.game_id,
            player_name: cg.gameInfo.user.name,
            player_type: cg.gameInfo.user.type,//0:app用户 1:微信用户 2:QQ用户
            roomSign: cg.gameInfo.user.roomSign
        },
        callback);
    }    
};

p.joinGame = function(option,callback){

    pomelo.disconnect();

    this._socketQuery(option.host,option.port,"connector.entryHandler.entry",option,callback);
};

p.joinGame2 = function(option,callback){
    option.uid = cg.gameInfo.user.uid;
    option.is_ai = 0;
    option.headImg = cg.gameInfo.user.headimg;
    option.sex = cg.gameInfo.user.sex;
    option.player_name = cg.gameInfo.user.name;
    option.player_type = cg.gameInfo.user.type,//0:app用户 1:微信用户 2:QQ用户
    option.uid2 = window.aiPlayer.uid;
    option.headImg2 = window.aiPlayer.headImg;
    option.sex2 = window.aiPlayer.sex;
    option.is_ai2 = 1;
    option.player_name2 = window.aiPlayer.name;
    option.player_type2 = window.aiPlayer.type;
    pomelo.disconnect();
    this._socketQuery(cg.gameInfo.user.socket_host,cg.gameInfo.user.socket_point,"connector.entryHandler.gameEntry2",option,callback);
};

/**
 * 移除事件监听
 */
p.removeSocketListener = function (name) {
    pomelo.off(name);
};

p.socketDisconnect = function () {
    pomelo.disconnect();
};

/**
 * 添加监听
 * @param name
 * @param callback
 * @param scope
 */
p.addSocketListener = function (name,callback,scope) {
    pomelo.on(name, function () {
        callback.apply(scope||this,arguments);
    });
};

p.UpdatePingStep = 1000;
p.serverTimeCheckSTO = null;
p.ServerTimePlus = 0;
p.PING = 0;
p.serverTimeCheck = function(callback){
    var self = this;
    this.serverTimeCheckSTO = setTimeout(function(){
        var sendTime = Date.now();
        pomelo.request("bomber.playerHandler.measureServerTime",{},function(res){
            var backTime = Date.now();
            var ping = backTime-sendTime>>1;
            self.PING = ping;
            self.ServerTimePlus = backTime - (Number(res.data)+self.PING);
            // console.log("PING",ping,"ServerTimePlus",self.ServerTimePlus);
            if(callback)callback(ping);
            self.serverTimeCheck(callback);
        });
    },this.UpdatePingStep);
};

p.stopServerTimeCheck = function () {
    clearTimeout(this.serverTimeCheckSTO);  
};

p.getServerTime = function () {
    return (Date.now()-this.ServerTimePlus);
};

p.actionPush = function (action,body,timer,route) {
    var actionPushData = {};
    actionPushData.action = action;
    actionPushData.body = JSON.stringify(body);
    // actionPushData.timer = (this.getServerTime());
    actionPushData.timer = timer||Date.now();
    // actionPushData.plus = this.ServerTimePlus;
    pomelo.notify(route||"doll.playerHandler.playerAction",actionPushData);
    return actionPushData;
};

p.clearTeamId = function (callback) {
    cg.gameInfo.user.teamId = null;
    cg.gameInfo.user.teamPlayerCount = 0;
    cg.queryWeb("/clear_teamId",{},callback);
};

export default new Connet();