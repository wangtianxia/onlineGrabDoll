<template>
    <section class="swiper-container_item_top">
        <div class="swiper-container_item">
            <section class="swiperItem2">
                <swiper :options="swiperOption" ref="SwiperBall">
                    <swiper-slide class="slideItem" v-for="(item,index) in ballArr" :key="index">
                        <section class="slideItem slideItemSec" @click='itemClick(item)'>
                            <img class="bg1" :src="'static/image/ball/status'+item.status+'Bg.png'" alt="">
                            <img class="bg2" src="static/image/ball/ball2_1.jpg" v-if="item.status == 2" alt="">
                            <img class="bg2" src="static/image/ball/ball3.jpg" v-else-if="item.status == 1" alt="">
                            <img class="bg2" src="static/image/ball/ball1.jpg" v-else-if="item.status == 0" alt="">
                            <section class="dollPriceText">{{item.doll_price}}</section>
                        </section>
                    </swiper-slide>
                </swiper>
            </section>
        </div>
    </section>
</template>

<script scoped>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    export default {
        data() {
            return {
                swiperOption: {
                    slidesPerView: 'auto',
                    freeMode: true,
                    spaceBetween: 10,
                    observer: true,
                    observeParents: true
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.SwiperBall.swiper
            }
        },
        components: {
            swiper,
            swiperSlide
        },

        props: ['ballArr'],

        methods: {
            itemClick(item) {
                this.$router.push({
                    name: 'gameRoomPage', params: {
                        serverId: item.serverId,
                        doll_price: item.doll_price,
                        doll_id: item.doll_id,
                        machine_id: item.machine_id,
                        type: item.type || 1,
                        gateHost: item.gate_host,
                        gatePort: item.gate_port
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .swiper-container_item_top {
        position: relative;
        padding: 0 0.2rem;
    }

    .swiper-container_item {
        overflow: hidden;
        background-color: white;
    }

    .slideItem {
        width: 2.5rem !important;
        height: 3rem  !important;
    }

    .slideItemSec {
        position: relative;
    }

    .ballStatus {
        font-size: 0.26rem;
        border: 2px solid white;
        width: 1.5rem;
        height: 0.46rem;
        border-radius: 1rem;
        text-align: center;
        line-height: 0.46rem;
        color: white;
        position: absolute;
        left: 50%;
        top: 78%;
        transform: translate(-50%, -50%);
    }

    /*维护中*/
    .ballStatus1{
        background-color: #999;
    }

    /*空闲中*/
    .ballStatus2{
        background-color: #2bd51f;
    }

    /*游戏中*/
    .ballStatus3{
        background-color: #2ebbff;
    }

    .bg1{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 2.5rem;
        height: 3rem;
    }
    .bg2{
        position: absolute;
        left: 0.15rem;
        top: 0.5rem;
        z-index: 2;
        width: 2.2rem;
        height: 2rem;
        border-radius: 0.15rem;
    }

    .swiperItem2 {
        padding: 0.2rem 0.2rem 0.15rem 0.2rem !important;
    }

    .dollPriceText{
        position: absolute;
        right: 0.25rem;
        bottom: 0.15rem;
        font-size: 0.2rem;
        color: white;
        z-index: 10;
    }
</style>
