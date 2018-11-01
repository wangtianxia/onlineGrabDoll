<template>
    <section class="newActiveAc">
        <goBack @returnToIndex="returnBack" style="position:absolute;top:-0.1rem;left:0.2rem;"></goBack>
        <section class="hasCount" v-if="hasCount">
            <section class="title1">已发出的娃娃</section>
            <section class="title2"><section class="title3">{{dollNum}}</section> 只</section>
        </section>
        <section class="notCount" v-else>
            <section>userName</section>
            <img src="static/image/head.jpg" alt="">
            <section> 这就是那娃娃呀</section>
        </section>
        <section class="goToShow" @click="toShow">
            前去娃娃秀
        </section>
        <section class="common">
            <section class="commonTitle">库房展示</section>
            <img src="static/image/rankBg.png" alt="">
            <section class="commonTitle">机房展示</section>
            <img src="static/image/rankBg.png" alt="">
            <section class="commonTitle">物流展示</section>
            <img src="static/image/rankBg.png" alt="">
        </section>

    </section>
</template>

<script>
    import goBack from '../../components/return/index';
    export default {
        name: "newActive",
        data(){
            return {
                dollNum:42200,
                hasCount:true
            }
        },

        created(){
            this.dollNum = parseInt((new Date().getTime() - 1525536000000)/1000/30) + this.dollNum;
            if(this.dollNum>= 50000){
                this.hasCount = false;
            }
        },

        methods:{
            returnBack(){
                this.$router.go(-1);
            },
            toShow(){
                this.$router.push({ name: 'dollShowPage', params: {}})
            }
        },
        components:{
            goBack
        }
    }
</script>

<style scoped>
    .newActiveAc{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
        position: relative;
        margin: 0 auto;
    }
    .title1,.notCount{
        font-size: 0.32rem;
        color: black;
        text-align: center;
        padding-top: 0.5rem;
    }
    .title2{
        text-align: center;
        font-size: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title3{
        font-size: 0.3rem;
        color: #ff8f11;
    }
    .notCount{
        font-size: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .notCount>img{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
    }
    .goToShow{
        width: 90%;
        height: .90rem;
        background: #ff4f97;
        border-radius: 1rem;
        text-align: center;
        color: #ffffff;
        font-size: .32rem;
        margin: 0.6rem 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: -webkit-gradient(linear, left top, right top, from(rgb(241, 156, 56)), to(rgb(237, 118, 58)));
        background: linear-gradient(to right, rgb(241, 156, 56), rgb(237, 118, 58));
    }
    .common{
        width: 100%;
        font-size: 0.3rem;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .common>section{
        width: 100%;
        font-size: 0.5rem;
        text-align: center;
        margin: 0.2rem 0;
    }
    .common>img{
        width: 80%;
    }
</style>