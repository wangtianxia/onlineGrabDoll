<template>
    <!--分享弹窗-->
    <section class="shareContentBig" @click="hideShare" v-disabletouchmove>
        <img class="shareHand" src="static/image/10086/share_hand.png"/>
        <span class="shareWords">分享到微信群</span>
        <p class="shareWords1">每日前10次分享都有钱（最高1元）</p>

        <!--<section class="disOtherInfo">-->
            <!--<section class="shareContent" v-for="(item,index) in infoArr" :key="index">-->
                <!--<section class="shareContent1">-->
                    <!--<section>{{index+1}}</section>-->
                    <!--<p>{{item['title']}}</p>-->
                <!--</section>-->
                <!--<section class="shareContent2">-->
                    <!--{{item['info']}}-->
                <!--</section>-->
            <!--</section>-->
        <!--</section>-->

    </section>
</template>

<script>
    export default {
        name: "share",
        data(){
            return {
                infoArr:[
                    {
                        title:'分享奖励',
                        info:'每成功分享1次，可得随机现金奖励（最高1元）日限10次'
                    },
                    {
                        title:'邀请奖励',
                        info:'通过分享，你每邀请到1位从未访问过游戏的新用户可得0.8元，每邀请到1位老用户得0.1元'
                    },
                    {
                        title:'晒朋友圈奖励',
                        info:"选择海报保存并分享到朋友圈，且获得最少3次以上扫码访问，可得随机现金奖励（最高8元）"
                    },
                    {
                        title:'用户充值奖励',
                        info:"你所邀请到用户的所有充值，你都将获得充值额的20%现金返利"
                    }
                ]
            }
        },
        methods:{
            hideShare(){
                this.$emit('hideShare')
            }
        }
    }
</script>

<style lang="less" scoped>
    p{
        margin: 0;
        padding: 0;
    }
    .shareContentBig{
        width: 100%;
        height: 100%;
        background-color: rgba(50, 50, 50, 0.8);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 106;
        .shareHand{
            position: absolute;
            right: 0.2rem;
            top: 0.2rem;
            width: 0.89rem;
            animation: handAc 0.3s infinite;
        }
        .shareWords{
            font-size: 0.3rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.48rem;
            letter-spacing: 0rem;
            color: #ffffff;
            position: absolute;
            right: 0.3rem;
            top: 2rem;
        }
        .shareWords1{
            text-align: center;
            font-size: 0.36rem;
            color: white;
            position: absolute;
            right: 0.3rem;
            top: 2.5rem;
        }

        .disOtherInfo {
            background-color: rgba(50, 50, 50, 0.5);
            border-radius: 0.1rem;
            margin-bottom: 0.2rem;
            line-height: 1;
            padding: 0.1rem 0 0.3rem 0;
            width: 7.1rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 30%;

            .shareContent{
                border-radius: 0.1rem;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                align-content: flex-start;
                flex-wrap: wrap;
                padding: 0 0.2rem;
                line-height: 1;
                .shareContent1{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 0.19rem;
                    section{
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 50%;
                        font-size: 0.3rem;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 0.48rem;
                        letter-spacing: 0.02rem;
                        color: #ffffff;
                        display: flex;
                        justify-content: center;
                        align-content: center;

                        background-color: rgba(50, 50, 50, 0.5);
                    }
                    p{
                        font-size: 0.28rem;
                        font-weight: bold;
                        font-stretch: normal;
                        line-height: 1;
                        letter-spacing: 0.01rem;
                        color: white;
                        margin-left: 0.15rem;
                    }
                }
                .shareContent2{
                    font-size: 0.24rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1.3;
                    letter-spacing: 0.01rem;
                    color: rgba(50, 50, 50, 0.8);
                    margin-top: 0.12rem;
                    color: white;
                }
            }
        }

    }
    @keyframes handAc {
        from{
            transform: translate(0,0);
        }
        to{
            transform: translate(0,0.5rem);
        }
    }
</style>