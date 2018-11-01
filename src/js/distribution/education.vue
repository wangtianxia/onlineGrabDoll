<template>
    <!--教程-->
    <!--:style="{backgroundImage:'url(' + bgUrl + ')'}"-->
    <section class="education" >
        <goBack @returnToIndex="returnBack"/>
        <canvas id="adsCanvas1" ref="adsCanvas1"
                style="height: 100%;width: 100%;margin: 0;padding: 0;display: none;"></canvas>
        <!--<div id="qrcode" style="width: 200px;height: 200px;display: none" ref="qrcode">-->
        </div>
        <!--<img class="haiBao" :src="tempUrl" @click.stop.prevent="haiBao" alt="">-->
        <img style="width: 100%" src="static/image/distribution/eduction.png" alt="">
        <img style="width: 100%;margin-top: 0.5rem" src="static/image/distribution/erweima.png" alt="">
        <img class="erweima1" :src="erweimaImg" alt="">

    </section>
</template>

<script>
    import CF from '../../router/ind';
    import goBack from '../components/return/index'
    export default {
        name: "education",

        data() {
            return {
                tempUrl: "",
                erweimaImg:''
                // bgUrl: require('../../../static/image/distribution/eduction.png')
            }
        },

        components: {
            goBack
        },


        mounted() {
            this.erweimaImg =  `static/image/erweima${CF.user.subscription}.jpg`

            //
            // var qrcode = this.qrcode = new QRCode(document.getElementById("qrcode"), {
            //     width: 250,//设置宽高
            //     height: 250
            // });
            // let url = CF.gameInfo.host + '?channel=' + CF.user._channel + `&share_id=${CF.user.uid}&distribution=1`;
            // qrcode.makeCode(url);
            //
            // setTimeout(() => {
            //
            //     let url = qrcode._el.lastChild.currentSrc;
            //     let canvas = document.getElementById('adsCanvas1');
            //     canvas.width = 650;
            //     canvas.height = 866;
            //     let ctx = canvas.getContext('2d');
            //     let img = new Image();
            //
            //     img.onload = () => {
            //         ctx.drawImage(img, 0, 0, 650, 866);
            //         let img2 = new Image();
            //         img2.onload = () => {
            //             ctx.drawImage(img2, 230, 558, 190, 190);
            //             this.tempUrl = canvas.toDataURL("image/jpg");
            //         };
            //         img2.src = url;
            //     };
            //     img.src = 'static/image/distribution/temp.png';
            // }, 300)


        },

        methods: {
            returnBack() {
                this.$router.go(-1);
            },
            clickTip() {
                return false
            },

            haiBao() {
                return false
            }
        },

        destroyed() {
            this.qrcode = null;
        }
    }
</script>

<style lang="less" scoped>
    .education {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 7.5rem;
        position: relative;
        background-color: rgb(147,207,151);
        .educationContent {
            font-size: 0;

        }
        .erweima1{
            position: absolute;
            left: 50%;
            width: 4rem;
            top: 32.3rem;
            transform: translateX(-50%);
        }
        .haiBao {
            width: 5.5rem;
            margin-top: 53.8rem;
            margin-left: 1rem;
            height: 7.5rem;
        }
        .erweima{
            position: absolute;
            bottom: 4.6rem;
            width: 3.4rem;
            background: red;
            height: 3.6rem;
            left: 2.1rem;
        }
    }
</style>