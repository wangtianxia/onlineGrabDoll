<!--转金币-->
<template>
    <div class="listCoin">
        <goBack @returnToIndex="returnToIndex"/>
        <section class="listContent">
            <div class="listItem" v-for="(item,index) in list" :key="index">
                <div class="listItemInfo">
                    <div class="listCoinItemLeft">
                        <img class="itemImg" v-if="item.type == 1" src="static/image/distribution/cash.png" alt="">
                        <img class="itemImg" v-if="item.type == 2 || item.type == 3 || item.type == 4"
                             src="static/image/distribution/coin.png" alt="">
                        <section class="listCoinItemInfo">
                            <p class="itemInfoTop">{{item.title}}</p>
                            <p class="itemInfoBtn">{{item.content}}</p>
                        </section>
                    </div>
                    <section class="listCoin_Btn" v-if="item.type == 1 && item.already>= item.limit"
                             @click="toGetMoney(1)">
                        去提现
                    </section>
                    <section class="listCoin_Btn" v-else-if="item.type == 1 && item.already<= item.limit"
                             @click="toGetMoney(2)">
                        去分享
                    </section>

                    <section v-else-if="item.type == 2" class="listCoin_Btn" @click="toShare(2)" v-else>
                        去分享
                    </section>
                    <section v-else-if="item.type == 3" class="listCoin_Btn" @click="toFocus" v-else>
                        去关注
                    </section>

                    <section v-else-if="item.type ==4" class="listCoin_Btn" @click="toShare(4)" v-else>
                        去分享
                    </section>
                </div>
                <div class="listItemProgress">
                    <progressCoin :min=item.already :max=item.limit :type="item.type"/>
                </div>
            </div>
        </section>
        <!--<swiperTask v-if="isShow" @closeSwiper="closeSwiper"/>-->
        <component :is="isComponent" @closeSwiper="hideInvite" @hideInvite="hideInvite"></component>

        <!--<share v-if="isShow" @hideInvite="hideInvite"/>-->
        <section class="focusInGroup">
            <img src="static/image/logo.jpg" @click="toFocus" alt="">
            <p class="label">点击前往公众号（首次关注领取20金币）</p>
        </section>
    </div>
</template>

<script>
    import CF from '../../CF'
    import goBack from '../components/return/index';
    import progressCoin from './distributionCom/coinList/progress';
    import share from '../components/wxShare/index';
    import {task_list} from "../../server/getServerData";
    import swiperTask from './distributionCom/swiperTask/index';
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                list: [],
                isShow: false,
                isComponent: ''
            }
        },

        computed: {
            ...mapState([
                'promoterInfoData'
            ])
        },

        mounted() {
            task_list('task_list', (res) => {
                if (res['status'] == 1) {
                    this.list = res['data']['list'];
                }
            });
        },

        methods: {
            //返回
            returnToIndex() {
                this.$router.go(-1)
            },
            //去提现
            toGetMoney(type) {
                //type == 1 提现
                if (type == 1) {
                    if (!this.promoterInfoData || this.promoterInfoData['status'] == 0) {
                        this.$router.push('/distribution')
                    } else {
                        this.$router.push('/withdraw')
                    }
                } else if (type == 2) {
                    if (!this.promoterInfoData || this.promoterInfoData['status'] == 0) {
                        this.$router.push('/distribution')
                    } else {
                        this.isComponent = 'share';
                    }
                }
            },
            //去分享
            toShare(type) {
                if (type == 2) {
                    this.isComponent = 'share';
                } else if (type == 4) {
                    this.isComponent = 'swiperTask';
                }
            },
            //隐藏
            hideInvite() {
                this.isComponent = '';
            },
            //去关注
            toFocus() {
                if (CF.user.follow_url) {
                    window.location.href = CF.user.follow_url;
                } else {
                    window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxMTY4MTkyOA==#wechat_redirect';
                }
            }
        },


        components: {
            goBack, progressCoin, share, swiperTask
        }
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .listCoin {
        min-height: 100%;
        max-height: unset;
        max-height: unset;
        background-color: #f7f7f7;
        padding: 0 0.2rem;
        .listContent {
            padding-top: 0.99rem;
            padding-bottom: 4rem;
            .listItem {
                width: 7.1rem;
                height: 2.10rem;
                background-color: #ffffff;
                border-radius: 0.10rem;
                display: flex;
                justify-content: center;
                align-items: center;
                align-content: center;
                flex-wrap: wrap;
                margin-bottom: 0.1rem;
                .listItemInfo {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    .listCoinItemLeft {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-left: 0.2rem;
                        .itemImg {
                            width: 1rem;
                            height: 1rem;
                        }
                        .listCoinItemInfo {
                            line-height: 1;
                            margin-left: 0.15rem;
                            width: 4rem;
                            .itemInfoTop {
                                font-family: PingFang-SC-Regular;
                                font-size: 0.28rem;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 1;
                                letter-spacing: -0.01rem;
                                color: #323232;
                                font-weight: bold;
                            }
                            .itemInfoBtn {
                                margin-top: 0.19rem;
                                line-height: 1;
                                font-family: PingFang-SC-Regular;
                                font-size: 0.24rem;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: -0.01rem;
                                color: #323232;
                                width: 97%;
                            }
                        }
                    }

                    .listCoin_Btn {
                        width: 1.4rem;
                        height: 0.5rem;
                        background-image: linear-gradient(270deg,
                        #ed793f 0%,
                        #ffa133 100%),
                        linear-gradient(
                                #000000,
                                #000000);
                        background-blend-mode: normal,
                        normal;
                        border-radius: 0.25rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.26rem;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 0.32rem;
                        letter-spacing: 0rem;
                        color: #ffffff;
                        margin-right: 0.2rem;
                    }
                }
                .listItemProgress {
                    position: relative;
                    width: 6.5rem;
                    height: 0.3rem;
                    margin-top: 0.2rem;
                }
            }
        }
        .focusInGroup {
            width: 100%;
            height: 2.1rem;
            background-color: #ffffff;
            box-shadow: 0rem -0.01rem 0.01rem 0rem rgba(51, 51, 51, 0.1);
            position: fixed;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
            flex-wrap: wrap;
            img {
                width: 0.9rem;
                height: 0.9rem;
                background-color: #323232;
                border-radius: 50%;
            }
            .label {
                margin-top: 0.19rem;
                font-family: PingFang-SC-Regular;
                font-size: 0.28rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: -0.01rem;
                color: #323232;
                text-align: center;
                width: 100%;
            }
        }
    }
</style>