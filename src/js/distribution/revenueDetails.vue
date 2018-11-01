<template>
    <!--收益明细-->
    <section class="revenueContent">
        <goBack @returnToIndex="returnBack"  />
        <section class="revenueContentTip">收益明细</section>
        <section class="revenueDetailTable">
            <section class="revenueDetailTable1">
                 <section class="s2">历史总收益<span>{{promoterInfoData['total_income']}}</span>元</section>
            </section>
            <section class="revenueDetailTable2">
                <section>收益类型</section><section>奖励金</section>
            </section>
        </section>

        <section class="revenueDetailTableList">
            <section class="list" v-if="list.length>0" v-for="(item,index) in list" :key="index">
                <section class="listItem">
                    <section class="listItem1">
                        <img v-if="item.rank == 1" src="static/image/distribution/1.png" alt="">
                        <img v-if="item.rank == 2" src="static/image/distribution/2.png" alt="">
                        <img v-if="item.rank == 11" src="static/image/distribution/11.png" alt="">
                        <img v-if="item.rank == 12" src="static/image/distribution/11.png" alt="">
                        <img v-if="item.rank == 13" src="static/image/distribution/13.png" alt="">
                        <img v-if="item.rank == 14 || item.rank == 21" src="static/image/distribution/14.png" alt="">
                        <img v-if="item.rank == 15" src="static/image/distribution/15.png" alt="">

                        <section class="listItem1sec">
                            <p v-if="item.rank==1">直接奖励</p>
                            <p v-if="item.rank==2">间接奖励</p>
                            <p v-if="item.rank==11">邀请奖励</p>
                            <p v-if="item.rank==12">邀请奖励</p>
                            <p v-if="item.rank==13">分享奖励</p>
                            <p v-if="item.rank==14">新合伙人</p>
                            <p v-if="item.rank==15">朋友圈奖励</p>
                            <p v-if="item.rank==21">天天奖励</p>
                            <p>{{item['time']|time}}</p>
                        </section>
                    </section>

                    <section class="listItem2">
                        {{item.money}}元
                    </section>

                    <section class="listItem3" v-if="item.rank==1">推广游戏</section>
                    <section class="listItem3" v-if="item.rank==2">合伙人推广</section>
                    <section class="listItem3" v-if="item.rank==11">邀请新用户</section>
                    <section class="listItem3" v-if="item.rank==12">召回老用户</section>
                    <section class="listItem3" v-if="item.rank==13">第{{item.share_times}}次分享</section>
                    <section class="listItem3" v-if="item.rank==14"></section>
                    <section class="listItem3" v-if="item.rank==15">朋友圈奖励</section>
                </section>
            </section>
            <section class="notMoney" v-if="list.length == 0">
                暂无收益，你所邀请的人消费后，你都会有收益哦
            </section>
        </section>
    </section>
</template>

<script>
    import goBack from '../components/return/index'
    import {transaction_details} from "../../server/getServerData";
    import { mapState } from 'vuex'

    export default {
        name: "revenueDetails",

        data(){
            return {
                list:[]
            }
        },

        computed:{
            ...mapState([
                'promoterInfoData'
            ])
        },

        mounted(){
            this.getList();
        },

        filters:{

            time(time){

                let temp = new Date(time*1000);
                let year = temp.getFullYear();
                let month = temp.getMonth()+1>=10?temp.getMonth()+1:'0'+(temp.getMonth()+1);
                let day = temp.getDate()>=10?temp.getDate():'0'+temp.getDate();
                let hours = temp.getHours()>=10?temp.getHours():"0"+temp.getHours();
                let mines = temp.getMinutes()>=10?temp.getMinutes():"0"+temp.getMinutes();
                let second = temp.getSeconds()>=10?temp.getSeconds():'0'+temp.getSeconds();
                return `${year}-${month}-${day}  ${hours}:${mines}:${second}`;




                // temp.setHours(0);
                // temp.setMinutes(0);
                // temp.setSeconds(0);
                // temp.setMilliseconds(0);
                // let tempTime = parseInt(temp.getTime()/1000) - time;
                // let d1 = tempTime/(24*3600);
                // if(d1>6){
                //     return '1周前'
                // }else if(d1>=3){
                //     return '3天前'
                // }else if(d1>=2){
                //     return '2天前'
                // }else if(d1>=0){
                //     return '1天前'
                // }else if(d1<0){
                //     let time1 = new Date(time * 1000);
                //     let hour = time1.getHours()>=10?time1.getHours():"0"+time1.getHours();
                //     let mine = time1.getMinutes()>=10?time1.getMinutes():"0"+time1.getMinutes();
                //     return `${hour}:${mine}`;
                // }
            }

        },

        methods:{
            returnBack(){
                this.$router.go(-1);
            },
            getList(){
                transaction_details('transaction_details',(res)=>{
                    if(res['status'] == 1){
                        this.list = res['data']['list'];
                    }
                })
            }
        },

        components:{
            goBack
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-size: 0;
    }
    .revenueContent{
        background-color: #f7f7f7;
        padding: 0.2rem;
        /*height: 100%;*/
        min-height: 100%;
        max-height: unset;
    }
    .revenueContentTip{
        width: 100%;
        height: 1.22rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.36rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.3rem;
        letter-spacing: 0.04rem;
        color: #323232;
    }
    .revenueDetailTable{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 7.1rem;
        height: 1.6rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        margin-bottom: 0.1rem;
    }
    .revenueDetailTable>section{
        height: 50%;
    }
    .revenueDetailTable1{
        padding:0 0.41rem ;
        width: 100%;
        position: relative;
    }
    .revenueDetailTable1::after{
        content: ' ';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        background-color: #eee;
    }
    .revenueDetailTable1{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
    }
    .s2{
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.48rem;
        letter-spacing: 0.02rem;
        color: #323232;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .s2>span{
        color: #f30000;
        font-size: 0.3rem;
    }
    .revenueDetailTable2{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.49rem 0 0.81rem;
    }
    .revenueDetailTable2>section{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.28rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.48rem;
        letter-spacing: 0.01rem;
        color: #323232;
    }


    .list{
        width: 7.1rem;
        height: 1.3rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        margin-bottom: 0.1rem;
    }
    .notMoney{
        margin-top: 0.5rem;
        text-align: center;
        font-size: 0.28rem;
        color: #323232;
    }
    .listItem{
        height: 1.39rem;
        padding: 0 0.49rem 0 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .listItem1{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        font-size: 0.28rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.48rem;
        letter-spacing: 0.01rem;
        color: #323232;
    }
    .listItem1>img{
        width: 0.8rem;
    }
    .listItem1sec{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-left: 0.2rem;
    }
    .listItem1sec>p:nth-of-type(1){
        width: 100%;
        font-size: 0.28rem;
        font-weight: bold;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.01rem;
        color: #323232;
    }
    .listItem1sec>p:nth-of-type(2){
        width: 100%;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.01rem;
        color: #323232;
        margin-top: 0.18rem;
    }


    .listItem2{
        font-size: 0.28rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.01rem;
        color: #f30000;
        position: absolute;
        top: .34rem;
        right: 0.49rem;
    }
    .listItem3{
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height:1;
        letter-spacing: 0.01rem;
        color: #323232;
        position: absolute;
        top: .76rem;
        right: 0.49rem;
    }
</style>