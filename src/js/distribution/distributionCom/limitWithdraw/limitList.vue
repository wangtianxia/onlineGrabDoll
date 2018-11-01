<template>
    <div class="limitList">
        <goBack @returnToIndex="returnBack"/>
        <p class="title">{{listTip}}</p>
        <p class="title1">每日数据会在{{tempTime}}点重置</p>
        <section class="listTitle">
            <section>序号</section><section>头像</section><section>昵称</section><section>时间</section>
        </section>
        <section class="listData">
            <section v-for="(item,index) in list" :key="index" class="listItem" >
                <section>
                    {{index+1}}
                </section>
                <section>
                    <img :src="item.head_img" alt="">
                </section>
                <section>
                    {{item.user_name}}
                </section>
                <section>
                    {{item.time|time}}
                </section>
            </section>
        </section>
        <section class="notList" v-if="list.length == 0">
            今日暂无提现列表
        </section>
    </div>
</template>

<script>
    import goBack from '../../../components/return/index';
    import { limit_withdraw_user_info } from '../../../../server/getServerData'
    export default {
        data() {
            return {
                list:[],
                listTip:"今日提现名单",
                money:null,
                tempTime:null
            }
        },


        filters:{
            time(time){
                let times = new Date(time*1000);
                let hour = times.getHours()>=10? times.getHours() :"0"+times.getHours() ;
                let mine = times.getMinutes()>10?times.getMinutes():"0"+times.getMinutes();
                // let second = times.getSeconds()>10?times.getSeconds():"0"+times.getSeconds();
                return `${hour}:${mine}`
            }
        },

        created(){

            let time = this.time = this.$route.params.time;
            this.money = this.$route.params.money;

            let newTime = new Date();
            let hour = newTime.getHours();
            let month = newTime.getMonth()+1;
            let day = newTime.getDate()-1;

            if(hour>=time){
                this.listTip = `今日已提现名单`
            }else{
                this.listTip = `昨日（${month}月${day}日）提现名单`
            }

            if(parseInt(time)>12){
                this.tempTime = '晚上'+time;
            }else{
                this.tempTime = '中午'+time;
            }
        },

        methods:{
            returnBack(){
                this.$router.go(-1);
            }
        },

        mounted(){
            limit_withdraw_user_info('limit_withdraw_user_info',this.money ,(res)=>{
                if(res['status']){
                    this.list = res['data']['list']
                }
            })
        },

        components:{
            goBack
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .limitList{
        min-height: 100%;
        max-height: unset;
        background-color: #f7f7f7;
        padding: 0 0.45rem;
        .title{
            font-size: 0.36rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0.04rem;
            color: #323232;
            text-align: center;
            padding-top: 0.38rem;
        }
        .title1{
            font-size: 0.28rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0.04rem;
            color: #323232;
            text-align: center;
            padding-top: 0.28rem;
        }
        .listTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 6.6rem;
            height: 0.8rem;
            background-color: #ffffff;
            border-radius: 0.1rem;
            section{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.48rem;
                letter-spacing: 0.03rem;
                color: #323232;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            section:nth-of-type(1){
                width:70%;
            }
            section:nth-of-type(2){
                width:70%;
            }
            margin-top: 0.3rem;
        }
        .listData{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            width: 6.6rem;
            .listItem{
                margin-top: 0.03rem;
                display: flex;
                justify-content: center;
                align-items: center;

                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.03rem;
                color: #323232;

                width: 6.6rem;
                height: 1.2rem;
                background-color: #ffffff;
                border-radius: 0.1rem;


                section{
                    width: 100%;
                    text-align: center;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                section:nth-of-type(1){
                    width:70%;
                }
                section:nth-of-type(2){
                    width:70%;
                }
                section:nth-of-type(2){
                    img{
                        width: 0.8rem;
                        height: 0.8rem;
                        border-radius: 50%;
                    }
                }
            }
        }
        .notList{
            font-size: 0.3rem;
            text-align: center;
            margin-top: 1rem;
        }
    }
</style>