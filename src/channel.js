/**
 *
 */
import CF from './CF'
import {promoterInfo} from './server/getServerData'

var channelController = function () {
    // this.title =  '能赚钱的娃娃机，用微信就能玩，边玩边赚钱';
    // this.desc = '第1次玩可免费抓3次。抓到娃娃全国包邮。还可加入合伙人，推广游戏赚钱，可提现';
    // this.imgUrl = 'https://wwjcdn.like000.com/videoDollCatcher/icon2.jpg' // 分享图标
    this.title = '';
    this.desc = '';
    this.imgUrl = '';
    this.shareLink = '';
};
var p = channelController.prototype;
/**
 * 初始化
 */
p.init = function (sdkOkCb) {
    var self = this;
    var platform = Number(CF.user.platform);
    this.setShareInfo();
    switch (platform) { //js sdk 作用于分享
        case 1001: //默认微信
            self.addSdk('https://res.wx.qq.com/open/js/jweixin-1.2.0.js', function () {
                self.weReady();
            });
            self.statistics();
            break;

        case 1003: //1758
            self.addSdk('//res.1758.com/sdk/js/1758sdk.js', function () {
                window.hlmysdk = window.HLMY_SDK;
                hlmysdk.init({
                    "gid": CF.user.gid, //通过"用户验证"接口获取到的1758平台gid
                    "appKey": CF.user.appKey, //游戏的appkey
                    "hlmy_gw": CF.user.hlmy_gw, //1758平台的自定义参数，CP通过授权回调地址后的参数获得
                    "hlmy_gp": CF.user.hlmy_gp
                });
                window.onShareTimeline = function () {
                    //分享成功朋友圈
                    CF.pubsub.$emit('shareSuccess', '1758')
                };
                //屏蔽关注或者分享
                self.close1758();

                if (sdkOkCb)
                    sdkOkCb();

                window.isClick = true;
                //道具支付
                window.orderPayment1758 = function (itemCode) {
                    if (!window.isClick) {
                        return;
                    }
                    window.isClick = false;
                    (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'create_order', {
                        user_id: CF.user.uid,
                        goods_id: itemCode || 'pay_10_2',
                        isIos: CF.TOOLS.isIos(),
                        isIosNewVerSion: CF.isIosNewVerSion, //针对噶么
                        sign: CF.M5B({
                            user_id: CF.user.uid,
                            goods_id: itemCode || 'pay_10_2',
                            isIos: CF.TOOLS.isIos(),
                            isIosNewVerSion: CF.isIosNewVerSion
                        })
                    }, function (data) {
                        window.isClick = true;
                        if (data.status == 1) {
                            channelController.prototype.pay_1758(data.data);
                        }
                    });
                }
            });
            break;

        case 1004: //默认小程序
            self.addSdk('https://res.wx.qq.com/open/js/jweixin-1.3.2.js', function () {
            });
            break;
        case 1005: //嘎么
            // window.gameApp.gamePageLoadRead('1');
            self.buy_gm();
            break;
        case 1010: //新app
            // window.gameApp.gamePageLoadRead('1');
            self.buy_gm();
            break;
        case 1008: //简单游戏
            self.addSdk('https://m.yxitai.com/Public/mobile/js/https_game.1.02.js', function () {
                window.GYxitai = new Yxitai({
                    appid: "1058",
                    from: "yxitai",
                    userid: CF.user.openid
                });
            });
            break;
        case 1013: //9G 游戏
            self.addSdk('https://game.9g.com/js/lib.v2.js', function () {
                window.game9g = new Game9G({
                    gameid: "xtwwj",	// 第三方游戏 gameid，进入CP游戏地址时携带的参数
                    channel: CF.TOOLS.getUrlAttribute('channel_9g'),	// 渠道标识，进入CP游戏地址时携带的参数
                    token: CF.TOOLS.getUrlAttribute('token_9g')		// 9G 用户 token，进入CP游戏地址时携带的参数
                });

                window.game9g.ready(function () {
                    console.log('game9g.ready');

                    if (CF.user.isNewUser) {
                        window.game9g.createRole({
                            server_id: 1,
                            server_name: "1",
                            role_id: 1,
                            nickname: CF.user.userName
                        }, function () {
                            console.log('game9g.createRole');
                        });
                    }
                });
            });
            break;
    }
};

p.addSdk = function (src, cb) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.onload = function () {
        if (cb) cb();
    }
    oScript.src = src;
    oHead.appendChild(oScript);
};

p.statistics = function () {
    let oHead = document.getElementsByTagName('HEAD').item(0);
    let oDiv = document.createElement('div')
    oDiv.style.display = 'none';
    let onScript = document.createElement('script');
    onScript.type = 'text/javascript';
    onScript.src = 'https://s22.cnzz.com/z_stat.php?id=1274375618&web_id=1274375618';
    oDiv.appendChild(onScript);
    oHead.appendChild(oDiv);
};

p.setShareInfo = function () {
    if (CF.user.uid % 10 == 1) {
        this.title = '❤明星们都在玩的娃娃机，根本停不下来！';
        this.desc = '新人免费送，全国包邮，无需下载，即点即玩☛';
        this.imgUrl = 'https://wwjcdn.like000.com/videoDollCatcher/6.png';
    } else if (CF.user.uid % 10 == 2) {
        this.title = '心跳抓娃娃”新人免费送！送！送!';
        this.desc = '用微信就能抓的娃娃机，全国包邮，手慢就没有了~';
        this.imgUrl = 'https://wwjcdn.like000.com/videoDollCatcher/6.png' // 分享图标
    } else if (CF.user.uid % 10 == 3) {
        this.title = '明星们都在玩的娃娃机，根本停不下来！';
        this.desc = '微信在线，无需下载，即点即玩包邮送到家~新人更有免费好礼相送！';
        this.imgUrl = 'https://wwjcdn.like000.com/videoDollCatcher/10.png' // 分享图标
    } else {
        this.title = '明星们都在玩的娃娃机，根本停不下来！';
        this.desc = '微信在线，无需下载，即点即玩包邮送到家~新人更有免费好礼相送！';
        this.imgUrl = 'https://wwjcdn.like000.com/videoDollCatcher/10.png' // 分享图标
    }
};


p.follow_1758 = function (cb) {
    hlmysdk.checkFollow(function (obj) {
        if (obj.follow == 1) {
            (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'yqwb_follow', {
                user_id: CF.user.uid,
                sign: CF.M5B({
                    user_id: CF.user.uid
                })
            }, function (data) {
                if (data.status == 1) {
                    cb(1, 1);
                } else {
                    cb(1, 0)
                }
            });

        } else {
            cb(0);
        }
    });
}
p.follow_1758_tip = function () {
    if (hlmysdk) {
        hlmysdk.follow();
    }
}
p.close1758 = function () {
    hlmysdk.adaptParams(function (obj) {
        if (obj.result != 1) return;

        CF.pubsub.$emit('show1758_sign');

        let totalData = obj.data.adaptParams;
        for (let i = 0; i < totalData.length; i++) {
            var item = totalData[i];
            if (item && item.key == 'share.enable' && item.value != 'true') {
                setTimeout(function () {
                    CF.pubsub.$emit('close1758_share')
                }, 1000)
            }
            if (item && item.key == 'follow.enable' && item.value != 'true') {
                setTimeout(function () {
                    CF.pubsub.$emit('close1758_follow')
                }, 500)
            }
        }
    });
};


//嘎么支付通知
p.buy_gm = function () {
    var self = this;

    window.__paySuccess = function (param) {
        if (param) {
            if (self.gm_pay_successCb)
                self.gm_pay_successCb();
        } else {
            // PublicUI.msgAlert('支付失败');
        }
    }
};

//支付
p.pay = function (param, successCb) {
    //默认微信支付
    if (CF.user.platform == 1001) {
        this.wxPay(param, successCb);
        return;
    }

    //默认h5支付
    if (CF.user.platform == 1002 || CF.user.platform == 1006 || CF.user.platform == 1009 || CF.user.platform == 1011 || CF.user.platform == 1010 || CF.user.platform == 1012) {
        if (CF.user.visiter) {
            CF.Vue.prototype.$login({
                isClose: true
            });
            return;
        }
        successCb(1);
        return;
    }
    // 小程序
    if (CF.user.platform == 1004) {

        let path = `/pages/pay/pay?timeStamp=${param.timeStamp}&nonceStr=${param.nonceStr}&package=${param.package}&prepayId=${param.prepay_id}&signType=
        MD5&paySign=${param.paySign}`;
        wx.miniProgram.redirectTo({
            url: path
        });

        return;
    }

    if (CF.user.platform == 1005) {
        //噶么ios新版
        if (CF.isIosNewVerSion && CF.TOOLS.isIos()) {
            successCb(1);
            return;
        }
        //噶么ios旧版
        if (!CF.isIosNewVerSion && CF.TOOLS.isIos()) {
            this.gm_pay_successCb = successCb;
            window.gameApp.outsideGameBuyGameProp(param.gm_cost, param.gm_string, param.gm_oid, param.gm_ext);
            return;
        }

        //噶么安卓
        if (!CF.TOOLS.isIos()) {
            successCb(1);
            return;
        }
    }

    //1758
    if (CF.user.platform == 1003) {
        // alert(param)
        this.pay_1758(param);
        return;
    }

    //248
    if (CF.user.platform == 1007) {
        let time = new Date().getTime();
        let data = {
            gameId: param.gameId,
            orderId: param.orderId,
            goodsName: param.goodsName,
            goodsId: param.goodsId,
            money: param.money,
            uid: param.uid,
            serverId: param.serverId || 1,
            ext: param.ext,
            time: time,
            sign: CF.M5B(`${param.gameId}${param.ext}${param.money}${time}f1278d2824ca4bd375af4e00da08d587`, 1)
        };
        window.parent.postMessage(data, "*");
    }

    //指舞游戏
    if (CF.user.platform == '1008') {
        window.GYxitai.pay(param);
    }

    //9G 游戏支付
    if (CF.user.platform == '1013') {

        //成功回调
        param.onPayCallback = () => {
            successCb(null)
        };
        //失败回调
        param.onPayCancel = () => {
        };
        window.game9g.pay(param);
    }
};

/**
 * WIFI支付 type == 0;微信支付，type == 1 wifi支付
 * @param type
 * @param param
 * @param successCb
 */
p.payForWifi = (type, param, successCb) => {
    if (type == 0) {
        successCb(1)
    } else {
        let url = window.location.href;
        window.location.href = `https://ebinfonew.shengpay.com/Activity/wifi/rw/money/zhifu/pay.html?ext=${JSON.stringify(param)}&url=${url}`;
    }
};


p.pay_1758 = function (param) {
    hlmysdk.pay({
        "paySafecode": param.data.paySafecode //通过“服务器后台下单接口”返回的支付安全码
    });
};

//微信支付
p.wxPay = function (param, successCb) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            param,
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    if (successCb) successCb();
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    // alert("支付取消！")
                } else {
                    // alert("支付出错！")
                }
            }
        );
    }
};
//微信h5支付直接跳链接
p.share = function () {
    if (CF.user.platform == 1003) { //1758
        this.share_1758();
    }
    // if(CF.user.platform==1001){//微信默认
    //     CF.pubsub.$emit('showSh')
    // }
};

//1758分享
p.share_1758 = function () {
    var self = this;
    hlmysdk.setShareInfo({
        "state": "",
        "tipInfo": true,
        "reward": []
    });
};

p.shareSuccess = () => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'share_statistics', {
        user_id: CF.user.uid,
        sign: CF.M5B({
            user_id: CF.user.uid
        })
    }, () => {
    });


    setTimeout(() => {
        promoterInfo('promoter_info', (res) => {
            if (res['status'] == 1) {
                if (res['data']['status'] == 2 || res['data']['status'] == 1 || res['data']['status'] == 3) {
                    CF.app.$store.commit('getPromoteInfo', res['data']);
                }
            }
        })
    }, 200);


};

//微信分享
p.weReady = function () {

    if (CF.user.platform != 1001) {
        return;
    }

    var self = this;
    var URI = encodeURIComponent(location.href.split('#')[0]);
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'wx_config', {
        user_id: CF.user.uid,
        uri: URI,
        sign: CF.M5B({
            user_id: CF.user.uid,
            uri: URI
        })
    }, function (data) {

        var data = data.data.config;
        let arr = [];
        arr.unshift('hideAllNonBaseMenuItem', 'showMenuItems');
        arr = arr.concat(data['jsApiList']);

        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: arr
        });

        // let shareLink = ''; // 分享链接
        // 248
        let v = CF.TOOLS.getUrlAttribute('v');

        if (CF.user.platform == '10007') {
            if (CF.gameInfo.env == 1) {
                self.shareLink = `https://h5wwj.xintiao100.com/development/dist/newIndex.html?id=0&channel=${CF.user._channel}&share_id=${CF.user.uid}&shareCode=${CF.user.openid}`;
            } else {
                self.shareLink = `https://${window.location.host}/videoDollCatcher/newIndex.html?v=${v}&id=0&channel=${CF.user._channel}&share_id=${CF.user.uid}&shareCode=${CF.user.openid}`
            }
        } else {
            if (CF.gameInfo.env == 1) {
                self.shareLink = `https://${window.location.host}/development/dist/newIndex.html?id=0&channel=${CF.user._channel}&share_id=${CF.user.uid}`;
            } else {
                self.shareLink = `https://${window.location.host}/videoDollCatcher/newIndex.html?v=${v}&id=0&channel=${CF.user._channel}&share_id=${CF.user.uid}`
            }
        }


        wx.ready(function () {
            // //分享到朋友圈
            wx.hideAllNonBaseMenuItem();

            wx.showMenuItems({
                menuList: data['shareList']
            });

            // wx.onMenuShareTimeline({
            //     title: self.title, // 分享标题
            //     link: shareLink,
            //     imgUrl: 'https://wwjcdn.like000.com/videoDollCatcher/icon.jpg', // 分享图标
            //     success: function () {
            //         /**/
            //         // 用户确认分享后执行的回调函数
            //         self.setShareInfo();
            //         self.shareSuccess()
            //     },
            //     cancel: function () {
            //         // 用户取消分享后执行的回调函数
            //         self.setShareInfo();
            //     }
            // });

            //分享到朋友
            wx.onMenuShareAppMessage({
                title: self.title, // 分享标题
                desc: self.desc, // 分享描述
                link: self.shareLink,
                imgUrl: self.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    /**/
                    // 用户确认分享后执行的回调函数
                    self.setShareInfo();
                    self.shareSuccess()
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    self.setShareInfo();
                }
            });
            //分享到QQ
            wx.onMenuShareQQ({
                title: self.title, // 分享标题
                desc: self.desc, // 分享描述
                link: self.shareLink,
                imgUrl: self.imgUrl, // 分享图标
                success: function () {
                    /**/
                    // 用户确认分享后执行的回调函数
                    self.setShareInfo();
                    self.shareSuccess()
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    self.setShareInfo();
                }
            });
            // 微信分享错误
            wx.error(function (err) {
                // alert("wechartErr", err);
            })
        });
    });
};

// 关注
p.focus = () => {

    if (CF.user.platform == '1007') {

        window.parent.postMessage({
            behavior: 'subscribe',
            sub_type: 2,
            uid: CF.user.openid + ''
        }, "*");

    } else if (CF.user.platform == '1008') {

    } else if (CF.user.platform == '1001') {

        window.location.href = CF.user.follow_url;

    } else if (CF.user.platform == '1013') {
        // window.game9g.checkSubscribe(function (result) {
        //     if(result == 1){
        //         game_9g_follow('game_9g_follow',(res)=>{
        //             if(res['status'] == 1){
        //             }
        //             if(res['status'] == 2){
        //             }
        //             if(res['status'] == -1){
        //             }
        //         })
        //     }else{
        //         window.game9g.gotoSubscribe();
        //     }
        // })
    }
};

export default new channelController();
