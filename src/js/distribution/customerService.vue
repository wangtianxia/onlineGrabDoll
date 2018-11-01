<template>
    <section class="customersService">
        <goBack @returnToIndex="returnBack"/>
        <p class="title">心跳合伙人</p>

        <section class="customersServiceContent" v-if="showList">
            <section class="service">
                <p class="serviceTip">若您需要投诉，请联系投诉专员</p>
                <p class="serviceTip1">长按识别二维码，添加投诉专员</p>
                <section class="serviceMaWai">
                    <section class="serviceMa">
                        <img src="static/image/distribution/Complaints.jpg" alt="">
                    </section>
                </section>
            </section>
        </section>

        <section class="customersServiceContent1" v-if="showList1">
            <section class="service">
                <p class="serviceTip">若您遇到问题，我们将及时为您服务</p>
                <p class="serviceTip1">专属客服微信号：xintiaowawa01</p>
            </section>
        </section>
    </section>
</template>

<script>
    import goBack from '../components/return/index'
    export default {
        data(){
            return {
                showList:false,
                showList1:false
            }
        },

        name: "customerService",

        mounted(){
            this.showList = true;
            this.showList1 = true;
        },

        methods:{
            returnBack(){
                this.$router.go(-1);
            }
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

    .customersService{
        min-height: 100%;
        max-height: unset;
        background-color: #f7f7f7;
    }

    .title{
        font-size: 0.36rem;
        font-weight: bold;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.02rem;
        color: #323232;
        padding-top: 0.4rem;
        text-align: center;
        margin-bottom: 0.1rem;
    }

    .customersServiceContent{
        padding:0.2rem 0.3rem 0 0.3rem;
        .service{
            width: 6.9rem;
            height: 3.85rem;
            background-color: #ffffff;
            border-radius: 0.1rem;
            .serviceTip{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #323232;
                padding: 0.39rem 0 0.29rem 0.31rem;
            }
            .serviceTip1{
                text-align: center;
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: rgba(50, 50, 50, 0.8);
            }
            .serviceMaWai{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.2rem;
                .serviceMa{
                    width: 1.8rem;
                    height: 1.8rem;
                    background-color: #ffffff;
                    border: 0.1rem solid #f7f7f7;
                    img{
                        width: 100%
                    }
                }
            }

        }
    }
    .customersServiceContent1{
        padding:0.2rem 0.3rem 0 0.3rem;
        .service{
            width: 6.9rem;
            height: 1.85rem;
            background-color: #ffffff;
            border-radius: 0.1rem;
            .serviceTip{
                font-size: 0.3rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.02rem;
                color: #323232;
                padding: 0.39rem 0 0.29rem 0.31rem;
            }
            .serviceTip1{
                text-align: center;
                font-size: 0.26rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.01rem;
                color: rgba(50, 50, 50, 0.8);
            }
        }
    }
</style>