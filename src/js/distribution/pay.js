/**
 * Created by Bkz on 2018/6/13.
 */


import { createOrder } from "../../server/getServerData";
import CF from '../../router/ind';

let pay = function () {
};

pay.prototype.createOrder=function (orderData,cb) {
    createOrder('create_order',orderData,(res)=>{
        if(res['status'] == 1){
            CF.channel.pay(res['data'], function (isNoCbPay) {
                cb.call(isNoCbPay,res);
            })
        }
    })
};

export default new pay();