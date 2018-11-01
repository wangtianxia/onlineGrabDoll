<template>
    <section class="confirmCenter">
        <div class="wrapper">
            <div class="content">
                <goBack class="reset" @returnToIndex="returnBack"/>
                <p class="title">《心跳娃娃机》<br/>
                    合伙人计划确认书</p>
                <div class="one">
                    《心跳抓娃娃》为国内首款“微信抓娃娃机平台”，将娃娃机与微信结合，真正做到了：“不用去商场，微信就能玩”的线上娃娃机体验。
                </div>
                <div class="two">
                    我们与国内 “动力梦工厂玩具有限公司”、“源康毛绒玩具有限公司”等数十家公仔制造企业，达成战略合作关系，获得商品选样，厂家直购等支持；并与“百世快递”建立了紧密合作关系，拥有响应快捷的物流服务，遍及全国大陆20多个省份，确保商品能够及时送达。
                </div>
                <div class="three">
                    通过专业完善的技术团队提供技术支持，确保远程数据实时同步，直播控制灵活可控；7x24小时不间断的运营团队，提供专业运营支撑服务。目前已拥有近600万用户，日活跃用户约23万。
                </div>
                <div class="four">
                    为促进业务更快发展，我们开启了合伙人计划，邀请所有喜欢娃娃机的玩家，共同参与项目经营，并获得项目收益分成。
                </div>

                <div class="five">
                    <section class="fiveBtn" @click="btn">
                        成为正式合伙人 <span>(￥199)</span>
                    </section>
                </div>

                <div class="six" @click="first(1)">
                    1，合伙人释义
                </div>

                <div class="six" @click="first(2)">
                    2，合伙人权利
                </div>

                <div class="six" @click="first(3)">
                    3，合伙人应履行的义务及责任
                </div>
                <div class="six" @click="first(4)">
                    4，收益分配
                </div>


                <section class="s1" id="s1">
                    <p class="sp1">1，合伙人释义</p>
                    <section class="ss1">
                        合伙人是指通过合伙投资，参与合伙经营，并按比例获得收益，并承担义务的组织和个人。合伙人应具有民事权利能力和行为能力。
                    </section>
                    <section class="ss1">
                        《民法通则》第三十条规定：个人合伙是指两个及以上的公民，各自提供资金，实物，技术等，合伙经营，共同劳动。按比获得劳动收益分配的，视为合伙人
                    </section>
                    <section class="ss1">
                        中文名：合伙人<br>英文名：Partner<br>参与人数：两个或两个以上
                    </section>
                    <section class="ss1">
                        作为合伙项目的投资人，合伙人在项目中享有权益，同时也负有义务。对于本项目而言，合伙人的权利为参与项目的经营，享受项目收益的分配；同时也有遵守足额出资，承担项目运营推广等义务。
                    </section>
                </section>

                <section class="s2" id="s2">
                    <p class="sp1">2，合伙人权利</p>
                    <p class="sp2">2-1 专属客服</p>
                    <section class="ss2">
                        成为合伙人后，会有一对一专属客服提供服务，可提供宣传素材支持，疑问解答以及积极配合合伙人提出的其他合理需求。
                    </section>
                    <p class="sp2">2-2 随时提现</p>
                    <section class="ss2">
                        成为正式合伙人，可不限金额提现。
                    </section>
                    <p class="sp2">2-3 运营参与权</p>
                    <section class="ss2">
                        成为正式合伙人，可获运营参与权，通过运营工作获得相应的运营收益。（运营收益分配详见4-1解释）。
                    </section>
                </section>


                <section class="s2" id="s3">
                    <p class="sp1">3，合伙人应履行的义务和责任</p>
                    <p class="sp2">3-1 足额出资</p>
                    <section class="ss2">
                        合伙人出资是合伙业务开展的物质基础。合伙人须通过足额出资，参与业务并获得正式合伙人身份。<br>
                        应缴出资额：199元<br>
                        出资方式：人民币缴付
                    </section>
                    <p class="sp2">3-2 承担运营工作</p>
                    <section class="ss2">
                        合伙人有义务按照平台要求，承担相应运营和平台推广工作。有义务在发现bug等问题时，及时反馈，以保证项目正常运行。
                    </section>
                    <p class="sp2">3-3 维护平台公平、公正</p>
                    <section class="ss2">
                        合伙人有义务遵守平台规定，禁止刷量行为；若采取任何手段给平台或其他合伙人造成损失的，将依法承担赔偿责任。
                    </section>

                    <p class="sp2">3-4 竞业禁止</p>
                    <section class="ss2">
                        为避免合伙人利用其有利地位，参与恶性竞争，给其他合伙人利益造成损害。合伙人将不得自营或伙同他人，合作经营竞争向业务。
                    </section>
                </section>


                <section class="s2" id="s4">
                    <p class="sp1">4，收益分配</p>
                    <p class="sp2">4-1 运营收益</p>
                    <p class="sp2">4-1-1 分享收益</p>
                    <section class="ss2">
                        合伙分享游戏，每分享一次可得随机现金（最高1元），收益将直接存入账户余额中。
                    </section>
                    <p class="sp2">4-1-2 邀请收益</p>
                    <section class="ss2">
                        合伙人成功邀请到一位新用户可得0.8元，邀请到一位老用户可得0.1元。收益将直接存入账户余额中。
                    </section>
                    <p class="sp2">4-1-3 用户充值收益</p>
                    <section class="ss2">
                        通过合伙人分享，邀请进入游戏的用户，产生的每笔充值，合伙人可获得其充值额20%的收益。收益将直接存入账户余额中。
                    </section>

                    <p class="sp2">4-2 投资回馈</p>
                    <section class="ss2">
                        成为正式合伙人，将获赠价值人民币200元的金币奖励；价值人民币25元的公仔一只（公仔还可凑单两只，免费包邮）；及不定期的活动奖励
                    </section>

                    <div class="five btnC">
                        <section class="fiveBtn" @click="btn">
                            成为正式合伙人 <span>(￥199)</span>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<script>
    import BScroll from 'better-scroll';
    import goBack from '../components/return/index'
    import pay from './pay';
    export default {
        name: "confirmEmail",

        mounted(){
            this.scroll = new BScroll('.wrapper',{
                scrollY:true,
                probeType:1,
                click:true,
                preventDefault:true
            })
        },

        methods:{
            returnBack(){
                this.$router.go(-1);
            },
            first(type){
               if(type == 1){
                   this.scroll.scrollToElement( document.getElementById('s1') , 500, false, false, 'ease')
               }else if(type == 2) {
                   this.scroll.scrollToElement( document.getElementById('s2') , 500, false, false, 'ease')
               }else if(type == 3){
                   this.scroll.scrollToElement( document.getElementById('s3') , 500, false, false, 'ease')
               }else{
                   this.scroll.scrollToElement( document.getElementById('s4') , 500, false, false, 'ease')
               }
            },
            btn(){
                pay.createOrder({id:"pay_199"},(isNoCbPay,res)=>{
                    this.paySuccess(isNoCbPay, res);
                });
            },
            paySuccess(){
                this.$router.replace('/distribution')
            }

        },

        components:{goBack},

        destroyed(){
            if(this.scroll){
                this.scroll.destroy();
            }
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
        line-height: 1;
    }
    .reset{
        margin-left: -0.2rem;
    }
    .confirmCenter{
        padding: 0 0.4rem;
        height: 100%;
        overflow-y: hidden;
        .wrapper{
            height: 100%;
            overflow-y: hidden;
            width: 100%;
            .title{
                font-size: 0.4rem;
                font-weight: bold;
                font-stretch: normal;
                line-height: 0.56rem;
                letter-spacing: 0.02rem;
                color: #323232;
                text-align: center;
                padding-top: 0.49rem;
                margin-bottom: 0.46rem;
            }
            .one{
                font-size: 0.28rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0.01rem;
                color: #323232;
                margin-bottom: 0.39rem;
            }
            .two{
                font-size: 0.28rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0.01rem;
                color: #323232;
                margin-bottom: 0.37rem;
            }
            .three{
                font-size: 0.28rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0.01rem;
                color: #323232;
                margin-bottom: 0.35rem;
            }
            .four{
                font-size: 0.28rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0.01rem;
                color: #323232;
                margin-bottom: 0.6rem;
            }
            .five{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 0.56rem;
                .fiveBtn{
                    width: 6.01rem;
                    height: 0.9rem;
                    background-image: linear-gradient(90deg,
                    #f19c38 0%,
                    #ed763a 100%),
                    linear-gradient(
                            #ffffff,
                            #ffffff);
                    background-blend-mode: normal,
                    normal;
                    border-radius: 0.45rem;
                    font-size: 0.36rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.04rem;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        font-size: 0.22rem;
                        margin-top: 0.15rem;
                    }
                }
            }
            .btnC{
                margin: 0.5rem 0;
                padding-bottom: 0.5rem;
            }
            .six{
                font-size: 0.28rem;
                font-weight: bold;
                font-stretch: normal;
                line-height: 0.36rem;
                letter-spacing: 0.01rem;
                color: #008dd6;
                text-decoration: underline;
                margin-top: 0.31rem;
            }
            .s1{
                margin-top: 0.51rem;
                .sp1{
                    font-size: 0.28rem;
                    font-weight: bold;
                    font-stretch: normal;
                    letter-spacing: 0.01rem;
                    color: #323232;
                    margin-bottom: 0.3rem;
                }
                .ss1{
                    font-size: 0.28rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.36rem;
                    letter-spacing: 0.01rem;
                    color: #323232;
                }
            }
            .s2{
                margin-top: 0.49rem;
                .sp1{
                    font-size: 0.28rem;
                    font-weight: bold;
                    font-stretch: normal;
                    line-height: 0.36rem;
                    letter-spacing: 0.01rem;
                    color: #323232;
                }
                .sp2{
                    font-size: 0.28rem;
                    font-weight: bold;
                    font-stretch: normal;
                    line-height: 0.36rem;
                    letter-spacing: 0.01rem;
                    color: #323232;
                    margin: 0.3rem 0 0.2rem 0;
                }
                .ss2{
                    font-size: 0.28rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.36rem;
                    letter-spacing: 0.01rem;
                    color: #323232;
                }
            }
        }
    }

</style>