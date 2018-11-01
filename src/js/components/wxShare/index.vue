<template>
    <div class="wxShare" @click="closeHand" v-disabletouchmove>
        <img class="shareHand" src="static/image/10086/share_hand.png"/>
        <img class="shareWord" :src="imgSrc" alt="">
        <!--<section class="shareInfo">-->
            <!--每邀请到一位从未访问过游戏的好友-->
            <!--可获得{{coinNum}}金币奖励哦-->
        <!--</section>-->

        <section class="shareList" v-if="showList">
            <!--<swiper swiper class="swiper-wrapper" :options="swiperOption" ref="bannerSwiper">-->
            <!--<swiper-slide v-for="(item,index) in listImg" :key="index" >-->
            <!--<section class="slideItemUser">-->
            <!--<img class="headImg" :src='item.head_img' />-->
            <!--<span class="userName">{{item.user_name}}</span>-->
            <!--</section>-->
            <!--</swiper-slide>-->
            <!--</swiper>-->
            <p class="p1">我邀请的新玩家</p>
            <section v-for="(item,index) in listImg" class="list" :key="index" >
                <section class="slideItemUser">
                    <img class="headImg" :src='item.head_img' />
                    <span class="userName">{{item.user_name}}</span>
                </section>
            </section>
        </section>
    </div>
</template>


<script>

    import CF from '../../../router/ind.js';

    export default {
        data () {
            return {
                showList:false,
                listImg:[],
                imgSrc:CF.user.platform == '1007'?'static/image/10086/share_word1.png':'static/image/10086/share_word.png',
                coinNum:'10'
            }
        },

        mounted(){
            this.getShareList();
        },
        methods:{
            closeHand(){
                this.$emit('hideInvite')
            },
            getShareList(){
                (new CF.Ajax()).sendJSON(CF.gameInfo.host+'share_list',{
                    user_id:CF.user.uid,
                    sign:CF.M5B({user_id:CF.user.uid})
                },(data)=>{
                    if(data.status==1&&data['data'] && data['data']['list'].length>0){
                        this.showList = true;
                        this.listImg = data['data']['list'];
                        if(this.listImg.length>=12){
                            this.listImg.length = 12;
                        }
                    }else{
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .wxShare{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        position: fixed;
        left:0;
        top: 0;
        z-index: 999;
    }
    .shareHand{
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
        animation: handAc 0.2s ease infinite;
        width: 0.6rem;
    }
    .shareWord{
        position: absolute;
        right: 0.2rem;
        top: 0.8rem;
        width: 2.6rem;
    }
    .shareInfo{
        width: 66%;
        text-align: center;
        font-size: 0.3rem;
        color: white;
        left: 50%;
        top: 2rem;
        transform: translateX(-50%);
        position: absolute;
    }
    @keyframes handAc {
        from{
            transform: translate(0,0);
        }
        to{
            transform: translate(0,-0.2rem);
        }
    }
    .slideItemUser{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 1rem;
        flex-wrap: wrap;
        padding: 0.25rem 0.25rem 0 0.25rem;
    }

    .headImg{
        width: 1rem;
        border-radius: 50%;
    }
    .userName{
        font-size: 0.3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 100%;
        text-align: center;
        line-height: 0.5rem;
    }
    .shareList{
        position: absolute;
        width: 100%;
        top: 3.5rem;
    }
    .list{
        float: left;
    }
    .p1{
        font-size: 0.35rem;
        text-align: center;
        color: white;
        margin: 0;
        padding: 0;
        margin-bottom: 0.3rem;
    }
</style>