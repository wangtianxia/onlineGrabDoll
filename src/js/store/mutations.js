const mutations = {
    //球球数量
    updataBall(state,data){
        if(data<=0){
            state.ball = 0;
        }else{
            state.ball = data;
        }
    },
    //是否抓到娃娃 用于抓到娃娃后返回到首页提示作用
    updateHoldDoll(state,type){
        state.isHoldDoll = type;
    },
    //初始化金币
    initGoldNum(state,num){
        state.goldNum = num;
    },
    //更新金币
    updateGoldNum(state,num){
        state.goldNum += num;
    },
    reduceGoldNum(state,num){
        state.goldNum -= num;
    },
    //合伙人计划
    getPromoteInfo(state,data){
        state.promoterInfoData = data
    },

    //初始化
    initUser(state,data){
        state.initUserData = data
    },

    //2元充值
    initPayMoney(state,data){
        state.first_pay_2 = data;
    },
    //20元充值
    initPayMoney20(state,data){
        state.first_pay = data
    },
    changeSelectTable(state,data){
        state.changeTable = data.state
    }

};
export default mutations;