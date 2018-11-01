<template>
    <section :style="backgroundDiv" :class="[hitRankContent,bgClass]">
        <section v-if="isShowActive">
            <goBack @returnToIndex="returnToIndex"></goBack>
            <section class="activeTitle">
                “娃偶”～六一！”
            </section>
            <section class="activeContent">
                <section class="activeContentTime">
                    活动时间：5.30-6.01
                </section>
                <section class="activeContent1">
                    活动介绍：
                </section>
                <section class="activeContent2">
                    活动期间玩家一次性消费80元可获得1000金币（800金币+赠送200金币），且在赠送一个精美娃娃!
                </section>

                <section class="activeContent3">
                    “六一”当天，系统会在活动期间成功充值80元的用户中随机抽取3位玩家赠送复仇者联盟套装1套，娃娃会直接放在背包里，可一起申请发货。中奖名单会在活动结束后公布哦！
                </section>
                <!--<img class="activeContent4" src="static/image/ac.png" alt="">-->

                <section class="activeContent5">
                    系统会将娃娃直接放在背包里，玩家可一起申请
                    发货。中奖名单会在活动结束后公布哦！
                </section>
            </section>


            <section class="btnClick">
                <section class="go520" @click="toBuy">立即支付</section>
                <section class="go520" @click="go520">前去专场></section>
            </section>

            <!--<div class="wrapper wrapper1">-->
            <!--<section class="content">-->
            <!--<img class="contentTopImg" src="static/image/rankBg.png" alt="">-->
            <!--<section class="listRank">-->
            <!--<section class="listRankTop">-->
            <!--<span>排名</span>-->
            <!--<span>昵称</span>-->
            <!--<span>消耗金币</span>-->
            <!--</section>-->
            <!--<section v-for="(item,index) in listData" :key="index" class="listRankData">-->
            <!--<span v-if="index == 0" >-->
            <!--<span class="index1"> {{item.rank}}</span>-->
            <!--</span>-->
            <!--<span v-else-if="index == 1" >-->
            <!--<span class="index2"> {{item.rank}}</span>-->
            <!--</span>-->
            <!--<span v-else-if="index == 2">-->
            <!--<span class="index3"> {{item.rank}}</span>-->
            <!--</span>-->
            <!--<span v-else="index == 1">{{item.rank}}</span>-->

            <!--<span>{{item.user_name}}</span>-->
            <!--<span v-if="index == 0" class="grab_times1">{{item.gold_consume}}</span>-->
            <!--<span v-else-if="index == 1">{{item.gold_consume}}</span>-->
            <!--<span v-else-if="index == 2">{{item.gold_consume}}</span>-->
            <!--<span v-else="index == 1">{{item.gold_consume}}</span>-->
            <!--</section>-->
            <!--</section>-->
            <!--<section class="listEmpty">-->

            <!--</section>-->
            <!--</section>-->
            <!--</div>-->
            <!--<section class="myRank">-->
            <!--<span>{{mine.ranking}}</span>-->
            <!--<span>{{mine.user_name}}</span>-->
            <!--<span>{{mine.gold_consume}}</span>-->
            <!--</section>-->
        </section>

        <section class="hitRankContent" v-else>
            <goBack @returnToIndex="returnToIndex"></goBack>
            <section class="activeTitle">
                中奖名单
            </section>
            <section class="hasReWard">
                <section>头像</section>
                <section>昵称</section>
                <section>获得奖品</section>
            </section>
            <section class="rewardItem" v-for="(item,index) in reward" :key="index">
                <section class="rewardItemHeadImg">
                    <img :src="item.head_img" alt="">
                </section>
                <section>
                    {{item.user_name}}
                </section>
                <section>
                    复仇者联盟公仔<br/>
                    套装*1
                </section>
            </section>
            <section class="rewardInfo">
                以上玩家均可获得复仇者联盟公仔一套，娃娃已
                添加到背包，玩家可直接申请发货哦！
            </section>

            <!--<div class="wrapper wrapper1">-->
            <!--<section class="content">-->
            <!--<section class="rewardInfo">本期获奖名单信息</section>-->
            <!--<section class="listRank">-->
            <!--<section class="rewordListTop">-->
            <!--<span>个人信息</span>-->
            <!--<span>获得奖品</span>-->
            <!--</section>-->
            <!--<section v-for="(item,index) in listData" :key="index" class="rewordList">-->
            <!--<section class="userInfo">-->
            <!--<img class="headImg itemImg" :src="item.head_img" alt="">-->
            <!--<section class="userInfoInfo">-->
            <!--<span class="itemName">{{item.user_name}}</span>-->
            <!--<span class="itemRank">排名：{{item.rank}}</span>-->
            <!--</section>-->
            <!--</section>-->
            <!--<span v-if="item.rank <= 1" class="itemReward itemReward1">蜡笔小新</span>-->
            <!--<span v-else-if="item.rank>1 && item.rank<=3" class="itemReward itemReward2">粉红豹</span>-->
            <!--<span v-else-if="item.rank>3 && item.rank<= 10" class="itemReward itemReward3">小猪佩奇</span>-->
            <!--</section>-->
            <!--</section>-->
            <!--<section class="listEmpty">-->
            <!--</section>-->
            <!--</section>-->
            <!--</div>-->
            <!--<section class="myRankReword">-->
            <!--<section class="userInfo">-->
            <!--<section>-->
            <!--<img class="headImg itemImg" :src="mine.head_img" alt="">-->
            <!--</section>-->
            <!--<section class="userInfoInfo">-->
            <!--<span class="itemName">{{mine.user_name}}</span>-->
            <!--<span class="itemRank">{{mine.rankingWord}}</span>-->
            <!--</section>-->
            <!--</section>-->
            <!--<span v-if="mine.ranking == -1">未获得奖品</span>-->
            <!--<span v-else-if="mine.ranking>0 && mine.ranking <= 1">蜡笔小新</span>-->
            <!--<span v-else-if="mine.ranking>1 && mine.ranking<=3">粉红豹</span>-->
            <!--<span v-else-if="mine.ranking>3 && mine.ranking<=10">小猪佩奇</span>-->
        </section>
    </section>
</template>

<script>
    import BScroll from 'better-scroll';
    import goBack from '../../components/return/index';
    import CF from '../../../CF';
    import {createOrder, getGolds} from '../../../server/getServerData';
    import {mapMutations} from 'vuex'

    export default {
        name: "holdRank",
        data() {
            return {
                listData: [],
                mine: {},
                isShowActive: '',   //true 活动 false 领奖
                hitRankContent: "hitRankContent",
                bgClass: "bgClass1",
                backgroundDiv: {
                    // backgroundImage: 'url(' + require('../../../../static/image/acBg.jpg') + ')'
                },
                isCanPay: true,
                reward: []
            }
        },
        mounted() {

            if (new Date().getTime() > 1527868830000) {
                this.isShowActive = false
            } else {
                this.isShowActive = true
            }

            this.reward = [
                {
                    user_id: 3349156,
                    user_name: '空城旧梦',
                    head_img: 'static/image/1.png'
                },
                {
                    user_id: 2417643,
                    user_name: '有感情别浪ゞ',
                    head_img: 'static/image/2.png'
                },
                {
                    user_id: 1364473,
                    user_name: 'A',
                    head_img: 'http://thirdwx.qlogo.cn/mmopen/vi_32/6MFOTicBvia6jcIhoZTCtrb4sn7hiaHEOCOLuUDu4GqhnPhGojATlib4BKyum41cGviaJkF7rGe1AcQTyYa1uwSOAkw/132'
                }
            ]


            // if(this.isShowActive){
            //     this.bgClass = 'bgClass2'
            // }else{
            //     this.bgClass = 'bgClass1'
            // }
            // this.scroll = new BScroll('.wrapper', {
            //     scrollY: true,
            //     flickLimitDistance:50
            // });
            // this.getListData();


        },
        methods: {
            ...mapMutations([
                'initGoldNum'
            ]),

            returnToIndex() {
                this.$router.go(-1);
            },

            go520() {
                // CF.pubsub.$emit('go520');
                this.$router.go(-1);
            },

            toBuy() {
                //创建订单
                if (this.isCanPay) {
                    this.isCanPay = false;
                    createOrder('create_order', {id: 'pay_80'}, (data) => {
                        if (data.status == 1) {
                            CF.channel.pay(data['data'], function (isNoCbPay) {
                                this.paySuccess(isNoCbPay, data);
                            });
                            this.isCanPay = true;
                        } else {
                            this.isCanPay = true;
                        }
                    });
                }
            },

            paySuccess(isNoCbPay, data) { //支付成功 弹窗通知
                if (isNoCbPay == 1) {
                    if (CF.user.platform == '1009') {
                        this.$router.push({name: 'payIframePage', params: {url: data['data']['info']}})
                    } else {
                        this.$router.push({name: 'payIframePage', params: {url: data.data}})
                    }
                } else {
                    //获取金币
                    getGolds('get_golds', (data) => {
                        if (data.status == 1) {
                            this.initGoldNum(data.data.gold);
                        }
                    });
                }
            },

            getListData() {
                var self = this;
                if (this.isShowActive) {
                    // (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'activity_display', {
                    //     user_id: CF.user.uid,
                    //     sign: CF.M5B({user_id: CF.user.uid})
                    // },(res)=>{
                    //     if(res['status'] == 1){
                    //         let data = res['data']['list'];
                    //
                    //         for(let i=0;i<data.length;i++){
                    //             this.$set(data[i],'rank',i+1);
                    //         }
                    //         self.listData = res['data']['list'];
                    //         if(res['data']['no_100'] && res['data']['no_100']['user_id']){
                    //             this.$set(res['data']['no_100'],'rank',100);
                    //             self.listData.push(res['data']['no_100']);
                    //         }
                    //         if(res['data']['mine']){
                    //             this.mine.gold_consume = res['data']['mine']['gold_consume'];
                    //             this.mine.user_name = res['data']['mine']['user_name'];
                    //             this.mine.ranking = res['data']['mine']['ranking']<0?"未上榜":res['data']['mine']['ranking'];
                    //         }
                    //         setTimeout(()=>{
                    //             this.scroll.refresh();
                    //         },100)
                    //     }
                    // })
                } else {
                    // (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'activity_display', {
                    //     user_id: CF.user.uid,
                    //     sign: CF.M5B({user_id: CF.user.uid})
                    // },(res)=>{
                    //     if(res['status'] == 1){
                    //         let data = res['data']['list'];
                    //         for(let i=0;i<data.length;i++){
                    //             this.$set(data[i],'rank',i+1);
                    //         }
                    //         self.listData = res['data']['list'];
                    //         // if(res['data']['no_100'] && res['data']['no_100']['user_id']){
                    //         //     this.$set(res['data']['no_100'],'rank',100);
                    //         //     self.listData.push(res['data']['no_100']);
                    //         // }
                    //         if(res['data']['mine']){
                    //             this.mine.grab_times = res['data']['mine']['grab_times'];
                    //             this.mine.user_name = res['data']['mine']['user_name'];
                    //             this.mine.head_img = CF.user.face;
                    //             this.mine.ranking = res['data']['mine']['ranking'];
                    //             this.mine.rankingWord = res['data']['mine']['ranking']<0?"未上榜":"排名:"+res['data']['mine']['ranking']
                    //         }
                    //         setTimeout(()=>{
                    //             this.scroll.refresh();
                    //         },100)
                    //     }
                    // })
                }

            }
        },
        destroyed() {
            if (this.scroll) {
                this.scroll.destroy();
            }
        },

        components: {
            goBack
        }
    }
</script>

<style scoped>
    .hitRankContent {
        /*display: flex;*/
        justify-content: center;
        line-height: 1;
        font-size: 0;
        position: absolute;
        /*left: 0;*/
        /*top: 0;*/
        width: 100%;
        height: 100%;
    }

    .bgClass1 {
        /*background: url("../../../../static/image/acBg.jpg") no-repeat;*/
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .activeTitle {
        font-size: 0.48rem;
        text-align: center;
        -webkit-text-stroke: 1px white;
        color: #ff7d7f;
        margin-top: 0.3rem;
    }

    .activeContent {
        padding: 0 0.5rem;
    }

    .activeContentTime {
        font-size: 0.26rem;
        color: white;
        text-align: center;
        margin: 0.2rem 0 0.36rem 0;

    }

    .activeContent1, .activeContent2, .activeContent3, .activeContent5 {
        font-size: 0.3rem;
        color: white;
        line-height: 0.48rem;
    }

    .activeContent1 {
        font-weight: bold;
    }

    .activeContent3 {
        margin: 0.28rem 0 0.3rem 0;
    }

    .activeContent4 {
        width: 5.7rem;
        height: 2.5rem;
        margin-bottom: 0.3rem;
        margin-left: 0.35rem;
    }

    .bgClass2 {
        background-color: rgb(255, 222, 239);
    }

    .wrapper1 {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        text-align: center;
    }

    .contentTopImg {
        width: 6.7rem;
        margin-top: 0.4rem;
        height: 9.1rem;
    }

    .listRank {
        width: 6.9rem;
        background-color: white;
        margin-left: 0.3rem;
        border-radius: 0.2rem;
        margin-top: 0.5rem;
        color: #323232;
    }

    .listRankTop {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.3rem;
        height: 0.8rem;
        position: relative;
    }

    .listRankData {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 0.8rem;
        position: relative;
    }

    .listRankData > span, .listRankTop > span {
        font-size: 0.3rem;
        width: 100%;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .listRankData::after, .listRankTop::after {
        position: absolute;
        content: ' ';
        width: 90%;
        height: 1px;
        background-color: #eee;
        left: 5%;
        bottom: 0;
    }

    .index1, .index2, .index3 {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .index1 {
        background-color: rgb(248, 183, 7);
    }

    .index2 {
        background-color: rgb(33, 168, 213);
    }

    .index3 {
        background-color: rgb(205, 155, 96);
    }

    .grab_times1 {
        color: #ff8f11;
    }

    .listEmpty {
        width: 100%;
        height: 2.2rem;
    }

    .myRank, .myRankReword {
        position: absolute;
        width: 96%;
        height: 1rem;
        background-color: rgb(254, 245, 236);
        bottom: 0;
        border-radius: 0.2rem;
        font-size: 0.36rem;
        color: #323232;
        display: flex;;
        justify-content: center;
        align-items: center;
    }

    .myRank > span {
        text-align: center;
        width: 100%;
    }

    .myRankReword > section, .myRankReword > span {
        width: 100%;
        text-align: center;
    }

    .headImg {
        width: 0.6rem;
        /*height: 0.6rem;*/
        border-radius: 50%;
        margin-left: 0.6rem;
    }

    .myHeadImg {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
    }

    .rewordList {
        height: 1rem;
        position: relative;
    }

    .rewordList::after, .rewordListTop::after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #eee;
    }

    .rewordListTop {
        height: 0.8rem;
        position: relative;
    }

    .rewordList, .rewordListTop {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
    }

    .rewordListTop > span {
        width: 100%;
        font-size: 0.3rem;
        text-align: center;
    }

    .rewordList {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .rewordList > span {
        font-size: 0.3rem;
    }

    .userInfo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 50%;
    }

    .userInfoInfo > span {
        display: inline-block;
        overflow: hidden;
        width: 100%;
        text-align: left;
        white-space: nowrap;
        /*text-overflow: ellipsis;*/

    }

    .userInfoInfo {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        margin-left: 0.2rem;
        text-align: left;
        overflow: hidden;
    }

    .itemName {
        font-size: 0.3rem;
    }

    .itemRank {
        font-size: 0.28rem;
        color: #888;
    }

    .itemReward {
        width: 50%;
    }

    .itemReward1 {
        color: #ff8f11;
    }

    .itemReward2 {
        color: black;
    }

    .btnClick {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .go520 {
        width: 2rem;
        height: 0.7rem;
        margin: 0.3rem 0;
        /*float: right;*/
        /*margin-right: 1rem;*/
        font-size: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, rgb(241, 156, 56), rgb(237, 118, 58));
        color: white;
        border-radius: 3.2rem;
        margin-right: 0.5rem;
    }

    .hasReWard {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 0.4rem;
        background-color: rgba(0, 138, 215, 0.2);
        margin: 0.3rem 0 0.1rem 0;
        position: relative;
        font-size: 0.28rem;
        color: white;
    }

    .hasReWard > section {
        position: relative;
        width: 100%;
        text-align: center;
    }

    .hasReWard > section:nth-of-type(1)::after, .hasReWard > section:nth-of-type(2)::after {
        content: '';
        width: 1px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        right: 0;
        top: 0;
        position: absolute;
    }

    .rewardItem {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
    }

    .rewardItemHeadImg > img {
        width: 0.8rem;
        height: 0.8rem;
    }

    .rewardItem > section {
        font-size: 0.3rem;
        color: white;
        text-align: center;
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .rewardItem::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.3);
        width: 6.66rem;
        z-index: 11;
    }

    .rewardInfo {
        font-size: 0.3rem;
        color: white;
        padding: 0.7rem 0.5rem 0.5rem 0.5rem;
    }
</style>