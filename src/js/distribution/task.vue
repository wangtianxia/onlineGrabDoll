<template>
    <section class="taskContent">
        <goBack @returnToIndex="returnBack"/>
        <section class="taskList">
            <p class="taskFriend">晒朋友圈任务</p>
            <!--<div id="qrcode" style="width: 200px;height: 200px;display: none" ref="erweima"></div>-->
            <canvas class="taskCanvas" style="display: none">
            </canvas>
            <section class="list" v-for="(item,index) in list" :key="index" v-if="list.length>0">
                <div class="qrcode" style="width: 200px;height: 200px;display: none" ref="erweima">
                </div>
                <p class="listTitle" :style="{color:item.status ==2?'rgba(50,50,50,0.5)':''}" >{{item['title']}}</p>

                <p class="listDesc1" :style="{color:item.status ==2?'rgba(50,50,50,0.5)':''}">邀请5名新用户可获得<span :style="{color:item.status ==2?'rgba(50,50,50,0.5)':''}">额外{{item['reward']}}元</span>现金奖励</p>
                <p class="listDesc2" :style="{color:item.status ==2?'rgba(50,50,50,0.5)':''}">（邀请到的好友，仍会计算“邀请奖励”）</p>
                <section class="listFind">
                    <p class="hasNum" v-if="item.status == 2" style="color:#f30000;font-size: 0.3rem">任务已过期</p>
                    <p class="hasNum" v-if="item.status == 0">已邀请新用户扫码访问：<span>{{item['share_num']}}/{{item['total_share_times']}}</span></p>
                    <p class="hasNum" v-else-if="item.status == 1">完成，奖励已发放</p>
                    <p class="hasNum" v-else-if="item.status == 2" style="color:#323232;font-size: 0.24rem">分享后不会产生奖励</p>
                    <p class="hasNum" v-if="item.status == 0 && item.start_time && item.end_time"> 活动时间：{{ item.start_time|time}}-{{item.end_time|time}} </p>
                    <div style="position: relative">
                        <img class="taskCanvas" :src="item.imgUrl" alt="">
                    </div>
                </section>
                <p class="listDesc" :style="{color:item.status ==2?'rgba(50,50,50,0.5)':''}">{{item['desc']}}</p>
            </section>
        </section>
    </section>
</template>

<script>

    import CF from '../../router/ind';
    import goBack from '../components/return/index';
    import {moments_task_list} from '../../server/getServerData';
    import './qrcodes';

    export default {
        name: "task",

        data() {
            return {
                list: [],
                tempUrl: ""
            }
        },

        mounted() {
            moments_task_list('moments_task_list', (res) => {
                if (res['status'] == 1) {
                    if (res['data'] && res['data']['list'].length > 0) {
                        this.list = res['data']['list'];
                        for(let i=0;i<this.list.length;i++){
                            let hotUrl = '',v=CF.TOOLS.getUrlAttribute('v');
                            if(CF.gameInfo.env == 1){
                                hotUrl = `https://h5wwj.xintiao100.com/development/dist/newIndex.html?id=0&`
                            }else{
                                hotUrl = `https://wwjcdn1.n9game.com/videoDollCatcher/newIndex.html?v=${v}&id=0&`
                            }
                            let canvas = document.getElementsByClassName('taskCanvas')[0];
                            canvas.width = 600;
                            canvas.height = 900;
                            let ctx = canvas.getContext('2d');
                            let img = new Image();
                            img.onload = () => {
                                let qrcode = new QRCode(document.getElementsByClassName('qrcode')[i], {
                                    width: 200,//设置宽高
                                    height: 200
                                });
                                let url1 = hotUrl + 'channel=' + CF.user._channel + `&share_id=${CF.user.uid}&task_id=${this.list[i]['id']}&moments=1`;
                                qrcode.makeCode(url1);
                                setTimeout(()=>{
                                    ctx.drawImage(img, 0, 0, 600, 900);
                                    let url = qrcode._el.lastChild.currentSrc;
                                    let img2 = new Image();
                                    img2.onload = ()=>{
                                        // if(i==0){
                                        //     ctx.drawImage(img2, 48, 382, 140, 140);
                                        // }else if(i==1){
                                        //     ctx.drawImage(img2, 50, 900-215, 155, 155);
                                        // }
                                        ctx.drawImage(img2, 50, 900-215, 155, 155);
                                        let tempUrl = canvas.toDataURL("image/jpg");
                                        this.$set(this.list[i],'imgUrl',tempUrl)
                                    };
                                    img2.src = url;
                                },200)
                            };
                            img.src = `static/image/task/${2}.jpg`;
                        }
                    }
                }
            })
        },

        filters:{
            time(time){
                let temp = new Date(time*1000);
                let year = temp.getFullYear();
                let month = temp.getMonth()+1;
                let date = temp.getDate();
                return `${month}月${date}日`
            }
        },

        methods: {
            returnBack() {
                this.$router.go(-1);
            }
        },

        destroyed() {
            this.qrcode = null;
        },

        components: {
            goBack
        }
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .taskContent {
        width: 100%;
        min-height: 100%;
        max-height: 100%;
        background-color: #f7f7f7;
        .taskList {
            .taskFriend {
                font-size: 0.36rem;
                font-weight: bold;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0.04rem;
                color: #323232;
                text-align: center;
                padding: 0.4rem 0;
            }
            .list {
                padding: 0.18rem 0.39rem;
                margin-bottom: 0.18rem;
                background-color: white;
                .listTitle {
                    text-align: left;
                    font-size: 0.36rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.3rem;
                    letter-spacing: 0.04rem;
                    color: #323232;
                    padding-top: 0.29rem;
                    margin-bottom: 0.19rem;
                }
                .listDesc {
                    font-size: 0.28rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.36rem;
                    letter-spacing: 0.03rem;
                    color: #323232;
                    margin-bottom: 0.18rem;
                }
                .listDesc1 {
                    font-size: 0.36rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.4rem;
                    letter-spacing: 0.03rem;
                    color: #323232;
                    margin: 0.1rem 0;
                    span {
                        color: #f30000;
                    }
                }
                .listDesc2{
                    font-size: 0.28rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.4rem;
                    letter-spacing: 0.03rem;
                    color: #323232;
                }
                .listFind {
                    margin-top: 0.38rem;
                    text-align: center;
                    margin-bottom: 0.2rem;
                    font-size: 0;
                    padding-bottom: 0.25rem;
                    position: relative;
                    .hasNum {
                        font-size: 0.3rem;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 1;
                        letter-spacing: 0.03rem;
                        color: #0096ff;
                        text-align: center;
                        span {
                            color: #f30000;
                        }
                        margin-bottom: 0.21rem;
                    }
                    .completeImg {
                        width: 5rem;
                        height: 100%;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        background-color: rgba(0, 0, 0, 0.5);
                        img {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            width: 3.99rem;
                            height: 3.98rem;
                            z-index: 10;
                        }

                    }
                }
                .taskCanvas {
                    width: 4rem;
                    box-shadow: 3px 3px 0px rgba(0,0,0,0.1);
                }

            }
        }
    }
</style>