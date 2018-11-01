<template>
    <!--话费兑换-->
    <div class="phoneFare">
        <goBack @returnToIndex="returnToIndex"/>
        <div class="phoneFare_topRight">
            <div class="phoneFare_logo">
                <img class="img" src="static/image/newImage/phoneFace.png" alt="">
            </div>
            <span>{{call}}元</span>
        </div>
        <p class="infoTip">在游戏中赢取话费后，可兑换礼品</p>
        <div class="phoneFareList">
            <div class="phoneFare_listItem" v-for="(item ,index) in list" :key="index" @click="clickItem(item)">
                <img class="listItemImg" :src="`https://wwjcdn.like000.com/wwjDollImg/${item.doll_id}.jpg`" alt="">
                <p class="phoneFare_listInfo">{{item.doll_name}}</p>
                <div class="phoneFare_btm">
                    <div class="phoneFare_btn">
                        <img class="img" src="static/image/newImage/phoneFace.png" alt="">
                        <span>{{item.call}}元</span>
                    </div>
                </div>
            </div>
        </div>
        <component :is="compid" :info="info" @cancel="cancel" @sure="sure"></component>
        <p class="noMore">没有更多了</p>
        <span class="isChange" v-show="showTip">
            {{changeTip}}
        </span>
    </div>
</template>

<script>
    import CF from '../../CF'
    import goBack from '../components/return/index';
    import {goods_list,call_exchange} from "../../server/getServerData";
    import twoChoose from '../components/twoChoose/dialog'

    export default {
        name: "phoneFare",
        data(){
            return {
                list:[],
                compid:"",
                info:"",
                goods_id:"",
                call:0,
                showTip:false,
                changeTip:"",
                goodsCall:0
            }
        },

        mounted(){
            this.getList();
            this.call = CF.user.call
        },

        methods:{
            returnToIndex(){
                this.$router.go(-1);
            },
            getList(){
                goods_list('goods_list',(res)=>{
                    if(res['status'] == 1){
                        this.list = res['data']['list'];
                    }
                })
            },
            clickItem(item){
                this.goods_id = item.goods_id;
                this.goodsCall = item.call;
                this.info = '是否兑换 '+item.doll_name;
                this.compid = 'twoChoose'
            },
            cancel(){
                this.compid = '';
            },
            sure(){
                this.compid = '';
                call_exchange("call_exchange",this.goods_id,(res)=>{
                    if(res['status'] == 1){
                        this.changeTip = '兑换成功';
                        this.showTip = true;
                        this.getList();
                        this.call = this.call - this.goodsCall;
                        CF.user.call = this.call;
                    }else if(res['status'] == 2){
                        this.changeTip = '话费不足';
                        this.showTip = true;
                    }
                    setTimeout(()=>{
                        this.showTip = false;
                    },1500)
                })
            }
        },

        components:{
            goBack,twoChoose
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .phoneFare{
        min-height: 100%;
        max-height: unset;
        .phoneFare_topRight{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: absolute;
            right: 0.35rem;
            top: 0.27rem;

            padding: 0  0.3rem 0 0;
            max-width: unset;
            height: 0.5rem;
            background-color: #ff418f;
            box-shadow: 0.025rem 0.043rem 0.05rem 0rem rgba(11, 2, 4, 0.15);
            border-radius: 0.25rem;
            .phoneFare_logo{
                width: 0.65rem;
                height: 0.65rem;
                background-color: #ff418f;
                box-shadow: 0.025rem 0.043rem 0.05rem 0rem
                rgba(11, 2, 4, 0.15);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                >img{
                    width: 0.5rem;
                    height: 0.5rem;
                }
            }
            span{
                font-family: PingFang-SC-Medium;
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0rem;
                color: #ffffff;
                margin-left: 0.2rem;
            }
        }
        .infoTip{
            font-size: 0.3rem;
            text-align: center;
            width: 100%;
            padding-top: 1.2rem;
            color: rgba(0,0,0,0.5);
        }
        .phoneFareList{
            padding: 0.5rem 0 0rem 0;
            font-size: 0;
             .phoneFare_listItem{
                 display: inline-block;
                 width: 3rem;
                 height: 3.66rem;
                 font-size: 0;
                 margin-left: 0.5rem;
                 margin-bottom: 0.5rem;
                 .listItemImg{
                     width: 3rem;
                     height: 2.5rem;
                     background-color: #999;
                     border-radius: 0.1rem;
                 }
                 .phoneFare_listInfo{
                     text-align: center;
                     height: 0.28rem;
                     font-family: PingFang-SC-Medium;
                     font-size: 0.28rem;
                     font-weight: normal;
                     font-stretch: normal;
                     line-height: 1;
                     letter-spacing: 0.014rem;
                     color: #323232;
                     margin-top: 0.15rem;
                 }
                 .phoneFare_btm{
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     margin-top: 0.15rem;
                     .phoneFare_btn{
                         min-width: 2.4rem;
                         height: 0.6rem;
                         background-image: linear-gradient(90deg,
                         #f19c38 0%,
                         #ed763a 100%),
                         linear-gradient(
                                 #000000,
                                 #000000);
                         background-blend-mode: normal,
                         normal;
                         border-radius: 0.3rem;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         img{
                             width: 0.5rem;
                             height: 0.5rem;
                         }
                         span{
                             font-family: PingFang-SC-Bold;
                             font-size: 0.3rem;
                             font-weight: normal;
                             font-stretch: normal;
                             line-height: 0.3rem;
                             letter-spacing: 0.015rem;
                             color: #ffffff;
                             margin-left: 0.2rem;
                         }
                     }
                 }
             }

        }

        .noMore{
            text-align: center;
            width: 100%;
            color: #999;
            font-size: 0.26rem;
        }
        .isChange{
            position: absolute;
            font-size: 0.3rem;
            padding: 0.2rem 0.3rem;
            background-color: rgba(0,0,0,0.8);
            color: white;
            border-radius: 0.2rem;
            animation: showAc 0.3s ease;
            transform: translate(-50%,-50%);
            position: absolute;
            left: 50%;
            top: 50%;
        }
    }
    @keyframes showAc {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
</style>