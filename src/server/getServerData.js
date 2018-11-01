/**
 * Created by Bkz on 2018/5/18.
 */

import CF from '../CF';

/**
 * 首页授权
 * @param url
 * @param id
 * @param cb
 */
export const grantAuth = (url, id, cb) => {
    let share_id = CF.TOOLS.getUrlAttribute('share_id') || 0;
    let moments = CF.TOOLS.getUrlAttribute('moments') || 0;
    let task_id = CF.TOOLS.getUrlAttribute('task_id') || 0;
    let doll_id = CF.TOOLS.getUrlAttribute('doll_id') || 0;
    let channel = CF.TOOLS.getUrlAttribute('channel') || 0;
    let distribution = CF.TOOLS.getUrlAttribute('distribution') || 0;
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        id: id || 0,
        share_id: share_id,
        moments: moments,
        task_id: task_id,
        doll_id: doll_id,
        channel: channel,
        distribution: distribution,
        sign: CF.M5B({id: id || 0})
    }, (data) => {
        cb(data);
    });
};

/**
 * 首页初始化用户
 * @param url
 * @param id
 * @param cb
 */
export const initUser = (url, id, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        id: id,
        moments: CF.TOOLS.getUrlAttribute('moments') || 0,
        task_id: CF.TOOLS.getUrlAttribute('task_id') || 0,
        doll_id: CF.TOOLS.getUrlAttribute('doll_id') || 0,
        sign: CF.M5B({id: id})
    }, (data) => {
        cb(data)
    })
};

/**
 * 首页获取兑换列表
 * @param url
 * @param cb
 */
export const enterRoom = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (data) {
        if (data['status'] == 1) { //定时刷新顺序不变
            cb(data['data']['list']);
        }
    });
};

/**
 * 首页推流信息
 * @param url
 * @param pushTimer
 * @param cb
 */
export const catchList = (url, pushTimer, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        time: pushTimer,
        sign: CF.M5B({time: pushTimer})
    }, function (data) {
        cb(data);
    });
};

/**
 * 首页获取机器列表
 * @param url
 * @param statue  用于 如果是定时刷新 就传1 不是定时刷新 传空
 * @param type   type=1 娃娃机 type=2 球球机
 * @param label  label 用来娃娃机 第几个标签的娃娃机
 * @param cb
 */
export const machineList = (url, statue, type, label, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        type: type,
        label: label || 0,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (data) {
        cb(data);
    });
};


/**
 * 首页同步金币
 * @param url
 * @param cb
 */
export const getGolds = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (data) {
        cb(data);
    });
};


/**
 * 首页开红包
 * @param url
 * @param cb
 */
export const openPacket = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, (data) => {
        cb(data);
    });
};

/**
 * 游戏页 开始游戏
 * @param url
 * @param machineId 机器id
 * @param cb
 */
export const startGame = (url, machineId, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
            user_id: CF.user.uid,
            machine_id: machineId,
            sign: CF.M5B({user_id: CF.user.uid, machine_id: machineId})
        }, (data) => {
            cb(data);
        }
    );
};

/**
 * 游戏结果页面
 * @param url
 * @param isSuccess
 * @param cb
 */
export const getRedPacket = (url, isSuccess, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        catch_result: !isSuccess,
        sign: CF.M5B({user_id: CF.user.uid, catch_result: !isSuccess})
    }, function (data) {
        cb(data)
    });
};

/**
 * 游戏页面 获取是否商品详细
 * @param url
 * @param dollId 娃娃ID
 * @param cb
 */
export const enterMachine = (url, dollId, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        doll_id: dollId,
        sign: CF.M5B({user_id: CF.user.uid, doll_id: dollId})
    }, (data) => {
        cb(data);
    });
};


/**
 * 支付页  创建订单
 * @param url
 * @param itemData 创建订单详细信息
 * @param cb
 */
export const createOrder = (url, itemData, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        goods_id: itemData.id,
        isIos: CF.TOOLS.isIos(),
        isIosNewVerSion: CF.isIosNewVerSion, //针对噶么
        sign: CF.M5B({
            user_id: CF.user.uid,
            goods_id: itemData.id,
            isIos: CF.TOOLS.isIos(),
            isIosNewVerSion: CF.isIosNewVerSion
        })
    }, (data) => {
        cb(data)
    })
};

/**
 * 支付页  获取支付列表
 * @param url
 * @param cb
 */
export const payList = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (data) {
        cb(data);
    });
};

/**
 * 代金券 页面 获取代金券列表
 * @param url
 * @param cb
 */
export const couponList = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (data) {
        cb(data);
    });
};


/**
 * 商品详情页
 * @param url
 * @param doll_id 娃娃id
 * @param cb
 */
export const getDetailInfo = (url, doll_id, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        doll_id: doll_id,
        sign: CF.M5B({user_id: CF.user.uid, doll_id: doll_id})
    }, (data) => {
        cb(data);
    });
};


/**
 * 娃娃秀页面 点赞
 * @param url
 * @param img_id 图片id
 * @param cb
 */
export const thumbsUp = (url, img_id, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
            user_id: CF.user.uid,
            img_id: img_id,
            sign: CF.M5B({user_id: CF.user.uid, img_id: img_id})
        }, (data) => {
            cb(data);
        }
    );
};

/**
 * 娃娃秀下拉加载更多
 * @param url
 * @param page_no 页面下标
 * @param doll_id 这个页面对呀的娃娃id 如果没有就为0 全部娃娃
 * @param cb
 */
export const showList = (url, page_no, doll_id, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
            user_id: CF.user.uid,
            page_no: page_no,
            doll_id: doll_id,
            sign: CF.M5B({user_id: CF.user.uid, page_no: page_no, doll_id: doll_id})
        }, (data) => {
            cb(data)
        }
    );
};

/**
 * 用户背包页面数据
 * @param url
 * @param cb
 */
export const userBag = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res);
    });
};

/**
 * 用户背包页面 获取娃娃信息
 * @param url
 * @param doll_id
 * @param cb
 */
export const dollInfo = (url, doll_id, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        _id: doll_id,
        sign: CF.M5B({user_id: CF.user.uid, _id: doll_id})
    }, function (res) {
        cb(res)
    });
};

/**
 * 首页banner 统计
 * @param url
 * @param bannerId
 * @param cb
 */
export const bannerStatistics = (url, bannerId, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        banner_id: bannerId,
        sign: CF.M5B({user_id: CF.user.uid, banner_id: bannerId,})
    }, function (res) {
        cb(res)
    });
};

/**
 * 创建推广员信息
 * @param url
 * @param cb
 */
export const create_promoter = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 推广员信息详情
 * @param url
 * @param cb
 */
export const promoterInfo = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 提现
 * @param url
 * @param cb
 */
export const withdraw = (url, money, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        money: money,
        sign: CF.M5B({user_id: CF.user.uid, money: money})
    }, function (res) {
        cb(res)
    });
};

/**
 * 提现记录
 * @param url
 * @param cb
 */
export const withdraw_record = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 交易明细
 * @param url
 * @param cb
 */
export const transaction_details = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 统计分享点击
 * @param url
 * @param cb
 */
export const promoter_share_click = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 9G 游戏关注领奖
 * @param url
 * @param cb
 */
export const game_9g_follow = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 *
 * @param url
 * @param cb
 */
export const homepage_promoter_click = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 提现金额
 * @param url
 * @param cb
 */
export const withdraw_money = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 今日提现列表
 * @param url
 * @param cb
 */
export const limit_withdraw_user_info = (url, money, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        money: money,
        sign: CF.M5B({user_id: CF.user.uid, money: money})
    }, function (res) {
        cb(res)
    });
};

/**
 * 今天有多少人提现
 * @param url
 * @param cb
 */
export const click_withdraw_button = (url, money, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        money: money,
        sign: CF.M5B({user_id: CF.user.uid, money: money})
    }, function (res) {
        cb(res)
    });
}

//分销任务
export const moments_task_list = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};


//10元提现任务
export const click_withdraw_task_button = (url, money, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        money: money,
        sign: CF.M5B({user_id: CF.user.uid, money: money})
    }, function (res) {
        cb(res)
    });
};

/**
 * 临时统计
 * @param url
 * @param behavior
 * @param cb
 */
export const behavior_statistics = (url, behavior, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        behavior: behavior,
        sign: CF.M5B({user_id: CF.user.uid, behavior: behavior})
    }, function (res) {
        cb(res)
    });
};

/**
 * 赚金币任务
 * @param url
 * @param cb
 */
export const task_list = (url, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign: CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * wifi 绑定手机号
 * @param url
 * @param cb
 */
export const bind_phone_no = (url, phone_no, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        phone_no: phone_no,
        sign: CF.M5B({user_id: CF.user.uid, phone_no: phone_no})
    }, function (res) {
        cb(res)
    });
};

/**
 * i获取之前的用户
 * @param url
 * @param cb
 */
export const wifi_get_user = (url, code, cb) => {
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        code: code,
        sign: CF.M5B({code: code})
    }, function (res) {
        cb(res)
    });
};

/**
 * wifi获取code
 * @param url
 * @param cb
 */
export const wifi_key_get_code = (url,cb)=>{
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {}, function (res) {
        cb(res)
    });
};

/**
 * 二维码后端合成
 * @param url
 * @param codeUrl
 * @param cb
 */
export const qr_code = (url,codeUrl,cb)=>{
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        url: CF.TOOLS.decToHex(codeUrl) ,
        sign:CF.M5B({url:CF.TOOLS.decToHex(codeUrl)})
    }, function (res) {
        cb(res)
    });
};

/**
 * 话费列表
 * @param url
 * @param cb
 */
export const goods_list = (url,cb)=>{
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        sign:CF.M5B({user_id: CF.user.uid})
    }, function (res) {
        cb(res)
    });
};

/**
 * 兑换
 * @param url
 * @param goods_id
 * @param cb
 */
export const call_exchange = (url,goods_id,cb)=>{
    (new CF.Ajax()).sendJSON(CF.gameInfo.host + url, {
        user_id: CF.user.uid,
        goods_id:goods_id,
        sign:CF.M5B({user_id: CF.user.uid,goods_id:goods_id})
    }, function (res) {
        cb(res)
    });
};
