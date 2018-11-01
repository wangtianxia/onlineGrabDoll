<template>
    <div>
        <swiper swiper class="swiper-wrapper" :options="swiperOption" ref="bannerSwiper">
            <swiper-slide v-for="(item,index) in listImg" :key="index" @click.native="imgClick(item.str)">
                <img v-bind:src='item.url' style="width:100%;height:100%"/>
            </swiper-slide>
            <div id="swiperPagin" class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>

    import CF from '../../router/ind.js';
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import {bannerStatistics} from '../../server/getServerData'
    import {mapMutations} from 'vuex';

    export default {
        data: function () {
            return {
                swiperOption: {
                    preloadImages: false,

                    paginationClickable: true,

                    speed: 500, //滑动时间

                    loop: true,

                    preventLinksPropagation: false,

                    observer: true,//修改swiper自己或子元素时，自动初始化swiper

                    observeParents: true,//修改swiper的父元素时，自动初始化swiper

                    pagination: {
                        el: '.swiper-pagination',
                    },

                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    }
                },
                canPay:true
            }
        },

        computed: {
            swiper() {
                return this.$refs.bannerSwiper.swiper
            }
        },

        components: {
            swiper,
            swiperSlide
        },

        props: ['listImg'],


        mounted() {
        },
        methods: {
            ...mapMutations([
                'initGoldNum'
            ]),

            imgClick(e) {
                let self = this;
                if (e == 'share') {
                    CF.channel.share()
                }

                if (e == 'dollShow') {
                    self.$router.push({name: 'dollShowPage', params: {}})
                }

                if (e == 'rank1') {
                    this.$router.push({name: "newActive", params: {isShowActive: 1}})
                }

                if (e == 'rank2') {
                    this.$router.push({name: "holdRank", params: {isShowActive: 2}})
                }

                if (e == 'placard') {
                    self.$emit('placardBanner')
                }

                if (e == 'focus') {
                    CF.channel.focus()
                }

                if(e == 'distribution'){
                    this.$router.push('/distribution')
                }

                // if (e == 'peiqi') {
                //     self.$emit('dollTable', '14');
                // }
                //
                // if (e == 'pay') {
                //     //创建订单
                //     let self = this;
                //     if(this.canPay){
                //         this.canPay = false;
                //         createOrder('create_order',{id:'pay_6'},(data)=>{
                //             this.canPay = true;
                //             self.isCanPay = true;
                //             if (data.status == 1) {
                //                 CF.channel.pay(data['data'], function (isNoCbPay) {
                //                     self.paySuccess(isNoCbPay, data);
                //                 })
                //             } else {
                //                 self.isCanPay = true;
                //             }
                //         });
                //     }
                // }

                if(e == 'jd'){
                    bannerStatistics('banner_statistics','1',()=>{
                        this.$refs.bannerSwiper.swiper.autoplay.stop();
                        window.location.href = 'http://clickc.admaster.com.cn/c/a108717,b2588392,c2,i0,m101,8a2,8b2,h';
                    })
                }
            },

            paySuccess: function (isNoCbPay, data) { //支付成功 弹窗通知
                // let self = this;
                // if (isNoCbPay == 1) {
                //     if(CF.user.platform == '1009'){
                //         this.$router.push({name: 'payIframePage', params: {url: data['data']['info']}})
                //     }else{
                //         this.$router.push({name: 'payIframePage', params: {url: data.data}})
                //     }
                // } else {
                //     //获取金币
                //     getGolds('get_golds',(data)=>{
                //         if (data.status == 1) {
                //             self.initGoldNum(data.data.gold);
                //         }
                //     });
                //     this.listImg.splice(0,1);
                // }
            },
        },
        watch: {
            '$route'(to, from) {
                if (from.name == 'listPage') { //离开路由清除banner（不清除banner无效）
                    this.$refs.bannerSwiper.swiper.autoplay.stop();
                }
                if (to.name == 'listPage') {
                    this.$refs.bannerSwiper.swiper.autoplay.start();
                }
            }

        }
    }
</script>


<style scoped>

    .swiper-container {
        width: 100%;
        height: 2.3rem;
    }

    .swiper-pagination {
        top: 1.1rem;
        height: 0.01rem;
    }

    #swiperPagin {
    }

    #swiperPagin > span {
        background-color: red !important;
    }
</style>