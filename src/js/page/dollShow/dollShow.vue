<template>
    <div id="dollShow" ref="dollShow">

        <!-- 返回上级页面 -->
        <div class="wrapper wrapper1">
            <section class="content">
                <div class="topBox">
                    <goBack @returnToIndex="returnBack" style="position:absolute;left:0.2rem;"></goBack>
                    <span id='title'>娃娃秀</span>
                    <div id='iwantShow' v-on:click='iwantShowClick'>我也要秀</div>
                </div>

                <section class="listTop">
                    <div class='list' v-for='(item,index) in items' :key="index">
                        <section class="listContent">
                            <div id='head'>
                                <section class="headInfo">
                                    <img class="headImg" :src="`${item.head_img || 'https://wwjcdn.like000.com/videoDollCatcher/head.jpg'}`" alt="">
                                    <div id='info'>
                                        <span id='name'>{{item.user_name}}</span>
                                        <span id='date'>{{item.create_time}}</span>
                                    </div>
                                </section>
                                <div id='good' v-on:click='goodClick(item)'>
                                    <span>{{item.thumbs_up_count}}</span>
                                    <img src="static/image/dollShow/good.png">
                                </div>
                            </div>
                            <section>
                                <div id='desc'>{{item.desc}}</div>
                                <section class='showImg' :style="{backgroundImage: 'url(' + item.url + ')'}" @click="showTotalImg(item)">
                                </section>
                            </section>
                        </section>
                    </div>
                    <section class="hasMore">{{isHasMore}}</section>
                </section>
            </section>
        </div>

        <section class="imgMask" v-if="showMaskImg" @click="closeImgMask" v-disabletouchmove>
            <img :src="maskImg" alt="">
        </section>

        <div id='maskTip' v-show='showTip'  v-disabletouchmove>
            <img src="static/image/dollShow/tip.png" style="width:6rem;height:4.76rem;" @click='tipClick()'>
        </div>

        <transition name="fadeTop">
            <img class="toTop" v-show="isToTap" src="static/image/newImage/top.png" @click="toTop" alt="">
        </transition>

        <transition name="fadeTop">
            <div class="hasZan" v-if="hasZan">
                已点赞
            </div>
        </transition>

    </div>
</template>

<script>

    import CF from "../../../router/ind.js";
    import goBack from '../../components/return/index';
    import Tools from '../../../extend/tools';
    import BScroll from 'better-scroll';
    import { thumbsUp ,showList } from '../../../server/getServerData'

    export default {
        data() {
            return {
                items: [],
                showTip: false,
                page_no: 1,
                nowIsGetList: true,
                maskImg:'',
                showMaskImg:false,
                isToTap:false,
                isHasMore:'正在加载中',
                doll_id:'0',
                hasZan:false
            };
        },
        created: function () {
            this.doll_id = this.$route.params.doll_id||0;
            this.init();
        },

        mounted(){
            this.scroll = new BScroll('.wrapper', {
                scrollY: true,
                probeType:2,
                stopPropagation:true,
                scrollbar: {
                    fade: true,
                    interactive: false // 1.8.0 新增
                },
                click:true,
                pullUpLoad: {
                    threshold: 5
                }
            });
            this.scroll.on('pullingUp',()=>{
                this.getNewList();
            });


            this.scroll.on('scroll',()=>{
                if(-5000>this.scroll.y){
                    this.isToTap = true;
                }else{
                    this.isToTap = false;
                }
            })
        },
        methods: {
            closeImgMask(){
                this.showMaskImg = false;
            },
            showTotalImg(item){
                this.maskImg = item.url;
                this.showMaskImg = true;
            },
            returnBack: function () {
                this.$router.go(-1);
            },

            //去顶部
            toTop() {
               if(this.scroll){
                   this.scroll.scrollTo(0,0, 1000, "ease");
               }
            },
            init: function () {
                this.page_no = 1;
                let self = this;
                self.getNewList();
            },

            iwantShowClick: function () {
                this.showTip = true;
            },
            goodClick: function (item) {
                thumbsUp("thumbs_up",item.img_id,(data)=>{
                    if (data.status == 1) {
                        item.thumbs_up_count++;
                    }
                    if(data.status == 2){
                        this.hasZan = true;
                        setTimeout(()=>{
                            this.hasZan = false;
                        },1500)
                    }
                });
            },
            getNewList: function () {
                let self = this;
                if(self.nowIsGetList){
                    self.nowIsGetList = false;
                    showList("show_list",self.page_no,self.doll_id,(data)=>{
                        if (data.data.list.length >= 0) {
                            self.nowIsGetList = true;
                            self.page_no+=1;
                            self.items = self.items.concat(data.data.list);
                            if(data.data.list.length>=10){
                                self.isHasMore = '上拉加载更多...'
                            }else{
                                self.nowIsGetList = false;
                                self.isHasMore = ''
                            }
                        } else {
                            self.nowIsGetList = false;
                            self.isHasMore = ''
                        }
                        setTimeout(()=>{
                            self.scroll.refresh();
                            self.scroll.finishPullUp();
                        },200)
                    });
                }
            },
            tipClick: function () {
                this.showTip = false;
            },
            destroyed(){
                if(this.scroll){
                    this.scroll.destroy();
                }
            },
        },
        components: {
            goBack
        }
    };
</script>

<style scoped>
    .wrapper1{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        text-align: center;
    }
    .hasMore{
        font-size: 0.3rem;
        padding: .5rem 0;
    }

    #dollShow {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: start;
    }

    #title {
        position: absolute;
        /*width: 100%;*/
        color: #323232;
        font-size: 0.4rem;
        font-weight: bold;
        top: 50%;
        text-align: center;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    #iwantShow {
        color: #fa9b09;
        position: absolute;
        font-size: 0.3rem;
        right: 0.4rem;
        top: 50%;
        transform: translateY(-50%);
    }
    .listContent{
        padding: 0 0.4rem;
        margin: 0.3rem 0;
    }
    .list {
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-content: start;
        background: #ffffff;
        box-sizing: border-box;
        font-size: 0;
        position: relative;
    }

    .headImg{
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
    }
    .headInfo{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    #info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 0.2rem;
        line-height: 1;
        font-size: 0;
        text-align: left;
    }

    #name {
        font-size: 0.32rem;
        color: #323232;
        width: 100%;
    }

    #date {
        font-size: 0.26rem;
        color: #a9a8a8;
        width: 100%;
        margin-top: 0.16rem;
    }

    #good {
        width: 1.2rem;
        display: flex;
        justify-content: flex-end;
        padding: 0.2rem 0;
    }

    #good span {
        font-size: 0.3rem;
        color: #a9a8a8;
        margin-right: 0.1rem;
    }

    #good img {
        width: 0.32rem;
        height: 0.3rem;
    }

    #desc {
        font-size: 0.32rem;
        line-height: 0.44rem;
        width: 6.7rem;
        margin: 0.2rem 0;
        color: #323232;
        text-align: left;
    }

    #maskTip {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    #maskTip > img {
        width: 6rem;
        height: 4.76rem;
        position: absolute;
        /*animation: ac .3s ease;*/

        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);

    }

    @keyframes ac {
        from{
            transform: scale(0);
        }
        to{
            transform: scale(1);
        }
    }

    .topBox {
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        position: relative;
    }
    .showImg{
        width: 100%;
        height: 4.8rem;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }
    .imgMask{
        position: fixed;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imgMask>img{
        width: 91%;
    }
    .toTop {
        position: fixed;
        z-index: 100;
        right: 0.5rem;
        bottom: 0.2rem;
    }

    .fadeTop-enter-active, .fadeTop-leave-active {
        transition: opacity .5s;
    }

    .fadeTop-enter, .fadeTop-leave-to {
        opacity: 0;
    }

    .hasZan{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 10;
        background-color: rgba(0,0,0,1);
        font-size: 0.3rem;
        color: white;
        padding: 0.2rem 0.4rem;
        border-radius: 0.2rem;
    }
</style>
