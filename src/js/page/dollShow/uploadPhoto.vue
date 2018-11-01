
<template>
    <div id="uploadPhoto">

        <!-- 返回上级页面 -->
        <goBack @returnToIndex="returnBack"></goBack>

        <div id='title'>娃娃秀</div>
        <!---->
        <div class="phoneArea" v-show='!canshow'>
            <img src="static/image/dollShow/add.png" style="width:3.3rem;height:3.3rem">
            <input id="fileItem" type="file" @change='onFileChange'>
        </div>

        <div class="phoneArea newHeight" v-show='canshow'>
            <!-- <img v-bind:src="imageSrc" v-on:load='imgOnload' v-bind:style="{ width: photoWidth+'rem', height: photoHeight + 'rem' }"> -->
            <canvas id='myUploadImage' style="width:6.7rem;height:5rem"></canvas>
        </div>

        <div id='desc'>
            <textarea v-model="desc" placeholder="说点什么"></textarea>
            <div id='line'></div>
        </div>

        <div id='sendBtn' v-on:click='sendClick' v-if="isShowDollShow">发布娃娃秀（金币+20）</div>

        <!--<div id='sendFriends' v-on:click='sendFriendClick' v-if="hideDollShow">发布朋友圈（金币+100）</div>-->

        <div id='descWords'>收到娃娃很开心！拍摄一张娃娃照片上传吧（上传无关照片将无法通过审核哦）</div>

        <!-- 组件页面-弹窗 -->
        <component v-bind:is="show_tip" :title='title' :tip='tip' :type='type' v-on:ok='tipOk'></component>

        <section class="loading" v-show="loading" v-disabletouchmove>
            正在努力上传中...
        </section>

        <section class="friendDiv" v-show="showFriend">
            <goBack @returnToIndex="hide"></goBack>
            <p>长按图片“保存到相册”</p>
            <div class="friendImg">
                <div id="qrcode" style="width: 200px;height: 200px;display: none" ref="erweima"></div>
                <canvas id="friendImg" style="width:6.7rem;height:5rem;display: none" ></canvas>
                <div class="imgFather">
                    <img :class="[heImgCss]" :src="heImg"  alt="">
                </div>
                <section class="findFriend">
                    长按图片“保存到相册”，并分享到朋友圈<br/>
                    超过3位好友扫码访问，可得100金币
                </section>
            </div>
        </section>
    </div>
</template>

<script>

    import CF from '../../../router/ind.js'
    import tip from '../tip1.vue';
    import goBack from '../../components/return/index';
    import '../../distribution/qrcodes'


    export default {
        data() {
            return {
                canshow: false, //显示上传图片
                photoWidth: 0,
                photoHeight: 0,
                desc: '',
                show_tip: '',
                title: '',
                tip: '',
                type: false,
                loading: false,
                showAlert: false,

                showFriend:false,
                heImg:'',
                heImgCss:"",
                isShowDollShow:true,
                hideDollShow:true
            }
        },
        created: function () {
            this.bag_id = this.$route.params.bag_id;
            this.isShowDollShow = this.$route.params.isShowDollShow;

            if(CF.user.platform == '1003' || CF.user.platform == '1007'){
                this.hideDollShow = false;
            }
        },

        mounted(){
            let qrcode = this.qrcode = new QRCode(document.getElementById("qrcode"), {
                width: 250,//设置宽高
                height: 250
            });

            let hotUrl = '',v=CF.TOOLS.getUrlAttribute('v');
            if(CF.gameInfo.env == 1){
                hotUrl = `https://h5wwj.xintiao100.com/development/dist/newIndex.html?id=0&channel=${CF.user._channel}&share_id=${CF.user.uid}&moments=2&doll_id=${this.bag_id}`
            }else{
                hotUrl = `https://wwjcdn1.n9game.com/videoDollCatcher/newIndex.html?v=${v}&id=0&channel=${CF.user._channel}&share_id=${CF.user.uid}&moments=2&doll_id=${this.bag_id}`
            }
            qrcode.makeCode(hotUrl);
        },

        methods: {
            returnBack: function () {
                this.$router.go(-1)
            },

            onFileChange: function (e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.createImage(files);
            },

            createImage: function (file) {
                var self = this;
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
                if (!rFilter.test(file[0].type)) {
                    //showMyTips("请选择jpeg、png格式的图片", false);
                    console.log('格式不正确')
                    return;
                }
                var image = new Image();
                var reader = new FileReader();
                reader.readAsDataURL(file[0]);
                reader.onload = function (e) {
                    self.canshow = true;
                    image.onload = function () {
                        var canvas = $('#myUploadImage')[0];
                        var ctx = canvas.getContext('2d');

                        let canvas1 = $('#friendImg')[0];
                        let ctx1 = canvas1.getContext('2d');
                        var w = image.naturalWidth,
                            h = image.naturalHeight;
                        //旋转处理
                        var orient = self.getPhotoOrientation(image);
                        if (orient == 6) {
                            var json = self.setCanvasSize(h, w);
                            let json1 = self.setFriendSize(h,w);
                            w = json.w;
                            h = json.h;
                            ctx.save();
                            ctx.translate(w / 2, h / 2);
                            ctx.rotate(90 * Math.PI / 180);
                            ctx.drawImage(image, 0 - h / 2, 0 - w / 2, h, w);
                            // ctx.drawImage(image, 0 - w/ 2, 0 - h / 2, w, h);
                            ctx.restore();

                            ctx1.save();
                            ctx1.translate(json1.w1 / 2, json1.h1 / 2);
                            ctx1.rotate(90 * Math.PI / 180);
                            ctx1.drawImage(image, 0 - json1.h1 / 2, 0 - json1.w1 / 2, json1.h1, json1.w1);
                            ctx1.restore();

                            let url = self.qrcode._el.lastChild.currentSrc;
                            let image1 = new Image();
                            image1.src = url;

                            image1.onload = ()=>{

                                let tempW = json1.scalex;

                                ctx1.fillStyle = 'rgba(0,0,0,0.5)';
                                ctx1.fillRect(0,json1.h1-30,json1.w1,30);

                                ctx1.fillStyle='white';
                                ctx1.font="20px Verdana";
                                ctx1.fillText("长按识别二维码——用微信扫码就能玩的娃娃机，娃娃快递送到家",50,json1.h1-8);

                                ctx1.fillStyle = 'white';
                                ctx1.fillRect(40,json1.h1-tempW-70,tempW+20,tempW+20);

                                ctx1.drawImage(image1, 50,json1.h1-tempW -60, tempW, tempW);
                                let tempUrl = canvas1.toDataURL("image/jpg");
                                self.heImg = tempUrl;
                            };

                            if(json1.w1>json1.h1){
                                self.heImgCss = 'w1'
                            }else{
                                self.heImgCss = 'h1';
                            }

                        } else {
                            var json = self.setCanvasSize(w, h);
                            let json1 = self.setFriendSize(w,h);
                            w = json.w;
                            h = json.h;
                            ctx.drawImage(image, 0, 0, w, h);
                            ctx1.drawImage(image, 0, 0, json1.w1, json1.h1);

                            let url = self.qrcode._el.lastChild.currentSrc;
                            let image1 = new Image();
                            image1.src = url;
                            image1.onload = ()=>{

                                let tempW = json1.scalex;

                                ctx1.fillStyle = 'rgba(0,0,0,0.5)';
                                ctx1.fillRect(0,json1.h1-30,json1.w1,30);

                                ctx1.fillStyle='white';
                                ctx1.font="20px Verdana";
                                ctx1.fillText("长按识别二维码——用微信扫码就能玩的娃娃机，娃娃快递送到家",50,json1.h1-8);

                                ctx1.fillStyle = 'white';
                                ctx1.fillRect(40,json1.h1-tempW-70,tempW+20,tempW+20);

                                ctx1.drawImage(image1, 50,json1.h1-tempW -60, tempW, tempW);
                                let tempUrl = canvas1.toDataURL("image/jpg");

                                if(json1.w1>json1.h1){
                                    self.heImgCss = 'w1'
                                }else{
                                    self.heImgCss = 'h1'
                                }
                                self.heImg = tempUrl;
                            }
                        }
                    };

                    image.src = e.target.result;

                };
            },

            setCanvasSize: function (w, h) {
                var canvas = $('#myUploadImage')[0];

                var scale = w / h;
                canvas.style.width = '6.7rem';
                canvas.style.height = 6.7 / scale + 'rem';

                canvas.width = w;
                canvas.height = h;

                if (w > 700) {
                    canvas.width = 700;
                    canvas.height = canvas.width / scale;
                };

                let json = {
                    w: canvas.width,
                    h: canvas.height
                };
                return json
            },

            setFriendSize(w,h){

                let canvas1 = $('#friendImg')[0];

                let scale = w / h;
                canvas1.style.width = '6.7rem';
                canvas1.style.height = 6.7 / scale + 'rem';

                canvas1.width = w;
                canvas1.height = h;

                if (w > 700) {
                    canvas1.width = 700;
                    canvas1.height = canvas1.width / scale;
                };

                let scalex;
                if(h>w){
                    scalex = canvas1.height/6
                }else{
                    scalex = canvas1.width/6
                }


                let json = {
                    w1: canvas1.width,
                    h1: canvas1.height,
                    scalex:scalex
                };
                return json
            },


            sendClick: function () {
                var self = this;
                if (!this.canshow) {
                    this.show_tip = 'tip';
                    this.title = '你尚未上传图片';
                    this.tip = '请先选择图片上传...';
                    this.type = false;
                    return;
                }
                this.loading = true;
                var canvas = $('#myUploadImage')[0];
                var imgData = canvas.toDataURL("image/jpeg", 0.9);
                imgData = encodeURIComponent(imgData);

                CF.Fetch(CF.gameInfo.host + 'dolls_upload', {
                    'user_id': CF.user.uid,
                    'img_info': imgData || '',
                    'desc': self.desc || '',
                    'bag_id': self.bag_id,
                    'sign': CF.M5B({user_id: CF.user.uid, bag_id: self.bag_id})
                }, 'POST').then(res => {
                    self.loading = false;
                    self.show_tip = 'tip';
                    self.title = '上传成功';
                    self.tip = '获得20币<br>审核通过后照片将出现在娃娃秀中';
                }).catch(err => {
                })
            },

            tipOk: function () {
                if (!this.canshow) {
                    this.show_tip = '';
                    return;
                }

                this.show_tip = '';
                this.$router.replace({name: 'dollShowPage', params: {}})
            },

            getPhotoOrientation: function (img) {
                var orient;
                EXIF.getData(img, function () {
                    orient = EXIF.getTag(this, 'Orientation');
                });
                return orient;
            },



            sendFriendClick() {

                if (!this.canshow) {
                    this.show_tip = 'tip';
                    this.title = '你尚未上传图片';
                    this.tip = '请先选择图片上传...';
                    this.type = false;
                    return;
                }else{
                    this.showFriend = true;
                }
            },

            hide(){
                this.showFriend = false;
            }
        },
        components: {
            tip: tip,
            goBack
        }
    }
</script>

<style scoped>
    #uploadPhoto {
        width: 100%;
        height: 100%;
        top: 0rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: start
    }

    #title {
        position: absolute;
        /*width: 100%;*/
        color: black;
        font-size: 0.4rem;
        font-weight: bold;
        top: 0.2rem;
        text-align: center;
        left: 3rem;
    }

    #sendBtn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 90%;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: .90rem;
        background: #ff4f97;
        border-radius: 1rem;
        text-align: center;
        color: #ffffff;
        font-size: .32rem;
        margin-top: 0.6rem;
        background: -webkit-gradient(linear, left top, right top, from(rgb(241, 156, 56)), to(rgb(237, 118, 58)));
    }

    #sendFriends {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 90%;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: .90rem;
        background: #ff4f97;
        border-radius: 1rem;
        text-align: center;
        color: #ffffff;
        font-size: .32rem;
        margin-top: 0.4rem;
        background: -webkit-gradient(linear, left top, right top, from(rgb(241, 156, 56)), to(rgb(237, 118, 58)));
    }

    .phoneArea {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;

    }

    .newHeight {
        height: auto;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #a9a8a8;
        opacity: 1;
        font-size: .28rem;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #a9a8a8;
        opacity: 1;
        font-size: .28rem;
    }

    ::-ms-input-placeholder {
        color: #a9a8a8;
        opacity: 1;
        font-size: .28rem;
    }

    ::-webkit-input-placeholder {
        color: #a9a8a8;
        opacity: 1;
        font-size: .28rem;
    }

    #desc {
        /*position: absolute;*/
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 0.4rem;
    }

    textarea {
        width: 6.70rem;
        height: 1.20rem;
        font-size: .30rem;
        border: none;
        background: #f7f7f7;
        outline: none;
        resize: none;
        -webkit-text-size-adjust: none;
        border-radius: 0.2rem;
    }

    #descWords {
        display: flex;
        width: 6.7rem;
        font-size: 0.3rem;
        line-height: 0.4rem;
        margin-top: 1rem;
        height: 1rem;
    }

    .loading {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        font-size: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        background-color: white;
    }

    #fileItem {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        left: 0;
        top: 0;
        opacity: 0;
    }

    .friendDiv{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        background-color: rgba(0,0,0,0.8);
        width: 100%;
        min-height: 100%;
    }
    .friendDiv>p{
        margin: 0;
        text-align: center;
        color: white;
        font-size: 0.4rem;
        font-weight: bold;
        padding: 0.3rem 0;
    }

    .friendImg{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
    }

    .imgFather{
        width: 100%;
        height: 8rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .findFriend{
        font-size: 0.35rem;
        color: white;
        width: 100%;
        padding: 0.4rem;
        text-align: center;
    }

    .w1{
        width: 100%;
    }
    .h1{
        height: 100%;
    }

</style>










