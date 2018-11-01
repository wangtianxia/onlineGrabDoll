<template>
    <section class="swiperTask">
        <goBack @returnToIndex="returnToIndex"/>
        <div class="swiperCenter">
            <div v-for="(item,index) in swiperImg" :key="index" class="swiperDiv">
                <img class="listItem" :src="item" alt="">
            </div>
            <!--<swiper swiper class="swiper-wrapper" :options="swiperOption" ref="swiperTask">-->
                <!--<swiper-slide v-for="(item,index) in swiperImg" :key="index">-->
                    <!--<img class="listItem" :src='item'/>-->
                <!--</swiper-slide>-->
                <!--<div id="swiperPagin" class="swiper-pagination" slot="pagination"></div>-->
            <!--</swiper>-->
        </div>
        <canvas class="taskSwiper" id="canvasSwiper" style="display: none" ></canvas>
        <div v-for="(item,index) in listImg" :key="index" style="display: none">
            <div class="qrcode" style="width: 200px;height: 200px" ref="erweima">
            </div>
        </div>
        <section class="swipTaskBtn" v-if="swiperImg.length>0">
            <section>
                将图片保存并分享到朋友圈(长按图片可“保存到相册”), 邀请新用户奖励8金币，老用户奖励1金币。
            </section>
        </section>
    </section>
</template>

<script>
    import CF from '../../../../CF'
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import goBack from '../../../components/return/index'
    import '../../qrcodes';
    export default {
        name: "index",
        data(){
            return {
                swiperOption: {
                    speed: 500, //滑动时间
                    loop: false,
                    spaceBetween:0,
                    slidesPerView:1,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },
                listImg:[],
                swiperImg:[]
            }
        },
        computed: {
            swiper() {
                return this.$refs.swiperTask.swiper
            }
        },

        mounted(){
            this.listImg.push(`static/image/task/${2}.jpg`);
            for(let i=0;i<this.listImg.length;i++){
                this.asyncFunc(i).then(res=>{
                    this.swiperImg.push(res)
                }).catch((err)=>{

                })
            }
        },

        methods:{
            returnToIndex(){
                this.$emit('closeSwiper');
            },
            asyncFunc(i) {
                return new Promise((resolve, reject)=> {
                    let hotUrl = '',v=CF.TOOLS.getUrlAttribute('v');
                    if(CF.gameInfo.env == 1){
                        hotUrl = `https://h5wwj.xintiao100.com/development/dist/newIndex.html?id=0&`
                    }else{
                        hotUrl = `https://wwjcdn1.n9game.com/videoDollCatcher/newIndex.html?v=${v}&id=7&`
                    }
                    let canvas = document.getElementById('canvasSwiper');
                    canvas.width = 600;
                    canvas.height = 900;
                    let ctx = canvas.getContext('2d');
                    let img = new Image();
                    img.onload = () => {
                        let qrcode = new QRCode(document.getElementsByClassName('qrcode')[i], {
                            width: 200,//设置宽高
                            height: 200
                        });
                        let url1 = hotUrl + 'channel=' + CF.user._channel + `&share_id=${CF.user.uid}&task_id=${i}&moments=1`;
                        qrcode.makeCode(url1);
                        setTimeout(()=>{
                            ctx.drawImage(img, 0, 0, 600, 900);
                            let url = qrcode._el.lastChild.currentSrc;
                            let img2 = new Image();
                            img2.onload = ()=>{
                                ctx.drawImage(img2, 50, 900-215, 155, 155);
                                let tempUrl = canvas.toDataURL("image/jpg");
                                resolve(tempUrl);
                                ctx.save();
                            };
                            img2.src = url;
                        },200);
                    };
                    img.src = this.listImg[i];
                });
            },
        },

        beforeDestroy(){
        },

        components: {
            swiper,
            swiperSlide,
            goBack
        }
    }
</script>

<style scoped>
    .swiperTask{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        width: 100%;
        min-height: 100%;
        max-height: unset;
        background-color: rgba(0,0,0,.8);
    }
    .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: rgba(0,0,0,0.2) !important;
    }
    .swiperCenter{
        text-align: center;
        margin-top: 1rem;
        font-size: 0;
    }
    .swiperDiv{
        width: 100%;
        height: 9rem;
    }
    .listItem{
        height: 100%;
    }
    .swipTaskBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .swipTaskBtn>section{
        font-size: 0.3rem;
        font-family: PingFang-SC-Medium;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.36rem;
        letter-spacing: 0.036rem;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.3rem;
    }
</style>